const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// var admin = require("firebase-admin");

var serviceAccount = require("../drive-inc-challenge-firebase-adminsdk-g8nr8-dbf0fedaf3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://drive-inc-challenge-default-rtdb.europe-west1.firebasedatabase.app"
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// Middleware to parse JSON requests
router.use(bodyParser.json());

router.post('/create-user', async (request, response) => {
    const { email, password, isAdmin } = request.body;
  
    try {
      // Create a new user
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
        isAdmin: isAdmin
      });
      
      response.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
      console.error('Error creating new user:', error);
      response.status(400).json({ error: error.message });
    }
  });

// Login route
router.post('/login', async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(user.uid);
    console.log("token", token);
    response.status(200).json({ token: token, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    response.status(401).json({ error: 'Invalid credentials or user does not exist.' });
  }
});




module.exports = router;