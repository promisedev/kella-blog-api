const AdvertSchema = require("../model/adsmodel");

const Advert = async (req, res) => {
  try {
    const adverts = await AdvertSchema.find();
    if (!adverts) {
      res.status(400).json({ err: "no adverts found" });
      return;
    }
    res.status(200).json({ adverts });
  } catch (error) {}
};

module.exports = Advert;
