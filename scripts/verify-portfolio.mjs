#!/usr/bin/env node

/**
 * Portfolio E2E Verification Test Harness
 * =======================================
 * Standalone verification script implementing all acceptance criteria from:
 * - ORIGINAL_REQUEST.md
 * - PROJECT.md (§ Interface Contracts, § Feature Inventory)
 * - TEST_INFRA.md
 * - DISPATCH.md
 * 
 * ZERO RUNTIME DEPENDENCIES:
 * Uses strictly node built-in modules (node:fs, node:path, node:child_process, node:process, node:url).
 * 
 * Four Core Verification Checkpoints:
 * 1. Check 1 (Negative / Blacklist): Confirms all fake/placeholder data strings are eliminated from src/.
 * 2. Check 2 (Positive / Whitelist): Confirms real profile credentials & LinkedIn items exist in src/.
 * 3. Check 3 (All 12 Certifications): Confirms certifications.ts defines all 12 credentials, unique URL-safe slugs,
 *    and valid schema fields.
 * 4. Check 4 (Build & Prerender): Executes Next.js production build (exit code 0) and verifies static prerendering
 *    of all certification routes in .next/prerender-manifest.json.
 * 
 * Usage:
 *   node scripts/verify-portfolio.mjs               # Run all 4 checks (default)
 *   node scripts/verify-portfolio.mjs --skip-build   # Run Checks 1-3 only (fast scan)
 *   node scripts/verify-portfolio.mjs --build-only   # Run Check 4 only
 *   npm run verify                                  # Via package.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// 1. Path & Environment Resolution
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolvePortfolioRoot() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'package.json'))) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
      if (pkg.name === 'nextn' || fs.existsSync(path.join(cwd, 'src', 'data', 'certifications.ts'))) {
        return cwd;
      }
    } catch {
      // ignore
    }
  }
  const childPortfolio = path.join(cwd, 'Portfolio');
  if (fs.existsSync(childPortfolio) && fs.existsSync(path.join(childPortfolio, 'package.json'))) {
    return childPortfolio;
  }
  return path.resolve(__dirname, '..');
}

const PORTFOLIO_ROOT = resolvePortfolioRoot();
const SRC_DIR = path.join(PORTFOLIO_ROOT, 'src');
const CERT_FILE = path.join(SRC_DIR, 'data', 'certifications.ts');

const args = process.argv.slice(2);
const SKIP_BUILD = args.includes('--skip-build') || args.includes('--no-build');
const BUILD_ONLY = args.includes('--build-only');
const VERBOSE = args.includes('--verbose') || args.includes('-v');

// Color formatting
const useColor = !args.includes('--no-color') && process.stdout.isTTY !== false;
const c = {
  reset: useColor ? '\x1b[0m' : '',
  bold: useColor ? '\x1b[1m' : '',
  dim: useColor ? '\x1b[2m' : '',
  red: useColor ? '\x1b[31m' : '',
  green: useColor ? '\x1b[32m' : '',
  yellow: useColor ? '\x1b[33m' : '',
  blue: useColor ? '\x1b[34m' : '',
  magenta: useColor ? '\x1b[35m' : '',
  cyan: useColor ? '\x1b[36m' : '',
  gray: useColor ? '\x1b[90m' : '',
};

function passBadge(msg) {
  return `${c.green}${c.bold}✔ PASS${c.reset} ${msg}`;
}

function failBadge(msg) {
  return `${c.red}${c.bold}✖ FAIL${c.reset} ${msg}`;
}

function infoBadge(msg) {
  return `${c.cyan}ℹ INFO${c.reset} ${msg}`;
}

function printSectionHeader(title) {
  const line = '═'.repeat(74);
  console.log(`\n${c.cyan}${c.bold}${line}`);
  console.log(`  ${title}`);
  console.log(`${line}${c.reset}\n`);
}

// ---------------------------------------------------------------------------
// 2. Test Reporter
// ---------------------------------------------------------------------------

class TestReporter {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.failures = [];
  }

  assert(condition, description, failureDetails = null) {
    this.total++;
    if (condition) {
      this.passed++;
      console.log(`  ${passBadge(description)}`);
      return true;
    } else {
      this.failed++;
      console.log(`  ${failBadge(description)}`);
      if (failureDetails) {
        if (Array.isArray(failureDetails)) {
          for (const d of failureDetails) {
            console.log(`    ${c.gray}└─ ${d}${c.reset}`);
          }
        } else {
          console.log(`    ${c.gray}└─ ${failureDetails}${c.reset}`);
        }
      }
      this.failures.push({ description, details: failureDetails });
      return false;
    }
  }

  printSummary() {
    const divider = '─'.repeat(74);
    console.log(`\n${c.bold}${divider}`);
    console.log(`TEST EXECUTION SUMMARY:`);
    console.log(`  Total Assertions: ${this.total}`);
    console.log(`  Passed:           ${c.green}${this.passed}${c.reset}`);
    console.log(`  Failed:           ${this.failed > 0 ? c.red : c.green}${this.failed}${c.reset}`);
    console.log(`${divider}${c.reset}\n`);

    if (this.failed > 0) {
      console.log(`${c.red}${c.bold}VERIFICATION FAILED: ${this.failed} assertion(s) failed.${c.reset}\n`);
      for (let i = 0; i < this.failures.length; i++) {
        const item = this.failures[i];
        console.log(`  ${i + 1}. ${c.red}${item.description}${c.reset}`);
        if (item.details) {
          if (Array.isArray(item.details)) {
            for (const d of item.details.slice(0, 6)) {
              console.log(`     ${c.gray}• ${d}${c.reset}`);
            }
            if (item.details.length > 6) {
              console.log(`     ${c.gray}• ... and ${item.details.length - 6} more${c.reset}`);
            }
          } else {
            console.log(`     ${c.gray}• ${item.details}${c.reset}`);
          }
        }
      }
      console.log('');
      return false;
    } else {
      console.log(`${c.green}${c.bold}ALL VERIFICATION CHECKS PASSED (100% PASS RATE)${c.reset}\n`);
      return true;
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Source File Discovery
// ---------------------------------------------------------------------------

function collectSourceFiles(dir, exts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md']) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (exts.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return results;
}

// ---------------------------------------------------------------------------
// 4. Check 1: Negative / Blacklist Assertions (Placeholder Elimination)
// ---------------------------------------------------------------------------

function runCheck1Blacklist(reporter, sourceFiles) {
  printSectionHeader('CHECK 1: Negative Assertions — Placeholder Elimination');
  console.log(infoBadge(`Scanning ${sourceFiles.length} source files under Portfolio/src for placeholder strings...`));

  // Required blacklist from DISPATCH.md and PROJECT.md:
  // - CyberCorp
  // - SecureNet Solutions / SecureNet
  // - University of Lahore
  // - FSD Cyber-Wing
  // - Code for Pakistan
  // - CompTIA Security+ / CompTIA
  // - Offensive Security Certified Professional
  // - // Note: This is placeholder data.
  // - OSCP (in certification/profile context)
  // - CISSP
  // - CEH
  // - John Doe
  const blacklistRules = [
    { name: 'CyberCorp', pattern: /\bCyberCorp\b/i, description: 'Mock company "CyberCorp"' },
    { name: 'SecureNet Solutions', pattern: /\bSecureNet(\s*Solutions)?\b/i, description: 'Mock company "SecureNet"' },
    { name: 'University of Lahore', pattern: /University\s+of\s+Lahore/i, description: 'Mock education "University of Lahore"' },
    { name: 'FSD Cyber-Wing', pattern: /FSD\s+Cyber-Wing/i, description: 'Mock leadership "FSD Cyber-Wing"' },
    { name: 'Code for Pakistan', pattern: /Code\s+for\s+Pakistan/i, description: 'Mock initiative "Code for Pakistan"' },
    { name: 'CompTIA Security+', pattern: /CompTIA\s+Security\+?/i, description: 'Placeholder certification "CompTIA Security+"' },
    { name: 'CompTIA Body/Badge', pattern: /\bCompTIA\b/i, description: 'Placeholder issuing body "CompTIA"' },
    { name: 'Offensive Security Certified Professional', pattern: /Offensive\s+Security\s+Certified\s+Professional/i, description: 'Placeholder cert "Offensive Security Certified Professional"' },
    { name: 'Placeholder Comment Flag', pattern: /Note:\s*This\s+is\s+placeholder\s+data/i, description: 'Explicit placeholder comment "// Note: This is placeholder data."' },
    { name: 'Certified Ethical Hacker (CEH)', pattern: /Certified\s+Ethical\s+Hacker|\bCEH\b/i, description: 'Placeholder cert "Certified Ethical Hacker (CEH)"' },
    { name: 'CISSP Acronym/Cert', pattern: /Certified\s+Information\s+Systems\s+Security\s+Professional|\bCISSP\b/i, description: 'Placeholder cert "CISSP"' },
    { name: 'OSCP Acronym', pattern: /\bOSCP\b/i, description: 'Placeholder cert acronym "OSCP"' },
    { name: 'John Doe Placeholder', pattern: /\bJohn\s+Doe\b/i, description: 'Mock persona "John Doe"' },
  ];

  for (const rule of blacklistRules) {
    const matches = [];

    for (const filePath of sourceFiles) {
      const relPath = path.relative(PORTFOLIO_ROOT, filePath).replace(/\\/g, '/');
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split(/\r?\n/);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (rule.pattern.test(line)) {
          matches.push(`${relPath}:${i + 1} → "${line.trim()}"`);
        }
      }
    }

    const testDescription = `Blacklist: Absence of ${rule.description} [${rule.name}]`;
    if (matches.length === 0) {
      reporter.assert(true, testDescription);
    } else {
      reporter.assert(false, testDescription, matches);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Check 2: Positive / Whitelist Assertions (Real User Profile Credentials)
// ---------------------------------------------------------------------------

function runCheck2Whitelist(reporter, sourceFiles) {
  printSectionHeader('CHECK 2: Positive Assertions — Real User Profile Credentials');
  console.log(infoBadge('Scanning source files under Portfolio/src for real profile data...'));

  // Required whitelist items from DISPATCH.md and PROJECT.md:
  // - Bugcrowd
  // - HackerOne
  // - Penetration Tester
  // - Aspire Group Of Colleges
  // - Umer Farooq
  // - securewithumer
  const whitelistRules = [
    { name: 'Bugcrowd', pattern: /\bBugcrowd\b/i, description: 'Real experience: Bugcrowd penetration tester' },
    { name: 'HackerOne', pattern: /\bHackerOne\b/i, description: 'Real experience: HackerOne penetration tester' },
    { name: 'Penetration Tester', pattern: /\bPenetration\s+Tester\b/i, description: 'Real job title/headline: Penetration Tester' },
    { name: 'Aspire Group Of Colleges', pattern: /Aspire\s+Group\s+Of\s+Colleges/i, description: 'Real education: Aspire Group Of Colleges' },
    { name: 'Umer Farooq', pattern: /\bUmer\s+Farooq\b/i, description: 'Real user name: Umer Farooq' },
    { name: 'securewithumer', pattern: /securewithumer/i, description: 'Profile handle / LinkedIn link: securewithumer' },
  ];

  const fileContents = sourceFiles.map((fp) => ({
    path: path.relative(PORTFOLIO_ROOT, fp).replace(/\\/g, '/'),
    content: fs.readFileSync(fp, 'utf8'),
  }));

  for (const rule of whitelistRules) {
    const matchingFiles = [];
    for (const file of fileContents) {
      if (rule.pattern.test(file.content)) {
        matchingFiles.push(file.path);
      }
    }

    const testDescription = `Whitelist: Presence of ${rule.description} [${rule.name}]`;
    if (matchingFiles.length > 0) {
      reporter.assert(
        true,
        `${testDescription} (Found in: ${matchingFiles.slice(0, 3).join(', ')}${matchingFiles.length > 3 ? '...' : ''})`
      );
    } else {
      reporter.assert(
        false,
        testDescription,
        `Expected phrase matching ${rule.pattern} was not found in any source file in Portfolio/src`
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 6. Check 3: All 12 Certifications Assertions (Zero-Dependency TS Parser)
// ---------------------------------------------------------------------------

function parseCertificationsFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { error: `File not found: ${filePath}`, certs: null };
  }

  const rawContent = fs.readFileSync(filePath, 'utf8');

  try {
    // Zero-dependency pure JavaScript evaluation:
    // Strip TypeScript interface definitions, comments, and type annotations
    const cleaned = rawContent
      .replace(/export\s+interface\s+\w+[\s\S]*?}\r?\n/g, '')
      .replace(/:\s*Certification\[\]/g, '')
      .replace(/:\s*Array<Certification>/g, '')
      .replace(/export\s+const\s+certifications/, 'const certifications');

    const fn = new Function(`${cleaned}\nreturn typeof certifications !== 'undefined' ? certifications : null;`);
    const certs = fn();

    if (!Array.isArray(certs)) {
      return { error: 'Exported `certifications` is not an array', certs: null, rawContent };
    }

    return { error: null, certs, rawContent };
  } catch (err) {
    return { error: `Failed to evaluate certifications.ts: ${err.message}`, certs: null, rawContent };
  }
}

function runCheck3Certifications(reporter) {
  printSectionHeader('CHECK 3: Certifications Catalog Assertions — Schema, Slugs & All 12 Credentials');
  console.log(infoBadge(`Validating data catalog at ${path.relative(PORTFOLIO_ROOT, CERT_FILE)}...`));

  const { error, certs } = parseCertificationsFile(CERT_FILE);

  if (error) {
    reporter.assert(false, `Certifications catalog evaluation: ${error}`);
    return;
  }

  reporter.assert(true, 'Certifications catalog is valid and exports an array');

  // Assert array count >= 12
  reporter.assert(
    certs.length >= 12,
    `Certifications count: Must contain at least 12 certifications (found: ${certs.length})`,
    certs.length < 12
      ? `Currently only ${certs.length} entries defined, required 12 (8 technical + 4 non-technical)`
      : null
  );

  // Schema fields and slug validation
  const schemaErrors = [];
  const slugsSeen = new Map();
  const duplicateSlugs = [];
  const invalidSlugs = [];
  const placeholderSlugs = [];

  const KNOWN_PLACEHOLDER_SLUGS = new Set([
    'comptia-security-plus',
    'certified-ethical-hacker',
    'offensive-security-certified-professional',
    'cissp',
  ]);

  // URL-safe kebab-case pattern
  const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  certs.forEach((cert, index) => {
    const entryId = cert.id || `index[${index}]`;

    if (!cert.id || typeof cert.id !== 'string') {
      schemaErrors.push(`Entry #${index} missing valid 'id'`);
    }
    if (!cert.title || typeof cert.title !== 'string') {
      schemaErrors.push(`Entry #${index} (${entryId}) missing valid 'title'`);
    }
    if (!cert.issuingBody || typeof cert.issuingBody !== 'string') {
      schemaErrors.push(`Entry #${index} (${entryId}) missing valid 'issuingBody'`);
    }
    if (!cert.issueDate || typeof cert.issueDate !== 'string') {
      schemaErrors.push(`Entry #${index} (${entryId}) missing valid 'issueDate'`);
    }

    if (!cert.slug || typeof cert.slug !== 'string') {
      schemaErrors.push(`Entry #${index} (${entryId}) missing valid 'slug'`);
      invalidSlugs.push(`Entry #${index} has non-string or empty slug`);
    } else {
      if (!SLUG_PATTERN.test(cert.slug)) {
        invalidSlugs.push(`"${cert.slug}" (not URL-safe kebab-case)`);
      }
      if (KNOWN_PLACEHOLDER_SLUGS.has(cert.slug)) {
        placeholderSlugs.push(cert.slug);
      }
      if (slugsSeen.has(cert.slug)) {
        duplicateSlugs.push(`"${cert.slug}" (duplicate in index ${slugsSeen.get(cert.slug)} and ${index})`);
      } else {
        slugsSeen.set(cert.slug, index);
      }
    }
  });

  reporter.assert(
    schemaErrors.length === 0,
    'Schema: All entries implement required Certification fields (id, slug, title, issuingBody, issueDate)',
    schemaErrors
  );

  reporter.assert(
    invalidSlugs.length === 0,
    'Slugs: All certification slugs are URL-safe lowercase kebab-case strings',
    invalidSlugs
  );

  reporter.assert(
    duplicateSlugs.length === 0,
    'Slugs: All certification slugs are strictly unique',
    duplicateSlugs
  );

  reporter.assert(
    placeholderSlugs.length === 0,
    'Slugs: No placeholder slugs remain in catalog',
    placeholderSlugs.map((s) => `Placeholder slug still present: "${s}"`)
  );

  // Verification of all 12 required certifications (8 technical + 4 non-technical)
  const requiredCertifications = [
    // Technical (8)
    {
      id: 'tech-1',
      title: 'Microsoft Cybersecurity Architect',
      test: (c) => /Microsoft/i.test(c.title + c.issuingBody) && /Cybersecurity\s+Architect/i.test(c.title),
    },
    {
      id: 'tech-2',
      title: 'Google Cybersecurity Professional',
      test: (c) => /Google/i.test(c.title + c.issuingBody) && /Cybersecurity\s+Professional/i.test(c.title),
    },
    {
      id: 'tech-3',
      title: 'Google Network Security Professional',
      test: (c) => /Google/i.test(c.title + c.issuingBody) && /Network\s+Security\s+Professional/i.test(c.title),
    },
    {
      id: 'tech-4',
      title: 'Certified Social Engineering Defense Practitioner (CSEDP)',
      test: (c) => /Social\s+Engineering\s+Defense/i.test(c.title) || /\bCSEDP\b/i.test(c.title + (c.slug || '')),
    },
    {
      id: 'tech-5',
      title: 'CPPS - Certified Phishing Prevention Specialist',
      test: (c) => /Phishing\s+Prevention\s+Specialist/i.test(c.title) || /\bCPPS\b/i.test(c.title + (c.slug || '')),
    },
    {
      id: 'tech-6',
      title: 'ISO/IEC 27001 Information Security Associate',
      test: (c) => /27001/i.test(c.title) && /Information\s+Security\s+Associate/i.test(c.title),
    },
    {
      id: 'tech-7',
      title: 'ISO/IEC 27001:2022 Lead Auditor',
      test: (c) => /27001/i.test(c.title) && /Lead\s+Auditor/i.test(c.title),
    },
    {
      id: 'tech-8',
      title: 'Certified Deep Web Security - CDWS',
      test: (c) => /Deep\s+Web\s+Security/i.test(c.title) || /\bCDWS\b/i.test(c.title + (c.slug || '')),
    },
    // Non-Technical (4)
    {
      id: 'nontech-1',
      title: 'Critical thinking - Imperial College London',
      test: (c) => /Critical\s+Thinking/i.test(c.title) && /Imperial/i.test(c.title + c.issuingBody),
    },
    {
      id: 'nontech-2',
      title: 'Innovation Through Design: Think, Make, Break, Repeat - University of Sydney',
      test: (c) => /Innovation\s+Through\s+Design/i.test(c.title) && /Sydney/i.test(c.title + c.issuingBody),
    },
    {
      id: 'nontech-3',
      title: 'AI Justice and Rule of Law - University of Oxford',
      test: (c) => (/AI\s+Justice/i.test(c.title) || /Rule\s+of\s+Law/i.test(c.title)) && /Oxford/i.test(c.title + c.issuingBody),
    },
    {
      id: 'nontech-4',
      title: 'Internet History, Technology, and Security - University of Michigan',
      test: (c) => /Internet\s+History/i.test(c.title) && /Michigan/i.test(c.title + c.issuingBody),
    },
  ];

  console.log(`\n  ${c.bold}Verifying 12 Required Certifications:${c.reset}`);
  for (const req of requiredCertifications) {
    const match = certs.find(req.test);
    const testDesc = `Certification: Presence of "${req.title}"`;
    if (match) {
      reporter.assert(
        true,
        `${testDesc} (Slug: "${match.slug}", Issuer: "${match.issuingBody}")`
      );
    } else {
      reporter.assert(
        false,
        testDesc,
        `Did not find any entry in certifications.ts matching required title & issuing body for "${req.title}"`
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 7. Check 4: Build Integrity & Prerender Route Verification
// ---------------------------------------------------------------------------

function runCheck4Build(reporter) {
  printSectionHeader('CHECK 4: Build Integrity & Static Route Prerender Verification');

  if (SKIP_BUILD) {
    console.log(infoBadge('Build check skipped via --skip-build flag.'));
    return;
  }

  console.log(infoBadge(`Executing Next.js build in ${PORTFOLIO_ROOT}...`));
  const startTime = Date.now();

  const isWindows = process.platform === 'win32';
  const npmCmd = isWindows ? 'npm.cmd' : 'npm';

  const buildResult = spawnSync(npmCmd, ['run', 'build'], {
    cwd: PORTFOLIO_ROOT,
    encoding: 'utf8',
    shell: true,
    env: { ...process.env, CI: 'true' },
    maxBuffer: 10 * 1024 * 1024,
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const exitCode = buildResult.status;

  if (exitCode === 0) {
    reporter.assert(true, `Next.js production build succeeded with exit code 0 (${durationSec}s)`);
  } else {
    reporter.assert(
      false,
      `Next.js production build failed with exit code ${exitCode}`,
      [
        `Build command failed after ${durationSec}s`,
        ...(buildResult.stderr ? [buildResult.stderr.trim().split('\n').slice(-10).join('\n')] : []),
        ...(buildResult.stdout ? [buildResult.stdout.trim().split('\n').slice(-10).join('\n')] : []),
      ]
    );
    return;
  }

  // Prerender Manifest Verification
  const prerenderPath = path.join(PORTFOLIO_ROOT, '.next', 'prerender-manifest.json');
  if (!fs.existsSync(prerenderPath)) {
    reporter.assert(false, `Prerender manifest not found at ${prerenderPath}`);
    return;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(prerenderPath, 'utf8'));
    const routes = Object.keys(manifest.routes || {});

    // Filter certification detail routes: /certifications/<slug>
    const certRoutes = routes.filter((r) => r.startsWith('/certifications/') && r !== '/certifications');

    reporter.assert(
      certRoutes.length >= 12,
      `Static Prerender: At least 12 /certifications/[slug] routes prerendered (found: ${certRoutes.length})`,
      certRoutes.length < 12
        ? `Expected at least 12 static certification routes in prerender-manifest.json, but found only ${certRoutes.length}: [${certRoutes.join(', ')}]`
        : null
    );

    // Verify absence of placeholder routes in build output
    const placeholderRoutes = [
      '/certifications/comptia-security-plus',
      '/certifications/certified-ethical-hacker',
      '/certifications/offensive-security-certified-professional',
      '/certifications/cissp',
    ];
    const remainingPlaceholders = placeholderRoutes.filter((pr) => routes.includes(pr));

    reporter.assert(
      remainingPlaceholders.length === 0,
      'Static Prerender: No placeholder certification routes present in production build',
      remainingPlaceholders.map((pr) => `Placeholder route prerendered: ${pr}`)
    );

    // If certifications.ts is readable, verify each defined slug has a static prerendered route
    const { certs } = parseCertificationsFile(CERT_FILE);
    if (certs && certs.length > 0) {
      const missingPrerenderSlugs = [];
      for (const c of certs) {
        if (c.slug) {
          const expectedRoute = `/certifications/${c.slug}`;
          if (!routes.includes(expectedRoute)) {
            missingPrerenderSlugs.push(expectedRoute);
          }
        }
      }

      reporter.assert(
        missingPrerenderSlugs.length === 0,
        'Static Prerender: All slugs defined in certifications.ts have generated static routes',
        missingPrerenderSlugs.map((r) => `Missing prerendered route: ${r}`)
      );
    }
  } catch (err) {
    reporter.assert(false, `Failed to parse .next/prerender-manifest.json: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// 8. Main Orchestration
// ---------------------------------------------------------------------------

function main() {
  console.log(`\n${c.bold}${c.magenta}PORTFOLIO VERIFICATION HARNESS (E2E TEST SUITE)${c.reset}`);
  console.log(`${c.gray}Target Directory: ${PORTFOLIO_ROOT}`);
  console.log(`Node Runtime:     ${process.version}`);
  console.log(`Build Check:      ${SKIP_BUILD ? 'SKIPPED (--skip-build)' : 'ENABLED'}`);
  console.log(`Timestamp:        ${new Date().toISOString()}${c.reset}\n`);

  const reporter = new TestReporter();

  if (!BUILD_ONLY) {
    const sourceFiles = collectSourceFiles(SRC_DIR);
    runCheck1Blacklist(reporter, sourceFiles);
    runCheck2Whitelist(reporter, sourceFiles);
    runCheck3Certifications(reporter);
  }

  if (!SKIP_BUILD) {
    runCheck4Build(reporter);
  }

  const passed = reporter.printSummary();
  process.exit(passed ? 0 : 1);
}

main();
