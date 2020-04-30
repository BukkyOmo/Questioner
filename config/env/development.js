const development = {
	PORT: process.env.PORT || 'xxxxxxxxxx',
	DATABASE_URL: process.env.DATABASE_URL || 'xxxxxxxxxx',
	SECRET: process.env.SECRET || 'xxxxxxxxxx',
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'xxxxxxxxxxxxxxxx',
	EMAIL: process.env.EMAIL || 'xxxxxxxxxxxx',
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'xxxxxxxxxx',
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'xxxxxxxxxx',
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'xxxxxxxxxx'
};

export default development;
