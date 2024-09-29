const express = require('express');
const router = express.Router();
const { getFirestoreDb } = require("../firebaseConfig");
const fireStoreDb = getFirestoreDb();
const { doc, setDoc, getDocs, getDoc, collection, query, orderBy, limit, where } = require("firebase/firestore")

//Get All
router.get('/all-reservations', async (request, response) => {
  try {
    const reservationsCollection = collection(fireStoreDb, "reservations");
    const snapshot = await getDocs(reservationsCollection);
    const reservations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (reservations.length === 0) return response.status(204).json("No Rservations found");
    return response.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    throw error;
  }
});

// Get Reservation By Id
router.get('/single-reservation/:id', async (request, response) => {
  const reservationId = request.params.id;
  try {
    const reservationDoc = doc(fireStoreDb, "reservations", String(reservationId));
    const snapshot = await getDoc(reservationDoc);

    if (!snapshot.exists()) {
      return response.status(404).json({ message: "Reservation not found" });
    }

    const reservation = {
      id: snapshot.id,
      ...snapshot.data()
    };

    return response.status(200).json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return response.status(500).json({ message: error.message});
  }
});

// Reserve a vehicle
router.post('/vehicle-reservation', async (request, response) => {
    const reservation = request.body;
    try {

        // Get latest reservation number
        const reservationCollection = collection(fireStoreDb, "reservations");
        const latestReservation = query(reservationCollection, orderBy('id', 'desc'), limit(1));
        const snapshot = await getDocs(latestReservation);
        const latestRegistration = snapshot.docs[0].id
        let newReservationIdAsNumber = Number(latestRegistration)
        let newReservationId = newReservationIdAsNumber + 1 // ++ not working

        reservation.id = newReservationId;

        const reservationDocument = doc(fireStoreDb, "reservations", String(reservation.id));
        await setDoc(reservationDocument, reservation);

        return response.status(200).json({message: `Vehicle ${reservation.vehicleId} successfully reserved`, reservationDetails: reservation});
    } catch (error) {
        console.error("Error reserving vehicle:", error);
        return response.status(500).json({ message: error.message});
    }
  });

  // Ammend booking
  router.put('/update-vehicle-reservation', async (request, response) => {
    const reservationDetails = request.body;
    try {
      const reservationDoc = doc(fireStoreDb, "reservations", String(reservationDetails.id));
      const snapshot = await getDoc(reservationDoc);

      if (!snapshot.exists()) {
        return response.status(404).json({ message: "Reservation not found" });
      }

      const reservationId = snapshot.id
      const newReservationDetails = {
        ...reservationDetails
      }
      const reservationDocument = doc(fireStoreDb, "reservations", String(reservationId));
      await setDoc(reservationDocument, newReservationDetails);

      return response.status(200).json(newReservationDetails);
    } catch (error) {
      console.error("Error fetching reservation:", error);
      return response.status(500).json({ message: error.message});
    }
  });

  //Get All
router.get('/all-reservations-for-vehicle/:vehicleId', async (request, response) => {
  try {
    const vehicleId = request.params.vehicleId;
    console.log("vehicleId", vehicleId);

    // no need to get older reservations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const reservationsCollection = collection(fireStoreDb, 'reservations');
    const reservations = query(reservationsCollection, where('vehicleId', '==', String(vehicleId),
    where('startDateTime', '>=', todayISO))
    );

    const snapshot = await getDocs(reservations);

    const reservationForVehicle = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return response.status(200).json(reservationForVehicle);
  } catch (error) {
    console.error("Error fetching vehicle reservations:", error);
    throw error;
  }
});

module.exports = router;