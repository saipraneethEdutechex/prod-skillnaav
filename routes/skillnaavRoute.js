const router = require("express").Router();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache TTL set to 1 hour (in seconds)

// Import your models and User model
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

// Helper function to handle CRUD operations with caching
const handleCRUDWithCache = (Model, action) => async (req, res) => {
  try {
    let result;
    const cacheKey = `${Model.modelName}_${action}_${
      req.params.id || req.body._id || ""
    }`;

    // Check cache for existing data
    if (action === "getAll") {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return res.status(200).send({
          data: cachedData,
          success: true,
          message: "Data retrieved from cache",
        });
      }
    }

    switch (action) {
      case "getAll":
        result = await Model.find();
        cache.set(cacheKey, result);
        break;
      case "findByIdAndUpdate":
        result = await Model.findByIdAndUpdate(req.body._id, req.body, {
          new: true,
        });
        cache.del(cacheKey); // Invalidate cache on update
        break;
      case "create":
        result = new Model(req.body);
        await result.save();
        cache.del(cacheKey); // Invalidate cache on create
        break;
      case "findByIdAndDelete":
        await Model.findByIdAndDelete(req.params.id);
        cache.del(cacheKey); // Invalidate cache on delete
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

// CRUD routes with caching

// Get all skillnaav data
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
    console.error("Error fetching skillnaav data:", error);
    res.status(500).send({ message: "Error fetching skillnaav data", error });
  }
});

// CRUD routes for Discover model
router.post(
  "/update-discover",
  handleCRUDWithCache(Discover, "findByIdAndUpdate")
);

// CRUD routes for VisionHead model
router.post(
  "/update-visionheading",
  handleCRUDWithCache(VisionHead, "findByIdAndUpdate")
);

// CRUD routes for VisionPoint model
router.post("/add-visionpoint", handleCRUDWithCache(VisionPoint, "create"));
router.post(
  "/update-visionpoint",
  handleCRUDWithCache(VisionPoint, "findByIdAndUpdate")
);
router.delete(
  "/delete-visionpoint/:id",
  handleCRUDWithCache(VisionPoint, "findByIdAndDelete")
);

// CRUD routes for Feature model
router.post(
  "/update-feature",
  handleCRUDWithCache(Feature, "findByIdAndUpdate")
);
router.post("/add-feature", handleCRUDWithCache(Feature, "create"));
router.delete(
  "/delete-feature/:id",
  handleCRUDWithCache(Feature, "findByIdAndDelete")
);

// CRUD routes for Team model
router.post(
  "/update-teamheading",
  handleCRUDWithCache(Team, "findByIdAndUpdate")
);

// CRUD routes for TeamMember model
router.post("/add-teammember", handleCRUDWithCache(TeamMember, "create"));
router.post(
  "/update-teammember",
  handleCRUDWithCache(TeamMember, "findByIdAndUpdate")
);
router.delete(
  "/delete-teammember/:id",
  handleCRUDWithCache(TeamMember, "findByIdAndDelete")
);

// CRUD routes for Pricing model
router.post(
  "/update-priceheading",
  handleCRUDWithCache(Pricing, "findByIdAndUpdate")
);
router.post("/add-pricingcard", handleCRUDWithCache(PricingCard, "create"));
router.post(
  "/update-pricingcard",
  handleCRUDWithCache(PricingCard, "findByIdAndUpdate")
);
router.delete(
  "/delete-pricingcard/:id",
  handleCRUDWithCache(PricingCard, "findByIdAndDelete")
);

// CRUD routes for FAQ model
router.post(
  "/update-faqheading",
  handleCRUDWithCache(FAQ, "findByIdAndUpdate")
);
router.post("/add-faqcard", handleCRUDWithCache(FAQCard, "create"));
router.post(
  "/update-faqcard",
  handleCRUDWithCache(FAQCard, "findByIdAndUpdate")
);
router.delete(
  "/delete-faqcard/:id",
  handleCRUDWithCache(FAQCard, "findByIdAndDelete")
);

// Admin login route
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      user.password = ""; // Remove password for security
      res
        .status(200)
        .send({ data: user, success: true, message: "Login Successfully" });
    } else {
      res
        .status(200)
        .send({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).send({ message: "Error in admin login", error });
  }
});

// Save contact form data route
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    cache.del("contacts"); // Invalidate contacts cache
    res.status(201).send({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error("Error saving contact data:", error);
    res.status(500).send({ message: "Error saving contact data", error });
  }
});

// Get all contact form data route with pagination
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
    // Key for caching this specific query
    const cacheKey = `contacts_${page}_${pageSize}_${search}`;

    let contacts;
    const cachedContacts = cache.get(cacheKey);
    if (cachedContacts) {
      contacts = cachedContacts;
    } else {
      // Fetch contacts with pagination and cache the result
      contacts = await Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(pageSize))
        .lean(); // Convert Mongoose documents to plain objects for better caching

      cache.set(cacheKey, contacts); // Cache the contacts
    }

    const totalContacts = await Contact.countDocuments(query);
    res.status(200).send({ contacts, total: totalContacts });
  } catch (error) {
    console.error("Error fetching contact data:", error);
    res.status(500).send({ message: "Error fetching contact data", error });
  }
});

// Delete contact form data route
router.delete("/:id", handleCRUDWithCache(Contact, "findByIdAndDelete"));

module.exports = router;
