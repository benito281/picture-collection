import { connect } from "mongoose";
import config from "./config.js";

/* Run function */
(async () => {
  try {
    const db = await connect(config.mongoUrl);
    console.log("Database is connected:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
