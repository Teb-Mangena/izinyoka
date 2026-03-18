export const createWelcomeEmailTemplate = (name, clientUrl) => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Welcome to Izinyoka Tracker</title>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.5; color: #333333;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f6f9" style="background-color: #f4f6f9; width: 100%;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e9ecef; overflow: hidden;" bgcolor="#ffffff">
          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#1e3a8a" style="background-color: #1e3a8a; padding: 30px 20px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">Izinyoka Tracker</h1>
              <p style="margin: 8px 0 0; font-size: 16px; color: #bfdbfe;">Report. Verify. Act.</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td align="left" style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1e3a8a;">Welcome, ${name}!</h2>
              <p style="margin: 0 0 20px; color: #4b5563;">Thank you for joining Izinyoka Tracker. We're thrilled to have you on board in the fight against illegal electricity connections.</p>
              <p style="margin: 0 0 20px; color: #4b5563;">With our platform, you can:</p>
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #4b5563;">
                <li style="margin-bottom: 8px;">📸 Report suspected illegal connections with photos</li>
                <li style="margin-bottom: 8px;">🤖 Get instant AI-powered feedback on your reports</li>
                <li style="margin-bottom: 8px;">🔍 Track the status of your submissions</li>
              </ul>
              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 10px 0 20px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="#2563eb" style="background-color: #2563eb; border-radius: 8px;">
                          <a href="${clientUrl}" target="_blank" style="display: inline-block; padding: 14px 30px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">Get Started</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; color: #6b7280; font-size: 15px;">If you have any questions, feel free to reply to this email or contact our support team.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" bgcolor="#f9fafb" style="background-color: #f9fafb; padding: 24px 30px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">© 2025 Izinyoka Tracker. All rights reserved.</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                You received this email because you signed up for Izinyoka Tracker. If you didn't create an account, please ignore this email.
              </p>
            </td>
          </tr>
        </table>
        <!-- End Main Container -->
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};