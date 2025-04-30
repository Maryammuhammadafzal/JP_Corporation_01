// import nodemailer from 'nodemailer';
// import 'dotenv/config';

// // Email Transporter Configuration
// const transporter = nodemailer.createTransport({
// 	host: process.env.SMTP_HOST,
// 	port: process.env.SMTP_PORT,
// 	service: process.env.SMTP_SERVICE,
// 	secure: true,
// 	auth: {
// 		user: process.env.SMTP_MAIL,
// 		pass: process.env.SMTP_PASSWORD,
// 	},
// 	tls: {
// 		rejectUnauthorized: false, 
// 	},
// });


// const sendMessage = async ({ type, to, data }) => {
// 	try {
//                 console.log("type" ,type );

// 		let subject, html;

// 		switch (type) {


// 			case 'message_confirmation':
// 				subject = `Message recorded`;
// 				html = generateMessageConfirmationEmail(data);
// 				break;

// 			default:
// 				throw new Error('Unsupported email type');
// 		}

// 		await transporter.sendMail({
// 			from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_MAIL}>`,
// 			to,
// 			subject,
// 			html,
// 		});

// 		console.log(`Email sent to ${to}`);
// 		return true;
// 	} catch (error) {
// 		console.error('Email failed:', error);
// 		throw error;
// 	}
// };


// const generateMessageConfirmationEmail = (data) => `
//   <div style="font-family: Arial, sans-serif; max-width: 600px;">
//     <h2>Your Message Has Been Recorded</h2>
//     <p>We've received your message and will respond shortly.</p>
//     <hr>
//     <p><strong>Your message:</strong></p>

//     <p>${data.message}</p>
//     <p>Thank you for reaching out to us!</p>
//     <p>Best regards,</p>
//     <p>${process.env.COMPANY_NAME}</p>
//     <p>${process.env.COMPANY_ADDRESS}</p>
//     <p>${process.env.COMPANY_PHONE}</p>
//     <p>${process.env.COMPANY_EMAIL}</p>



//   </div>
// `;


// export default sendMessage;

import { Resend } from 'resend';
import "dotenv/config"
const resend = new Resend(process.env.RESEND_API_KEY); // Use dotenv for security

const sendMessage = async ({ type, to, data }) => {
        console.log("Send Message Function" , type , to , data);
        try {
                let subject, html;

                switch (type) {


                        case 'message_confirmation':
                                subject = `Message recorded`;
                                html = generateMessageConfirmationEmail(data);
                                break;

                        default:
                                throw new Error('Unsupported email type');
                }
console.log(`"${process.env.SMTP_MAIL}"`)

                const response = await resend.emails.send({
                        from: `${process.env.SMTP_MAIL}`,
                        to,
                        subject,
                        html,
                });

                console.log('Email sent:', response);
        } catch (error) {
                console.error('Failed to send email:', error);
        }
};

const generateMessageConfirmationEmail = (data) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px;">
    <h2>Your Message Has Been Recorded</h2>
    <p>We've received your message and will respond shortly.</p>
    <hr>
    <p><strong>Your message:</strong></p>
    
    <p>${data.message}</p>
    <p>Thank you for reaching out to us!</p>
    <p>Best regards,</p>
    <p>${process.env.COMPANY_NAME}</p>
    <p>${process.env.COMPANY_ADDRESS}</p>
    <p>${process.env.COMPANY_PHONE}</p>
    <p>${process.env.COMPANY_EMAIL}</p>
    


  </div>
`;

export default sendMessage;
