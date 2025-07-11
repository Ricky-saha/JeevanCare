
// SVG icons for visual elements
const icons = {
  checkCircle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>`
};

// The main email generation function
const appointmentConfirmationTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Appointment Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 40px 0; border-radius: 8px; overflow: hidden;">
              <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <td style="padding: 40px; text-align: center;">
                  <h1 style="margin: 0; font-size: 32px;">JeevanCare</h1>
                  <p style="margin-top: 10px; font-size: 16px;">Your Life, Our Care</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #333;">Appointment Confirmed!</h2>
                  <p style="color: #555; font-size: 16px;">
                    Hello <strong>${data.patientName}</strong>,<br/><br/>
                    Your appointment with <strong>${data.doctorName}</strong> has been successfully booked. Below are the details:
                  </p>
                  <table cellpadding="0" cellspacing="0" style="margin: 30px 0; font-size: 16px; color: #333; width: 100%;">
                    <tr>
                      <td><strong>Appointment ID:</strong></td>
                      <td>${data.appointmentId}</td>
                    </tr>
                    <tr>
                      <td><strong>Date:</strong></td>
                      <td>${data.appointmentDate}</td>
                    </tr>
                    <tr>
                      <td><strong>Time:</strong></td>
                      <td>${data.appointmentTime}</td>
                    </tr>
                    <tr>
                      <td><strong>Doctor:</strong></td>
                      <td>${data.doctorName}</td>
                    </tr>
                    <tr>
                      <td><strong>Specialty:</strong></td>
                      <td>${data.doctorSpecialty}</td>
                    </tr>
                    <tr>
                      <td><strong>Fees:</strong></td>
                      <td>₹${data.fees}</td>
                    </tr>
                    <tr>
                      <td><strong>Location:</strong></td>
                      <td>${data.clinicAddress}</td>
                    </tr>
                  </table>
                  <p style="color: #777;">
                    Please arrive 15 minutes early and bring any relevant documents or previous reports.
                  </p>
                  <p style="margin-top: 30px; color: #333; font-weight: bold;">
                    Thank you for trusting JeevanCare.
                  </p>
                </td>
              </tr>
              <tr style="background-color: #f9fafb; text-align: center;">
                <td style="padding: 20px; font-size: 14px; color: #666;">
                  Need help? Contact us at
                  <a href="mailto:${data.supportEmail || 'support@jeevancare.com'}" style="color: #667eea; text-decoration: none;">${data.supportEmail || 'support@jeevancare.com'}</a>
                  <br/>
                  or call <strong>${data.supportPhone || '+91-9999999999'}</strong>
                </td>
              </tr>
              <tr style="background-color: #111827; color: #d1d5db; text-align: center;">
                <td style="padding: 20px; font-size: 13px;">
                  © 2024 JeevanCare. All rights reserved.
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

export default appointmentConfirmationTemplate;