import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
    id: { type: Schema.ObjectId },
    name: { type: String },
    pwd: { type: String },
    tel: { type: String },
    contact: { type: Object },
    account: { type: Number, default: 0 },
})

UserSchema.index({ name: 1 }, { unique: true })

mongoose.model("User", UserSchema)

