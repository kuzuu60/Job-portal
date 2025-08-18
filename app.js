import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";


import postRoutes from "./routes/post.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { pool } from "./db/client.js";

dotenv.config();

const app = express();  
app.use(express.urlencoded({ extended: true })); 
app.use(fileUpload({
  useTempFiles: true,  // <-- important for tempFilePath
  tempFileDir: "/tmp/", // optional
}));app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} hit`);
  next();
});

// app.get("/test", (req, res) => {
//   console.log("Test route hit");
//   res.json({ message: "Server works!" });
// });



app.use("/api/applications", applicationRoutes);
app.use("/api/posts", postRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    // Simple query to test DB connection
    await pool.query("SELECT NOW()");
    console.log(" Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
  console.log(` Server listening on port ${PORT}`);
});


// app.listen(process.env.PORT, () => {
//   console.log(`Server listening on port ${process.env.PORT}`);
// });
