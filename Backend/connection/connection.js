const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("Connected Database");
  } catch (error) {
    console.log(error);
  }
};

connect();
