import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
	cloudinary,
	folder: 'Questioner',
	allowedFormats: ['jpg', 'png'],
	transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

/**
 * @description Validates the file type for uploading a profile picture
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @param {object} next - The next middleware
 * @returns Status code and error message or the next function if file is not in a specific format
 */
const imageFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error('Only image files are allowed!'), false);
	}
	return cb(null, true);
};

const upload = multer({
	storage,
	imageFilter,
	limits: {
		fileSize: 1000000,
		files: 1,
	}
}).single('image');

/**
 * @description Validates the file payload for uploading a profile picture
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @param {object} next - The next middleware
 * @returns Status code and error message or the next function
 */
const imageUpload = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(409).json({
				message: 'Unable to upload image'
			});
		}
		return next();
	});
};

export default imageUpload;
