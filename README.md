# 🦊 CODEZILLA | Gamified College Coding Club Platform

> **Codezilla** is a competitive gaming platform and coding leaderboard designed for college students, powered by **LeetCode** external activity verification.

---

## 🎨 Visual Identity & Design Philosophy

- **Club Name**: CODEZILLA
- **Theme Palette**:
  - Deep Dark Obsidian & Onyx (`#07090E`, `#0C0F17`, `#111622`)
  - Signature High-Energy Orange (`#FF6B00`, `#FF7E1D`)
  - Subtle Gold / Yellow Accents (`#F59E0B`, `#FBBF24`)
  - Bluish-Purple Cyber Accents (`#6366F1`, `#8B5CF6`)
- **Aesthetic**: Premium competitive gaming mixed with GitHub contribution tracking. Avoids generic blue corporate dashboards and excessive blinding neon.
- **The Mascot**: **The Clever Fox** — intelligent, fast, competitive, curious, and mischievous. Present subtly through badges, mood indicators, and telemetry.

---

## ⚡ Core Systems & Rules

### 1. Point Engine (Configurable)
- **Easy Problem**: `+2 XP`
- **Medium Problem**: `+3 XP`
- **Hard Problem**: `+4 XP`
- **Daily Bounty**: `+2 XP`
- *Points can be modified dynamically via `configService`.*

### 2. Strict Privacy Rule
- **Public Leaderboard**: Displays **only** Rank, Avatar, Student Name, College Year, XP, Streak, Level Title, and Featured Badges.
- **Private Profile**: Displays complete personal breakdowns, including Total Problems Solved, Easy/Medium/Hard breakdown, full historical charts, and full contribution calendar.

### 3. Weekly Competition & Historical Preservation
- Every week operates on an active sprint.
- At Sunday 23:59:59 reset:
  - Weekly XP and weekly rankings reset.
  - Weekly challenges reset.
- **Lifetime Statistics & All-Time records are NEVER deleted or overwritten.**

### 4. Cohorts & Divisions
- **First Year**
- **Second Year**
- **Third Year**
- Filterable and searchable across all views.

### 5. Level Progression (Titles)
- Level 1: `Rookie Fox` (0 - 24 XP)
- Level 2: `Code Explorer` (25 - 69 XP)
- Level 3: `Debugger` (70 - 139 XP)
- Level 4: `Problem Hunter` (140 - 249 XP)
- Level 5: `Code Ninja` (250 - 399 XP)
- Level 6: `Algorithm Beast` (400 - 599 XP)
- Level 7: `Apex Codezilla` (600+ XP)

### 6. Badges & Trophy Case
- 🦊 **Fox Initiate**: First verified submission
- ⚡ **Quick Start**: Solve 3 problems in a week
- 🔥 **On Fire**: Maintain a 7-day streak
- 💥 **Problem Crusher**: Solve 10 problems
- 🧠 **Brain Mode**: Solve 5 medium problems
- 👑 **Hard Mode**: Solve a hard problem
- 🌙 **Night Coder**: Submission between 11 PM and 4 AM
- 🎯 **Weekly Warrior**: Finish weekly topic sprint
- 🔁 **Consistency Beast**: 14-day consecutive active streak
- 🏆 **Top Hunter**: Reach Top 3 Weekly Podium
- 🌲 **Tree Whisperer**: Master 5 Tree problems
- 🔮 **DP Architect**: Demolish 5 Dynamic Programming problems
- *Extensible admin interface allows creating new badges on the fly.*

### 7. Codezilla Contribution Calendar
- GitHub-style activity matrix with custom Codezilla orange intensity tiers:
  - `0`: Dark Obsidian `#111622`
  - `1`: Low Orange Tint
  - `2`: Medium Orange
  - `3`: Stronger Orange
  - `4+`: Bright Orange Accent with pulse glow
- Interactive hover cards with problem breakdown and XP earned.

---

## 🏗️ Architecture & Backend-Ready Service Layer

The frontend is structured with clean, decoupled service abstractions ready to connect to any REST/GraphQL backend:

```
src/
├── types/
│   ├── user.ts               # Student, StudentYear, LevelInfo
│   ├── leaderboard.ts        # LeaderboardEntry (Privacy compliant), Filters
│   ├── submission.ts         # Submission, ProblemDifficulty, ProblemTopic
│   ├── badge.ts              # Badge, BadgeCategory, BadgeRarity
│   ├── challenge.ts          # DailyMission, WeeklyChallenge
│   └── statistics.ts         # CalendarData, ContributionDay, RankHistory
├── services/
│   ├── authService.ts        # Login, signup, googleAuth, user switching
│   ├── userService.ts        # Profile queries and updates
│   ├── leaderboardService.ts # Ranked listings obeying privacy rules
│   ├── submissionService.ts  # Solve verification & telemetry
│   ├── badgeService.ts       # Trophy case & admin badge generation
│   ├── statisticsService.ts  # Contribution calendar & rank history
│   ├── weeklyService.ts      # Sprint cycles & countdown
│   └── configService.ts      # Configurable XP multipliers & levels
├── components/
│   ├── common/               # FoxMascot, Navbar, Footer, LevelBadge, Modal, XPProgressBar
│   ├── landing/              # HeroSection, MascotShowcase, HowItWorksSection
│   ├── dashboard/            # WelcomeBanner, TodayMissionCard, DashboardStats, WeeklySprintTimer, RecentActivityFeed, BadgeProgressWidget
│   ├── leaderboard/          # LeaderboardPodium (Crown/Silver/Bronze), LeaderboardTable, LeaderboardFilters
│   ├── profile/              # ProfileHeader, ProfileOverview, ProfileActivity, ProfileBadges, ProfileStats
│   ├── calendar/             # ContributionCalendar (Orange intensity matrix)
│   └── auth/                 # AuthModal (Sign In, Sign Up, Google, Student Switcher)
└── pages/
    ├── LandingPage.tsx
    ├── DashboardPage.tsx
    ├── LeaderboardPage.tsx
    ├── ProfilePage.tsx
    └── BadgesPage.tsx
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open your browser at `http://localhost:5173`.
