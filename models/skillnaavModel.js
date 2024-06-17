// models/skillnaavModel.js

const mongoose = require("mongoose");

// Schema definitions

const discoverSchema = new mongoose.Schema({
  discoverheading: { type: String, required: true },
  discoversubheading: { type: String, required: true },
  tryforfreebtn: { type: String, required: true },
  viewpricebtn: { type: String, required: true },
});
discoverSchema.index({ discoverheading: 1 });

const visionheadingSchema = new mongoose.Schema({
  visionheading: { type: String, required: true },
  visionsub: { type: String, required: true },
  visionImg: { type: String, required: true },
});
visionheadingSchema.index({ visionheading: 1 });

const visionpointsSchema = new mongoose.Schema({
  visionpoint: { type: String, required: true },
});
visionpointsSchema.index({ visionpoint: 1 });

const featureSchema = new mongoose.Schema({
  feature: { type: String, required: true },
  featuredesc: { type: String, required: true },
  subfeature: { type: String, required: true },
  point1: { type: String, required: true },
  point2: { type: String, required: true },
  point3: { type: String, required: true },
  point4: { type: String, required: true },
  featureImg: { type: String, required: true },
});
featureSchema.index({ feature: 1 });

const teamSchema = new mongoose.Schema({
  teamheading: { type: String, required: true },
  teamsubheading: { type: String, required: true },
});
teamSchema.index({ teamheading: 1 });

const teammembersSchema = new mongoose.Schema({
  image: { type: String, required: true },
  teammemberName: { type: String, required: true },
  teammemberDesgn: { type: String, required: true },
  teammemberDesc: { type: String, required: true },
  teammemberLinkedin: { type: String, required: true },
});
teammembersSchema.index({ teammemberName: 1 });

const pricingSchema = new mongoose.Schema({
  priceheading: { type: String, required: true },
});
pricingSchema.index({ priceheading: 1 });

const pricingcardSchema = new mongoose.Schema({
  plantype: { type: String, required: true },
  plantypesubhead: { type: String, required: true },
  price: { type: String, required: true },
  pricepoint1: { type: String, required: true },
  pricepoint2: { type: String, required: true },
  pricepoint3: { type: String, required: true },
  pricebtn: { type: String, required: true },
  bgcolor: { type: String, required: true },
  color: { type: String, required: true },
});
pricingcardSchema.index({ plantype: 1 });

const faqSchema = new mongoose.Schema({
  faqheading: { type: String, required: true },
  faqsubheading: { type: String, required: true },
});
faqSchema.index({ faqheading: 1 });

const faqcardSchema = new mongoose.Schema({
  faq: { type: String, required: true },
  answer: { type: String, required: true },
});
faqcardSchema.index({ faq: 1 });

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
contactSchema.index({ name: 1 });

const footerSchema = new mongoose.Schema({
  contactdetails: { type: String, required: true },
  email: { type: String, required: true },
  usefullinksheader: { type: String, required: true },
  usefullink1: { type: String, required: true },
  usefullink2: { type: String, required: true },
  usefullink3: { type: String, required: true },
  usefullink4: { type: String, required: true },
  stayinformedheader: { type: String, required: true },
  stayinformedsubtext: { type: String, required: true },
  subscribetext: { type: String, required: true },
  copyrighttext: { type: String, required: true },
  copyrightsubtext: { type: String, required: true },
});
footerSchema.index({ contactdetails: 1 });

// Models initialization

const Discover = mongoose.model("Discover", discoverSchema);
const VisionHead = mongoose.model("VisionHead", visionheadingSchema);
const VisionPoint = mongoose.model("VisionPoint", visionpointsSchema);
const Feature = mongoose.model("Feature", featureSchema);
const Team = mongoose.model("Team", teamSchema);
const TeamMember = mongoose.model("TeamMember", teammembersSchema);
const Pricing = mongoose.model("Pricing", pricingSchema);
const PricingCard = mongoose.model("PricingCard", pricingcardSchema);
const FAQ = mongoose.model("FAQ", faqSchema);
const FAQCard = mongoose.model("FAQCard", faqcardSchema);
const Contact = mongoose.model("Contact", contactSchema);
const Footer = mongoose.model("Footer", footerSchema);

module.exports = {
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
};
