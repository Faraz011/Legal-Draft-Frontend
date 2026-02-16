import React from "react";
import { HoverEffect } from "./CardHoverEffect";

const FeatureSection = () => {
  const categories = [
    {
      title: "Property Agreements",
      description:
        "Create property-related agreements, contracts, and deeds securely.",
      link: "/property",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Legal Services
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Professional legal document services tailored to your needs
        </p>
      </div>
      <HoverEffect items={categories} />
    </div>
  );
};

export default FeatureSection;
