import cloudinary from "../cloudinary";

export default uploadFile = (files, folder, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(files, { folder, ...options }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}