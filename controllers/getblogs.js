const BlogSchema = require("../model/blogschema");

const Blog = async (req, res) => {
  try {
    const blogs = await BlogSchema.find();
    if (!blogs) {
      res.status(400).json({ err: "no blogs found" });
      return;
    }
    res.status(200).json({ blogs });
  } catch (error) {}
};

module.exports = Blog;
