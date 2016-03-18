import mongoose, { Schema } from "mongoose"

const CategorySchema = new Schema({
    id: { type: Schema.ObjectId },
    categoryId: { type: String },
    subCategoryId: { type: Array },
    isNav: { type: Boolean, default: false },
    title: {type: String },
    desc: { type: String }

})

mongoose.model("Category", CategorySchema)