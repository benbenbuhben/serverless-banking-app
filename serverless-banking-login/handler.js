'use strict';
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// GetIndex function to serve the index.html file
module.exports.getIndex = async (event) => {
  const filePath = path.join(__dirname, 'static', 'index.html');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
    },
    body: fileContent,
  };
};

// GetWelcome function to serve the welcome.html file
module.exports.getWelcome = async (event) => {
  const filePath = path.join(__dirname, 'static', 'welcome.html');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
    },
    body: fileContent,
  };
};

// ProtectedWelcome function to handle the /welcome API route
module.exports.protectedWelcome = async (event) => {
  const token = event.headers.Authorization;

  if (token) {
    try {
      // Decode the JWT token
      const decoded = jwt.decode(token.replace('Bearer ', ''), { complete: true });
      const userEmail = decoded.payload.email;

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: `Welcome, ${userEmail}!` }),
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return {
        statusCode: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Forbidden: Invalid token provided.' }),
      };
    }
  } else {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Forbidden: No token provided.' }),
    };
  }
};
