import mongoose, { Schema } from "mongoose"

const OrderSchema = new Schema({
    id: { type: Schema.ObjectId },
    create_at: { type: Date, default: Date.now },
    userName: { type: String },
    contact: { type: Object },
    carts: { type: Array, default: [] },
})

mongoose.model("Order", OrderSchema)