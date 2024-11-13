import nodemailer from 'nodemailer'
import MeiliSearch from 'meilisearch';
import { config } from 'dotenv';
config()

const sendEmail=async(token,email)=>
{
  const url = `http://localhost:${process.env.PORT}/api/auth/verify/${token}`;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.SECURE_PASSWORD
        }
      });
   const info= await transporter.sendMail({
      to: email,
      subject: 'Email Verification',
      html: `<h3>Click the link to verify your email: <a href="${url}">${url}</a></h3>`
    });
}

const verifiyEmail = async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = decoded;
  let userData = await user.findOne({ email });
  if (!userData) {
    return res.status(400).json({ message: "Invalid token" });
  }
  userData.verified = true;
  await userData.save();
  res.status(200).json({ message: "Email verified successfully" });
};


const meili_client=new MeiliSearch({
apiKey:process.env.MEILI_APIKEY,
host:process.env.MEILI_HOSTKEY,
requestTimeout: 10000,
})


const getUrl = async (req, res) => {
  try {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const params_to_sign = {
      timestamp: timestamp,
      upload_preset: process.env.PRESET 
    };
    const signature = cloudinary.utils.api_sign_request(params_to_sign, process.env.cloudSecret);

    return res.status(200).json({
      signature: signature,
      timestamp: timestamp,
      cloud_name: process.env.cloudName,
      api_key: process.env.cloudApiKey,
      upload_preset: process.env.PRESET
    });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return res.status(500).json({ msg: 'Error generating signed URL', error: error.message });
  }
};


export {sendEmail,meili_client,getUrl,verifiyEmail}

