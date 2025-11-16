const swaggerJsDoc = require('swagger-jsdoc');

/**
 * Swagger Configuration
 * OpenAPI 3.0 Specification
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce REST API',
      version: '1.0.0',
      description:
        'A comprehensive e-commerce REST API with authentication, products, cart, orders, reviews, and email notifications',
      contact: {
        name: 'Amine Kaddouri',
        email: 'kaddouriaminne@gmail.com',
        url: 'https://github.com/Aminekaddouri',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token (get from login/register)',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
            role: {
              type: 'string',
              enum: ['customer', 'admin'],
              example: 'customer',
            },
            avatar: {
              type: 'string',
              example: 'https://via.placeholder.com/150',
            },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              example: 'MacBook Pro',
            },
            description: {
              type: 'string',
              example: 'Powerful laptop for professionals',
            },
            price: {
              type: 'number',
              example: 1999.99,
            },
            category: {
              type: 'string',
              example: 'Laptops',
            },
            stock: {
              type: 'number',
              example: 15,
            },
            ratings: {
              type: 'number',
              example: 4.5,
            },
            numOfReviews: {
              type: 'number',
              example: 23,
            },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    example: 'https://res.cloudinary.com/.../image.jpg',
                  },
                  public_id: {
                    type: 'string',
                    example: 'ecommerce/products/abc123',
                  },
                },
              },
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              example: 5,
            },
            comment: {
              type: 'string',
              example: 'Excellent product!',
            },
            user: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                },
                name: {
                  type: 'string',
                  example: 'John Doe',
                },
                avatar: {
                  type: 'string',
                },
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            orderItems: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                    example: 'MacBook Pro',
                  },
                  quantity: {
                    type: 'number',
                    example: 2,
                  },
                  price: {
                    type: 'number',
                    example: 1999.99,
                  },
                  image: {
                    type: 'string',
                  },
                },
              },
            },
            shippingAddress: {
              type: 'object',
              properties: {
                fullName: {
                  type: 'string',
                  example: 'John Doe',
                },
                address: {
                  type: 'string',
                  example: '123 Main Street',
                },
                city: {
                  type: 'string',
                  example: 'New York',
                },
                postalCode: {
                  type: 'string',
                  example: '10001',
                },
                country: {
                  type: 'string',
                  example: 'USA',
                },
                phone: {
                  type: 'string',
                  example: '+1234567890',
                },
              },
            },
            paymentMethod: {
              type: 'string',
              example: 'Credit Card',
            },
            itemsPrice: {
              type: 'number',
              example: 3999.98,
            },
            taxPrice: {
              type: 'number',
              example: 399.99,
            },
            shippingPrice: {
              type: 'number',
              example: 0,
            },
            totalPrice: {
              type: 'number',
              example: 4399.97,
            },
            orderStatus: {
              type: 'string',
              enum: [
                'Pending',
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled',
              ],
              example: 'Pending',
            },
            isPaid: {
              type: 'boolean',
              example: false,
            },
            isDelivered: {
              type: 'boolean',
              example: false,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message here',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints',
      },
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
      {
        name: 'Reviews',
        description: 'Product review and rating endpoints',
      },
      {
        name: 'Cart',
        description: 'Shopping cart management endpoints',
      },
      {
        name: 'Orders',
        description: 'Order management and tracking endpoints',
      },
      {
        name: 'Upload',
        description: 'Image upload and management endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to route files with JSDoc comments
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
