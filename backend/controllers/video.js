import multer from "multer";
import fs from "fs";
import mime from "mime";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// file filter to only allow video files
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|mov|avi|wmv|flv|mkv/;

  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
};

// multer middleware to upload files
const upload = multer({ storage: storage, fileFilter: fileFilter });

// controller functions
// upload video
const uploadVideo = (req, res) => {
  upload.single("video")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json("Error uploading file");
    }
    res.status(200).json("File uploaded successfully");
  });
};

// stream video
const streamVideo = (req, res) => {
  const filename = req.params.fileName;
  const path_upload = `./uploads/${filename}`; // path to the video file
  const stat = fs.statSync(path_upload); // get the file size
  const fileSize = stat.size;
  const range = req.headers.range;

  // if range of the video is not provided, send the whole file
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path_upload, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": mime.getType("video/*"),
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": mime.getType("video/*"),
    };
    res.writeHead(200, head);
    fs.createReadStream(path_upload).pipe(res); // stream the video file
  }
};

// download video
const downloadVideo = (req, res) => {
  const filename = req.params.fileName;
  const path_upload = `./uploads/${filename}`;
  res.download(path_upload, filename, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json("Error downloading file");
    }
    // res.status(200).json("File downloaded successfully");
  });
};

export { uploadVideo, streamVideo, downloadVideo };
