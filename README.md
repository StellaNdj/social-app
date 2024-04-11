SOCIAL APP

This project is a social app built using React for the frontend and Node.js with Express for the backend.

INSTALLATION

To install all the required dependencies for the frontend and backend, run:
NPM i

This will install all the necessary packages to ensure smooth running of the application on your local environment.

CONFIGURATION

For testing purposes, a temporary user has been created. Use the following connection string to add to your .env file on your local machine:

NEW_MONGO_URI=mongodb+srv://testingUser:dbdkejrurrnkeu12@socialapp.jeq6gz3.mongodb.net/social_db?retryWrites=true&w=majority&appName=SocialApp

Setting Up the Backend Server

To set up the backend server, make sure to add a PORT variable to your .env file and set it to the desired port. Additionally, change the proxy in the package.json file in the frontend directory to match your localhost port. Ensure that your server is loaded before launching the React App.


RUNNING THE APP

To start the backend server, run the following command:
nodemon

To start the frontend app, run the following command:
cd frontend
NPM start
