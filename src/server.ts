// DDD Domain Driven Design
// kind of business ie Ecom, Banking, Shipping related developement

// == Service1 == //
// User
// Customer -- Profile

// == Service2 == //
// Product/ catalog -- info about product -- id, title, description
//  |
//   -- categories
//   -- inventory --can be further broken to microservices
//   -- price --can be further broken to microservices

// ==Service3 == //
// Order
// Order Item -- Order Product

// ==Service4==
// Payment
// Payment -- Transaction
// Payment -- Shipping

// Express App => POST/ product => Service => Repository

import expressApp from "./expressApp";
import initializeMongo from "./db";

const PORT = process.env.PORT || 3001;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log("Application running on PORT: ", PORT);
  });
};

initializeMongo();
StartServer();
