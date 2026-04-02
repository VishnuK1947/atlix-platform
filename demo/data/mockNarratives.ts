export type Platform = "reddit" | "x" | "news";

export interface SamplePost {
  platform: Platform;
  username: string;
  text: string;
  engagement: number;
}

export interface Narrative {
  id: string;
  title: string;
  summary: string;
  volume: number;
  velocityPct: number;
  velocityDir: "up" | "down";
  sentiment: { positive: number; neutral: number; negative: number };
  emotions: string[];
  sources: Platform[];
  category: string;
  trendData: { day: string; volume: number }[];
  samplePosts: SamplePost[];
  relatedIds: string[];
}

export const narratives: Narrative[] = [
  {
    id: "lapd-overtime",
    title: "LAPD Overtime Budget Scrutiny",
    summary:
      "City council members and residents are questioning LAPD's overtime spending, which has exceeded $200M for the third consecutive year. Critics argue funds should be redirected to community programs, while the department cites staffing shortages.",
    volume: 2341,
    velocityPct: 38,
    velocityDir: "up",
    sentiment: { positive: 8, neutral: 22, negative: 70 },
    emotions: ["anger", "frustration"],
    sources: ["reddit", "x", "news"],
    category: "Public Safety",
    trendData: [
      { day: "Mar 20", volume: 180 },
      { day: "Mar 21", volume: 210 },
      { day: "Mar 22", volume: 195 },
      { day: "Mar 23", volume: 230 },
      { day: "Mar 24", volume: 280 },
      { day: "Mar 25", volume: 260 },
      { day: "Mar 26", volume: 310 },
      { day: "Mar 27", volume: 420 },
      { day: "Mar 28", volume: 510 },
      { day: "Mar 29", volume: 480 },
      { day: "Mar 30", volume: 620 },
      { day: "Mar 31", volume: 740 },
      { day: "Apr 1", volume: 810 },
      { day: "Apr 2", volume: 890 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/lalocal_4823",
        text: "Third year in a row LAPD blows past overtime budget and nothing changes. $200M could fund mental health response teams citywide. This is a policy failure.",
        engagement: 3400,
      },
      {
        platform: "x",
        username: "@policy_watch_la",
        text: "Breaking: City Council budget hearing reveals LAPD overtime hit $218M FY2025. Council members Bass and Raman pushing for a cap. Full thread ↓",
        engagement: 1820,
      },
      {
        platform: "news",
        username: "LA Times",
        text: "LAPD's overtime costs have ballooned to $218 million in fiscal year 2025, prompting calls from several council members to redirect funds toward alternatives to policing.",
        engagement: 5200,
      },
      {
        platform: "reddit",
        username: "u/hollywoodhills99",
        text: "Downvote me if you want but some of that overtime is actual crime response in high-incident areas. The staffing shortage is real. This isn't simple.",
        engagement: 890,
      },
    ],
    relatedIds: ["echo-park-homeless", "metro-expansion"],
  },
  {
    id: "metro-expansion",
    title: "Metro Expansion Public Support",
    summary:
      "Broad public enthusiasm is building around LA Metro's new rail extensions ahead of the 2028 Olympics. Residents are sharing construction progress photos and debating station placement, with strong support across neighborhoods.",
    volume: 1587,
    velocityPct: 22,
    velocityDir: "up",
    sentiment: { positive: 62, neutral: 28, negative: 10 },
    emotions: ["excitement", "hope"],
    sources: ["reddit", "x", "news"],
    category: "Transit",
    trendData: [
      { day: "Mar 20", volume: 90 },
      { day: "Mar 21", volume: 110 },
      { day: "Mar 22", volume: 105 },
      { day: "Mar 23", volume: 130 },
      { day: "Mar 24", volume: 140 },
      { day: "Mar 25", volume: 120 },
      { day: "Mar 26", volume: 150 },
      { day: "Mar 27", volume: 160 },
      { day: "Mar 28", volume: 175 },
      { day: "Mar 29", volume: 190 },
      { day: "Mar 30", volume: 210 },
      { day: "Mar 31", volume: 230 },
      { day: "Apr 1", volume: 240 },
      { day: "Apr 2", volume: 260 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/transitgeek_sg",
        text: "The D Line extension is going to change Westside commuting forever. Finally LA is getting serious about rail. Can't wait for 2025 opening.",
        engagement: 2100,
      },
      {
        platform: "x",
        username: "@urbanismLA",
        text: "New rendering of Wilshire/La Cienega station dropped today and it looks incredible. This is what transit-oriented development should look like.",
        engagement: 940,
      },
      {
        platform: "news",
        username: "Curbed LA",
        text: "Metro's Olympic expansion is ahead of schedule on two of four lines, officials announced Tuesday, citing improved contractor coordination.",
        engagement: 3100,
      },
    ],
    relatedIds: ["olympics-prep", "lapd-overtime"],
  },
  {
    id: "wildfire-recovery",
    title: "Wildfire Recovery Funding Delays",
    summary:
      "Residents displaced by the January Palisades and Altadena fires are expressing growing frustration with the pace of FEMA reimbursements and city permitting for rebuilds. Many report being stuck in limbo months after losing their homes.",
    volume: 3102,
    velocityPct: 15,
    velocityDir: "up",
    sentiment: { positive: 12, neutral: 25, negative: 63 },
    emotions: ["fear", "frustration", "grief"],
    sources: ["reddit", "x", "news"],
    category: "Disaster Recovery",
    trendData: [
      { day: "Mar 20", volume: 310 },
      { day: "Mar 21", volume: 290 },
      { day: "Mar 22", volume: 280 },
      { day: "Mar 23", volume: 300 },
      { day: "Mar 24", volume: 320 },
      { day: "Mar 25", volume: 270 },
      { day: "Mar 26", volume: 285 },
      { day: "Mar 27", volume: 300 },
      { day: "Mar 28", volume: 315 },
      { day: "Mar 29", volume: 330 },
      { day: "Mar 30", volume: 340 },
      { day: "Mar 31", volume: 355 },
      { day: "Apr 1", volume: 370 },
      { day: "Apr 2", volume: 385 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/palisades_displaced",
        text: "90 days since the fire. FEMA still hasn't processed our claim. We're paying rent AND our mortgage on a burned lot. The system is completely broken.",
        engagement: 7800,
      },
      {
        platform: "x",
        username: "@altadena_rebuilds",
        text: "City permit office says 6–9 months before we can even break ground. Meanwhile our neighbors in the valley got permits in 6 weeks. Why the disparity?",
        engagement: 4200,
      },
      {
        platform: "news",
        username: "LA Times",
        text: "California's insurance commissioner ordered a review of claim denial rates after reports showed wildfire victims in affluent areas faced higher denial rates than expected.",
        engagement: 8900,
      },
    ],
    relatedIds: ["lapd-overtime", "echo-park-homeless"],
  },
  {
    id: "airbnb-crackdown",
    title: "Short-Term Rental Crackdown",
    summary:
      "LA's new short-term rental enforcement ordinance is generating backlash from property owners while winning support from housing advocates. Enforcement begins next month with fines up to $2,500/day for non-compliant listings.",
    volume: 1023,
    velocityPct: 44,
    velocityDir: "up",
    sentiment: { positive: 31, neutral: 29, negative: 40 },
    emotions: ["frustration", "relief"],
    sources: ["reddit", "x", "news"],
    category: "Housing",
    trendData: [
      { day: "Mar 20", volume: 40 },
      { day: "Mar 21", volume: 45 },
      { day: "Mar 22", volume: 50 },
      { day: "Mar 23", volume: 60 },
      { day: "Mar 24", volume: 55 },
      { day: "Mar 25", volume: 70 },
      { day: "Mar 26", volume: 80 },
      { day: "Mar 27", volume: 100 },
      { day: "Mar 28", volume: 130 },
      { day: "Mar 29", volume: 150 },
      { day: "Mar 30", volume: 170 },
      { day: "Mar 31", volume: 180 },
      { day: "Apr 1", volume: 195 },
      { day: "Apr 2", volume: 210 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/silverlakelandlord",
        text: "I bought a second unit specifically for short-term rental. This ordinance is going to cost me $40k/year in income. What am I supposed to do?",
        engagement: 1200,
      },
      {
        platform: "x",
        username: "@housingforla",
        text: "Finally. 14,000 units come back to the long-term housing market when this enforcement kicks in. This is what happens when cities actually enforce their laws.",
        engagement: 3300,
      },
      {
        platform: "news",
        username: "Curbed LA",
        text: "LA's short-term rental crackdown is expected to remove between 12,000 and 16,000 listings from platforms like Airbnb and Vrbo starting May 1.",
        engagement: 4100,
      },
    ],
    relatedIds: ["echo-park-homeless", "wildfire-recovery"],
  },
  {
    id: "olympics-prep",
    title: "LA 2028 Olympics Preparedness",
    summary:
      "With 2028 approaching, public discourse is split between excitement over LA's global moment and anxiety about infrastructure readiness, cost overruns, and potential displacement of residents near venue sites.",
    volume: 1344,
    velocityPct: 9,
    velocityDir: "up",
    sentiment: { positive: 55, neutral: 20, negative: 25 },
    emotions: ["excitement", "anxiety"],
    sources: ["reddit", "x", "news"],
    category: "Events",
    trendData: [
      { day: "Mar 20", volume: 85 },
      { day: "Mar 21", volume: 90 },
      { day: "Mar 22", volume: 88 },
      { day: "Mar 23", volume: 95 },
      { day: "Mar 24", volume: 100 },
      { day: "Mar 25", volume: 105 },
      { day: "Mar 26", volume: 110 },
      { day: "Mar 27", volume: 108 },
      { day: "Mar 28", volume: 115 },
      { day: "Mar 29", volume: 120 },
      { day: "Mar 30", volume: 118 },
      { day: "Mar 31", volume: 125 },
      { day: "Apr 1", volume: 130 },
      { day: "Apr 2", volume: 132 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/la2028fan",
        text: "The Rose Bowl renovation is going to be insane. LA is going to show the world what a modern Olympics looks like without building a single new venue.",
        engagement: 2800,
      },
      {
        platform: "x",
        username: "@civic_watch_la",
        text: "Budget now at $7.1B, up from $6.9B last quarter. Pattern holds: Olympics always cost more than projected. Who's going to be holding the bill?",
        engagement: 1500,
      },
    ],
    relatedIds: ["metro-expansion", "lapd-overtime"],
  },
  {
    id: "echo-park-homeless",
    title: "Homeless Shelter Siting Conflict",
    summary:
      "A proposed 200-bed navigation center near Echo Park is facing organized opposition from local residents citing safety and property value concerns, while advocates accuse opponents of NIMBYism blocking critical shelter capacity.",
    volume: 2780,
    velocityPct: 27,
    velocityDir: "up",
    sentiment: { positive: 18, neutral: 20, negative: 62 },
    emotions: ["anger", "frustration", "empathy"],
    sources: ["reddit", "x", "news"],
    category: "Housing",
    trendData: [
      { day: "Mar 20", volume: 200 },
      { day: "Mar 21", volume: 220 },
      { day: "Mar 22", volume: 210 },
      { day: "Mar 23", volume: 250 },
      { day: "Mar 24", volume: 280 },
      { day: "Mar 25", volume: 260 },
      { day: "Mar 26", volume: 290 },
      { day: "Mar 27", volume: 320 },
      { day: "Mar 28", volume: 340 },
      { day: "Mar 29", volume: 330 },
      { day: "Mar 30", volume: 360 },
      { day: "Mar 31", volume: 380 },
      { day: "Apr 1", volume: 390 },
      { day: "Apr 2", volume: 400 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/echo_park_resident",
        text: "Been here 12 years. We support services for unhoused people but a 200-bed facility 100 feet from an elementary school playground is not the right location. This isn't NIMBY, it's site planning.",
        engagement: 4100,
      },
      {
        platform: "x",
        username: "@lahomelesscrisis",
        text: "The Echo Park opposition has blocked 6 shelter proposals in 3 years. At what point is 'site concerns' just anti-homeless policy by another name?",
        engagement: 5600,
      },
      {
        platform: "news",
        username: "LA Times",
        text: "Council District 13 voted 6–2 to pause the Echo Park navigation center proposal, sending it back to the planning commission for a new community engagement process.",
        engagement: 6200,
      },
    ],
    relatedIds: ["lapd-overtime", "airbnb-crackdown"],
  },
  {
    id: "teacher-strike",
    title: "Teacher Strike Threat — LAUSD",
    summary:
      "LAUSD teachers union UTLA has issued a strike notice after contract negotiations broke down over class size caps and mental health staffing ratios. A work stoppage could affect 600,000 students as early as next month.",
    volume: 1890,
    velocityPct: 61,
    velocityDir: "up",
    sentiment: { positive: 20, neutral: 30, negative: 50 },
    emotions: ["frustration", "solidarity", "anxiety"],
    sources: ["reddit", "x", "news"],
    category: "Education",
    trendData: [
      { day: "Mar 20", volume: 60 },
      { day: "Mar 21", volume: 65 },
      { day: "Mar 22", volume: 80 },
      { day: "Mar 23", volume: 100 },
      { day: "Mar 24", volume: 130 },
      { day: "Mar 25", volume: 120 },
      { day: "Mar 26", volume: 160 },
      { day: "Mar 27", volume: 210 },
      { day: "Mar 28", volume: 260 },
      { day: "Mar 29", volume: 280 },
      { day: "Mar 30", volume: 320 },
      { day: "Mar 31", volume: 370 },
      { day: "Apr 1", volume: 400 },
      { day: "Apr 2", volume: 430 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/lausd_teacher_2019",
        text: "35 kids in a room with no AC in a portable building. I've been asking for a counselor referral for one of my students for 6 weeks. This is why we're striking.",
        engagement: 9200,
      },
      {
        platform: "x",
        username: "@utla_solidarity",
        text: "UTLA has filed a 10-day strike notice. If LAUSD doesn't move on class size, 600,000 students could be out of school by May 15. The district has the reserves. This is a choice.",
        engagement: 7400,
      },
      {
        platform: "news",
        username: "LA Times",
        text: "Talks between LAUSD and UTLA collapsed Tuesday after the district rejected proposed class size caps, calling them 'fiscally unsustainable' given current enrollment declines.",
        engagement: 11000,
      },
    ],
    relatedIds: ["lapd-overtime", "echo-park-homeless"],
  },
  {
    id: "ev-charging",
    title: "EV Charging Infrastructure Gaps",
    summary:
      "As EV adoption accelerates across LA, residents in lower-income neighborhoods and multi-family housing report severe shortages of public charging stations, creating an equity gap in the city's green transition.",
    volume: 672,
    velocityPct: 12,
    velocityDir: "down",
    sentiment: { positive: 22, neutral: 45, negative: 33 },
    emotions: ["frustration", "concern"],
    sources: ["reddit", "x", "news"],
    category: "Environment",
    trendData: [
      { day: "Mar 20", volume: 55 },
      { day: "Mar 21", volume: 60 },
      { day: "Mar 22", volume: 58 },
      { day: "Mar 23", volume: 62 },
      { day: "Mar 24", volume: 65 },
      { day: "Mar 25", volume: 50 },
      { day: "Mar 26", volume: 55 },
      { day: "Mar 27", volume: 52 },
      { day: "Mar 28", volume: 50 },
      { day: "Mar 29", volume: 48 },
      { day: "Mar 30", volume: 46 },
      { day: "Mar 31", volume: 45 },
      { day: "Apr 1", volume: 43 },
      { day: "Apr 2", volume: 42 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/compton_ev_driver",
        text: "Bought an EV because of the rebate. Nearest public charger is 4 miles away in a shopping center that charges $0.48/kWh. This 'green transition' was designed for people with garages.",
        engagement: 3800,
      },
      {
        platform: "x",
        username: "@cleanairLA",
        text: "LADWP released their EV charger install map. 78% of new stations are in council districts 5, 11, and 12. The equity problem is getting worse, not better.",
        engagement: 2200,
      },
    ],
    relatedIds: ["metro-expansion", "olympics-prep"],
  },
];

export const mockChatResponses: Record<string, { answer: string; citations: string[] }> = {
  metro: {
    answer:
      "Public discourse around LA Metro is strongly positive, with 1,587 posts in the past two weeks showing a 22% week-over-week increase. The dominant narrative centers on the D Line extension to the Westside and its significance for the 2028 Olympics. Residents are sharing construction progress and celebrating LA's transit ambitions. The primary concern in this narrative is station placement — a minority of voices are pushing back on specific stop locations.",
    citations: ["Reddit · r/LosAngeles", "Reddit · r/urbanplanning", "Curbed LA"],
  },
  transit: {
    answer:
      "Public discourse around LA Metro is strongly positive, with 1,587 posts in the past two weeks showing a 22% week-over-week increase. The dominant narrative centers on the D Line extension to the Westside and its significance for the 2028 Olympics. Residents are sharing construction progress and celebrating LA's transit ambitions. The primary concern in this narrative is station placement — a minority of voices are pushing back on specific stop locations.",
    citations: ["Reddit · r/LosAngeles", "Reddit · r/urbanplanning", "Curbed LA"],
  },
  homeless: {
    answer:
      "Homelessness discourse in LA is currently dominated by a conflict over a proposed 200-bed navigation center near Echo Park, with 2,780 posts and a 27% velocity increase. The conversation is sharply polarized: residents cite proximity to a school and safety concerns, while housing advocates frame opposition as systemic NIMBYism. City Council has paused the proposal, sending it back to planning — a decision that has intensified both sides.",
    citations: ["Reddit · r/LosAngeles", "LA Times", "X · @lahomelesscrisis"],
  },
  housing: {
    answer:
      "Homelessness discourse in LA is currently dominated by a conflict over a proposed 200-bed navigation center near Echo Park, with 2,780 posts and a 27% velocity increase. The conversation is sharply polarized: residents cite proximity to a school and safety concerns, while housing advocates frame opposition as systemic NIMBYism. City Council has paused the proposal, sending it back to planning — a decision that has intensified both sides.",
    citations: ["Reddit · r/LosAngeles", "LA Times", "X · @lahomelesscrisis"],
  },
  wildfire: {
    answer:
      "Wildfire recovery is the highest-volume narrative in LA right now with 3,102 posts. The dominant emotion is frustration — residents displaced by the January Palisades and Altadena fires report FEMA processing delays averaging 90+ days and permitting backlogs of 6–9 months. There is a secondary anger narrative around insurance claim denials, particularly in higher-income affected zip codes, following a state insurance commissioner review.",
    citations: ["Reddit · r/palisadesfire", "LA Times", "X · @altadena_rebuilds"],
  },
  fire: {
    answer:
      "Wildfire recovery is the highest-volume narrative in LA right now with 3,102 posts. The dominant emotion is frustration — residents displaced by the January Palisades and Altadena fires report FEMA processing delays averaging 90+ days and permitting backlogs of 6–9 months. There is a secondary anger narrative around insurance claim denials, particularly in higher-income affected zip codes, following a state insurance commissioner review.",
    citations: ["Reddit · r/palisadesfire", "LA Times", "X · @altadena_rebuilds"],
  },
  lapd: {
    answer:
      "LAPD overtime spending is the fastest-growing negative sentiment narrative this week, with 2,341 posts and a 38% volume spike. The trigger was a city council budget hearing revealing overtime hit $218M in FY2025 — the third consecutive year over budget. Critics are framing this as a policy failure and calling for fund redirection to mental health response. A minority counter-narrative defends the spending by citing real staffing shortages.",
    citations: ["Reddit · r/LosAngeles", "LA Times", "X · @policy_watch_la"],
  },
  police: {
    answer:
      "LAPD overtime spending is the fastest-growing negative sentiment narrative this week, with 2,341 posts and a 38% volume spike. The trigger was a city council budget hearing revealing overtime hit $218M in FY2025 — the third consecutive year over budget. Critics are framing this as a policy failure and calling for fund redirection to mental health response. A minority counter-narrative defends the spending by citing real staffing shortages.",
    citations: ["Reddit · r/LosAngeles", "LA Times", "X · @policy_watch_la"],
  },
  default: {
    answer:
      "Based on current discourse across Reddit, X, and news sources in Los Angeles, the most active narrative right now is LAPD Overtime Budget Scrutiny (2,341 posts, +38% this week). Close behind is Wildfire Recovery Funding Delays (3,102 posts) driven by FEMA processing frustrations, and the LAUSD teacher strike threat which saw a 61% volume spike in the past 72 hours. Would you like me to go deeper on any of these?",
    citations: ["Reddit · r/LosAngeles", "LA Times", "X · trending"],
  },
};
