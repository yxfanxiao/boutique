import mongoose, { Schema } from "mongoose"

const CartSchema = new Schema({
    id: { type: Schema.ObjectId },
    userName: { type: String },
    create_at: { type: Date, default: Date.now },
    spuId: { type: String },
    skuId: { type: String },
    title: { type: String },
    pic: { type: String },
    para: { type: Array },
    quantity: { type: String },
    retailPrice: { type: Number }
})

CartSchema.index({ create_at: -1 })

mongoose.model("Cart", CartSchema)