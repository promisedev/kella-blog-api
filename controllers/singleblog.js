const BlogSchema = require("../model/blogschema");

const Blog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await BlogSchema.findOne({ _id: id });
    if (!blog) {
      res.status(400).json({ err: "no blog found" });
      return;
    }
    res.status(200).json({ blog });
  } catch (error) {}
};

module.exports = Blog;
