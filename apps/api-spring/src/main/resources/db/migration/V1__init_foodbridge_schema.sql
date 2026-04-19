-- ==========================================
-- 1. EXTENSIONS & CORE FUNCTIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- 2. USERS TABLE
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL CHECK (role IN ('DONOR', 'NGO', 'VOLUNTEER', 'ADMIN')),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    location geography(Point, 4326) NOT NULL,

    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 3. FOOD LISTINGS TABLE
-- ==========================================
CREATE TABLE food_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit VARCHAR(50) NOT NULL,
    expiry_time TIMESTAMP WITH TIME ZONE NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE'
        CHECK (status IN ('AVAILABLE', 'CLAIMED', 'COMPLETED', 'CANCELED', 'EXPIRED')),

    pickup_location geography(Point, 4326) NOT NULL,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_food_listings_modtime
    BEFORE UPDATE ON food_listings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 4. DELIVERIES TABLE
-- ==========================================
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES food_listings(id) ON DELETE RESTRICT,
    ngo_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    volunteer_id UUID REFERENCES users(id) ON DELETE SET NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'ACCEPTED_BY_VOLUNTEER', 'PICKED_UP', 'DELIVERED', 'CANCELED')),

    picked_up_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    delivery_notes TEXT,

    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_deliveries_modtime
    BEFORE UPDATE ON deliveries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 5. AUDIT HISTORY (DELIVERIES)
-- ==========================================
CREATE TABLE deliveries_history (
    history_id SERIAL PRIMARY KEY,
    original_delivery_id UUID NOT NULL,
    listing_id UUID,
    ngo_id UUID,
    volunteer_id UUID,
    status VARCHAR(20),
    delivery_notes TEXT,
    action_type VARCHAR(10) NOT NULL CHECK (action_type IN ('UPDATE', 'DELETE')),
    action_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION audit_deliveries_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO deliveries_history (
            original_delivery_id, listing_id, ngo_id, volunteer_id, status, delivery_notes, action_type
        ) VALUES (
            OLD.id, OLD.listing_id, OLD.ngo_id, OLD.volunteer_id, OLD.status, OLD.delivery_notes, 'UPDATE'
        );
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO deliveries_history (
            original_delivery_id, listing_id, ngo_id, volunteer_id, status, delivery_notes, action_type
        ) VALUES (
            OLD.id, OLD.listing_id, OLD.ngo_id, OLD.volunteer_id, OLD.status, OLD.delivery_notes, 'DELETE'
        );
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_audit_deliveries
    AFTER UPDATE OR DELETE ON deliveries
    FOR EACH ROW EXECUTE FUNCTION audit_deliveries_changes();

-- ==========================================
-- 6. INDEXES
-- ==========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_food_listings_status ON food_listings(status);
CREATE INDEX idx_food_listings_expiry ON food_listings(expiry_time);
CREATE INDEX idx_deliveries_status ON deliveries(status);

-- Foreign Keys & Soft Delete Indexes
CREATE INDEX idx_food_listings_donor ON food_listings(donor_id);
CREATE INDEX idx_deliveries_listing ON deliveries(listing_id);
CREATE INDEX idx_deliveries_ngo ON deliveries(ngo_id);
CREATE INDEX idx_users_deleted ON users(is_deleted);
CREATE INDEX idx_food_listings_deleted ON food_listings(is_deleted);

-- PostGIS Geospatial Indexes
CREATE INDEX idx_users_location ON users USING GIST (location);
CREATE INDEX idx_food_listings_location ON food_listings USING GIST (pickup_location);