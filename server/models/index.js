import mongoose from "mongoose";
import config from "../../config";
// import User from "./User";
import Product from "./Product";


mongoose.connect(config.db);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connect to the database: boutique successfully. ");
})


export default combineSchemas({
    Product
});


function combineSchemas(schemas) {
    for (let key in schemas) {
        schemas[key] = mongoose.model(key);
    }
    return schemas;
}