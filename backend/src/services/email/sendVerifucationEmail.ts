import { APP_EMAIL } from "../../config/env.js";
import resend from "./resendClient.js";
import createVerificationEmailPage from "../../utils/createVerficationEmailPage.js";


const sendVerificaionEmail = async (receiver: string, link: string): Promise<Boolean> => {
    const html = createVerificationEmailPage(link);
    try {
        console.log(APP_EMAIL);
        const { data, error } = await resend.emails.send({
            from: APP_EMAIL as string,
            to: [receiver],
            subject: "account verification",
            text: "account verification",
            html: html
        });
        if (error) {
            console.log(error);
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

export default sendVerificaionEmail;