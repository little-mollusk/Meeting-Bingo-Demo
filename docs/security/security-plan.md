# Security Plan: Meeting Bingo

## Overview

This document outlines the security scanning strategy for the Meeting Bingo application. Security checks run automatically on every Pull Request and block Vercel deployments if critical issues are found.

## Application Profile

| Attribute | Value |
|-----------|-------|
| **Stack** | React 19, TypeScript, Vite, Tailwind CSS |
| **Type** | Client-side SPA (no backend) |
| **Data Handling** | No user data stored, microphone audio processed locally |
| **Deployment** | Vercel (static hosting) |
| **Risk Level** | Low (no sensitive data, no authentication) |

## Security Checks

### 1. Dependency Vulnerability Scanning

**Tool:** `npm audit`

**Why:** Detects known vulnerabilities in npm packages (CVEs)

**Configuration:**
- Fail on: `high` and `critical` severity
- Allow: `low` and `moderate` (review manually)

### 2. Static Application Security Testing (SAST)

**Tool:** CodeQL (GitHub native) + Semgrep

**Why:** Detects security anti-patterns in code

**Checks for React/TypeScript:**
- `dangerouslySetInnerHTML` without sanitization
- Hardcoded secrets/API keys
- Unsafe eval() usage
- Prototype pollution risks
- ReDoS (Regular Expression Denial of Service)

### 3. Secret Detection

**Tool:** Gitleaks or TruffleHog

**Why:** Prevents accidental commit of API keys, tokens, passwords

**Scans for:**
- API keys (Linear, Vercel, etc.)
- AWS/GCP credentials
- Private keys
- Environment variable patterns

### 4. License Compliance

**Tool:** license-checker

**Why:** Ensures all dependencies have compatible licenses

**Allowed:** MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC
**Blocked:** GPL, AGPL, SSPL (copyleft)

## GitHub Actions Workflow

### Trigger Events

| Event | Action |
|-------|--------|
| `pull_request` | Run all security checks |
| `push` to `main` | Run all security checks |
| `schedule` (weekly) | Full dependency audit |

### Workflow Stages

```
┌─────────────────┐
│   PR Created    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  npm audit      │──── Fail on high/critical
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CodeQL/Semgrep │──── Fail on errors
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Secret Scan    │──── Fail if secrets found
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  License Check  │──── Fail on copyleft
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ✅ All Passed  │──── Allow Vercel deploy
└─────────────────┘
```

### Vercel Integration

Vercel auto-deploys from GitHub. To block deployments on security failures:

1. **Branch Protection Rules** - Require status checks to pass
2. **Vercel Settings** - Only deploy from `main` branch
3. **GitHub Actions** - Security workflow must pass before merge

## Implementation Files

| File | Purpose |
|------|---------|
| `.github/workflows/security.yml` | Main security workflow |
| `.github/dependabot.yml` | Automated dependency updates |
| `.gitleaksignore` | False positive exclusions |

## Severity Response

| Severity | Action | Timeline |
|----------|--------|----------|
| **Critical** | Block PR, fix immediately | Same day |
| **High** | Block PR, fix before merge | 24 hours |
| **Moderate** | Warning, create issue | 1 week |
| **Low** | Log only | Next sprint |

## Tools Summary

| Tool | Purpose | Cost |
|------|---------|------|
| **npm audit** | Dependency CVEs | Free |
| **CodeQL** | GitHub SAST | Free for public repos |
| **Semgrep** | Additional SAST rules | Free tier |
| **Gitleaks** | Secret detection | Free |
| **license-checker** | License compliance | Free |

## References

- [npm Security Best Practices](https://github.com/bodadotsh/npm-security-best-practices)
- [GitHub Actions Security Best Practices](https://medium.com/@amareswer/github-actions-security-best-practices-1d3f33cdf705)
- [React Security Best Practices 2025](https://hub.corgea.com/articles/react-security-best-practices)
- [Bearer SAST Scanner](https://github.com/Bearer/bearer)
- [Gitleaks Secret Scanner](https://github.com/gitleaks/gitleaks)

## Next Steps

1. [ ] Review and approve this plan
2. [ ] Create `.github/workflows/security.yml`
3. [ ] Create `.github/dependabot.yml`
4. [ ] Enable branch protection rules on GitHub
5. [ ] Configure Vercel to require checks
6. [ ] Test with a sample PR
