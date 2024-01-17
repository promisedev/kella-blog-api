const BlogSchema = require("../model/blogschema");

const Blogs = async (req, res) => {
  const blogdetails = req.body;

  try {
    const slugDup = await BlogSchema.findOne({ slug: blogdetails.slug }).exec();
    if (slugDup) {
      res.status(400).json({ err: "duplicate" });

      return;
    }
    const blog = await BlogSchema.create(blogdetails);
    if (!blog) {
      res.status(400).json({ err: "unable to add new blog" });
      return;
    }
    res.status(200).json({ msg: "new blog added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Blogs;
