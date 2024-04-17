# Facebook clone

## Description

Socialapp is an online socialmedia platform where after you make an account you can update your profile and add posts, comments, likes or your friends! It features a backend based on Express framework, frontend is build with React and the database I use is mongoDB. Project also have some ads feature made with SSE, notifications via MQTT and cookies for storing darkmode or lightmode preferences.

# Backend

Backend of application handles:
- Authorization with JSON webtoken and bcrypt.
- Creating new account or logging in to an existing account.
- Creating,deleting or editing posts with description, image (optional), localization (you can create public post or visible only to friends).
- Likeing and disliking posts
- Adding comments under post.
- Edit your profile details
- Deleting your account
- Adding and deleting other users as friends

## File structure
- controllers/: Contains the logic for handling requests and responses.
- middleware/: Contains middleware functions that have access to the request and response objects, and the next middleware function in the application’s request-response cycle.
- models/: Contains the data models for the application, using Mongoose schemas.
- mqtt/: Contains the MQTT server files.
- routes/: Contains the route handlers, which define the endpoints of the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB (and mongoose)
- MQTT
- HiveMQ
- JWT (JSON Web Tokens)
- bcrypt
  
# Frontend

Frontend side of application is build with React and Redux. It provides a platform for users to use the functionalities I described in Backend section.

## File Structure:

- src/ - This is where the main application code resides.
- App.js - The main application component.
- components/ - Contains various reusable components used throughout the application.
- context/ - Contains the application's context providers.
- reducer/ - Contains the Redux reducers.
- scenes/ - Contains the main scenes or pages of the application.

## Technologies Used

- React
- Redux (and Redux persist)
- Tailwind
- Material-UI
- React Router
- Formik and Yup
