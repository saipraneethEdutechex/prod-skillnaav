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
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

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

// Define specific CRUD routes for Discover
const createDiscoverRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(Discover, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `Discover added successfully`,
      });
    })
  );
};

const updateDiscoverRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(
          Discover,
          { _id: id },
          req.body
        );

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `Discover not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `Discover updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating Discover:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const deleteDiscoverRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(Discover, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `Discover deleted successfully`,
      });
    })
  );
};

// Define specific CRUD routes for Discover
createDiscoverRoute("/add-discover");
updateDiscoverRoute("/update-discover");
deleteDiscoverRoute("/delete-discover");

// Define specific CRUD routes for DiscoverCompImg
const createDiscoverCompImgRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(DiscoverCompImg, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `DiscoverCompImg added successfully`,
      });
    })
  );
};

const deleteDiscoverCompImgRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(DiscoverCompImg, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `DiscoverCompImg deleted successfully`,
      });
    })
  );
};

// Define specific CRUD routes for DiscoverCompImg
createDiscoverCompImgRoute("/add-discover-comp-img");
deleteDiscoverCompImgRoute("/delete-discover-comp-img");

// Define specific CRUD routes for Vision Head and Vision Point
const updateVisionHeadRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(
          VisionHead,
          { _id: id },
          req.body
        );

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `VisionHead not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `VisionHead updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating VisionHead:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const createVisionHeadRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(VisionHead, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `VisionHead added successfully`,
      });
    })
  );
};

const deleteVisionHeadRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(VisionHead, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `VisionHead deleted successfully`,
      });
    })
  );
};

createVisionHeadRoute("/add-visionhead");
updateVisionHeadRoute("/update-visionhead");
deleteVisionHeadRoute("/delete-visionhead");

const updateVisionPointRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(
          VisionPoint,
          { _id: id },
          req.body
        );

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `VisionPoint not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `VisionPoint updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating VisionPoint:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const createVisionPointRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(VisionPoint, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `VisionPoint added successfully`,
      });
    })
  );
};

const deleteVisionPointRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(VisionPoint, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `VisionPoint deleted successfully`,
      });
    })
  );
};

createVisionPointRoute("/add-visionpoint");
updateVisionPointRoute("/update-visionpoint");
deleteVisionPointRoute("/delete-visionpoint");

// Define CRUD routes for Feature
const createFeatureRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(Feature, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `Feature added successfully`,
      });
    })
  );
};

const updateFeatureRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(Feature, { _id: id }, req.body);

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `Feature not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `Feature updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating Feature:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const deleteFeatureRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(Feature, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `Feature deleted successfully`,
      });
    })
  );
};

createFeatureRoute("/add-feature");
updateFeatureRoute("/update-feature");
deleteFeatureRoute("/delete-feature");

// Define specific CRUD routes for TeamMember
const createTeamMemberRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(TeamMember, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `TeamMember added successfully`,
      });
    })
  );
};

const updateTeamMemberRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(
          TeamMember,
          { _id: id },
          req.body
        );

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `TeamMember not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `TeamMember updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating TeamMember:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const deleteTeamMemberRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(TeamMember, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `TeamMember deleted successfully`,
      });
    })
  );
};

createTeamMemberRoute("/add-teammember");
updateTeamMemberRoute("/update-teammember");
deleteTeamMemberRoute("/delete-teammember");

// Define specific CRUD routes for Pricing

// Define the route to update the price heading
router.post(
  "/update-priceheading",
  asyncHandler(async (req, res) => {
    const { _id, priceheading } = req.body;

    try {
      const updatedPricing = await Pricing.findByIdAndUpdate(
        _id,
        { priceheading },
        { new: true }
      );

      if (!updatedPricing) {
        return res.status(404).json({
          success: false,
          message: "Pricing not found",
        });
      }

      cache.flushAll(); // Clear cache on data mutation

      res.status(200).json({
        success: true,
        message: "Price heading updated successfully",
        data: updatedPricing,
      });
    } catch (error) {
      console.error("Error updating price heading:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  })
);

const createPricingRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(Pricing, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `Pricing added successfully`,
      });
    })
  );
};

const updatePricingRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(Pricing, { _id: id }, req.body);

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `Pricing not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `Pricing updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating Pricing:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const deletePricingRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(Pricing, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `Pricing deleted successfully`,
      });
    })
  );
};

createPricingRoute("/add-pricing");
updatePricingRoute("/update-pricing");
deletePricingRoute("/delete-pricing");

// Define specific CRUD routes for PricingCard
const createPricingCardRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(PricingCard, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `PricingCard added successfully`,
      });
    })
  );
};

const updatePricingCardRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(
          PricingCard,
          { _id: id },
          req.body
        );

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `PricingCard not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `PricingCard updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating PricingCard:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const deletePricingCardRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(PricingCard, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `PricingCard deleted successfully`,
      });
    })
  );
};

createPricingCardRoute("/add-pricingcard");
updatePricingCardRoute("/update-pricingcard");
deletePricingCardRoute("/delete-pricingcard");
// Define route to update FAQ heading
router.post(
  "/update-faqheading",
  asyncHandler(async (req, res) => {
    const { _id, faqheading } = req.body;

    try {
      const updatedFAQ = await FAQ.findByIdAndUpdate(
        _id,
        { faqheading },
        { new: true }
      );

      if (!updatedFAQ) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found",
        });
      }

      cache.flushAll(); // Clear cache on data mutation

      res.status(200).json({
        success: true,
        message: "FAQ heading updated successfully",
        data: updatedFAQ,
      });
    } catch (error) {
      console.error("Error updating FAQ heading:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  })
);

// Define CRUD routes for FAQs
const createFAQRoute = (path) => {
  router.post(
    path,
    asyncHandler(async (req, res) => {
      const instance = await createOne(FAQ, req.body);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        data: instance,
        success: true,
        message: `FAQ added successfully`,
      });
    })
  );
};

const updateFAQRoute = (path) => {
  router.put(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      try {
        const updatedInstance = await updateOne(FAQ, { _id: id }, req.body);

        if (!updatedInstance) {
          return res.status(404).json({
            success: false,
            message: `FAQ not found`,
          });
        }

        cache.flushAll(); // Clear cache on data mutation

        res.status(200).json({
          success: true,
          message: `FAQ updated successfully`,
          data: updatedInstance,
        });
      } catch (error) {
        console.error(`Error updating FAQ:`, error);
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: error.message,
        });
      }
    })
  );
};

const deleteFAQRoute = (path) => {
  router.delete(
    `${path}/:id`,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      await deleteOneById(FAQ, id);
      cache.flushAll(); // Clear cache on data mutation
      res.status(200).json({
        success: true,
        message: `FAQ deleted successfully`,
      });
    })
  );
};

createFAQRoute("/add-faq");
updateFAQRoute("/update-faq");
deleteFAQRoute("/delete-faq");

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
// POST /api/contact - Create a new contact submission
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact submission:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/contact - Get all contact submissions with pagination and search
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = "",
      sort = "-createdAt",
    } = req.query;
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));
    res.json({ total, contacts });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/contact/:id - Delete a contact submission
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Apply error handling middleware
router.use(errorHandler);

module.exports = router;
