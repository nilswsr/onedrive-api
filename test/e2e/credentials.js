// credentials.js
// access token is only valid for 1 hour, so I can't set up dev access token
export default {
  accessToken: process.env.ONEDRIVE_ACCESS_TOKEN || ""
}
