import type {
  CapabilityGroup,
  Certification,
  ExperienceEntry,
} from "@/lib/types";

export const experience: ExperienceEntry[] = [
  {
    id: "cryptogen",
    role: "SOC Analyst",
    organization: "Cryptogen Nepal",
    location: "Kathmandu",
    period: "Present",
    current: true,
    bullets: [
      "Monitor and triage security alerts within SOC operations workflows, supporting escalation decisions.",
      "Review SIEM logs to identify suspicious activity and separate true positives from noise.",
      "Document incidents and maintain case records to keep response consistent and reportable.",
    ],
  },
  {
    id: "midas",
    role: "Quality Assurance Intern",
    organization: "Midas Health Services Pvt. Ltd.",
    location: "Kathmandu",
    period: "Feb 2025 - May 2025",
    bullets: [
      "Executed multi-step test procedures with the precision log analysis and anomaly detection demand.",
      "Identified, analyzed and prioritized defects through a structured workflow close to incident ticketing.",
      "Wrote reproducible technical documentation and coordinated fixes with developers.",
    ],
  },
];

export const education = {
  degree: "BSc. IT, Network & Security focus",
  institution: "Lord Buddha Educational Foundation",
  location: "Kathmandu",
  period: "Nov 2024 - Present",
};

export const capabilities: CapabilityGroup[] = [
  {
    id: "security",
    title: "Security",
    note: "What I do daily",
    items: [
      "Alert triage & SOC workflows",
      "SIEM log analysis (Wazuh)",
      "Network traffic analysis (Wireshark)",
      "Threat intelligence basics",
      "MITRE ATT&CK mapping",
      "Detection queries (KQL)",
      "Email authentication (SPF/DKIM/DMARC)",
    ],
  },
  {
    id: "systems",
    title: "Systems",
    note: "What I run on",
    items: [
      "Linux (Kali, CLI administration)",
      "Windows security",
      "TCP/IP, DNS, HTTP/HTTPS, SSH, RDP",
      "Virtualization (VMware, VirtualBox)",
      "Red Hat RH124 system administration",
    ],
  },
  {
    id: "development",
    title: "Development",
    note: "How I build",
    items: [
      "Python (sockets, automation, Scapy)",
      "JavaScript / Node.js",
      "C# / ASP.NET Core",
      "Java",
      "Shell scripting",
      "Git",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    note: "What's on the bench",
    items: [
      "Wazuh",
      "Wireshark",
      "Burp Suite",
      "Nmap",
      "Postman",
      "Microsoft Sentinel (studying)",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "rh124",
    name: "Red Hat System Administration I (RH124-10.0)",
    issuer: "Red Hat",
    status: "completed",
  },
  {
    id: "soc-practice",
    name: "Security Operations Center in Practice",
    date: "Mar 2026",
    status: "completed",
  },
  {
    id: "ti-hunting",
    name: "Getting Started with Threat Intelligence and Hunting",
    issuer: "IBM SkillsBuild",
    status: "completed",
  },
  {
    id: "intro-cyber",
    name: "Introduction to Cybersecurity",
    issuer: "Cisco NetAcad",
    date: "2025",
    status: "completed",
  },
  {
    id: "letsdefend",
    name: "SOC Beginner Path",
    issuer: "LetsDefend",
    date: "2025",
    status: "completed",
  },
];
