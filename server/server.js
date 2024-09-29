const express = require('express');
require("dotenv").config();
const cors = require("cors");

const application = express();
const port = process.env.PORT || 3000;

const vehiclesRoutes = require("./routes/vehicles")
const reservationsRoutes = require("./routes/reservations")
const userRoutes = require("./routes/users")

application.use(cors());
application.use(express.json());

// Routes
application.use('/vehicles', vehiclesRoutes);
application.use('/reservations', reservationsRoutes);
application.use('/users', userRoutes);

application.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});