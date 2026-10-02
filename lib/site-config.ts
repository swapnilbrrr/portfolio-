const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://swapnilkatuwal.vercel.app";

export const siteConfig = {
  name: "Swapnil Katuwal",
  title: "Swapnil Katuwal | Security Engineer & Builder",
  tagline: "Security Engineer & Builder",
  description:
    "Portfolio of Swapnil Katuwal, a security-focused engineer based in Kathmandu, Nepal. SOC operations, network tooling, detection engineering, and full-stack builds.",
  url: SITE_URL,
  locale: "en",
  location: "Kathmandu, Nepal",
  timezone: "UTC+05:45",
  email: "swapnilkatuwal@gmail.com",
  role: "SOC Analyst at Cryptogen Nepal",
  resumeUrl: "/resume/Swapnil_Katuwal_CV.pdf",
  links: {
    github: "https://github.com/swapnilbrrr",
    linkedin: "https://www.linkedin.com/in/swapnil-katuwal-bb7529309",
  },
} as const;

export type NavItem = { title: string; href: string; external?: boolean };

export const mainNav: NavItem[] = [
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Writing", href: "/writing" },
  { title: "Contact", href: "/#contact" },
];
