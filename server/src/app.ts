import express from "express";
import cors from "cors";

import announceRoutes from "./routes/announces.routes.js";
import profileRoutes from "./routes/profiles.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/announces", announceRoutes);
app.use("/profiles", profileRoutes);
app.use("/upload", uploadRoutes);

app.use(errorMiddleware);

export default app;