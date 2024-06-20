import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudinary = () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dyxlwqt54',
    api_key: '799952599255486',
    api_secret: 'p1LlHrsr4sVdfmAit9GiNLxt7Dg',
  });

  cloudinary.uploader.upload(
    '',
    { public_id: 'Messi' },
    function (error, result) {
      console.log(result);
    },
  );
};
