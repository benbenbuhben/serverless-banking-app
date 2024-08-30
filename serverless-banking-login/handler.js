'use strict';
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

// Register function
module.exports.register = async (event) => {
  const body = JSON.parse(event.body);

  const params = {
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    Username: body.email,
    Password: body.password,
    UserAttributes: [
      {
        Name: 'email',
        Value: body.email,
      },
    ],
  };

  try {
    const data = await cognito.signUp(params).promise();
    console.log('User registered successfully:', data);
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'User registered successfully! Please check your email to confirm your registration.', data }),
    };
  } catch (error) {
    console.error('Error registering user:', error.message);
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error registering user', error: error.message }),
    };
  }
};


// Login function
module.exports.login = async (event) => {
  const body = JSON.parse(event.body);

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: body.email,
      PASSWORD: body.password,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Login successful!', data }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error logging in', error }),
    };
  }
};

// GetIndex function
module.exports.getIndex = async (event) => {
  let filePath;

  switch (event.path) {
    case '/register.html':
      filePath = path.join(__dirname, 'static', 'register.html');
      break;
    case '/login.html':
      filePath = path.join(__dirname, 'static', 'login.html');
      break;
    case '/welcome.html':
      filePath = path.join(__dirname, 'static', 'welcome.html');
      break;
    default:
      filePath = path.join(__dirname, 'static', 'index.html');
  }

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

// GetRegister function
module.exports.getRegister = async (event) => {
  const filePath = path.join(__dirname, 'static', 'register.html');
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

// GetLogin function
module.exports.getLogin = async (event) => {
  const filePath = path.join(__dirname, 'static', 'login.html');
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

// GetWelcome function
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
