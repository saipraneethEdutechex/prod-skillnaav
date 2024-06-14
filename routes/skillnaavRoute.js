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

// get all SkillNaav data
router.get("/get-skillnaav-data", async (req, res) => {
  try {
    const discovers = await Discover.find();
    const visionhead = await VisionHead.find();
    const visionpoint = await VisionPoint.find();
    const features = await Feature.find();
    const team = await Team.find();
    const teammember = await TeamMember.find();
    const pricing = await Pricing.find();
    const pricingcard = await PricingCard.find();
    const faq = await FAQ.find();
    const faqcard = await FAQCard.find();
    const contact = await Contact.find();
    const footer = await Footer.find();

    res.status(200).send({
      discover: discovers,
      visionhead: visionhead,
      visionpoint: visionpoint,
      features: features,
      team: team,
      teammember: teammember,
      pricing: pricing,
      pricingcard: pricingcard,
      faq: faq,
      faqcard: faqcard,
      contact: contact,
      footer: footer,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update discover
router.post("/update-discover", async (req, res) => {
  try {
    const discover = await Discover.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: discover,
      success: true,
      message: "Discover updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Vision Heading
router.post("/update-visionheading", async (req, res) => {
  try {
    const visionhead = await VisionHead.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: visionhead,
      success: true,
      message: "Vision Heading updated successfully",
    });
  } catch (error) {
    console.error("Error updating Vision Heading:", error);
    res.status(500).send(error);
  }
});

// Add Vision Point
router.post("/add-visionpoint", async (req, res) => {
  try {
    const visionpoint = new VisionPoint(req.body);
    await visionpoint.save();
    res.status(200).send({
      data: visionpoint,
      success: true,
      message: "Feature added successfully",
    });
  } catch (error) {
    console.error("Error adding vision:", error);
    res.status(500).send(error);
  }
});

// Update Vision Point
router.post("/update-visionpoint", async (req, res) => {
  try {
    const visionpoint = await VisionPoint.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: visionpoint,
      success: true,
      message: "Vision Point updated successfully",
    });
  } catch (error) {
    console.error("Error updating vision point:", error);
    res.status(500).send(error);
  }
});

// Delete Vision Point
router.delete("/delete-visionpoint/:id", async (req, res) => {
  try {
    await VisionPoint.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Vision Point deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Feature
router.post("/update-feature", async (req, res) => {
  try {
    const feature = await Feature.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: feature,
      success: true,
      message: "Feature updated successfully",
    });
  } catch (error) {
    console.error("Error updating feature:", error);
    res.status(500).send(error);
  }
});

// Add Feature
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
    console.error("Error adding feature:", error);
    res.status(500).send(error);
  }
});

// Delete Feature
router.delete("/delete-feature/:id", async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Feature deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Team Heading
router.post("/update-teamheading", async (req, res) => {
  try {
    const teamhead = await Team.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: teamhead,
      success: true,
      message: "Team Heading updated successfully",
    });
  } catch (error) {
    console.error("Error updating Team Heading:", error);
    res.status(500).send(error);
  }
});

// Add Team Member
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
    console.error("Error adding team member:", error);
    res.status(500).send(error);
  }
});

// Update Team Member
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
    console.error("Error updating team member:", error);
    res.status(500).send(error);
  }
});

// Delete Team Member
router.delete("/delete-teammember/:id", async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Team Member deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Price Heading
router.post("/update-priceheading", async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: pricing,
      success: true,
      message: "Price Heading updated successfully",
    });
  } catch (error) {
    console.error("Error updating Price Heading:", error);
    res.status(500).send(error);
  }
});

// Add Price Card
router.post("/add-pricingcard", async (req, res) => {
  try {
    const pricingcard = new PricingCard(req.body);
    await pricingcard.save();
    res.status(200).send({
      data: pricingcard,
      success: true,
      message: "Price Card added successfully",
    });
  } catch (error) {
    console.error("Error adding Price Card :", error);
    res.status(500).send(error);
  }
});

// Update Price Card
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
    console.error("Error updating Pricing Card:", error);
    res.status(500).send(error);
  }
});

// Delete Price Card
router.delete("/delete-pricingcard/:id", async (req, res) => {
  try {
    await PricingCard.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Pricing Card deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update FAQ Heading
router.post("/update-faqheading", async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });
    res.status(200).send({
      data: faq,
      success: true,
      message: "FAQ Heading updated successfully",
    });
  } catch (error) {
    console.error("Error updating FAQ Heading:", error);
    res.status(500).send(error);
  }
});

// Add FAQ Card
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
    console.error("Error adding FAQ Card :", error);
    res.status(500).send(error);
  }
});

// Update FAQ Card
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
    console.error("Error updating FAQ Card:", error);
    res.status(500).send(error);
  }
});

// Delete FAQ Card
router.delete("/delete-faqcard/:id", async (req, res) => {
  try {
    await FAQCard.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "FAQ Card deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login Successfully",
      });
    } else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password",
      });
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
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ message: "Error fetching contact data", error });
  }
});

module.exports = router;
