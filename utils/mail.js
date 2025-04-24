import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

/**
 * Sends a basic email (text or HTML)
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} [options.text] - Plain text body (optional)
 * @param {string} [options.html] - HTML body (optional)
 */
export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent to:", to, "| Message ID:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email failed:", error.message);
        return { success: false, error: error.message };
    }
};
