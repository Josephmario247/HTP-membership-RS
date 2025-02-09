// import express from "express"
// import mongoose from "mongoose"
import fs from "fs"
import Member from "./models/Member.js";
import connectToDatabase from "./db/db.js";

// const app = express();
// const port = 3000;

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/memberDatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Define the schema for the member data
// const memberSchema = new mongoose.Schema({
//   regNo: Number,
//   fullName: String,
//   dob: String,
//   email: String,
//   residential: String,
//   phoneNo: String,
//   occupation: String,
//   officeAddress: String,
//   officePhoneNo: String,
//   cathCommunity: String,
//   homeParish: String,
//   homeAdd: String,
//   gender: String,
//   title: String,
//   maritalStatus: String,
//   stateOrigin: String,
//   baptism: Boolean,
//   confirmation: Boolean,
//   holyEucharist: Boolean,
//   image: String,
//   nextOfKin: {
//     fullName: String,
//     address: String,
//     phoneNo: String,
//     email: String,
//     gender: String,
//     relationship: String,
//   },
// });

// Create a model based on the schema
// const Member = mongoose.model('Member', memberSchema);

// Read the JSON file
const jsonData = fs.readFileSync('csvdata2.json', 'utf8');
const data = JSON.parse(jsonData);

// Function to insert data into MongoDB
async function insertData() {
    connectToDatabase()
  try {
    // Clear existing data (optional)
    // await Member.deleteMany({});

    // Insert new data
    const result = await Member.insertMany(data);
    console.log(`${result.length} documents inserted successfully`);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

insertData();
// Route to trigger data insertion
// app.get('/insert-data', async (req, res) => {
//   await insertData();
//   res.send('Data insertion process started. Check console for results.');
// });

// Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });