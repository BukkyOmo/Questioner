const production = {
	PORT: process.env.PORT || 'xxxxxxxxxx',
	DATABASE_URL: process.env.PRODUCTION_DATABASE_URL || 'xxxxxxxxxx',
	SECRET: process.env.SECRET || 'xxxxxxxxxx',
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'xxxxxxxxxxxxxxxx',
	EMAIL: process.env.EMAIL || 'xxxxxxxxxxxx',
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'xxxxxxxxxx',
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'xxxxxxxxxx',
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'xxxxxxxxxx',
	USER_TOKEN: process.env.userToken || 'xxxxxxxxxxxx',
	ADMIN_TOKEN: process.env.adminToken || 'xxxxxxxxxxx',
	EXPIRED_TOKEN: process.env.expiredToken || 'xxxxxxxxxx'
};

export default production;
