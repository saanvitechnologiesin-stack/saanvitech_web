import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Saanvi Technologies",
  description:
    "Explore career opportunities and open roles at Saanvi Technologies. Join our engineering, design, and digital solutions team.",
  openGraph: {
    title: "Careers at Saanvi Technologies",
    description:
      "Explore career opportunities and open roles at Saanvi Technologies. Join our engineering, design, and digital solutions team.",
    url: "https://saanvitechin.com/career",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
