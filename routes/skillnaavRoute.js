const router = require("express").Router();
const NodeCache = require("node-cache");
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

// Initialize cache
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Error handler middleware
const handleErrorResponse = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ success: false, message: "Internal server error" });
};

// Cache middleware
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  } else {
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
};

// GET: Get all SkillNaav data
router.get("/get-skillnaav-data", cacheMiddleware, async (req, res) => {
  try {
    const data = await Promise.all([
      Discover.find().lean(),
      VisionHead.find().lean(),
      VisionPoint.find().lean(),
      Feature.find().lean(),
      Team.find().lean(),
      TeamMember.find().lean(),
      Pricing.find().lean(),
      PricingCard.find().lean(),
      FAQ.find().lean(),
      FAQCard.find().lean(),
      Contact.find().lean(),
      Footer.find().lean(),
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

    res.status(200).json({
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

// POST: Update resource by ID
const updateResourceById = async (Model, req, res, successMessage) => {
  try {
    const updatedResource = await Model.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      data: updatedResource,
      success: true,
      message: successMessage,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// POST: Add resource
const addResource = async (Model, req, res, successMessage) => {
  try {
    const newResource = new Model(req.body);
    await newResource.save();
    res.status(200).json({
      data: newResource,
      success: true,
      message: successMessage,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// DELETE: Delete resource by ID
const deleteResourceById = async (Model, req, res, successMessage) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Route definitions for updating and adding resources
router.post("/update-discover", async (req, res) => {
  updateResourceById(Discover, req, res, "Discover updated successfully");
});

router.post("/update-visionheading", async (req, res) => {
  updateResourceById(
    VisionHead,
    req,
    res,
    "Vision Heading updated successfully"
  );
});

router.post("/add-visionpoint", async (req, res) => {
  addResource(VisionPoint, req, res, "Vision Point added successfully");
});

router.post("/update-visionpoint", async (req, res) => {
  updateResourceById(
    VisionPoint,
    req,
    res,
    "Vision Point updated successfully"
  );
});

router.delete("/delete-visionpoint/:id", async (req, res) => {
  deleteResourceById(
    VisionPoint,
    req,
    res,
    "Vision Point deleted successfully"
  );
});

router.post("/update-feature", async (req, res) => {
  updateResourceById(Feature, req, res, "Feature updated successfully");
});

router.post("/add-feature", async (req, res) => {
  addResource(Feature, req, res, "Feature added successfully");
});

router.delete("/delete-feature/:id", async (req, res) => {
  deleteResourceById(Feature, req, res, "Feature deleted successfully");
});

router.post("/update-teamheading", async (req, res) => {
  updateResourceById(Team, req, res, "Team Heading updated successfully");
});

router.post("/add-teammember", async (req, res) => {
  addResource(TeamMember, req, res, "Team Member added successfully");
});

router.post("/update-teammember", async (req, res) => {
  updateResourceById(TeamMember, req, res, "Team member updated successfully");
});

router.delete("/delete-teammember/:id", async (req, res) => {
  deleteResourceById(TeamMember, req, res, "Team Member deleted successfully");
});

router.post("/update-priceheading", async (req, res) => {
  updateResourceById(Pricing, req, res, "Price Heading updated successfully");
});

router.post("/add-pricingcard", async (req, res) => {
  addResource(PricingCard, req, res, "Pricing Card added successfully");
});

router.post("/update-pricingcard", async (req, res) => {
  updateResourceById(
    PricingCard,
    req,
    res,
    "Pricing Card updated successfully"
  );
});

router.delete("/delete-pricingcard/:id", async (req, res) => {
  deleteResourceById(
    PricingCard,
    req,
    res,
    "Pricing Card deleted successfully"
  );
});

router.post("/update-faqheading", async (req, res) => {
  updateResourceById(FAQ, req, res, "FAQ Heading updated successfully");
});

router.post("/add-faqcard", async (req, res) => {
  addResource(FAQCard, req, res, "FAQ Card added successfully");
});

router.post("/update-faqcard", async (req, res) => {
  updateResourceById(FAQCard, req, res, "FAQ Card updated successfully");
});

router.delete("/delete-faqcard/:id", async (req, res) => {
  deleteResourceById(FAQCard, req, res, "FAQ Card deleted successfully");
});

// POST: Admin Login
router.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    // Omitting password field from response for security
    const { password: omitPassword, ...userData } = user._doc;
    res.status(200).json({
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
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// GET: Get All Contact Form Data with Pagination and Search
router.get("/", cacheMiddleware, async (req, res) => {
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
      .limit(parseInt(pageSize))
      .lean();
    const totalContacts = await Contact.countDocuments(query);
    res.status(200).json({ contacts, total: totalContacts });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// DELETE: Delete Contact Form Data
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

module.exports = router;
