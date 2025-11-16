/**
 * Order Confirmation Email Template
 */
const orderConfirmationEmail = (order, user) => {
  const itemsHtml = order.orderItems
    .map(
      item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" 
             style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.name}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        $${item.price.toFixed(2)}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #28a745; margin: 0;">Order Confirmed! 🎉</h1>
          <p style="color: #666; margin-top: 10px;">Thank you for your order, ${user.name}!</p>
        </div>

        <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin-bottom: 30px;">
          <p style="margin: 5px 0; color: #333;"><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
          <p style="margin: 5px 0; color: #333;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p style="margin: 5px 0; color: #333;"><strong>Status:</strong> <span style="color: #007bff; font-weight: bold;">${order.orderStatus}</span></p>
        </div>

        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Order Items</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 10px; text-align: left;">Image</th>
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
              <th style="padding: 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 30px;">
          <h3 style="color: #333; margin-top: 0;">Shipping Address</h3>
          <p style="margin: 5px 0; color: #555;">${order.shippingAddress.fullName}</p>
          <p style="margin: 5px 0; color: #555;">${order.shippingAddress.address}</p>
          <p style="margin: 5px 0; color: #555;">${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
          <p style="margin: 5px 0; color: #555;">${order.shippingAddress.country}</p>
          <p style="margin: 5px 0; color: #555;">📞 ${order.shippingAddress.phone}</p>
        </div>

        <div style="background: #e8f5e9; padding: 20px; border-radius: 5px; margin-bottom: 30px;">
          <h3 style="color: #333; margin-top: 0;">Order Summary</h3>
          <div style="display: flex; justify-content: space-between; margin: 10px 0;">
            <span style="color: #555;">Items Price:</span>
            <span style="color: #333; font-weight: bold;">$${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 10px 0;">
            <span style="color: #555;">Tax:</span>
            <span style="color: #333; font-weight: bold;">$${order.taxPrice.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 10px 0;">
            <span style="color: #555;">Shipping:</span>
            <span style="color: #333; font-weight: bold;">$${order.shippingPrice.toFixed(2)}</span>
          </div>
          <hr style="border: none; border-top: 2px solid #28a745; margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; margin: 10px 0;">
            <span style="color: #333; font-size: 18px; font-weight: bold;">Total:</span>
            <span style="color: #28a745; font-size: 20px; font-weight: bold;">$${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 30px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; color: #856404;">
            <strong>Payment Method:</strong> ${order.paymentMethod}
          </p>
          ${
            order.isPaid
              ? `<p style="margin: 5px 0 0 0; color: #28a745;">✅ <strong>Paid</strong> on ${new Date(order.paidAt).toLocaleDateString()}</p>`
              : `<p style="margin: 5px 0 0 0; color: #dc3545;">⚠️ <strong>Payment Pending</strong></p>`
          }
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.FRONTEND_URL}/orders/${order._id}" 
             style="background-color: #007bff; color: white; padding: 15px 40px; 
                    text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            View Order Details
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 14px;">
            Need help? Contact our support team at support@yourapp.com
          </p>
          <p style="color: #888; font-size: 12px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </div>
  `;
};

/**
 * Order Status Update Email Template
 */
const orderStatusUpdateEmail = (order, user) => {
  let statusColor, statusMessage, statusIcon;

  switch (order.orderStatus) {
    case 'Processing':
      statusColor = '#007bff';
      statusMessage = "We're preparing your order!";
      statusIcon = '📦';
      break;
    case 'Shipped':
      statusColor = '#17a2b8';
      statusMessage = 'Your order is on the way!';
      statusIcon = '🚚';
      break;
    case 'Delivered':
      statusColor = '#28a745';
      statusMessage = 'Your order has been delivered!';
      statusIcon = '✅';
      break;
    case 'Cancelled':
      statusColor = '#dc3545';
      statusMessage = 'Your order has been cancelled';
      statusIcon = '❌';
      break;
    default:
      statusColor = '#6c757d';
      statusMessage = 'Order status updated';
      statusIcon = '📋';
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="font-size: 60px; margin-bottom: 10px;">${statusIcon}</div>
          <h1 style="color: ${statusColor}; margin: 0;">${statusMessage}</h1>
          <p style="color: #666; margin-top: 10px;">Hi ${user.name},</p>
        </div>

        <div style="background: #f0f8ff; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p style="margin: 5px 0; color: #333;"><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
          <p style="margin: 5px 0; color: #333;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p style="margin: 5px 0; color: #333;">
            <strong>Status:</strong> 
            <span style="background: ${statusColor}; color: white; padding: 5px 15px; 
                         border-radius: 20px; font-size: 14px; display: inline-block; margin-top: 5px;">
              ${order.orderStatus}
            </span>
          </p>
        </div>

        ${
          order.orderStatus === 'Shipped'
            ? `
        <div style="background: #e7f3ff; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #007bff;">
          <h3 style="color: #007bff; margin-top: 0;">Tracking Information</h3>
          <p style="color: #555; margin: 10px 0;">
            Your order is being shipped to:
          </p>
          <p style="color: #333; font-weight: bold; margin: 5px 0;">
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
            ${order.shippingAddress.country}
          </p>
        </div>
        `
            : ''
        }

        ${
          order.orderStatus === 'Delivered'
            ? `
        <div style="background: #d4edda; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #28a745;">
          <h3 style="color: #28a745; margin-top: 0;">Delivered Successfully!</h3>
          <p style="color: #155724; margin: 10px 0;">
            Your order was delivered on ${new Date(order.deliveredAt).toLocaleDateString()} at ${new Date(order.deliveredAt).toLocaleTimeString()}.
          </p>
          <p style="color: #155724; margin: 10px 0;">
            We hope you enjoy your purchase! If you have any issues, please contact our support team.
          </p>
        </div>
        `
            : ''
        }

        ${
          order.orderStatus === 'Cancelled'
            ? `
        <div style="background: #f8d7da; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #dc3545;">
          <h3 style="color: #dc3545; margin-top: 0;">Order Cancelled</h3>
          <p style="color: #721c24; margin: 10px 0;">
            Your order has been cancelled. If you didn't request this cancellation, please contact our support team immediately.
          </p>
          <p style="color: #721c24; margin: 10px 0;">
            If payment was made, refund will be processed within 5-7 business days.
          </p>
        </div>
        `
            : ''
        }

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.FRONTEND_URL}/orders/${order._id}" 
             style="background-color: ${statusColor}; color: white; padding: 15px 40px; 
                    text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            View Order Details
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 14px;">
            Questions? Contact us at support@yourapp.com
          </p>
        </div>
      </div>
    </div>
  `;
};

module.exports = {
  orderConfirmationEmail,
  orderStatusUpdateEmail,
};
