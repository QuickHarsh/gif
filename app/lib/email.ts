import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: process.env.EMAIL_SERVER_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Cheflinx" <${process.env.EMAIL_FROM || 'noreply@cheflinx.com'}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #4f46e5;">Cheflinx</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h2>Verify Your Email Address</h2>
          <p>Thank you for registering with Cheflinx. Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email</a>
          </div>
          <p>If you did not create an account, you can safely ignore this email.</p>
          <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${verificationUrl}</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>&copy; ${new Date().getFullYear()} Cheflinx. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Cheflinx" <${process.env.EMAIL_FROM || 'noreply@cheflinx.com'}>`,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #4f46e5;">Cheflinx</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          <p>This password reset link will expire in 1 hour.</p>
          <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>&copy; ${new Date().getFullYear()} Cheflinx. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendOrderConfirmationEmail(email: string, order: any) {
  const mailOptions = {
    from: `"Cheflinx" <${process.env.EMAIL_FROM || 'noreply@cheflinx.com'}>`,
    to: email,
    subject: `Order Confirmation #${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #4f46e5;">Cheflinx</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h2>Thank You for Your Order!</h2>
          <p>Hi ${order.shippingAddress.fullName},</p>
          <p>Your order has been received and is now being processed. Here's a summary of your purchase:</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold;">Order Number: ${order.orderNumber}</p>
            <p style="margin: 5px 0;">Order Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb;">Product</th>
                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">Quantity</th>
                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: any) => `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
                  <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">$${item.price.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
                <td style="padding: 10px; text-align: right;">$${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Shipping:</td>
                <td style="padding: 10px; text-align: right;">$${order.shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Tax:</td>
                <td style="padding: 10px; text-align: right;">$${order.tax.toFixed(2)}</td>
              </tr>
              ${order.discount > 0 ? `
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Discount:</td>
                  <td style="padding: 10px; text-align: right;">-$${order.discount.toFixed(2)}</td>
                </tr>
              ` : ''}
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">Total:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">$${order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="margin-bottom: 20px;">
            <h3>Shipping Address:</h3>
            <p style="margin: 5px 0;">${order.shippingAddress.fullName}</p>
            <p style="margin: 5px 0;">${order.shippingAddress.street}</p>
            <p style="margin: 5px 0;">${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
            <p style="margin: 5px 0;">${order.shippingAddress.country}</p>
            <p style="margin: 5px 0;">Phone: ${order.shippingAddress.phone}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3>Shipping Method:</h3>
            <p>${order.shippingMethod.name} - ${order.shippingMethod.estimatedDelivery}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3>Payment Method:</h3>
            <p>${order.paymentInfo.method.replace('_', ' ').toUpperCase()}</p>
          </div>
          
          <p>You can track your order status by visiting your <a href="${process.env.NEXTAUTH_URL}/account/orders" style="color: #4f46e5;">account page</a>.</p>
          
          <p>Thank you for shopping with Cheflinx!</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>&copy; ${new Date().getFullYear()} Cheflinx. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendOrderStatusUpdateEmail(email: string, order: any) {
  const orderUrl = `${process.env.NEXTAUTH_URL}/account/orders/${order._id}`;
  
  // Get status message based on current order status
  let statusMessage = '';
  let statusColor = '#4f46e5'; // Default Cheflinx color
  
  switch (order.status) {
    case 'processing':
      statusMessage = 'Your order is now being processed. We\'ll update you when it ships.';
      statusColor = '#2196F3'; // Blue
      break;
    case 'shipped':
      statusMessage = `Your order has been shipped! ${order.trackingNumber ? `Track your package with tracking number: ${order.trackingNumber}` : ''}`;
      statusColor = '#FF9800'; // Orange
      break;
    case 'delivered':
      statusMessage = 'Your order has been delivered. We hope you enjoy your purchase!';
      statusColor = '#4CAF50'; // Green
      break;
    case 'cancelled':
      statusMessage = 'Your order has been cancelled. If you have any questions, please contact our customer service.';
      statusColor = '#F44336'; // Red
      break;
    default:
      statusMessage = `Your order status has been updated to: ${order.status}`;
  }
  
  const mailOptions = {
    from: `"Cheflinx" <${process.env.EMAIL_FROM || 'noreply@cheflinx.com'}>`,
    to: email,
    subject: `Order #${order.orderNumber} Status Update: ${order.status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #4f46e5;">Cheflinx</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h2>Order Status Update</h2>
          <p>Hi ${order.shippingAddress.fullName},</p>
          <p>Your order #${order.orderNumber} has been updated.</p>
          
          <div style="background-color: ${statusColor}; color: white; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Status: ${order.status.toUpperCase()}</h3>
            <p style="margin-bottom: 0;">${statusMessage}</p>
          </div>
          
          ${order.trackingNumber && order.trackingUrl ? `
          <div style="margin-bottom: 20px;">
            <h3>Tracking Information:</h3>
            <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
            <p><a href="${order.trackingUrl}" style="color: #4f46e5;">Track Your Package</a></p>
          </div>
          ` : ''}
          
          ${order.estimatedDeliveryDate ? `
          <div style="margin-bottom: 20px;">
            <h3>Estimated Delivery:</h3>
            <p>${new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
          ` : ''}
          
          <p>You can view your complete order details by visiting your <a href="${orderUrl}" style="color: #4f46e5;">account page</a>.</p>
          
          <p>Thank you for shopping with Cheflinx!</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>&copy; ${new Date().getFullYear()} Cheflinx. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}