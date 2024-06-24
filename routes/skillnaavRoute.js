const express = require("express");
const NodeCache = require("node-cache");
const router = express.Router();
const {
  Discover,
  DiscoverCompImg,
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
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // TTL of 10 minutes

// Middleware for handling asynchronous route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Server Error", error: err.message });
};

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

const deleteOneById = async (model, id) => {
  await model.findByIdAndDelete(id);
};

// Route to get all SkillNaav data with caching
router.get(
  "/get-skillnaav-data",
  asyncHandler(async (req, res) => {
    const cacheKey = "skillnaav-data";
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const [
      discovers,
      discovercompimg,
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
    ] = await Promise.all([
      Discover.find(),
      DiscoverCompImg.find(),
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

    const responseData = {
      discover: discovers,
      discovercompimg,
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
    };

    cache.set(cacheKey, responseData);
    res.status(200).json(responseData);
  })
);

// Generalized CRUD routes
const createRoute = (path, model) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(model, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `${model.modelName} added successfully`,
      });
    })
  );
};

const updateRoute = (path, model) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await updateOne(model, { _id: req.body._id }, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `${model.modelName} updated successfully`,
      });
    })
  );
};

const deleteRoute = (path, model) => {
  router.delete(
    path,
    asyncHandler(async (req, res) => {
      await deleteOneById(model, req.params.id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `${model.modelName} deleted successfully`,
      });
    })
  );
};

// Define specific CRUD routes
createRoute("/add-visionpoint", VisionPoint);
updateRoute("/update-visionpoint", VisionPoint);
deleteRoute("/delete-visionpoint/:id", VisionPoint);

createRoute("/add-feature", Feature);
updateRoute("/update-feature", Feature);
deleteRoute("/delete-feature/:id", Feature);

createRoute("/add-teammember", TeamMember);
updateRoute("/update-teammember", TeamMember);
deleteRoute("/delete-teammember/:id", TeamMember);

createRoute("/add-pricingcard", PricingCard);
updateRoute("/update-pricingcard", PricingCard);
deleteRoute("/delete-pricingcard/:id", PricingCard);

createRoute("/add-faqcard", FAQCard);
updateRoute("/update-faqcard", FAQCard);
deleteRoute("/delete-faqcard/:id", FAQCard);

// Additional routes
updateRoute("/update-discover", Discover);
updateRoute("/update-visionheading", VisionHead);
updateRoute("/update-teamheading", Team);
updateRoute("/update-priceheading", Pricing);
updateRoute("/update-faqheading", FAQ);

// Admin login route
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
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  })
);

// Save contact form data route
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    cache.flushAll(); // Clear cache on data mutation
    res.status(201).json({ message: "Contact saved successfully!" });
  })
);

// Get all contact form data route with pagination and search
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

// Delete contact form data route
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    cache.flushAll(); // Clear cache on data mutation
    res.status(200).json({ message: "Contact deleted successfully" });
  })
);

// Apply error handling middleware
router.use(errorHandler);

module.exports = router;

// Update the /update-discover route
router.post(
  "/update-discover",
  asyncHandler(async (req, res) => {
    const {
      _id,
      discoverheading,
      discoversubheading,
      tryforfreebtn,
      viewpricebtn,
      imgUrl,
    } = req.body;
    const updatedDiscover = await Discover.findByIdAndUpdate(
      _id,
      {
        discoverheading,
        discoversubheading,
        tryforfreebtn,
        viewpricebtn,
        imgUrl,
      },
      { new: true }
    );
    cache.flushAll(); // Clear cache on data mutation
    res.status(200).json({
      data: updatedDiscover,
      success: true,
      message: "Discover section updated successfully",
    });
  })
);

router.post(
  "/add-discover-comp-img",
  asyncHandler(async (req, res) => {
    const { imageUrl } = req.body;
    const newImage = await DiscoverCompImg.create({ imageUrl });
    cache.flushAll(); // Clear cache on data mutation
    res.status(200).json({
      data: newImage,
      success: true,
      message: "Company image added successfully",
    });
  })
);

router.post(
  "/update-discover-comp-img/:id",
  asyncHandler(async (req, res) => {
    const { imageUrl } = req.body;
    const updatedImage = await DiscoverCompImg.findByIdAndUpdate(
      req.params.id,
      { imageUrl },
      { new: true }
    );
    cache.flushAll(); // Clear cache on data mutation
    res.status(200).json({
      data: updatedImage,
      success: true,
      message: "Company image updated successfully",
    });
  })
);

router.delete(
  "/delete-discover-comp-img/:id",
  asyncHandler(async (req, res) => {
    await DiscoverCompImg.findByIdAndDelete(req.params.id);
    cache.flushAll(); // Clear cache on data mutation
    res.status(200).json({
      success: true,
      message: "Company image deleted successfully",
    });
  })
);
