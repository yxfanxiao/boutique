import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
    id: { type: Schema.ObjectId },
    spuId: { type: String },
    categoryId: { type: String },       // 细分类目
    navId: { type: String },
    src: { type: Array },               // 缩略图
    detailHtml: { type: String },       // detail html
    name: { type: String },
    desc: { type: String },
    attributes: { type: Array },        // [{ attrName, attrValue }]
    skuList: { type: Object },
    skuMap: { type: Object },
    skuSpecList: { type: Array}
})

mongoose.model("Product", ProductSchema)

