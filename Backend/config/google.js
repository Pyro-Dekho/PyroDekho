const { OAuth2Client } = require("google-auth-library");
require('dotenv').config()

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
)

console.log(process.env.GOOGLE_CLIENT_ID)

module.exports = googleClient;;