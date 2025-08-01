const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pinCode: { type: String },
    areaName: { type: String, default: null }, // ✅ camelCase (consistent naming)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: false,
    },
  },
  { _id: false }
);

const ruleSchema = new mongoose.Schema(
  {
    title: { type: String, required: false, trim: true },

    isActive: { type: Boolean, default: true },
  },
  { _id: false }
); // No separate ID for each rule unless needed

const propertyDetailSchema = new mongoose.Schema(
  {
    bhk: { type: String, required: false }, // e.g., "3BHK"
    squareFeet: { type: Number, required: false }, // e.g., 1500
    additionalInfo: { type: String, default: null }, // optional notes
  },
  { _id: false }
);

const farmSchema = new mongoose.Schema(
  {
    // 🔑 Basic details
    name: { type: String, trim: true }, // optional
    description: { type: String },

    // 🔗 Farm Category (array but optional)
  farmCategory: { type: mongoose.Schema.Types.ObjectId, ref: "FarmCategory", required: false },


    // 📸 Area-wise Images
    areaImages: [
      {
        areaType: { type: String, trim: true },
        images: [{ type: String }],
      },
    ],

    // 🔗 Rules
    rules: [ruleSchema],

    // 🔗 Property Details
    propertyDetails: propertyDetailSchema,

    address: addressSchema, // ✅ Embedded directly
    bookingModes: {
      type: [String],
      enum: ["full_day", "day_slot", "night_slot"],
      default: ["full_day"],
    },

    // 💰 Pricing
    dailyPricing: [
      {
        date: { type: Date },
        slots: {
          full_day: { type: Number, default: 0 },
          day_slot: { type: Number, default: 0 },
          night_slot: { type: Number, default: 0 },
        },
        checkIn: { type: String, default: "10:00" },
        checkOut: { type: String, default: "18:00" },
      },
    ],

    defaultPricing: {
      full_day: { type: Number },
      day_slot: { type: Number },
      night_slot: { type: Number },
    },

    defaultCheckIn: { type: String, default: "10:00" },
    defaultCheckOut: { type: String, default: "18:00" },

    currency: { type: String, default: "INR" },

    // 📸 General Images
    images: [{ type: String }],

    facilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm_Facility",
      },
    ],

    capacity: { type: Number, required: false }, // ✅ Now optional

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true, // owner should stay required
    },

    unavailableDates: { type: [Date], default: [] },

    // 📊 Status
    isActive: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: true },
    isHold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
