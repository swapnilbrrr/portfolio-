import type { Project } from "@/lib/types";

/*
 * Every claim here is sourced from the repository itself, the CV, or the
 * previous portfolio. Excluded on purpose: Honeypot, DODC, Security Baseline
 * Analyzer (retired) and KaliWall (a fork, not original work).
 */
export const projects: Project[] = [
  {
    id: "code-room",
    slug: "code-room",
    title: "Code-Room",
    summary:
      "A technology learning platform where students browse courses, take lessons and quizzes, and track progress, with a full administration area for content.",
    year: 2026,
    status: "active",
    featured: true,
    category: "engineering",
    technologies: [
      "C#",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "MySQL",
      "JavaScript",
    ],
    githubUrl: "https://github.com/swapnilbrrr/Code-Room",
    context:
      "A web-applications course project that grew into a real platform: I wanted to see how authentication, relational data and content management fit together in a server-rendered stack.",
    problem:
      "Structured technology learning needs more than videos: enrolment, lesson completion, scored quizzes and content administration all have to work together.",
    architecture:
      "ASP.NET Core MVC on .NET 8 with Entity Framework Core over MySQL. Courses, lessons, resources, quizzes, enrolments and progress are modelled as relational entities; a separate admin area performs controlled CRUD over the content modules.",
    implementation: [
      "Course browsing with search and filtering",
      "Enrolment with lesson completion and progress tracking",
      "Quizzes with scored attempts",
      "Student dashboard and announcements",
      "Admin CRUD for courses, lessons, resources and quizzes",
      "Form validation on both client and server",
    ],
    currentState:
      "Actively developed; a companion variant (Code-Room-ADO) re-implements the data layer with ADO.NET and SQL Server LocalDB to compare approaches.",
    tags: ["full-stack", "web platform"],
    preview: {
      file: "CodeRoom.Web/Models/Enrollment.cs",
      lang: "csharp",
      code: `public class Enrollment
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CourseId { get; set; }
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Course Course { get; set; } = null!;
}`,
      caption:
        "Enrollment entity, the join between a student and a course. Verbatim from the repository.",
    },
  },
  {
    id: "phishscan",
    slug: "phishscan",
    title: "PhishScan",
    summary:
      "A local-first phishing email analyzer: paste raw headers, get SPF/DKIM/DMARC verdicts, spoofing signals and reputation lookups, without sending the email anywhere.",
    year: 2026,
    status: "active",
    featured: true,
    category: "security",
    technologies: ["JavaScript", "Node.js", "AbuseIPDB API", "VirusTotal"],
    githubUrl: "https://github.com/swapnilbrrr/Phishing-Email-Analyzer",
    context:
      "Email is still the highest-volume attack vector, and header triage is a core SOC task. I built the tool I wanted while learning alert analysis.",
    problem:
      "Judging a suspicious email means reading authentication results, received chains and URLs. It is tedious and error-prone by hand, and most online analyzers submit your data to a third party.",
    architecture:
      "Parsing and scoring run entirely in the browser on the pasted headers. Only reputation queries leave the machine, and they go through a small Node.js proxy so provider API keys are never exposed to the client.",
    implementation: [
      "Real-time parsing of raw email headers",
      "SPF, DKIM and DMARC signal scoring",
      "Typosquatting and display-name spoof checks",
      "URL extraction with VirusTotal quick links",
      "AbuseIPDB reputation checks via backend proxy",
      "Secret config kept out of the frontend (env var or gitignored local file)",
    ],
    securityConcepts: [
      "Email authentication (SPF / DKIM / DMARC)",
      "Header chain analysis",
      "Typosquatting and display-name spoofing",
      "API-key handling: server-side proxy pattern",
    ],
    currentState:
      "Functional analyzer, iterated locally with real phishing samples.",
    tags: ["email security", "soc tooling"],
    preview: {
      file: "public/app.js",
      lang: "javascript",
      code: `// SPF verdict scoring (trimmed)
if (auth.spf === 'pass')
  { authPct += 34; }
else if (auth.spf === 'fail')
  { if (!isTrusted) score += 15; }
else if (auth.spf === 'softfail')
  { if (!isTrusted) score += 8; }`,
      caption:
        "Authentication verdicts feed a weighted score; trusted senders are discounted. Verbatim from the repository.",
    },
  },
  {
    id: "sentinel-kql",
    slug: "sentinel-kql",
    title: "Sentinel KQL Library",
    summary:
      "A growing library of Kusto Queries for Microsoft Sentinel and Defender XDR: aggregations, cross-table joins and JSON extraction, written as working reference for detection tasks.",
    year: 2026,
    status: "in-progress",
    featured: true,
    category: "security",
    technologies: ["KQL", "Microsoft Sentinel", "Defender XDR"],
    githubUrl: "https://github.com/swapnilbrrr/SC-200-KQL",
    context:
      "Detection engineering is a language problem as much as a security problem. I kept my query notes scattered, so I turned them into a version-controlled reference.",
    problem:
      "KQL is the working language of Microsoft's security stack; recalling query shapes under time pressure is hard without a tested, annotated reference.",
    architecture:
      "A curated repository organised around the Microsoft security stack: Defender XDR investigation, Sentinel analytics rules and Defender for Cloud. Each query is broken down with comments on what it detects and why it is written that way.",
    implementation: [
      "KQL cheat sheet of highly testable, practical queries",
      "Query breakdowns for aggregations, joins and JSON extraction",
      "Coverage that grows one detection area at a time",
    ],
    securityConcepts: [
      "Threat hunting queries",
      "Detection rules",
      "Incident investigation datasets",
    ],
    currentState: "Ongoing, expanding one detection area at a time.",
    tags: ["detection engineering", "study"],
    preview: {
      file: "KQL-CheatSheet.md",
      lang: "kusto",
      code: `SigninLogs
| where TimeGenerated > ago(1h)
| where ResultType == "50126" // invalid username/password
| summarize FailedLogons = count() by IPAddress, UserPrincipalName
| where FailedLogons >= 5`,
      caption:
        "Brute-force threshold rule: five failed logons from one identity inside an hour. Verbatim from the repository.",
    },
  },
  {
    id: "portscan-detector",
    slug: "portscan-detector",
    title: "Port Scan Detector",
    summary:
      "A modular Python scanner built to understand reconnaissance at the packet level: multi-threaded probing with banner grabbing and forensic, timestamped logs.",
    year: 2025,
    status: "active",
    featured: false,
    category: "security",
    technologies: ["Python", "Socket programming", "Threading"],
    githubUrl: "https://github.com/swapnilbrrr/PortScan-Detector",
    context:
      "Built as a defensive-security exercise: to detect scanning, you have to understand how it works.",
    problem:
      "Simulate the reconnaissance phase of an attack and study TCP/IP handshakes (SYN / SYN-ACK / RST) at a level abstraction hides.",
    implementation: [
      "Multi-threaded scanning for concurrent coverage",
      "Banner grabbing to fingerprint services",
      "Timestamped audit trail for post-scan analysis",
    ],
    securityConcepts: [
      "TCP handshake states",
      "Service fingerprinting",
      "Reconnaissance tradecraft",
    ],
    tags: ["networking", "python"],
  },
  {
    id: "packet-capture-analyzer",
    slug: "packet-capture-analyzer",
    title: "Packet Capture Analyzer",
    summary:
      "Python analysis of .pcap captures, extracting traffic structure and flagging suspicious patterns for threat analysis.",
    year: 2025,
    status: "active",
    featured: false,
    category: "security",
    technologies: ["Python", "Scapy", "Pandas"],
    githubUrl: "https://github.com/swapnilbrrr/Packet-Capture-Analyzer",
    context:
      "Traffic analysis is the ground truth of network defense; this tool turns raw captures into reviewable summaries.",
    implementation: [
      "Parse .pcap files with Scapy",
      "Summarize conversations and protocols",
      "Identify patterns worth deeper investigation with Pandas frames",
    ],
    securityConcepts: ["Network traffic analysis", "Protocol behavior"],
    tags: ["networking", "python"],
  },
  {
    id: "password-strength-checker",
    slug: "password-strength-checker",
    title: "Password Strength Checker",
    summary:
      "A browser security dashboard validating passwords against configurable NIST-aligned policies, with a high-entropy generator built on window.crypto.",
    year: 2025,
    status: "active",
    featured: false,
    category: "security",
    technologies: ["JavaScript", "Web Crypto", "NIST guidelines"],
    githubUrl: "https://github.com/swapnilbrrr/password-strength-checker",
    context:
      "An early exercise in turning credential-hygiene guidance into working rules.",
    implementation: [
      "Rule-based policy validation, including sequential-character patterns",
      "Secure generator using window.crypto for high-entropy randomness",
      "Attempt analytics resembling SOC-style monitoring of hygiene",
    ],
    securityConcepts: ["NIST password guidance", "Entropy and CSPRNG use"],
    tags: ["web", "security logic"],
  },
  {
    id: "hall-booking-system",
    slug: "hall-booking-system",
    title: "Hall Booking System",
    summary:
      "A Java hall-booking application built as a software engineering coursework project.",
    year: 2026,
    status: "active",
    featured: false,
    category: "engineering",
    technologies: ["Java"],
    githubUrl: "https://github.com/swapnilbrrr/HallBookingSystem",
    tags: ["java", "coursework"],
  },
  {
    id: "laundry-simulation",
    slug: "laundry-simulation",
    title: "Laundry Concurrency Simulation",
    summary:
      "A Java simulation of laundry operations modelling concurrent processes, coursework on threads and shared resources.",
    year: 2026,
    status: "active",
    featured: false,
    category: "engineering",
    technologies: ["Java", "Concurrency"],
    githubUrl: "https://github.com/swapnilbrrr/laundry-simulation",
    tags: ["java", "coursework"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
