import dotenv, { populate } from 'dotenv';
dotenv.config();

//PORT :
export const PORT = process.env.PORT;
//JWT :
export const JWT = process.env.JWT!;
//RESEND_API_KEY :
export const RESEND_API_KEY = process.env.RESEND_API_KEY!;
//SUPABASE_KEY :
export const SUPABASE_KEY = process.env.SUPABASE_KEY!;
//SUPABASE_URL
export const SUPABASE_URL = process.env.SUPABASE_URL!;
//APP_URI :
export const APP_URI = process.env.APP_URI!
//APP_URI :
export const CLIENT_URI = process.env.APP_URI!