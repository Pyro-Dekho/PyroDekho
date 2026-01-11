const resetPasswordTemplate = (resetLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:0;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">

          <table width="600" cellpadding="20" cellspacing="0" style="border:1px solid #eee;">

            <tr>
              <td align="center">
                <img
                  src="https://res.cloudinary.com/dskznffls/image/upload/v1767450593/pyrodekhologo_iewlkt.jpg"
                  alt="PyroDekho Logo"
                  style="max-width:180px;margin-bottom:20px;"
                />
              </td>
            </tr>

            <tr>
              <td align="center">
                <h2>Password Reset Request</h2>
              </td>
            </tr>

            <tr>
              <td align="center">
                <p>We received a request to reset your PyroDekho account password.</p>

                <a
                  href="${resetLink}"
                  target="_blank"
                  style="
                    display:inline-block;
                    padding:14px 28px;
                    background-color:#000000;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                    margin:20px 0;
                  "
                >
                  Reset Password
                </a>
              </td>
            </tr>

            <tr>
              <td>
                <p style="font-size:14px;color:#555;">
                  If the button does not work, copy and paste this link:
                </p>

                <p style="word-break:break-all;">
                  <a href="${resetLink}" target="_blank">${resetLink}</a>
                </p>

                <p style="font-size:13px;color:#999;">
                  This link expires in 15 minutes.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = resetPasswordTemplate;
