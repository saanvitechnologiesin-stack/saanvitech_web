import { PricingProps } from "@/types/pricing";

export const PricingTableData: PricingProps[] = [
  {
    title: "Basic",
    description: "Pricing plan for Digital Transformation",
    price: "$29.00",
    period: "/Monthly",
    features: [
      "Community Support",
      "Dedicated Tech Experts",
      "Unlimited Storage",
      "Custom Domains",
      "24/7 system monitoring",
    ],
    link: "/pricing-plan",
  },
  {
    title: "Standard",
    description: "Pricing plan for Digital Transformation",
    price: "$69.00",
    period: "/Monthly",
    features: [
      "Community Support",
      "Dedicated Tech Experts",
      "Unlimited Storage",
      "Custom Domains",
      "24/7 system monitoring",
    ],
    link: "/pricing-plan",
    active: true,
  },
  {
    title: "Premium",
    description: "Pricing plan for Digital Transformation",
    price: "$119.00",
    period: "/Monthly",
    features: [
      "Community Support",
      "Dedicated Tech Experts",
      "Unlimited Storage",
      "Custom Domains",
      "24/7 system monitoring",
    ],
    link: "/pricing-plan",
  },
];
