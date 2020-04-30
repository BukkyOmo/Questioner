import sgMail from '@sendgrid/mail';
import config from '../../../config';

sgMail.setApiKey(config.SENDGRID_API_KEY);

class sendWelcomeMail {
	static async sendEmail(firstname, email) {
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
}


export default sendWelcomeMail;
