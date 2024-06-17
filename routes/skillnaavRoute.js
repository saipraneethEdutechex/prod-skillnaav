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

// Generalized async handler for routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Server Error", error: err.message });
};

// Get all SkillNaav data
router.get(
  "/get-skillnaav-data",
  asyncHandler(async (req, res) => {
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

    res.status(200).json({
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
  })
);

// Generalized CRUD operations
const createOne = async (model, data) => {
  const instance = new model(data);
  await instance.save();
  return instance;
};

const updateOne = async (model, filter, data) => {
  const instance = await model.findOneAndUpdate(filter, data, { new: true });
  return instance;
};

const deleteOne = async (model, id) => {
  await model.findByIdAndDelete(id);
};

// Routes for specific operations
router.post(
  "/update-discover",
  asyncHandler(async (req, res) => {
    const discover = await updateOne(Discover, { _id: req.body._id }, req.body);
    res
      .status(200)
      .json({
        data: discover,
        success: true,
        message: "Discover updated successfully",
      });
  })
);

router.post(
  "/update-visionheading",
  asyncHandler(async (req, res) => {
    const visionhead = await updateOne(
      VisionHead,
      { _id: req.body._id },
      req.body
    );
    res
      .status(200)
      .json({
        data: visionhead,
        success: true,
        message: "Vision Heading updated successfully",
      });
  })
);

router.post(
  "/add-visionpoint",
  asyncHandler(async (req, res) => {
    const visionpoint = await createOne(VisionPoint, req.body);
    res
      .status(200)
      .json({
        data: visionpoint,
        success: true,
        message: "Vision Point added successfully",
      });
  })
);

router.post(
  "/update-visionpoint",
  asyncHandler(async (req, res) => {
    const visionpoint = await updateOne(
      VisionPoint,
      { _id: req.body._id },
      req.body
    );
    res
      .status(200)
      .json({
        data: visionpoint,
        success: true,
        message: "Vision Point updated successfully",
      });
  })
);

router.delete(
  "/delete-visionpoint/:id",
  asyncHandler(async (req, res) => {
    await deleteOne(VisionPoint, req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Vision Point deleted successfully" });
  })
);

router.post(
  "/update-feature",
  asyncHandler(async (req, res) => {
    const feature = await updateOne(Feature, { _id: req.body._id }, req.body);
    res
      .status(200)
      .json({
        data: feature,
        success: true,
        message: "Feature updated successfully",
      });
  })
);

router.post(
  "/add-feature",
  asyncHandler(async (req, res) => {
    const feature = await createOne(Feature, req.body);
    res
      .status(200)
      .json({
        data: feature,
        success: true,
        message: "Feature added successfully",
      });
  })
);

router.delete(
  "/delete-feature/:id",
  asyncHandler(async (req, res) => {
    await deleteOne(Feature, req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Feature deleted successfully" });
  })
);

router.post(
  "/update-teamheading",
  asyncHandler(async (req, res) => {
    const teamhead = await updateOne(Team, { _id: req.body._id }, req.body);
    res
      .status(200)
      .json({
        data: teamhead,
        success: true,
        message: "Team Heading updated successfully",
      });
  })
);

router.post(
  "/add-teammember",
  asyncHandler(async (req, res) => {
    const teammember = await createOne(TeamMember, req.body);
    res
      .status(200)
      .json({
        data: teammember,
        success: true,
        message: "Team Member added successfully",
      });
  })
);

router.post(
  "/update-teammember",
  asyncHandler(async (req, res) => {
    const teammember = await updateOne(
      TeamMember,
      { _id: req.body._id },
      req.body
    );
    res
      .status(200)
      .json({
        data: teammember,
        success: true,
        message: "Team member updated successfully",
      });
  })
);

router.delete(
  "/delete-teammember/:id",
  asyncHandler(async (req, res) => {
    await deleteOne(TeamMember, req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Team Member deleted successfully" });
  })
);

router.post(
  "/update-priceheading",
  asyncHandler(async (req, res) => {
    const pricing = await updateOne(Pricing, { _id: req.body._id }, req.body);
    res
      .status(200)
      .json({
        data: pricing,
        success: true,
        message: "Price Heading updated successfully",
      });
  })
);

router.post(
  "/add-pricingcard",
  asyncHandler(async (req, res) => {
    const pricingcard = await createOne(PricingCard, req.body);
    res
      .status(200)
      .json({
        data: pricingcard,
        success: true,
        message: "Price Card added successfully",
      });
  })
);

router.post(
  "/update-pricingcard",
  asyncHandler(async (req, res) => {
    const pricingcard = await updateOne(
      PricingCard,
      { _id: req.body._id },
      req.body
    );
    res
      .status(200)
      .json({
        data: pricingcard,
        success: true,
        message: "Pricing Card updated successfully",
      });
  })
);

router.delete(
  "/delete-pricingcard/:id",
  asyncHandler(async (req, res) => {
    await deleteOne(PricingCard, req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Pricing Card deleted successfully" });
  })
);

router.post(
  "/update-faqheading",
  asyncHandler(async (req, res) => {
    const faq = await updateOne(FAQ, { _id: req.body._id }, req.body);
    res
      .status(200)
      .json({
        data: faq,
        success: true,
        message: "FAQ Heading updated successfully",
      });
  })
);

router.post(
  "/add-faqcard",
  asyncHandler(async (req, res) => {
    const faqcard = await createOne(FAQCard, req.body);
    res
      .status(200)
      .json({
        data: faqcard,
        success: true,
        message: "FAQ Card added successfully",
      });
  })
);

router.post(
  "/update-faqcard",
  asyncHandler(async (req, res) => {
    const faqcard = await updateOne(FAQCard, { _id: req.body._id }, req.body);
    res
      .status(200)
      .json({
        data: faqcard,
        success: true,
        message: "FAQ Card updated successfully",
      });
  })
);

router.delete(
  "/delete-faqcard/:id",
  asyncHandler(async (req, res) => {
    await deleteOne(FAQCard, req.params.id);
    res
      .status(200)
      .json({ success: true, message: "FAQ Card deleted successfully" });
  })
);

// Admin login
router.post(
  "/admin-login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      user.password = ""; // Remove password from response
      res
        .status(200)
        .json({ data: user, success: true, message: "Login Successfully" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Invalid username or password" });
    }
  })
);

// Save contact form data
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully!" });
  })
);

// Get all contact form data
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page = 1, pageSize = 10, search = "" } = req.query;
    const skip = (page - 1) * pageSize;
    const query = {
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    };

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(pageSize));
    const totalContacts = await Contact.countDocuments(query);
    res.status(200).json({ contacts, total: totalContacts });
  })
);

// Delete contact form data
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  })
);

// Apply error handling middleware
router.use(errorHandler);

module.exports = router;
