const test = {
	PORT: process.env.PORT || 'xxxxxxxxxx',
	DATABASE_URL: process.env.TEST_DATABASE_URL || 'xxxxxxxxxx',
	SECRET: process.env.SECRET || 'xxxxxxxxxx',
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'xxxxxxxxxx',
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'xxxxxxxxxx',
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'xxxxxxxxxx'
};

export default test;
