export interface TechItem {
  id: string;
  name: string;
  category: 'cloud' | 'ai' | 'web' | 'architecture';
  categoryLabel: string;
  description: string;
  badge?: string;
  color: string;
  iconType: string;
}

export interface TechEcosystemDataType {
  subheading: string;
  heading: string;
  description: string;
  categories: { id: string; label: string }[];
  technologies: TechItem[];
  footerNote: {
    highlight: string;
    text: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export const TechEcosystemData: TechEcosystemDataType = {
  subheading: "Technology Ecosystem",
  heading: "Powering Innovation with Leading Technologies & Platforms",
  description: "We partner with world-class cloud platforms and leverage battle-tested modern frameworks to engineer resilient, high-velocity digital solutions.",
  categories: [
    { id: "all", label: "All Technologies" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ai", label: "AI & Data" },
    { id: "web", label: "Web & Mobile" },
    { id: "architecture", label: "Architecture & Tools" },
  ],
  technologies: [
    {
      id: "aws",
      name: "Amazon Web Services",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Scalable cloud compute, serverless architectures, and multi-region resilience.",
      badge: "Cloud Partner",
      color: "#FF9900",
      iconType: "aws",
    },
    {
      id: "azure",
      name: "Microsoft Azure",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Enterprise hybrid cloud, active directory integration, and Azure AI services.",
      badge: "Enterprise",
      color: "#0078D4",
      iconType: "azure",
    },
    {
      id: "gcp",
      name: "Google Cloud",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "High-performance BigQuery analytics, Kubernetes engine, and machine learning.",
      badge: "Cloud",
      color: "#4285F4",
      iconType: "gcp",
    },
    {
      id: "kubernetes",
      name: "Kubernetes",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Automated container orchestration, autoscaling, and fault-tolerant deployments.",
      badge: "DevOps",
      color: "#326CE5",
      iconType: "kubernetes",
    },
    {
      id: "docker",
      name: "Docker",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Lightweight containerization for reproducible environments and microservices.",
      color: "#2496ED",
      iconType: "docker",
    },
    {
      id: "terraform",
      name: "Terraform",
      category: "cloud",
      categoryLabel: "Cloud & DevOps",
      description: "Infrastructure as Code (IaC) for multi-cloud governance and automation.",
      color: "#844FBA",
      iconType: "terraform",
    },
    {
      id: "python",
      name: "Python",
      category: "ai",
      categoryLabel: "AI & Data",
      description: "Data pipelines, predictive modeling, machine learning algorithms, and backend APIs.",
      badge: "AI Core",
      color: "#3776AB",
      iconType: "python",
    },
    {
      id: "openai",
      name: "OpenAI & LLMs",
      category: "ai",
      categoryLabel: "AI & Data",
      description: "Custom generative AI agents, RAG workflows, and enterprise knowledge embeddings.",
      badge: "GenAI",
      color: "#10A37F",
      iconType: "openai",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "ai",
      categoryLabel: "AI & Data",
      description: "ACID-compliant relational database with pgvector for semantic search & scalability.",
      color: "#4169E1",
      iconType: "postgresql",
    },
    {
      id: "redis",
      name: "Redis",
      category: "ai",
      categoryLabel: "AI & Data",
      description: "In-memory caching, real-time message brokering, and ultra-low latency state.",
      color: "#FF4438",
      iconType: "redis",
    },
    {
      id: "react",
      name: "React.js",
      category: "web",
      categoryLabel: "Web & Mobile",
      description: "Dynamic, reactive frontend user interfaces with modular component architectures.",
      badge: "Frontend",
      color: "#61DAFB",
      iconType: "react",
    },
    {
      id: "nextjs",
      name: "Next.js",
      category: "web",
      categoryLabel: "Web & Mobile",
      description: "Server-side rendering, static site generation, and optimized enterprise web apps.",
      badge: "Full-Stack",
      color: "#000000",
      iconType: "nextjs",
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "web",
      categoryLabel: "Web & Mobile",
      description: "Type-safe JavaScript ensuring clean code maintainability and runtime reliability.",
      color: "#3178C6",
      iconType: "typescript",
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "web",
      categoryLabel: "Web & Mobile",
      description: "Event-driven asynchronous backend runtime for high-concurrency enterprise services.",
      color: "#5FA04E",
      iconType: "nodejs",
    },
    {
      id: "flutter",
      name: "Flutter",
      category: "web",
      categoryLabel: "Web & Mobile",
      description: "Cross-platform native iOS & Android applications from a single unified codebase.",
      badge: "Mobile",
      color: "#02569B",
      iconType: "flutter",
    },
    {
      id: "graphql",
      name: "GraphQL & REST",
      category: "architecture",
      categoryLabel: "Architecture & Tools",
      description: "Flexible API layer delivering exact data payloads with federated microservices.",
      color: "#E10098",
      iconType: "graphql",
    },
  ],
  footerNote: {
    highlight: "Certified Cloud & Modern Stack Experts:",
    text: "Our engineers hold certifications across leading cloud providers and enterprise frameworks.",
    buttonText: "Discuss Your Tech Stack",
    buttonUrl: "/contact-us",
  },
};
