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

// Error handler function
const handleErrorResponse = (res, error) => {
  console.error("Error:", error);
  res.status(500).send({ success: false, message: "Internal server error" });
};

// GET: Get all SkillNaav data
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

    const [
      discovers,
      visionhead,
      visionpoint,
      features,
      team,
      teammember,
      pricing,
      pricingcard,
      faq,
      faqcard,
      contact,
      footer,
    ] = data;

    res.status(200).send({
      discover: discovers,
      visionhead,
      visionpoint,
      features,
      team,
      teammember,
      pricing,
      pricingcard,
      faq,
      faqcard,
      contact,
      footer,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update discover
router.post("/update-discover", async (req, res) => {
  try {
    const discover = await Discover.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: discover,
      success: true,
      message: "Discover updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Vision Heading
router.post("/update-visionheading", async (req, res) => {
  try {
    const visionhead = await VisionHead.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: visionhead,
      success: true,
      message: "Vision Heading updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Add Vision Point
router.post("/add-visionpoint", async (req, res) => {
  try {
    const visionpoint = new VisionPoint(req.body);
    await visionpoint.save();
    res.status(200).send({
      data: visionpoint,
      success: true,
      message: "Vision Point added successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Vision Point
router.post("/update-visionpoint", async (req, res) => {
  try {
    const visionpoint = await VisionPoint.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: visionpoint,
      success: true,
      message: "Vision Point updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete Vision Point
router.delete("/delete-visionpoint/:id", async (req, res) => {
  try {
    await VisionPoint.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Vision Point deleted successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Feature
router.post("/update-feature", async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: feature,
      success: true,
      message: "Feature updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Add Feature
router.post("/add-feature", async (req, res) => {
  try {
    const feature = new Feature(req.body);
    await feature.save();
    res.status(200).send({
      data: feature,
      success: true,
      message: "Feature added successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete Feature
router.delete("/delete-feature/:id", async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Feature deleted successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Team Heading
router.post("/update-teamheading", async (req, res) => {
  try {
    const teamhead = await Team.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: teamhead,
      success: true,
      message: "Team Heading updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Add Team Member
router.post("/add-teammember", async (req, res) => {
  try {
    const teammember = new TeamMember(req.body);
    await teammember.save();
    res.status(200).send({
      data: teammember,
      success: true,
      message: "Team Member added successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Team Member
router.post("/update-teammember", async (req, res) => {
  try {
    const teammember = await TeamMember.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: teammember,
      success: true,
      message: "Team member updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete Team Member
router.delete("/delete-teammember/:id", async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Team Member deleted successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Price Heading
router.post("/update-priceheading", async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: pricing,
      success: true,
      message: "Price Heading updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Add Pricing Card
router.post("/add-pricingcard", async (req, res) => {
  try {
    const pricingcard = new PricingCard(req.body);
    await pricingcard.save();
    res.status(200).send({
      data: pricingcard,
      success: true,
      message: "Pricing Card added successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update Pricing Card
router.post("/update-pricingcard", async (req, res) => {
  try {
    const pricingcard = await PricingCard.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: pricingcard,
      success: true,
      message: "Pricing Card updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete Pricing Card
router.delete("/delete-pricingcard/:id", async (req, res) => {
  try {
    await PricingCard.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Pricing Card deleted successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update FAQ Heading
router.post("/update-faqheading", async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: faq,
      success: true,
      message: "FAQ Heading updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Add FAQ Card
router.post("/add-faqcard", async (req, res) => {
  try {
    const faqcard = new FAQCard(req.body);
    await faqcard.save();
    res.status(200).send({
      data: faqcard,
      success: true,
      message: "FAQ Card added successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Update FAQ Card
router.post("/update-faqcard", async (req, res) => {
  try {
    const faqcard = await FAQCard.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).send({
      data: faqcard,
      success: true,
      message: "FAQ Card updated successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete FAQ Card
router.delete("/delete-faqcard/:id", async (req, res) => {
  try {
    await FAQCard.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "FAQ Card deleted successfully",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Admin Login
router.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    // Omitting password field from response for security
    const { password: omitPassword, ...userData } = user._doc;
    res.status(200).send({
      data: userData,
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// POST: Save Contact Form Data
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send({ message: "Contact saved successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// GET: Get All Contact Form Data with Pagination and Search
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
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete Contact Form Data
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Contact deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

module.exports = router;
