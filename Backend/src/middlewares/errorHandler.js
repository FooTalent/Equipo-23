import multer from "multer";

export default (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        res.status(413).json({ error: false, name: "File size is too large" });
        break;
      case "LIMIT_FILE_COUNT":
        res.status(413).json({ error: false, name: "Too many files" });
        break;
      case "LIMIT_FIELD_KEY":
        res.status(413).json({ error: false, name: "Field name is too large" });
        break;
      case "LIMIT_FIELD_VALUE":
        res
          .status(413)
          .json({ error: false, name: "Field value is too large" });
        break;
      case "LIMIT_UNEXPECTED_FILE":
        res.status(400).json({ error: false, name: "Unexpected field" });
        break;
      default:
        res.status(400).json({ error: false, name: "Multer error" });
        break;
    }
  } else {
    req.logger.error(`Mensaje de error:
           ${error.message}\n\n
          Stack Trace: ${error.stack}`);
    res.status(500).json({
      error: true,
      mssage: "Unhandled error",
    });
  }
};
