// The AI Readiness Assessment, as data.
//
// Held as structured objects rather than hand-written JSX so the same content
// can drive the printable worksheet today and a scored interactive version
// later without the copy being retyped. Source of truth for the wording:
// docs/marketing/magnets/ai-readiness-assessment.md in the MDNT tree.

export interface ScoreOption {
  score: 0 | 1 | 2 | 3;
  label: string;
}

export interface Question {
  n: number;
  prompt: string;
  options: readonly ScoreOption[];
  note?: string;
}

export interface Dimension {
  n: number;
  title: string;
  standfirst: string;
  questions: readonly Question[];
}

export interface Tier {
  range: string;
  min: number;
  max: number;
  name: string;
  meaning: string;
  advice: readonly string[];
}

export const DIMENSIONS: readonly Dimension[] = [
  {
    n: 1,
    title: "The Work",
    standfirst:
      "Root cause number one is a misunderstood problem. This dimension is the cheapest to fix and the most often skipped.",
    questions: [
      {
        n: 1,
        prompt:
          'Can you describe the task in one sentence, without using the word "and"?',
        options: [
          { score: 0, label: "I have a general area, not a task" },
          { score: 1, label: "I can describe it, but it takes a paragraph" },
          { score: 2, label: 'One sentence with one "and" in it' },
          { score: 3, label: "One clean sentence" },
        ],
        note: "Compound tasks are two tasks. Split them and score the harder one.",
      },
      {
        n: 2,
        prompt: "Is it done the same way every time?",
        options: [
          { score: 0, label: "Every case is different" },
          { score: 1, label: "Mostly judgment, some pattern" },
          { score: 2, label: "Mostly pattern, some judgment calls" },
          {
            score: 3,
            label: "Same steps every time, exceptions are rare and recognizable",
          },
        ],
      },
      {
        n: 3,
        prompt: "Is the procedure written down?",
        options: [
          { score: 0, label: "It lives entirely in one person's head" },
          { score: 1, label: "Someone could reconstruct it from examples" },
          { score: 2, label: "Partial documentation, out of date" },
          { score: 3, label: "Written, current, someone new could follow it" },
        ],
      },
      {
        n: 4,
        prompt:
          "If the person doing it left tomorrow, how long to get a replacement to full speed?",
        options: [
          { score: 0, label: "Months, and we would lose things in the handover" },
          { score: 1, label: "Six to eight weeks" },
          { score: 2, label: "Two to four weeks" },
          { score: 3, label: "Under two weeks" },
        ],
        note: "A proxy for how much undocumented judgment the task carries. A task that takes three months to hand to a human will not hand cleanly to a system either.",
      },
    ],
  },
  {
    n: 2,
    title: "The Data",
    standfirst:
      "The single most cited barrier, at 53%, and the subject of Gartner's 60% abandonment forecast. 63% of data leaders say they do not have, or do not know whether they have, the right data management practices for AI.",
    questions: [
      {
        n: 5,
        prompt: "Where does the information this task needs actually live?",
        options: [
          { score: 0, label: "Email threads, people's memory, paper" },
          { score: 1, label: "Spreadsheets on individual machines" },
          { score: 2, label: "Shared systems, but spread across several" },
          { score: 3, label: "In systems of record, queryable" },
        ],
      },
      {
        n: 6,
        prompt:
          "If you needed the last twelve months of records for this task, how long to produce them?",
        options: [
          { score: 0, label: "We could not, reliably" },
          { score: 1, label: "Days of manual assembly" },
          { score: 2, label: "Hours, with someone who knows where to look" },
          { score: 3, label: "Minutes, self-serve" },
        ],
      },
      {
        n: 7,
        prompt: "How often is that data wrong, stale, or duplicated?",
        options: [
          { score: 0, label: "Constantly, and we work around it" },
          { score: 1, label: "Often enough that we check everything twice" },
          { score: 2, label: "Occasionally, and we usually catch it" },
          { score: 3, label: "Rarely, and there is a process when it happens" },
        ],
      },
      {
        n: 8,
        prompt:
          "When two systems disagree, is there an agreed answer to which one is right?",
        options: [
          { score: 0, label: "They disagree often and nobody has decided" },
          { score: 1, label: "It depends who you ask" },
          { score: 2, label: "Informally understood" },
          { score: 3, label: "Explicit, documented, enforced" },
        ],
        note: "Questions 6 and 7 together are the best single predictor in this assessment. A pilot built on data you had to hand-assemble will not survive production, where nobody hand-assembles anything.",
      },
    ],
  },
  {
    n: 3,
    title: "The Systems",
    standfirst:
      "Integration is the second barrier at 47%. Legacy systems and talent gaps tie at 28% as enterprise-wide inhibitors.",
    questions: [
      {
        n: 9,
        prompt:
          "Do the systems this task touches have an API or a documented export?",
        options: [
          { score: 0, label: "No, or we have no idea" },
          { score: 1, label: "One does, the important one does not" },
          { score: 2, label: "Most do" },
          { score: 3, label: "All of them, and we have the credentials" },
        ],
      },
      {
        n: 10,
        prompt: "How many separate systems does the task touch?",
        options: [
          { score: 0, label: "Six or more" },
          { score: 1, label: "Four or five" },
          { score: 2, label: "Two or three" },
          { score: 3, label: "One" },
        ],
        note: "More systems is not disqualifying. It is the difference between a two-week deployment and a six-week one, and you should know which you are buying.",
      },
      {
        n: 11,
        prompt: "Has anyone successfully connected two of your systems before?",
        options: [
          { score: 0, label: "No, and attempts have failed" },
          { score: 1, label: "No, but nobody has tried" },
          { score: 2, label: "Yes, one working integration" },
          {
            score: 3,
            label: "Yes, several, and someone here understands them",
          },
        ],
      },
      {
        n: 12,
        prompt: "Who controls access, and how fast can they grant it?",
        options: [
          { score: 0, label: "A vendor who charges for it, or nobody knows" },
          { score: 1, label: "External IT, weeks of lead time" },
          { score: 2, label: "Internal, days" },
          { score: 3, label: "Someone in this building, today" },
        ],
        note: "Question 12 delays more deployments than any technical problem. Credentials are the critical path more often than code is.",
      },
    ],
  },
  {
    n: 4,
    title: "The People",
    standfirst:
      "85% of middle-market leaders agree that executives are more enthusiastic about AI than their employees are. That gap is where deployments go to die.",
    questions: [
      {
        n: 13,
        prompt: "Is there one named person who owns this outcome and can decide?",
        options: [
          { score: 0, label: "It is a committee, or it is nobody" },
          { score: 1, label: "Someone owns it but cannot approve changes" },
          {
            score: 2,
            label: "Clear owner, needs sign-off for anything material",
          },
          { score: 3, label: "One owner who can decide and commit" },
        ],
      },
      {
        n: 14,
        prompt: "How would the people doing this work today react?",
        options: [
          { score: 0, label: "They would fight it, openly or quietly" },
          { score: 1, label: "They would be nervous about their jobs" },
          { score: 2, label: "Neutral, wait and see" },
          { score: 3, label: "They have asked for this" },
        ],
        note: "A 0 here is not fatal, but it is expensive, and it needs to be handled before deployment rather than discovered during it.",
      },
      {
        n: 15,
        prompt: "Are people already using AI tools here without approval?",
        options: [
          { score: 0, label: "Almost certainly, and we have no visibility" },
          { score: 1, label: "Probably, we have not asked" },
          { score: 2, label: "Yes, and we know roughly who and what" },
          { score: 3, label: "Yes, sanctioned, with a policy" },
        ],
        note: "Counter-intuitive scoring. Widespread quiet usage scores low because it is a governance exposure, but it is genuinely good news about appetite. It also tells you exactly which tasks people find most painful, for free.",
      },
      {
        n: 16,
        prompt: "Who checks the output before it matters, and do they have the time?",
        options: [
          {
            score: 0,
            label: "Nobody, or the person who would has no capacity",
          },
          { score: 1, label: "Someone would need to make time" },
          { score: 2, label: "Clear reviewer, workable" },
          { score: 3, label: "Review already exists as part of the process" },
        ],
      },
    ],
  },
  {
    n: 5,
    title: "The Economics",
    standfirst:
      "Unclear ROI is cited by 33% as a barrier to scaling. Misaligned success metrics appear in every failure analysis we reviewed.",
    questions: [
      {
        n: 17,
        prompt: "Do you know what this task costs today, in hours and in money?",
        options: [
          { score: 0, label: "No idea" },
          { score: 1, label: "A rough guess" },
          { score: 2, label: "A reasonable estimate we could defend" },
          { score: 3, label: "We have measured it" },
        ],
      },
      {
        n: 18,
        prompt: "What happens when it is done wrong?",
        options: [
          {
            score: 0,
            label: "Regulatory, safety, or a lost customer, immediately",
          },
          { score: 1, label: "Real money, hard to reverse" },
          { score: 2, label: "Annoying, recoverable within a day" },
          { score: 3, label: "Caught downstream before it matters" },
        ],
        note: "High blast radius does not mean do not automate. It means the system needs a human approving before anything commits, which is a design decision, not a blocker.",
      },
      {
        n: 19,
        prompt:
          "What single number would have to move for this to be obviously worth it?",
        options: [
          { score: 0, label: "I could not name one" },
          { score: 1, label: "Something vague like efficiency" },
          { score: 2, label: "A specific metric, roughly" },
          { score: 3, label: "A specific metric, with a target and a date" },
        ],
      },
      {
        n: 20,
        prompt: "Can you measure that number today, before anything changes?",
        options: [
          { score: 0, label: "No" },
          { score: 1, label: "We could construct it with effort" },
          { score: 2, label: "Yes, approximately" },
          { score: 3, label: "Yes, and we have the history" },
        ],
        note: "If 19 and 20 both score 0 or 1, you will not be able to prove the deployment worked. This is the most common reason a project that succeeded gets cancelled anyway.",
      },
    ],
  },
];

export const TIERS: readonly Tier[] = [
  {
    range: "0 – 23",
    min: 0,
    max: 23,
    name: "Foundations first",
    meaning:
      "The task is not ready. Neither is anything else until this is fixed.",
    advice: [
      "Do not buy AI yet. You would be paying someone to discover your data problems at consulting rates.",
      "Write the procedure down, because you cannot automate what you cannot describe. This alone moves several scores.",
      "Consolidate where the data lives, even if that means one shared spreadsheet instead of four private ones.",
      "Name an owner who can make a call without a meeting.",
      "Re-score in ninety days. Most businesses move 10 to 15 points.",
    ],
  },
  {
    range: "24 – 38",
    min: 24,
    max: 38,
    name: "Ready for one",
    meaning:
      "Deployable, with scoping. Pick the single highest-value task and prove it.",
    advice: [
      "Deploy one task. Not three. The organizations seeing returns picked carefully and went deep rather than spreading wide.",
      "Choose the task with the highest hours and the lowest blast radius.",
      "Put a human approval step in front of anything that commits.",
      "Instrument the number from question 19 before you start.",
      "Expect four to eight weeks from decision to running, most of it spent on access and edge cases rather than on the AI.",
    ],
  },
  {
    range: "39 – 50",
    min: 39,
    max: 50,
    name: "Ready to sequence",
    meaning:
      "Several tasks are viable. The question is order and dependency, not feasibility.",
    advice: [
      "Your constraint is order, not capability.",
      "Tasks share data sources and integrations, so the right first deployment makes the second one cheaper and the wrong one makes it a rebuild.",
      "Map the dependencies before committing to the first build. This is the case where planning genuinely pays for itself.",
    ],
  },
  {
    range: "51 – 60",
    min: 51,
    max: 60,
    name: "Ready to scale",
    meaning: "Readiness is not your constraint. Delivery capacity is.",
    advice: [
      "Be honest about what is actually limiting you, which is usually engineering capacity or a decision nobody wants to own.",
      'Gartner\'s warning about "agent washing" is aimed squarely at you: of the thousands of vendors selling agentic AI, the firm estimates only around 130 have real agentic capability.',
      "Ask any vendor what happens when the agent is wrong, who sees it, and what it costs. Vague answers are the tell.",
    ],
  },
];

export const SOURCES: readonly string[] = [
  "RSM US Middle Market AI Survey, 2026. 1,030 respondents (827 US, 203 Canada), fielded March 5 to 16, 2026, margin of error ±3.1 points at 95% confidence. Adoption, satisfaction, ROI, barriers, inhibitors, governance, leadership enthusiasm gap.",
  'MIT NANDA, "The GenAI Divide: State of AI in Business," 2025. 52 executive interviews, 153 survey responses, 300 public deployments. The 95% figure, build versus buy, back office versus front office, use case focus. Directional rather than definitive.',
  "Iris.ai enterprise analysis, 2026. 88% of pilots never reach production.",
  "RAND Corporation. More than 80% of AI projects fail, approximately twice the rate of conventional IT projects. Five root causes.",
  "Gartner, February 2025. 60% of AI projects unsupported by AI-ready data abandoned through 2026. Underlying survey of 248 data management leaders, Q3 2024: 63% lack or are unsure of appropriate practices.",
  "Gartner, June 2025. More than 40% of agentic AI projects cancelled by end of 2027. Agent washing, approximately 130 genuine agentic vendors. Based on a January 2025 poll of 3,412 webinar attendees.",
  "Shadow AI research, 2026. 54% of employees using unsanctioned AI tools; 665 distinct AI tools observed generating traffic inside corporate networks.",
];
