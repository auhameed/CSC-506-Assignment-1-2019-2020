const mongoose = require("mongoose");
const db =
  "mongodb+srv://Siyfa:siyfa@cluster0.nc4rm.mongodb.net/crud?retryWrites=true&w=majority";

module.exports = function () {
  mongoose.connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("MongoAtlas connected as Database is succesful");
      }
    }
  );
};
