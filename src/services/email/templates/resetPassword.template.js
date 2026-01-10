export const resetPasswordTemplate = (name, resetLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>

    <style>
      body {
        font-family: Arial, sans-serif;
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
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        color: #0d6efd;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
      }

      .content {
        margin-top: 25px;
        font-size: 16px;
        color: #333333;
        line-height: 1.6;
      }

      .button {
        display: inline-block;
        margin: 30px 0;
        padding: 14px 28px;
        background-color: #0d6efd;
        color: #ffffff !important;
        text-decoration: none;
        font-weight: bold;
        border-radius: 6px;
        text-align: center;
      }

      .button:hover {
        background-color: #0b5ed7;
      }

      .timer-box {
        margin-top: 20px;
        padding: 15px;
        background-color: #fff3cd;
        border: 1px solid #ffeeba;
        border-radius: 6px;
        color: #856404;
        font-size: 14px;
        text-align: center;
      }

      .note {
        margin-top: 20px;
        font-size: 14px;
        color: #dc3545;
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

        <p>
          We received a request to reset your account password.  
          Click the button below to create a new password.
        </p>

        <div style="text-align: center;">
          <a href="${resetLink}" class="button">Reset Password</a>
        </div>

        <div class="timer-box">
          ⏳ This reset link is valid for <strong>15 minutes</strong> only.  
          After that, it will automatically expire for security reasons.
        </div>

        <p class="note">
          If you did not request a password reset, please ignore this email.
          Your account will remain secure.
        </p>
      </div>

      <div class="footer">
        <p>© 2025 Medicare Hospital. All rights reserved.</p>
        <p>
          Visit our website:
          <a href="https://medicare-client-fawn.vercel.app/">
            https://medicare-client-fawn.vercel.app/
          </a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};
