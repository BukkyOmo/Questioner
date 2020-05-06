import sgMail from '@sendgrid/mail';
import config from '../../../config';

sgMail.setApiKey(config.SENDGRID_API_KEY);

class MailNotification {
	static async signUpEmail(firstname, email) {
		const message = {
			to: `${email}`,
			from: config.EMAIL,
			subject: 'Welcome to Questioner!!!',
			html: `
            <p>Hi ${firstname}</p>
            <p>Thank you for choosing Questioner, the one-stop online question sourcing application. We're super excited to have you.</p>
            <br>
            <p>Regards</p>
            <p>The team at Questioner</p>`,
		};
		await sgMail.send(message);
	}

	static async passwordResetEmail(token, email, firstname) {
		const message = {
			to: `${email}`,
			from: config.EMAIL,
			subject: 'REQUEST TO RESET PASSWORD',
			html: `
            <p>Hi ${firstname}</p>
            <p>We received your request to reset your password. Please follow the link below to perform this action.</p>
            <p><a href=http://localhost:8280/api/v2/auth/resetpassword/${token}>reset password link</a></p>
            <p>Please note that this link expires in 1 hour.</p>
            <br>
            <p>Regards</p>
            <p>The team at Questioner</p>`,
		};
		await sgMail.send(message);
	}
}

export default MailNotification;
