const fs = require('node:fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../modals/tourModal');
// const { ifError } = require('assert');

// Environment variables
dotenv.config({ path: './config.env' });
// console.log(app.get('env')); // Express environment
// console.log(process.env); // Node environment

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// Use command line arguments `node 1-import-dev-data.js --import`
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
// Print the command line arguments
// console.log(process.argv);
