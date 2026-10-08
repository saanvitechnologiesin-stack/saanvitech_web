export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  badge: string;
  color: string;
  iconType: string;
}

export interface MeetPartnersDataType {
  subheading: string;
  heading: string;
  description: string;
  partners: PartnerItem[];
}

export const MeetPartnersData: MeetPartnersDataType = {
  subheading: "Strategic Alliances",
  heading: "Meet Our Trusted Partners",
  description: "Collaborating with global cloud and technology leaders to engineer robust, scalable, and intelligent enterprise solutions.",
  partners: [
    {
      id: "aws",
      name: "Amazon Web Services",
      role: "Cloud Infrastructure",
      badge: "Cloud Partner",
      color: "#FF9900",
      iconType: "aws",
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      role: "Enterprise Cloud",
      badge: "Gold Partner",
      color: "#0078D4",
      iconType: "azure",
    },
    {
      id: "gcp",
      name: "Google Cloud",
      role: "AI & Big Data",
      badge: "Premier Partner",
      color: "#4285F4",
      iconType: "gcp",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      role: "CRM & Cloud",
      badge: "Consulting Partner",
      color: "#00A1E0",
      iconType: "salesforce",
    },
    {
      id: "oracle",
      name: "Oracle Cloud",
      role: "Database & ERP",
      badge: "Alliance Partner",
      color: "#F80000",
      iconType: "oracle",
    },
    {
      id: "ibm",
      name: "IBM Cloud & AI",
      role: "Hybrid Cloud",
      badge: "Ecosystem Partner",
      color: "#054ADA",
      iconType: "ibm",
    },
    {
      id: "cisco",
      name: "Cisco Systems",
      role: "Network & Security",
      badge: "Certified Partner",
      color: "#1BA0D7",
      iconType: "cisco",
    },
    {
      id: "sap",
      name: "SAP",
      role: "Enterprise Solutions",
      badge: "Solution Partner",
      color: "#0FAAFF",
      iconType: "sap",
    },
    {
      id: "redhat",
      name: "Red Hat",
      role: "Open Source & Linux",
      badge: "Advanced Partner",
      color: "#EE0000",
      iconType: "redhat",
    },
    {
      id: "snowflake",
      name: "Snowflake",
      role: "Data Cloud",
      badge: "Data Partner",
      color: "#29B5E8",
      iconType: "snowflake",
    },
    {
      id: "nvidia",
      name: "NVIDIA",
      role: "AI Computing",
      badge: "Inception Partner",
      color: "#76B900",
      iconType: "nvidia",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      role: "Next-Gen Database",
      badge: "Database Partner",
      color: "#00ED64",
      iconType: "mongodb",
    },
  ],
};
