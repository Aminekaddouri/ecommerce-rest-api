const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');

const uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  res.json({
    success: true,
    message: 'Image uploaded successfully',
    data: {
      url: req.file.path,
      public_id: req.file.filename,
    },
  });
});

const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('Please upload at least one image');
  }

  const images = req.files.map(file => ({
    url: file.path,
    public_id: file.filename,
  }));

  res.json({
    success: true,
    message: `${images.length} image(s) uploaded successfully`,
    data: images,
  });
});

const deleteImage = asyncHandler(async (req, res) => {
  const { public_id } = req.params;

  if (!public_id) {
    res.status(400);
    throw new Error('Please provide image public_id');
  }

  const result = await cloudinary.uploader.destroy(public_id);

  if (result.result !== 'ok') {
    res.status(400);
    throw new Error('Failed to delete image');
  }

  res.json({
    success: true,
    message: 'Image deleted successfully',
  });
});

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
};
