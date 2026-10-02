// Lightweight content/source checks, run in CI via `npm test`.
// No dependencies: reads source files and asserts key facts about content,
// links and copy. Catches regressions like re-interning the current role,
// broken project URLs, or em dashes creeping back into visible copy.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components", "lib", "content"];
const exts = [".ts", ".tsx", ".mdx"];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (exts.some((e) => p.endsWith(e))) yield p;
  }
}

const files = [];
for (const root of roots)
  for (const f of walk(root)) files.push({ path: f, text: readFileSync(f, "utf8") });

const failures = [];
const check = (ok, msg) => {
  if (!ok) failures.push(msg);
};

// 1. Current employment must never read as an internship.
const all = files.map((f) => f.text).join("\n");
check(!/SOC Analyst Intern/i.test(all), "found 'SOC Analyst Intern'");
check(!/intern@cryptogen/i.test(all), "found intern wording for Cryptogen");
const exp = files.find((f) => f.path === join("lib", "data", "experience.ts"));
check(!!exp, "lib/data/experience.ts missing");
check(
  /role:\s*"SOC Analyst",[\s\S]*?organization:\s*"Cryptogen Nepal"/.test(
    exp.text,
  ),
  "current role is not SOC Analyst at Cryptogen Nepal",
);
check(exp.text.includes("current: true"), "no current:true entry in experience");

// 2. No em dashes in visible copy.
for (const f of files)
  check(!f.text.includes("—"), `em dash found in ${f.path}`);

// 3. Project links are absolute https URLs.
const proj = files.find((f) => f.path === join("lib", "data", "projects.ts"));
const urls = [...proj.text.matchAll(/(?:githubUrl|liveUrl):\s*"([^"]+)"/g)];
check(urls.length > 0, "no project URLs found");
for (const [, u] of urls)
  check(/^https:\/\/(github\.com|[\w.-]+\.[a-z]{2,})/.test(u), `bad URL: ${u}`);

// 4. No leftover CyberOps / SC-200 certification copy.
check(!/CyberOps/.test(all), "CyberOps mention found");
check(
  !/SC-?200/.test(all.replace(/githubUrl: "https:\/\/github\.com\/swapnilbrrr\/SC-200-KQL"/g, "")),
  "SC-200 mention found outside the real repo URL",
);

// 5. Site config sanity.
const cfg = files.find((f) => f.path === join("lib", "site-config.ts"));
check(cfg.text.includes("process.env.NEXT_PUBLIC_SITE_URL"), "site URL is not env-switchable");
check(/https:\/\/swapnilkatuwal\.vercel\.app/.test(cfg.text), "default deploy URL missing");

if (failures.length) {
  console.error("content-check FAILED:");
  for (const f of failures) console.error(" - " + f);
  process.exit(1);
}
console.log(`content-check passed (${files.length} files, ${urls.length} project URLs)`);
