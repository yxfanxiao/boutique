import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    id: { type: Schema.ObjectId },
    cate: { type: String },
    title: { type: String },
    price: { type: String },
    desc: { type: String },
    url: { type: String }
});

mongoose.model("Product", ProductSchema);

