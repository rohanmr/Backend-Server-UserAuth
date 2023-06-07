// server/index.js
import express from "express";
import accountRoutes from "./routes/account.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use("/api/account", accountRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
