import { v2 as cloudinary } from 'cloudinary';

(async function () {

  // Configuration
  cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '' // Click 'View API Keys' above to copy your API secret
  });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto'
  });


})();

export default cloudinary;