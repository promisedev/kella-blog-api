const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    blog_title: { type: String, required: true },
    blog_image: { type: Array, required: true, default: [] },
    category: { type: String, required: true },
    tag: { type: String, required: true },
    author: { type: String, required: true },
    comment: { type: Array, default:[] },
    blog_content: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", BlogSchema);
