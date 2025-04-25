// import twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

// /**
//  * Sends an SMS using Twilio
//  * @param {string} to - Recipient's phone number (in E.164 format, e.g., +233xxxxxxxxx)
//  * @param {string} message - Text message content
//  */
// export const sendSMS = async (to, message) => {
//   try {
//     const sms = await client.messages.create({
//       body: message,
//       from: twilioPhone,
//       to: to,
//     });

//     console.log("SMS sent to:", to, "| SID:", sms.sid);
//     return { success: true, sid: sms.sid };
//   } catch (error) {
//     console.error("SMS failed:", error.message);
//     return { success: false, error: error.message };
//   }
// };