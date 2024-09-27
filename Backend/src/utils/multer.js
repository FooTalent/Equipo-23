import multer from "multer";
import path from "path";

const __dirname = path.resolve();

const getDestinationFolder = (file) => {
  const fieldname = file.fieldname;
  switch (fieldname) {
    case "photo":
      return path.join(__dirname, "/public/img/profiles");
    case "products":
    case "thumbnails":
      return path.join(__dirname, "/public/img/products");
    case "document":
    case "identification":
    case "proofOfResidence":
    case "accountStatement":
      return path.join(__dirname, "/public/documents");
    default:
      return path.join(__dirname, "/public/others");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = getDestinationFolder(file);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
