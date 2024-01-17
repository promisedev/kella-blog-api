const mongoose = require("mongoose");

const AdsSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    product_tag: { type: String, required: true },
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    affiliate_ref: { type: String, required: true },
    side_hero:{type:Boolean, required:true},
    product_image: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("advert", AdsSchema);
