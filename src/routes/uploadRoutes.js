const express = require('express');
const router = express.Router();
const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
} = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const multerErrorHandler = require('../middleware/multerErrorHandler');

/**
 * @swagger
 * /api/upload/single:
 *   post:
 *     summary: Upload single image (Admin only)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (max 5MB, jpg/png/gif/webp)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://res.cloudinary.com/.../image.jpg
 *                     public_id:
 *                       type: string
 *                       example: ecommerce/products/abc123
 *       400:
 *         description: Validation error or file too large
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not authorized as admin
 */
router.post(
  '/single',
  protect,
  admin,
  upload.single('image'),
  multerErrorHandler,
  uploadSingleImage
);

/**
 * @swagger
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple images (Admin only, max 5)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files (max 5, 5MB each)
 *                 maxItems: 5
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: 3 image(s) uploaded successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       public_id:
 *                         type: string
 *       400:
 *         description: Too many files or validation error
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not authorized as admin
 */
router.post(
  '/multiple',
  protect,
  admin,
  upload.array('images', 5),
  multerErrorHandler,
  uploadMultipleImages
);

/**
 * @swagger
 * /api/upload/{public_id}:
 *   delete:
 *     summary: Delete image from Cloudinary (Admin only)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: public_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cloudinary public_id (URL encode slashes as %2F)
 *         example: ecommerce%2Fproducts%2Fabc123
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       400:
 *         description: Failed to delete image
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not authorized as admin
 */
router.delete('/:public_id', protect, admin, deleteImage);

module.exports = router;
