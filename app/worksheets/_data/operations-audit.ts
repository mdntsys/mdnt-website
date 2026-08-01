// The Operations Audit, as data.
//
// Same reasoning as ai-readiness.ts: structured so the printable worksheet and
// a future interactive calculator share one copy source. Source of truth for
// the wording: docs/marketing/magnets/operations-audit.md in the MDNT tree.

export interface RefTable {
  caption?: string;
  head: readonly string[];
  rows: readonly (readonly string[])[];
  numericFrom?: number;
}

export type Block =
  | { kind: "p"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "note"; text: string }
  | { kind: "formula"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "table"; table: RefTable }
  | { kind: "fill"; label: string; hint?: string };

export interface Step {
  n: number;
  title: string;
  blocks: readonly Block[];
}

export const STEPS: readonly Step[] = [
  {
    n: 1,
    title: "Build the inventory",
    blocks: [
      {
        kind: "lead",
        text: "List up to eight recurring tasks. Not projects. Not decisions. Tasks: work that happens on a schedule or a trigger, gets done roughly the same way, and produces a predictable output.",
      },
      {
        kind: "p",
        text: "Three prompts that surface most of the list in about five minutes:",
      },
      {
        kind: "list",
        items: [
          "The Friday question. What does someone assemble every week that is mostly copying from one place into another?",
          "The interruption question. What arrives by email and has to be typed into a system?",
          "The chase question. What does someone spend time chasing because it did not arrive on time or in the right format?",
        ],
      },
      {
        kind: "p",
        text: "What does not belong on this list: anything that requires a judgment call that changes case by case, anything done fewer than a dozen times a year, anything where the hard part is a relationship. Those are real work, they are just not this.",
      },
      {
        kind: "table",
        table: {
          head: ["#", "Task", "Who does it", "How often", "Minutes each time"],
          rows: [
            ["1", "", "", "", ""],
            ["2", "", "", "", ""],
            ["3", "", "", "", ""],
            ["4", "", "", "", ""],
            ["5", "", "", "", ""],
            ["6", "", "", "", ""],
            ["7", "", "", "", ""],
            ["8", "", "", "", ""],
          ],
        },
      },
      {
        kind: "note",
        text: "If you cannot fill four rows, this is not your bottleneck and no amount of automation will help. That is a genuinely useful answer.",
      },
    ],
  },
  {
    n: 2,
    title: "Convert to hours per year",
    blocks: [
      {
        kind: "lead",
        text: "Annual hours is the only unit that makes tasks comparable. A twenty minute daily job beats a four hour monthly one, and almost nobody guesses that correctly.",
      },
      {
        kind: "formula",
        text: "Hours per year = times per week × minutes each time × 52 ÷ 60",
      },
      {
        kind: "table",
        table: {
          caption: "Or use the reference table.",
          head: ["How often", "Time each", "Hours per year"],
          numericFrom: 2,
          rows: [
            ["Daily", "15 min", "65"],
            ["Daily", "30 min", "130"],
            ["Daily", "1 hour", "260"],
            ["Daily", "2 hours", "520"],
            ["Weekly", "1 hour", "52"],
            ["Weekly", "4 hours", "208"],
            ["Monthly", "1 full day", "96"],
          ],
        },
      },
      {
        kind: "note",
        text: "Anchor: one full-time role is 2,080 hours a year. Hold onto that. It becomes the most important number in step 6.",
      },
    ],
  },
  {
    n: 3,
    title: "Price the hours",
    blocks: [
      {
        kind: "lead",
        text: "Use fully loaded cost, not salary. Payroll taxes, insurance, benefits, and overhead put the real number 1.25 to 1.4 times base salary, and 1.3 is the sensible middle.",
      },
      { kind: "formula", text: "Fully loaded hourly rate = salary ÷ 2,080 × 1.3" },
      {
        kind: "table",
        table: {
          head: ["If the person earns", "Fully loaded hourly"],
          numericFrom: 1,
          rows: [
            ["$40,000", "$25"],
            ["$50,000", "$31"],
            ["$60,000", "$38"],
            ["$75,000", "$47"],
            ["$90,000", "$56"],
            ["$110,000", "$69"],
          ],
        },
      },
      {
        kind: "formula",
        text: "Annual cost of the task = hours per year × fully loaded hourly rate",
      },
      {
        kind: "note",
        text: "That total is your gross number. It is real, and it is also the most optimistic version of the truth. Step 5 makes it honest.",
      },
    ],
  },
  {
    n: 4,
    title: "Score how rule-shaped each task is",
    blocks: [
      {
        kind: "lead",
        text: "Cost tells you what a task is worth. This tells you whether it can be handed off at all. Score each task 0 to 3.",
      },
      {
        kind: "list",
        items: [
          "3 · Fully rule-shaped. Same inputs, same steps, same output. A new hire could follow written instructions. Exceptions are rare and recognizable.",
          "2 · Mostly rule-shaped. Standard path covers most cases, with a handful of known exceptions someone routes by hand.",
          "1 · Judgment-heavy. The steps are consistent but the decisions are not. Requires context about this customer, this account, this situation.",
          "0 · Not a task. It looked like a process. It is actually someone's expertise.",
        ],
      },
      {
        kind: "note",
        text: 'Most people score their own work too low. The test is not "could a computer do this," it is "could you write down what you do." If the answer is yes, it is at least a 2, whatever it feels like from the inside.',
      },
      {
        kind: "p",
        text: "Also mark the blast radius. H if a mistake would reach a customer, a regulator, or the bank before anyone caught it. L if it gets caught downstream. This does not change whether you automate. It changes whether a person approves the output before it commits.",
      },
    ],
  },
  {
    n: 5,
    title: "The honest discount",
    blocks: [
      {
        kind: "lead",
        text: "Here is the part most worksheets like this leave out, because leaving it out produces a bigger number. Saved hours are not recovered hours.",
      },
      {
        kind: "p",
        text: "Two things eat the difference. The first is supervision: half of AI users in Microsoft's 2026 survey named quality control of AI output as a skill that is becoming more important, not less. Somebody checks, and that check is real work.",
      },
      {
        kind: "p",
        text: "The second is exceptions. A task that is 90% routine still sends 10% of cases to a human, and those are the slow ones. The routine 90% might take four minutes; the exceptions take twenty.",
      },
      {
        kind: "table",
        table: {
          caption: "Apply a recovery factor to your gross number.",
          head: ["Situation", "Recovery"],
          numericFrom: 1,
          rows: [
            ["Rule-shaped 3, low blast radius, one clean system", "80%"],
            ["Rule-shaped 3, high blast radius or several systems", "65%"],
            ["Rule-shaped 2, any configuration", "50%"],
            ["Rule-shaped 1", "25%, and probably not yet"],
            ["Rule-shaped 0", "0%. Leave it alone."],
          ],
        },
      },
      {
        kind: "formula",
        text: "Net annual value = annual cost × recovery factor",
      },
      {
        kind: "note",
        text: "A worksheet that told you the gross number was your savings would be lying to you, and you would find out in month three. This one will be roughly right, which is more useful.",
      },
    ],
  },
  {
    n: 6,
    title: "Concentrated or scattered?",
    blocks: [
      {
        kind: "lead",
        text: "Two businesses can arrive at the same net number and face completely different decisions. What separates them is whether the hours sit in one place.",
      },
      {
        kind: "p",
        text: "Concentrated. The hours cluster in one or two people, and together they approach or exceed roughly 1,250 hours a year, about 60% of a full-time role. At that density the hours are convertible. You can genuinely not make the next hire, or move that person onto work you have been deferring for a year. The saving is real money and it shows up in the P&L.",
      },
      {
        kind: "p",
        text: "Scattered. The same total hours, spread thinly across six people at three hours a week each. Nobody's job changes. What you get is capacity: three hours a week back for six people, which is worth having and is worth roughly half what the arithmetic suggests, because reclaimed fragments are always worth less than reclaimed blocks.",
      },
      {
        kind: "note",
        text: "Both are worth doing. They are just not the same purchase, and confusing them is how automation projects get killed by a CFO in month four. If you promised headcount savings and delivered scattered capacity, the project failed even though the automation worked perfectly.",
      },
      {
        kind: "fill",
        label: "Concentrated or scattered?",
        hint: "The single most important line on this worksheet.",
      },
    ],
  },
];

export interface Quadrant {
  title: string;
  axis: string;
  body: string;
}

export const QUADRANTS: readonly Quadrant[] = [
  {
    title: "Start here",
    axis: "High hours · rule-shaped",
    body: "This is your first deployment. If there are three tasks in this box, you still do one. The organizations that saw returns went deep on a small number of high-impact cases rather than spreading thin.",
  },
  {
    title: "Redesign first",
    axis: "High hours · judgment-heavy",
    body: "The most expensive mistake in this worksheet is automating this box. The cost is real, so the temptation is real, but you would be encoding an undefined process. Write the procedure down first. Half the time, that alone moves the task into the box to its left.",
  },
  {
    title: "Bundle",
    axis: "Low hours · rule-shaped",
    body: "Individually not worth a project. Three or four together, sharing the same systems and the same data, usually are.",
  },
  {
    title: "Leave it",
    axis: "Low hours · judgment-heavy",
    body: "Genuinely fine. Not everything needs to be optimized.",
  },
];

export interface WorkedRow {
  task: string;
  who: string;
  hours: number;
  rate: number;
  cost: number;
  rule: number;
  blast: "H" | "L";
}

export const WORKED_EXAMPLE: readonly WorkedRow[] = [
  {
    task: "Order entry from emailed POs",
    who: "Ops coord",
    hours: 520,
    rate: 31,
    cost: 16120,
    rule: 3,
    blast: "L",
  },
  {
    task: "Carrier invoice reconciliation",
    who: "Bookkeeper",
    hours: 208,
    rate: 38,
    cost: 7904,
    rule: 3,
    blast: "H",
  },
  {
    task: "Daily customer status emails",
    who: "Ops coord",
    hours: 260,
    rate: 31,
    cost: 8060,
    rule: 3,
    blast: "L",
  },
  {
    task: "Weekly ops report",
    who: "Ops manager",
    hours: 156,
    rate: 47,
    cost: 7332,
    rule: 2,
    blast: "L",
  },
  {
    task: "Chasing missing PODs",
    who: "Ops coord",
    hours: 260,
    rate: 31,
    cost: 8060,
    rule: 2,
    blast: "L",
  },
];

export interface Outcome {
  range: string;
  title: string;
  body: string;
}

export const OUTCOMES: readonly Outcome[] = [
  {
    range: "Under $15,000",
    title: "Not yet",
    body: "The work is real but the project would cost more attention than it returns. Come back when a task grows or when you are about to hire for it. Nobody should sell you anything today.",
  },
  {
    range: "$15,000 – $40,000, scattered",
    title: "You are buying capacity",
    body: "Not headcount. That is a legitimate purchase, just size it honestly. One or two automations on the cleanest tasks, and judge it on whether the people involved say their week got better, not on the P&L.",
  },
  {
    range: "$15,000 – $40,000, concentrated",
    title: "The strongest position here",
    body: "The hours sit in one place, which means handing them off changes something structural. Start with the single task in the top left of your grid.",
  },
  {
    range: "Over $40,000",
    title: "Sequencing matters",
    body: "You almost certainly have more than one deployment worth doing. Tasks share systems and data, so the right first build makes the second cheaper and the wrong one makes it a rebuild. Map the dependencies before committing.",
  },
];

export const SOURCES: readonly string[] = [
  "Microsoft Work Trend Index 2026, fielded February 18 to April 20, 2026 by Edelman Data x Intelligence. 20,000 full-time knowledge workers across ten countries. Source of the 67% organizational versus 32% individual split, the 50% citing quality control of AI output as increasingly important, and the 66% reporting more time on high-value work.",
  'MIT NANDA, "The GenAI Divide: State of AI in Business," 2025. 52 executive interviews, 153 survey responses, 300 public deployments. Source of the operations-versus-marketing return finding and the focused-use-case finding. Directional rather than definitive given sample size.',
  "Fully loaded cost multiplier, 1.25 to 1.4x base salary. Consistent across 2026 US compensation guidance, covering payroll taxes at roughly 7.65% FICA plus benefits and overhead. We use 1.3 as the midpoint.",
  "Error costs. IOFM estimates up to $53.50 to identify, investigate, and resolve a single invoice error. Published manual data entry error rates cluster between 1% and 4% for structured fields, higher for free text.",
];
