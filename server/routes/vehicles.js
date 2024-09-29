const express = require('express');
const router = express.Router();
const { getFirestoreDb } = require("../firebaseConfig");
const fireStoreDb = getFirestoreDb();
const { doc, setDoc, getDocs, getDoc, collection, query, where, orderBy, limit, deleteDoc } = require("firebase/firestore")

//Get All
router.get('/all-vehicles', async (request, response) => {
  try {
    const vehiclesCollection = collection(fireStoreDb, "vehicles");
    const snapshot = await getDocs(vehiclesCollection);
    const vehicles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (vehicles.length === 0) return response.status(204).json("No vehicles found");
    return response.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching all vehicles:", error);
    throw error;
  }
});

// Get Vehicle By Id
router.get('/single-vehicle/:id', async (request, response) => {
  const vehicleId = request.params.id;
  console.log("request", vehicleId);
  
  try {
    const vehicleDoc = doc(fireStoreDb, "vehicles", vehicleId);
    const snapshot = await getDoc(vehicleDoc);

    if (!snapshot.exists()) {
      return response.status(404).json({ message: "Vehicle not found" });
    }

    const vehicle = {
      id: snapshot.id,
      ...snapshot.data()
    };

    return response.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error
  }
});


//Add a new vehicle
router.post('/new-vehicle', async (request, response) => {
  const vehicleDetails = request.body

  try {
    let vehicleType = vehicleDetails.type.split("_")[0]
    const vehiclesCollection = collection(fireStoreDb, 'vehicles');
    const latestVehicleModelId = query(vehiclesCollection, where('type', '>=', vehicleType),
      where('type', '<', `${vehicleType}_~`),
      orderBy('type', 'desc'), limit(1)
    );

    const snapshot = await getDocs(latestVehicleModelId);

    let newVehicleIdNumber
    if (snapshot.docs[0] == undefined) {
      newVehicleIdNumber = `${vehicleType}_1001`
    } else {
      const vehicle = snapshot.docs[0].id
      let vehicleModelNumber = vehicle.split("_")[1]
      let newVehicleModelIdAsNumber = Number(vehicleModelNumber);
      let newModelNumber = newVehicleModelIdAsNumber + 1 // ++ not working
      newVehicleIdNumber = `${vehicleType}_${String(newModelNumber)}`

    }

    vehicleDetails.id = newVehicleIdNumber
    const vehicleDocument = doc(fireStoreDb, "vehicles", String(newVehicleIdNumber));
    await setDoc(vehicleDocument, vehicleDetails);

    return response.status(200).json({ message: `Vehicle ${newVehicleIdNumber} successfully added`, vehicleDetails: vehicleDetails });
  } catch (error) {
    console.error("Error adding vehicles:", error);
    return response.status(500).json({ message: error.message });
  }
})

router.delete('/remove-vehicle', async (request, response) => {
  const vehicleId = request.body.id
  try {
    const vehicleDoc = doc(fireStoreDb, "vehicles", vehicleId);
    await deleteDoc(vehicleDoc);
    return response.status(200).json({ message: `Vehicle ${vehicleId} successfully deleted`, vehicleId: vehicleId });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return response.status(500).json({ message: error.message });
  }
})

module.exports = router;