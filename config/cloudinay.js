/* istanbul ignore next */
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import config from '../config/index';

cloudinary.config({
	cloud_name: config.CLOUD_NAME,
	api_key: config.API_KEY,
	api_secret: config.API_SECRET
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
/* istanbul ignore next */
const imageFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error('Only image files are allowed!'), false);
	}
	return cb(null, true);
};

/* istanbul ignore next */
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
/* istanbul ignore next */
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
