const router = require("express").Router();
const {
  Discover,
  VisionHead,
  VisionPoint,
  Feature,
  Team,
  TeamMember,
  Pricing,
  PricingCard,
  FAQ,
  FAQCard,
  Contact,
  Footer,
} = require("../models/skillnaavModel");

const User = require("../models/userModel");

// Helper function to handle CRUD operations
const handleCRUD = (Model, action) => async (req, res) => {
  try {
    let result;
    switch (action) {
      case "getAll":
        result = await Model.find();
        break;
      case "findByIdAndUpdate":
        result = await Model.findByIdAndUpdate(req.body._id, req.body, {
          new: true,
        });
        break;
      case "create":
        result = new Model(req.body);
        await result.save();
        break;
      case "findByIdAndDelete":
        await Model.findByIdAndDelete(req.params.id);
        result = {
          success: true,
          message: `${Model.modelName} deleted successfully`,
        };
        break;
      default:
        return res.status(400).send({ message: "Invalid action" });
    }
    res.status(200).send({ data: result, success: true });
  } catch (error) {
    console.error(`Error with ${Model.modelName} ${action}:`, error);
    res
      .status(500)
      .send({ message: `Error with ${Model.modelName} ${action}`, error });
  }
};

// Get all SkillNaav data
router.get("/get-skillnaav-data", async (req, res) => {
  try {
    const data = await Promise.all([
      Discover.find(),
      VisionHead.find(),
      VisionPoint.find(),
      Feature.find(),
      Team.find(),
      TeamMember.find(),
      Pricing.find(),
      PricingCard.find(),
      FAQ.find(),
      FAQCard.find(),
      Contact.find(),
      Footer.find(),
    ]);

    res.status(200).send({
      discover: data[0],
      visionhead: data[1],
      visionpoint: data[2],
      features: data[3],
      team: data[4],
      teammember: data[5],
      pricing: data[6],
      pricingcard: data[7],
      faq: data[8],
      faqcard: data[9],
      contact: data[10],
      footer: data[11],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// CRUD routes
router.post("/update-discover", handleCRUD(Discover, "findByIdAndUpdate"));
router.post(
  "/update-visionheading",
  handleCRUD(VisionHead, "findByIdAndUpdate")
);
router.post("/add-visionpoint", handleCRUD(VisionPoint, "create"));
router.post(
  "/update-visionpoint",
  handleCRUD(VisionPoint, "findByIdAndUpdate")
);
router.delete(
  "/delete-visionpoint/:id",
  handleCRUD(VisionPoint, "findByIdAndDelete")
);
router.post("/update-feature", handleCRUD(Feature, "findByIdAndUpdate"));
router.post("/add-feature", handleCRUD(Feature, "create"));
router.delete("/delete-feature/:id", handleCRUD(Feature, "findByIdAndDelete"));
router.post("/update-teamheading", handleCRUD(Team, "findByIdAndUpdate"));
router.post("/add-teammember", handleCRUD(TeamMember, "create"));
router.post("/update-teammember", handleCRUD(TeamMember, "findByIdAndUpdate"));
router.delete(
  "/delete-teammember/:id",
  handleCRUD(TeamMember, "findByIdAndDelete")
);
router.post("/update-priceheading", handleCRUD(Pricing, "findByIdAndUpdate"));
router.post("/add-pricingcard", handleCRUD(PricingCard, "create"));
router.post(
  "/update-pricingcard",
  handleCRUD(PricingCard, "findByIdAndUpdate")
);
router.delete(
  "/delete-pricingcard/:id",
  handleCRUD(PricingCard, "findByIdAndDelete")
);
router.post("/update-faqheading", handleCRUD(FAQ, "findByIdAndUpdate"));
router.post("/add-faqcard", handleCRUD(FAQCard, "create"));
router.post("/update-faqcard", handleCRUD(FAQCard, "findByIdAndUpdate"));
router.delete("/delete-faqcard/:id", handleCRUD(FAQCard, "findByIdAndDelete"));

// Admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      user.password = "";
      res
        .status(200)
        .send({ data: user, success: true, message: "Login Successfully" });
    } else {
      res
        .status(200)
        .send({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Save contact form data
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send({ message: "Contact saved successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error saving contact data", error });
  }
});

// Get all contact form data
router.get("/", async (req, res) => {
  const { page = 1, pageSize = 10, search = "" } = req.query;
  const skip = (page - 1) * pageSize;
  const query = {
    $or: [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
    ],
  };

  try {
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(pageSize));
    const totalContacts = await Contact.countDocuments(query);
    res.status(200).send({ contacts, total: totalContacts });
  } catch (error) {
    res.status(500).send({ message: "Error fetching contact data", error });
  }
});

router.delete("/:id", handleCRUD(Contact, "findByIdAndDelete"));

module.exports = router;
