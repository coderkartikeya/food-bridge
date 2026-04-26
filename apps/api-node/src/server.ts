import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express();

app.use(helmet());

const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.header("Access-Control-Allow-Origin", requestOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Vary", "Origin");
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(morgan("combined"));


app.use(express.json());

const rateLimiting = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests plz try again later" },
  standardHeaders: true,
  legacyHeaders: true
});

app.use('/api/', rateLimiting);

app.get("/api/", (req: Request, res: Response) => {
  res.json({ message: "Gateway is secure and routing traffic!" });
});

app.use(
  createProxyMiddleware({
    target: "http://api-spring:8080",
    changeOrigin: true,

    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(`[Gateway] Forwarding ${req.method} request to: ${req.url}`);

        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },

      error: (err, req, res) => {
        console.error("Proxy Error:", err.message);
        (res as Response).status(500).json({
          error: "Backend service is currently unavailable. Is Spring Boot running?"
        });
      }
    }
  })
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Gateway Error:", err.message);

  const status = err.response?.status || 500;
  const message = err.response?.data || "Internal Gateway Error";

  res.status(status).json({ error: message });
});

app.listen(4000, () => {
  console.log("Gateway is running on 4000");
});