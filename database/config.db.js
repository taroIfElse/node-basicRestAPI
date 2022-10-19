const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with db succesfully");
  } catch (err) {
    console.log(err);
    throw new Error("Couldnot connect to database");
  }
};

module.exports = {
  dbConnection,
};
