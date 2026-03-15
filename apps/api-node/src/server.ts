import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();

// ===================================================
// Using Helmet for different security headers
// ===================================================
app.use(helmet());

// ===================================================
// Applying CORS 
// ===================================================
app.use(cors({
  
  origin: "http://localhost", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(morgan("combined"));
app.use(express.json());

const rateLimiting = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests plz try again later" },
  standardHeaders: true,
  legacyHeaders: true
});

// ========================================================
// Applying rate limiting (Fixed variable name)
// ========================================================
app.use('/api/', rateLimiting);


// Added Request and Response types
app.get("/api/", (req: Request, res: Response) => {
  res.json({ message: "Gateway is secure and routing traffic!" });
});

// Added try/catch and NextFunction to handle Axios errors safely
app.get("/api/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get("http://api-spring:8080/products");
    res.json(response.data);
  } catch (error) {
    // This forwards the error to the middleware at the bottom
    next(error); 
  }
});


// ========================================================
// Global Error Handler (Added TS Types)
// ========================================================
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Gateway Error:", err.message);
  
  const status = err.response?.status || 500;
  const message = err.response?.data || "Internal Gateway Error";

  res.status(status).json({ error: message });
});

app.listen(4000, () => {
  console.log("Gateway is running on 4000");
});