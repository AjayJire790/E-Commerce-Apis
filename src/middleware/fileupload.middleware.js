//1.Import multer
import multer from "multer";
// import path from "path";
// import fs from "fs";

//Resolve the uploads directory
// const uploadDir = path.resolve("uploads");

//Ensure "uploads" directrory exists
// if (!fs.existsSync()) {uploadDir
//   fs.mkdirSync(uploadDir);
// }
//2. Configure storage with filename and location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

export const upload = multer({
  storage: storage,
});
