import mongoose from "mongoose";

const uri: string =
  "mongodb+srv://maintoto51:adminisrich@cluster0.lik76rv.mongodb.net/ecom?retryWrites=true&w=majority&appName=Cluster0";

const initializeMongo = () => {
  /** Connect to Mongo */
  mongoose
    .connect(uri, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Mongo connected successfully.");
    })
    .catch((error) => console.log(error));
};

export default initializeMongo;
