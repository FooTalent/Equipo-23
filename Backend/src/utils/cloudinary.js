import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';

(async function () {

  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryKey,
    api_secret: config.cloudinarySecret // Click 'View API Keys' above to copy your API secret
  });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto'
  });


})();

export default cloudinary;