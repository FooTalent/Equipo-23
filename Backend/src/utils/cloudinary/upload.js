import cloudinary from "../cloudinary.js";

const uploadFile = (files, folder, options) => {
  const uplaodFiles = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder, ...options }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(file.buffer);
    });
  });

  return Promise.all(uplaodFiles);
}

export default uploadFile;