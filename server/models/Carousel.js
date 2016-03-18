import mongoose, { Schema } from "mongoose"

const CarouselSchema = new Schema({
    id: { type: Schema.ObjectId },
    rank: { type: Number, default: 0 },             // rank越高，越靠前 
    display: { type: Boolean, default: true }, 
    src: { type: String },
    spuId: { type: String }  
})

CarouselSchema.index({ rank: -1 })

mongoose.model("Carousel", CarouselSchema)