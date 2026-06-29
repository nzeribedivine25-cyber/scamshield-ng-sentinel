# Implementation Plan - ScamShield NG Frontend UI Shell

Build a mobile-first, React-based frontend UI for ScamShield NG with a green-and-white primary palette. The focus is on a clean, simple, and trustworthy interface for a Nigerian audience.

## Scope Summary
- **Homepage:** Input field (link/phone/message), "Check Now" button, tagline, and trust indicators.
- **Verdict Screen:** Three visual states (Safe, Suspicious, Scam) with explanation text and action buttons ("Report this anyway", "Check another").
- **Interception Warning Page:** High-alert warning for "Scam" results when proceeding, with primary "Go back" and secondary "Proceed" actions.
- **Visual Identity:** Green and white palette (trust), mobile-first responsive design, plain English messaging.

## Non-Goals
- Backend API implementation or real detection logic.
- Community flagging database persistence.
- User authentication.
- Real URL interception (simulated via UI navigation).

## Affected Areas
- `src/App.tsx`: Main application shell and state management for screen transitions.
- `src/components/`: New components for Homepage, Verdict, and Warning views.
- `src/index.css`: Color palette and global theme adjustments (Nigerian Green/White).

## Assumptions & Open Questions
- **Navigation:** Since no router is explicitly requested, we will use a simple state-based conditional rendering in `App.tsx` or a lightweight `lucide-react` based navigation.
- **Data Flow:** Mock data will be used to simulate the "Check Now" result (randomizing between Safe, Suspicious, and Scam for demo purposes).

## Ordered Phases

### Phase 1: Theme & Foundations
- Define the "Nigerian Green" primary color in Tailwind/CSS.
- Setup layout wrappers.
- **Owner:** frontend_engineer

### Phase 2: Homepage Component
- Build the mobile-first input section.
- Add trust indicators ("Protecting Nigerians from scams").
- **Owner:** frontend_engineer

### Phase 3: Verdict & Warning Screens
- Implement the three-state Verdict UI.
- Implement the high-contrast Interception Warning page.
- **Owner:** frontend_engineer

### Phase 4: Integration & State Logic
- Connect the screens in `App.tsx`.
- Add mock logic for the "Check Now" button to transition between states.
- **Owner:** frontend_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of all UI components, styling, and basic screen state logic.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** Create `src/components/Homepage.tsx`, `src/components/VerdictView.tsx`, and `src/components/WarningPage.tsx`. Use Tailwind for the green/white palette. Update `App.tsx` to handle state transitions between these views.
- **Files:**
    - `src/App.tsx`: Orchestration.
    - `src/index.css`: Green/White theme variables.
    - `src/components/*.tsx`: Individual screens.
- **Depends on:** none
- **Acceptance criteria:**
    - App starts on Homepage with a clear input.
    - "Check Now" leads to a Verdict screen.
    - Verdict screen displays Safe/Suspicious/Scam correctly.
    - Scam verdict "Proceed" option shows the Warning page.
    - All screens are mobile-responsive and use the Nigerian-inspired green palette.
