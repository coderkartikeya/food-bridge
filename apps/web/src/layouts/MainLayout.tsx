/**
 * FoodBridge Main Layout Structure
 * Acts as the primary application shell and UI state manager.
 * Implements local authentication state management to handle the transition 
 * between Guest flows (Login/Signup) and Authenticated flows (Profile/Dashboard).
 * In production, local state should be replaced with a global AuthContext.
 */
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, Footer } from "@components/export/index";

interface User {
  name: string;
  role: string;
  avatar?: string;
}

const MainLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar 
        user={user === null ? undefined : user} 
        onLogin={handleLoginNavigation} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-grow">
        <Outlet context={{ user, setUser }} /> 
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;