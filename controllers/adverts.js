const AdsSchema = require("../model/adsmodel");
const Adverts = async (req, res) => {
  const productdetails = req.body;

  try {
    const advert = await AdsSchema.create(productdetails);
    if (!advert) {
      res.status(400).json({ err: "unable to add new advert" });
      return;
    }

    res.status(200).json({ msg: "new advert added successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Adverts;
