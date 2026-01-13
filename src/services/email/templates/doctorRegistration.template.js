export const doctorRegistrationTemplate = ({ name, email, password, loginUrl }) => {
  return `
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Medicare Hospital - Doctor Portal</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        padding:10px;
      }
      
      .email-wrapper {
        max-width: 100%;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      .header {
background: linear-gradient(135deg, #00a86b 0%, #007f5f 100%);
        padding: 40px 30px;
        text-align: center;
        position: relative;
      }
      
      .header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #00d4ff, #00ff88, #00d4ff);
      }
      
      .logo {
        max-width: 200px;
        height: auto;
        margin-bottom: 20px;
      }
      
      .header h1 {
        color: #ffffff;
        font-size: 28px;
        font-weight: 600;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .header p {
        color: #e0f0ff;
        font-size: 15px;
        margin-top: 8px;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .welcome-badge {
        display: inline-block;
background: linear-gradient(135deg, #00a86b 0%, #007f5f 100%);
        color: white;
        padding: 8px 20px;
        border-radius: 50px;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 20px;
      }
      
      .greeting {
        font-size: 24px;
        color: #1a1a1a;
        margin-bottom: 15px;
        font-weight: 600;
      }
      
      .intro-text {
        color: #4a5568;
        font-size: 16px;
        margin-bottom: 30px;
        line-height: 1.7;
      }
      
      .credentials-box {
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
        border-left: 4px solid #0066cc;
        padding: 25px;
        border-radius: 8px;
        margin: 30px 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      
      .credentials-box h3 {
        color: #0066cc;
        font-size: 16px;
        margin-bottom: 15px;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      
      .credentials-box h3::before {
        content: '🔐';
        margin-right: 8px;
        font-size: 20px;
      }
      
      .credential-item {
        display: flex;
        padding: 12px 0;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .credential-item:last-child {
        border-bottom: none;
      }
      
      .credential-label {
        font-weight: 600;
        color: #2d3748;
        min-width: 100px;
        font-size: 14px;
      }
      
      .credential-value {
        color: #4a5568;
        font-family: 'Courier New', monospace;
        background: white;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 14px;
      }
      
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #0066cc 0%, #004c99 100%);
        color: white !important;
        text-decoration: none;
        padding: 16px 40px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        margin: 20px 0;
        box-shadow: 0 4px 15px rgba(0,102,204,0.4);
        transition: all 0.3s ease;
        text-align: center;
      }
      
      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,102,204,0.5);
      }
      
      .section {
        margin: 35px 0;
      }
      
      .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e2e8f0;
      }
      
      .section-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        font-size: 18px;
      }
      
      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
      }
      
      .info-list {
        list-style: none;
        padding: 0;
      }
      
      .info-list li {
        padding: 12px 0 12px 35px;
        color: #4a5568;
        font-size: 15px;
        position: relative;
        line-height: 1.6;
      }
      
      .info-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #10b981;
        font-weight: bold;
        font-size: 18px;
      }
      
      .warning-box {
        background: #fff5f5;
        border-left: 4px solid #f56565;
        padding: 20px;
        border-radius: 8px;
        margin: 25px 0;
      }
      
      .warning-box h4 {
        color: #c53030;
        margin-bottom: 12px;
        font-size: 15px;
        display: flex;
        align-items: center;
      }
      
      .warning-box h4::before {
        content: '⚠️';
        margin-right: 8px;
      }
      
      .warning-box ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .warning-box li {
        color: #742a2a;
        font-size: 14px;
        margin: 8px 0;
      }
      
      .contact-card {
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
        padding: 25px;
        border-radius: 12px;
        margin: 30px 0;
        border: 1px solid #e2e8f0;
      }
      
      .contact-card h4 {
        color: #0066cc;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 600;
      }
      
      .contact-info {
        color: #4a5568;
        font-size: 14px;
        line-height: 1.8;
      }
      
      .contact-info strong {
        color: #2d3748;
        display: inline-block;
        min-width: 70px;
      }
      
      .contact-info a {
        color: #0066cc;
        text-decoration: none;
      }
      
      .contact-info a:hover {
        text-decoration: underline;
      }
      
      .footer {
        background: #f7fafc;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e2e8f0;
      }
      
      .footer-text {
        color: #718096;
        font-size: 13px;
        margin: 5px 0;
      }
      
      .social-links {
        margin-top: 15px;
      }
      
      .social-links a {
        display: inline-block;
        margin: 0 8px;
        color: #718096;
        text-decoration: none;
        font-size: 12px;
      }
      
      .divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
        margin: 30px 0;
      }
      
      @media only screen and (max-width: 600px) {
        .email-wrapper {
          border-radius: 0;
        }
        
        .content {
          padding: 30px 20px;
        }
        
        .header {
          padding: 30px 20px;
        }
        
        .credential-item {
          flex-direction: column;
        }
        
        .credential-label {
          margin-bottom: 5px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <!-- Header -->
      <div class="header">
        <h1>Medicare Hospital</h1>
        <p>Excellence in Healthcare & Medical Services</p>
      </div>
      
      <!-- Main Content -->
      <div class="content">
        <div class="welcome-badge">✨ Welcome to Our Team</div>
        
        <h2 class="greeting">Hello Dr. ${name},</h2>
        
        <p class="intro-text">
          We are delighted to welcome you to the <strong>Medicare Hospital</strong> medical team. Your doctor account has been successfully created by our administration. We look forward to your valuable contribution to our healthcare services.
        </p>
        
        <!-- Login Credentials -->
        <div class="credentials-box">
          <h3>Your Login Credentials</h3>
          <div class="credential-item">
            <span class="credential-label">Email:</span>
            <span class="credential-value">${email}</span>
          </div>
          <div class="credential-item">
            <span class="credential-label">Password:</span>
            <span class="credential-value">${password}</span>

          </div>
          <p style="color:#c53030;font-size:14px;margin-top:10px;">*This is a temporary password. Please change it immediately after your first login.</p>

        </div>
        
        <center>
          <a href="${loginUrl}" class="cta-button">🔓 Access Your Dashboard</a>
        </center>
        
        <div class="divider"></div>
        
        <!-- Getting Started Steps -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">📋</div>
            <h3 class="section-title">Getting Started - Required Actions</h3>
          </div>
          <ul class="info-list">
            <li>Sign in to your doctor portal using the credentials provided above</li>
            <li>Complete your professional profile with education, specialization, and experience</li>
            <li>Set your department, working hours, and consultation availability</li>
            <li>Add a professional bio and upload your profile picture</li>
            <li>Wait for admin approval to activate your account and receive your ID card</li>
            <li>Once approved, you'll have full access to all dashboard features</li>
          </ul>
        </div>
        
        <!-- Dashboard Features -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">⚡</div>
            <h3 class="section-title">Your Dashboard Capabilities</h3>
          </div>
          <ul class="info-list">
            <li>View, manage, and approve appointments with patients</li>
            <li>Access patient medical history and records</li>
            <li>Upload prescriptions, lab reports, and medical documents</li>
            <li>Update your profile information and availability status</li>
            <li>Manage your consultation schedule and working hours</li>
            <li>Request password reset or account modifications</li>
          </ul>
        </div>
        
        <!-- Important Security Notice -->
        <div class="warning-box">
          <h4>Security & Important Guidelines</h4>
          <ul>
            <li>Never share your login credentials with anyone</li>
            <li>Profile completion is mandatory before accessing full features</li>
            <li>Email changes require administrative approval</li>
            <li>Account deletion requests are subject to admin review</li>
            <li>Contact admin immediately if you notice any suspicious activity</li>
          </ul>
        </div>
        
        <!-- Contact Information -->
        <div class="contact-card">
          <h4>📞 Hospital Contact Information</h4>
          <div class="contact-info">
            <strong>Hospital:</strong>Medicare<br>
            <strong>Address:</strong> Sector 12, Near Metro Station New Delhi, India - 110034<br>
            <strong>Phone:</strong> <a href="tel:1200-321-3783">1200-321-3783</a><br>
            <strong>Email:</strong> <a href="mailto:support@medicare.com">support@medicare.com</a><br>
            <strong>Website:</strong> <a href="https://medicare-client-fawn.vercel.app/" target="_blank">Visit Our Portal</a>
               <p style="color: #718096; font-size: 14px; ">
          * If you have any questions or need assistance, please don't hesitate to contact our support team.
        </p>
          </div>
          
        </div>
        
     
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p class="footer-text"><strong>Medicare Hospital </strong></p>
        <p class="footer-text">Committed to Excellence in Healthcare</p>
        <p class="footer-text" style="margin-top: 15px;">© 2026 Medicare. All rights reserved.</p>
        <div class="social-links">
          <a href="#">Privacy Policy</a> · 
          <a href="#">Terms of Service</a> · 
          <a href="#">Support</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  
  
  `;
};
