import express from "express";
import cors from "cors";
import videoRoutes from "./routes/video.js";

// app
const app = express();

// middleware to allow cross origin requests
const corsOptions = {
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// routes
app.use("/video", videoRoutes);

const port = 3030;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
