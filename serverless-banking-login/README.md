# Serverless Banking Login Application

This project is a simple serverless banking login application that uses AWS Lambda, API Gateway, and Amazon Cognito to handle user registration, login, and authentication. It is built with Node.js and deployed using the Serverless Framework.

## Features

- **User Registration**: Users can register with their email and password. Upon registration, a confirmation email is sent to the user for verification.
- **User Login**: Registered users can log in using their email and password. After successful login, an authentication token is returned.
- **Welcome Page**: Authenticated users can access a welcome page upon successful login.
- **Serverless Framework**: The application is managed and deployed using the Serverless Framework.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **AWS Account**: You need an AWS account to deploy this application.
- **Serverless Framework**: Install the Serverless Framework globally using npm.

## Setup

1. **Clone the repository**:

   ```
   git clone <repository-url>
   cd serverless-banking-login
   ```

2. **Install dependencies**:

   ```npm install```

3. **Configure AWS credentials**:

   Make sure your AWS credentials are set up. You can configure them using the AWS CLI.

4. **Deploy the application**:

   Deploy the application using the Serverless Framework.

   ```serverless deploy```

   After deployment, the output will include the endpoints for the registration, login, and welcome pages.

## Usage

### Registration

To register a new user, navigate to the `/register.html` endpoint in your browser. Enter your email and password, then check your email for a confirmation link. Confirm your registration to activate your account.

### Login

To log in, navigate to the `/login.html` endpoint and enter your email and password. Upon successful login, you will be redirected to the welcome page.

### Welcome Page

After logging in, you can access the `/welcome.html` endpoint to view the welcome message. This page is protected and requires a valid authentication token.

## Local Development

For local development, you can use the Serverless Framework's local emulation capabilities.

## Conclusion

This project provides a simple, secure login flow using AWS services in a serverless environment. It can be expanded with additional features such as password recovery, multi-factor authentication, and more.
