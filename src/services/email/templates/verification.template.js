export const verificationTemplate = (name, verifyLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 6px 15px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        color: #0d6efd;
      }
      .header h1 {
        margin: 0;
        font-size: 30px;
      }
      .content {
        margin-top: 25px;
        font-size: 16px;
        color: #333333;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        margin: 25px 0;
        padding: 14px 28px;
        background-color: #EE4B2B;
        color: white !important;
        text-decoration: none;
        font-weight: bold;
        border-radius: 6px;
        text-align: center;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #d63a1b;
      }
      .note {
        margin-top: 20px;
        font-size: 14px;
        color: #d9534f;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #777777;
        text-align: center;
      }
      .footer a {
        color: #0d6efd;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Medicare Hospital</h1>
      </div>
      <div class="content">
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for registering with <strong>Medicare Hospital</strong>. Please verify your email address by clicking the button below:</p>
        <a href="${verifyLink}" class="button">Verify Your Email</a>
        <p class="note">Please note: If you do not verify your email within 24 hours, your registration information will be safely deleted.</p>
        <p>If you did not create an account, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        <p>© 2025 Medicare Hospital. All rights reserved.</p>
        <p>Visit our website: <a href="https://medicare-client-fawn.vercel.app/">https://medicare-client-fawn.vercel.app/</a></p>
      </div>
    </div>
  </body>
  </html>
  `;
};
