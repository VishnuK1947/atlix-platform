export type Platform = "reddit" | "x" | "news";
export type Region =
  | "Bay Area"
  | "LA Metro"
  | "Sacramento"
  | "San Diego"
  | "Orange County"
  | "Inland Empire"
  | "Central Valley"
  | "Central Coast";
export type AgeGroup = "18-21" | "22-25" | "26-29" | "30-34";

export interface Demographics {
  primaryAgeGroup: AgeGroup;
  ageBreakdown: Record<AgeGroup, number>;
  ethnicityBreakdown: Record<string, number>;
}

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
  description: string;
  volume: number;
  velocityPct: number;
  velocityDir: "up" | "down";
  sentiment: { positive: number; neutral: number; negative: number };
  emotions: string[];
  sources: Platform[];
  category: string;
  regions: Region[];
  primaryRegion: Region;
  coordinates: [number, number];
  demographics: Demographics;
  electoralImpact: string;
  trendData: { day: string; volume: number }[];
  samplePosts: SamplePost[];
  keyQuotes: string[];
  relatedIds: string[];
}

export const ALL_REGIONS: Region[] = [
  "Bay Area",
  "LA Metro",
  "Sacramento",
  "San Diego",
  "Orange County",
  "Inland Empire",
  "Central Valley",
  "Central Coast",
];

export const ALL_CATEGORIES = [
  "Housing & Rent",
  "Education & Debt",
  "Climate & Environment",
  "Politics & Representation",
  "Mental Health",
  "Public Safety",
  "Rights & Healthcare",
  "Civic Engagement",
];

export const ALL_AGE_GROUPS: AgeGroup[] = ["18-21", "22-25", "26-29", "30-34"];

export const narratives: Narrative[] = [
  {
    id: "rent-burden",
    title: "Rent Burden Signals Driving Out-Migration Among Young Renters",
    summary:
      "Young Californians earning median wages report spending 45–60% of income on rent. Discourse is shifting from frustration to active planning to leave the state, with out-migration intent up sharply in LA Metro and Bay Area.",
    description:
      "Across Reddit, X, and news coverage, 18-34 year old Californians are expressing not just frustration with rent costs but concrete plans to relocate. Posts from LA Metro and Bay Area show a sharp uptick in threads asking for relocation advice—Austin, Phoenix, and Seattle are the most-cited destinations. The sentiment is less anger and more resignation, with many users citing the gap between wages and housing costs as unbridgeable without generational wealth. Policy-wise, Prop 33 (rent control expansion) is the most-discussed electoral mechanism, with strong support among renters and vocal opposition from property owners. This issue is a top-2 driver of ballot motivation in the 26-34 cohort.",
    volume: 4312,
    velocityPct: 47,
    velocityDir: "up",
    sentiment: { positive: 8, neutral: 18, negative: 74 },
    emotions: ["frustration", "resignation", "anxiety"],
    sources: ["reddit", "x", "news"],
    category: "Housing & Rent",
    regions: ["LA Metro", "Bay Area", "Orange County", "San Diego"],
    primaryRegion: "LA Metro",
    coordinates: [34.0522, -118.2437],
    demographics: {
      primaryAgeGroup: "26-29",
      ageBreakdown: { "18-21": 12, "22-25": 28, "26-29": 38, "30-34": 22 },
      ethnicityBreakdown: { White: 32, Latino: 38, Asian: 18, Black: 9, Other: 3 },
    },
    electoralImpact:
      "Prop 33 (rent control) is the primary ballot mechanism. Out-migration intent may reduce young-voter turnout in affected districts.",
    trendData: [
      { day: "May 2", volume: 210 },
      { day: "May 3", volume: 240 },
      { day: "May 4", volume: 228 },
      { day: "May 5", volume: 260 },
      { day: "May 6", volume: 310 },
      { day: "May 7", volume: 295 },
      { day: "May 8", volume: 340 },
      { day: "May 9", volume: 390 },
      { day: "May 10", volume: 420 },
      { day: "May 11", volume: 460 },
      { day: "May 12", volume: 490 },
      { day: "May 13", volume: 520 },
      { day: "May 14", volume: 560 },
      { day: "May 15", volume: 590 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/silver_lake_renter",
        text: "Paying $2,800 for a 1BR in Silver Lake. Making $72k. After taxes, rent is 52% of my take-home. I have $200 left after groceries and utilities. This isn't a lifestyle problem. It's a structural one. Looking at Austin seriously.",
        engagement: 9200,
      },
      {
        platform: "x",
        username: "@calhousing_data",
        text: "New: 61% of CA renters age 25-34 report spending >40% of income on housing. Up from 48% in 2022. This is the single largest driver of out-migration intent in our survey. Thread ↓",
        engagement: 4700,
      },
      {
        platform: "news",
        username: "LA Times",
        text: "California's housing crisis is increasingly personal for young adults: a new PPIC survey shows 1 in 3 Californians under 35 plan to leave the state within five years, with housing cost cited as the primary driver.",
        engagement: 12800,
      },
      {
        platform: "reddit",
        username: "u/bayarea_exodus_2026",
        text: "My entire friend group from college is scattered now. Most left the Bay. Those of us who stayed are just waiting for the right moment. There's no path to homeownership. The math doesn't work.",
        engagement: 6400,
      },
    ],
    keyQuotes: [
      "This isn't a lifestyle problem. It's a structural one. Looking at Austin seriously.",
      "There's no path to homeownership. The math doesn't work.",
      "I have $200 left after groceries and utilities.",
    ],
    relatedIds: ["student-debt", "civic-disengagement"],
  },
  {
    id: "student-debt",
    title: "Student Debt Relief Uncertainty Tops Young Voter Priority Lists",
    summary:
      "With federal relief programs blocked in courts, discourse among 22-28 year old Californians shows debt burden as a primary lens for evaluating candidates. Frustration with both parties is notable.",
    description:
      "Reddit and X posts from California's young adult cohort show student debt as not just a financial burden but a political litmus test. Users express frustration that debt forgiveness has become a political football, with anger toward both Republicans who blocked programs and Democrats who promised but did not deliver. The emotional tone is cynicism rather than outrage — many express disengagement from electoral politics as a result. However, this issue also shows one of the strongest mobilizing effects: in competitive districts, candidates who specifically address debt are seeing higher youth engagement metrics. The 22-25 cohort shows the highest concentration of debt discourse, particularly among those who graduated 2020-2023.",
    volume: 3187,
    velocityPct: 38,
    velocityDir: "up",
    sentiment: { positive: 12, neutral: 22, negative: 66 },
    emotions: ["frustration", "cynicism", "anxiety"],
    sources: ["reddit", "x", "news"],
    category: "Education & Debt",
    regions: ["Bay Area", "LA Metro", "Sacramento"],
    primaryRegion: "Bay Area",
    coordinates: [37.7749, -122.4194],
    demographics: {
      primaryAgeGroup: "22-25",
      ageBreakdown: { "18-21": 8, "22-25": 52, "26-29": 30, "30-34": 10 },
      ethnicityBreakdown: { White: 38, Latino: 28, Asian: 22, Black: 9, Other: 3 },
    },
    electoralImpact:
      "Top-3 issue driving candidate evaluations in 22-25 cohort. Candidates with specific debt plans see 15-20% higher youth engagement.",
    trendData: [
      { day: "May 2", volume: 160 },
      { day: "May 3", volume: 185 },
      { day: "May 4", volume: 175 },
      { day: "May 5", volume: 200 },
      { day: "May 6", volume: 220 },
      { day: "May 7", volume: 215 },
      { day: "May 8", volume: 240 },
      { day: "May 9", volume: 260 },
      { day: "May 10", volume: 275 },
      { day: "May 11", volume: 290 },
      { day: "May 12", volume: 295 },
      { day: "May 13", volume: 310 },
      { day: "May 14", volume: 325 },
      { day: "May 15", volume: 330 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/grad2022_struggling",
        text: "Both parties have completely failed on student debt. Democrats promised and didn't deliver. Republicans blocked it in court. My $68k in debt is growing while I vote for people who don't care. Not sure why I bother.",
        engagement: 7100,
      },
      {
        platform: "x",
        username: "@youthvote_ca",
        text: "Running candidate comparison on student debt plans in CA-42. The one with a specific debt paydown plan is getting 3x youth volunteer signups. This issue moves young people when candidates actually address it.",
        engagement: 2800,
      },
      {
        platform: "news",
        username: "SF Chronicle",
        text: "A new UC Berkeley poll finds student debt is the second-highest concern among California voters aged 18-29, behind housing and ahead of climate change — a reversal from 2022.",
        engagement: 5600,
      },
    ],
    keyQuotes: [
      "Both parties have completely failed on student debt.",
      "My $68k in debt is growing while I vote for people who don't care.",
      "This issue moves young people when candidates actually address it.",
    ],
    relatedIds: ["rent-burden", "politician-age"],
  },
  {
    id: "climate-anxiety",
    title: "Climate Anxiety Reshapes Career Choices and Political Identity",
    summary:
      "Young Californians in Bay Area and Central Coast report choosing careers, housing, and votes based on climate projections. Discourse is shifting from policy debate to personal adaptation planning.",
    description:
      "Climate discourse among 18-25 year olds in California has moved beyond 'will climate change happen' to 'how do I build my life around it.' Reddit threads in r/bayarea and r/California show users choosing careers in climate tech, avoiding wildfire-risk zip codes when apartment hunting, and evaluating candidates by their climate voting records with granular attention. The emotional profile is complex: anxiety about the future combined with pride in California's climate leadership and frustration that progress is too slow. First-time voters in this cohort show the highest climate-motivation rates of any issue — particularly in Bay Area zip codes.",
    volume: 2834,
    velocityPct: 29,
    velocityDir: "up",
    sentiment: { positive: 15, neutral: 25, negative: 60 },
    emotions: ["anxiety", "urgency", "determination"],
    sources: ["reddit", "x", "news"],
    category: "Climate & Environment",
    regions: ["Bay Area", "Central Coast", "LA Metro"],
    primaryRegion: "Bay Area",
    coordinates: [37.3382, -121.8863],
    demographics: {
      primaryAgeGroup: "18-21",
      ageBreakdown: { "18-21": 42, "22-25": 35, "26-29": 16, "30-34": 7 },
      ethnicityBreakdown: { White: 45, Asian: 28, Latino: 18, Black: 6, Other: 3 },
    },
    electoralImpact:
      "Strongest first-time voter mobilizer in Bay Area 18-21 cohort. Climate voting record is the primary candidate evaluation filter for this segment.",
    trendData: [
      { day: "May 2", volume: 140 },
      { day: "May 3", volume: 155 },
      { day: "May 4", volume: 148 },
      { day: "May 5", volume: 170 },
      { day: "May 6", volume: 185 },
      { day: "May 7", volume: 175 },
      { day: "May 8", volume: 195 },
      { day: "May 9", volume: 210 },
      { day: "May 10", volume: 218 },
      { day: "May 11", volume: 228 },
      { day: "May 12", volume: 240 },
      { day: "May 13", volume: 248 },
      { day: "May 14", volume: 255 },
      { day: "May 15", volume: 262 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/sf_first_time_voter",
        text: "I just turned 18. The reason I registered to vote isn't student debt or even housing — it's climate. I've seen the wildfire smoke every summer since I was 12. I'm voting for whoever has the strongest climate platform, period.",
        engagement: 5400,
      },
      {
        platform: "x",
        username: "@climatetech_careers",
        text: "Career counselors at Bay Area universities report unprecedented demand for climate-focused roles. Students are explicitly citing career-choice-as-activism. The political implications of this cohort are significant.",
        engagement: 1900,
      },
      {
        platform: "news",
        username: "SF Chronicle",
        text: "Young Californians are factoring wildfire risk into apartment searches at record rates, with apps like Climate Check seeing a 400% increase in searches from users aged 18-29.",
        engagement: 8100,
      },
    ],
    keyQuotes: [
      "I'm voting for whoever has the strongest climate platform, period.",
      "I've seen the wildfire smoke every summer since I was 12.",
      "Career counselors report unprecedented demand for climate-focused roles.",
    ],
    relatedIds: ["civic-disengagement", "rent-burden"],
  },
  {
    id: "politician-age",
    title: "Politician Age Gap Fuels Disillusionment and Third-Party Curiosity",
    summary:
      "The average age of California's state legislators is 54. Young Californians are citing this gap as a reason to explore third-party candidates, particularly in competitive Assembly and Senate districts.",
    description:
      "Discourse around politician age has intensified since the 2024 national election cycle highlighted cognitive fitness concerns among older leaders. California-specific threads show 18-30 year olds connecting this frustration to local races — not just federal. Users express a desire for 'people who have to live with the decisions they make' and frequently call out the disconnect between legislators who will be retired before the consequences of current policy materialize. Third-party exploration (Green Party, independent candidates) is mentioned most often in this context. Sacramento-focused discourse is the highest-volume, with strong secondary signal from LA Metro. This narrative is most pressing for the 18-25 cohort.",
    volume: 3620,
    velocityPct: 52,
    velocityDir: "up",
    sentiment: { positive: 10, neutral: 24, negative: 66 },
    emotions: ["disillusionment", "frustration", "curiosity"],
    sources: ["reddit", "x", "news"],
    category: "Politics & Representation",
    regions: ["Sacramento", "LA Metro", "Bay Area"],
    primaryRegion: "Sacramento",
    coordinates: [38.5816, -121.4944],
    demographics: {
      primaryAgeGroup: "18-21",
      ageBreakdown: { "18-21": 45, "22-25": 32, "26-29": 16, "30-34": 7 },
      ethnicityBreakdown: { White: 40, Latino: 30, Asian: 18, Black: 9, Other: 3 },
    },
    electoralImpact:
      "Driving third-party ballot exploration in competitive Assembly districts. Strongest disengagement signal in 18-21 cohort — risk of depressed turnout.",
    trendData: [
      { day: "May 2", volume: 165 },
      { day: "May 3", volume: 195 },
      { day: "May 4", volume: 188 },
      { day: "May 5", volume: 220 },
      { day: "May 6", volume: 255 },
      { day: "May 7", volume: 245 },
      { day: "May 8", volume: 280 },
      { day: "May 9", volume: 310 },
      { day: "May 10", volume: 335 },
      { day: "May 11", volume: 348 },
      { day: "May 12", volume: 360 },
      { day: "May 13", volume: 375 },
      { day: "May 14", volume: 390 },
      { day: "May 15", volume: 400 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/sacto_young_dem",
        text: "The average age of the California legislature is 54. I'm 22. They will be retired or dead before the climate legislation they pass today actually matters. I want representatives who have to live with their decisions.",
        engagement: 11400,
      },
      {
        platform: "x",
        username: "@youngca_politics",
        text: "Every candidate forum I attend is dominated by people 3x my age asking about issues that don't affect me. Watching two 70-year-olds debate housing policy for young people is actually insane.",
        engagement: 6800,
      },
      {
        platform: "news",
        username: "CalMatters",
        text: "Young California voters are showing increased interest in third-party and independent candidates, with write-in and Green Party registrations up 22% among voters aged 18-29 since January.",
        engagement: 7200,
      },
    ],
    keyQuotes: [
      "I want representatives who have to live with their decisions.",
      "They will be retired or dead before the climate legislation they pass today actually matters.",
      "Watching two 70-year-olds debate housing policy for young people is actually insane.",
    ],
    relatedIds: ["civic-disengagement", "student-debt"],
  },
  {
    id: "mental-health",
    title: "Mental Health Access Crisis Galvanizes Youth Advocacy and Ballot Engagement",
    summary:
      "California's youth mental health crisis is driving both personal testimony and policy advocacy across Reddit and X. Prop 1 funding debates are the primary policy hook.",
    description:
      "Mental health discourse among young Californians spans both personal testimony and policy advocacy, making it unusually emotionally intense. Posts range from first-person accounts of inability to access therapy (long waitlists, insurance denials, cost barriers) to analysis of Prop 1 spending on psychiatric beds versus community services. The 22-28 cohort shows the most political engagement on this issue, often connecting mental health access directly to housing and debt stress as compounding factors. This narrative shows strong cross-demographic signal — appearing across ethnicity and regional lines more consistently than any other issue. It is also one of the strongest positive-mobilization narratives: users who engage with this issue are more likely to report voting intentions.",
    volume: 2918,
    velocityPct: 33,
    velocityDir: "up",
    sentiment: { positive: 18, neutral: 28, negative: 54 },
    emotions: ["vulnerability", "solidarity", "determination"],
    sources: ["reddit", "x", "news"],
    category: "Mental Health",
    regions: ["Bay Area", "LA Metro", "Sacramento", "San Diego", "Central Valley"],
    primaryRegion: "Central Valley",
    coordinates: [36.7378, -119.7871],
    demographics: {
      primaryAgeGroup: "22-25",
      ageBreakdown: { "18-21": 22, "22-25": 40, "26-29": 28, "30-34": 10 },
      ethnicityBreakdown: { White: 35, Latino: 32, Asian: 20, Black: 10, Other: 3 },
    },
    electoralImpact:
      "Strongest positive-mobilization issue across demographics. Voters who engage with this issue show 28% higher stated voting intent than the baseline.",
    trendData: [
      { day: "May 2", volume: 145 },
      { day: "May 3", volume: 162 },
      { day: "May 4", volume: 158 },
      { day: "May 5", volume: 178 },
      { day: "May 6", volume: 192 },
      { day: "May 7", volume: 185 },
      { day: "May 8", volume: 205 },
      { day: "May 9", volume: 220 },
      { day: "May 10", volume: 230 },
      { day: "May 11", volume: 238 },
      { day: "May 12", volume: 248 },
      { day: "May 13", volume: 255 },
      { day: "May 14", volume: 265 },
      { day: "May 15", volume: 270 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/waitlist_for_therapy",
        text: "Three months on a waitlist for a therapist in San Jose. Finally got a call back — $280/session, insurance doesn't cover it. I make $55k. This is a policy failure, not a personal one. Voting for anyone who takes this seriously.",
        engagement: 8300,
      },
      {
        platform: "x",
        username: "@prop1_analysis",
        text: "Prop 1 allocated $6.4B for mental health. Where is it? Community mental health centers are still 6-month waitlists. The money went to inpatient beds, not the outpatient infrastructure that actually helps young people.",
        engagement: 3100,
      },
      {
        platform: "news",
        username: "CalMatters",
        text: "California's mental health system is seeing a 'two-tier crisis': those with severe psychiatric needs competing for beds with young adults seeking outpatient therapy, with neither group adequately served.",
        engagement: 9400,
      },
    ],
    keyQuotes: [
      "This is a policy failure, not a personal one. Voting for anyone who takes this seriously.",
      "$280/session, insurance doesn't cover it. I make $55k.",
      "The money went to inpatient beds, not the outpatient infrastructure that actually helps young people.",
    ],
    relatedIds: ["rent-burden", "civic-disengagement"],
  },
  {
    id: "gun-violence",
    title: "Campus Safety Anxiety Converts Passive Observers to First-Time Voters",
    summary:
      "Fear around campus and urban gun violence is one of the strongest first-time voter registration drivers in California's 18-21 cohort, particularly in LA Metro and San Diego.",
    description:
      "Gun violence discourse among young Californians is framed primarily through campus safety and personal safety in urban environments. Unlike older cohorts, 18-21 year olds rarely argue about the Second Amendment in abstract terms — they write about specific incidents at schools they attended or events they were present at. The mobilization signal is strong: users who engage with this topic report converting from 'I don't vote' to active registration at higher rates than any other issue. San Diego and LA Metro show the highest concentration, with UC and CSU campuses generating significant discourse clusters. The political preference is clear — strong gun regulation is supported across the ideological spectrum in this cohort.",
    volume: 2541,
    velocityPct: 41,
    velocityDir: "up",
    sentiment: { positive: 11, neutral: 21, negative: 68 },
    emotions: ["fear", "anger", "determination"],
    sources: ["reddit", "x", "news"],
    category: "Public Safety",
    regions: ["LA Metro", "San Diego", "Bay Area"],
    primaryRegion: "San Diego",
    coordinates: [32.7157, -117.1611],
    demographics: {
      primaryAgeGroup: "18-21",
      ageBreakdown: { "18-21": 55, "22-25": 28, "26-29": 12, "30-34": 5 },
      ethnicityBreakdown: { White: 38, Latino: 32, Asian: 18, Black: 9, Other: 3 },
    },
    electoralImpact:
      "Highest first-time voter conversion rate of any issue in 18-21 cohort. Strong mobilization signal in competitive Assembly and congressional districts near campuses.",
    trendData: [
      { day: "May 2", volume: 120 },
      { day: "May 3", volume: 145 },
      { day: "May 4", volume: 138 },
      { day: "May 5", volume: 162 },
      { day: "May 6", volume: 188 },
      { day: "May 7", volume: 178 },
      { day: "May 8", volume: 205 },
      { day: "May 9", volume: 228 },
      { day: "May 10", volume: 240 },
      { day: "May 11", volume: 248 },
      { day: "May 12", volume: 255 },
      { day: "May 13", volume: 262 },
      { day: "May 14", volume: 270 },
      { day: "May 15", volume: 278 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/ucsd_freshman",
        text: "I never thought about voting until my high school had a lockdown drill every month for three years. I'm registered now. Voting entirely on gun policy. This isn't abstract for us.",
        engagement: 7600,
      },
      {
        platform: "x",
        username: "@ca_youth_safety",
        text: "At every campus town hall we run, gun violence is the top issue among students who say they weren't planning to vote. It's the single strongest first-time voter conversion issue we've seen. Data is consistent across 14 campuses.",
        engagement: 2400,
      },
      {
        platform: "news",
        username: "LA Times",
        text: "First-time voter registrations in California hit a five-year high for the 18-21 cohort, with campus voter registration drives citing gun safety as the primary motivating topic in outreach conversations.",
        engagement: 10200,
      },
    ],
    keyQuotes: [
      "This isn't abstract for us.",
      "I never thought about voting until my high school had a lockdown drill every month.",
      "It's the single strongest first-time voter conversion issue we've seen.",
    ],
    relatedIds: ["politician-age", "reproductive-rights"],
  },
  {
    id: "reproductive-rights",
    title: "Post-Dobbs Reproductive Rights Discourse Remains a Primary Voter Mobilizer",
    summary:
      "Two years post-Dobbs, reproductive rights remain a top-3 mobilizing issue for young California women voters and a significant cross-gender solidarity driver.",
    description:
      "Reproductive rights discourse among 18-34 year old Californians has maintained high volume and emotional intensity since the Dobbs decision, unlike the predicted 'issue fatigue' some analysts projected. While California's legal protections are strong, the discourse has shifted from 'protecting California' to 'what happens if I travel, if federal law changes, if a different administration shifts policy.' Young women in LA Metro, Bay Area, and San Diego show the strongest engagement. Cross-gender solidarity signal is also notable — approximately 30% of high-engagement posts on this topic come from male-identified users expressing solidarity. The issue functions primarily as a pro-turnout signal for already-registered voters rather than a first-time registration driver.",
    volume: 3104,
    velocityPct: 35,
    velocityDir: "up",
    sentiment: { positive: 22, neutral: 20, negative: 58 },
    emotions: ["fear", "solidarity", "determination"],
    sources: ["reddit", "x", "news"],
    category: "Rights & Healthcare",
    regions: ["LA Metro", "Bay Area", "San Diego"],
    primaryRegion: "LA Metro",
    coordinates: [33.9731, -118.2479],
    demographics: {
      primaryAgeGroup: "22-25",
      ageBreakdown: { "18-21": 25, "22-25": 38, "26-29": 27, "30-34": 10 },
      ethnicityBreakdown: { White: 42, Latino: 30, Asian: 16, Black: 9, Other: 3 },
    },
    electoralImpact:
      "Primary pro-turnout signal for already-registered 22-30 women voters. Cross-gender solidarity effect adds secondary male voter mobilization in liberal districts.",
    trendData: [
      { day: "May 2", volume: 155 },
      { day: "May 3", volume: 172 },
      { day: "May 4", volume: 165 },
      { day: "May 5", volume: 188 },
      { day: "May 6", volume: 204 },
      { day: "May 7", volume: 198 },
      { day: "May 8", volume: 218 },
      { day: "May 9", volume: 232 },
      { day: "May 10", volume: 244 },
      { day: "May 11", volume: 252 },
      { day: "May 12", volume: 258 },
      { day: "May 13", volume: 265 },
      { day: "May 14", volume: 272 },
      { day: "May 15", volume: 280 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/la_woman_voter",
        text: "California protects us now. But I think about every time I travel to see family in Texas. What if a Republican wins federally and changes things? I vote on this issue every single election. It doesn't go away for me.",
        engagement: 6200,
      },
      {
        platform: "x",
        username: "@dobbs_watch_ca",
        text: "Two years post-Dobbs, CA youth voter registration among women 18-29 is still running 34% above the pre-Dobbs baseline. The energy hasn't dissipated. It's structural now.",
        engagement: 3800,
      },
      {
        platform: "news",
        username: "CalMatters",
        text: "A new survey finds 71% of California women aged 18-34 cite reproductive rights as a top-3 voting issue — essentially unchanged from 2022, defying predictions that the issue would fade without a ballot measure.",
        engagement: 11600,
      },
    ],
    keyQuotes: [
      "I vote on this issue every single election. It doesn't go away for me.",
      "The energy hasn't dissipated. It's structural now.",
      "71% of California women aged 18-34 cite reproductive rights as a top-3 voting issue.",
    ],
    relatedIds: ["gun-violence", "mental-health"],
  },
  {
    id: "civic-disengagement",
    title: "Civic Disengagement Growing Among First-Time Eligible Voters in Inland Regions",
    summary:
      "18-21 year olds in Inland Empire and Central Valley show the highest rates of electoral cynicism in California. Discourse centers on 'nothing changes' fatigue and distrust of both parties.",
    description:
      "The civic disengagement narrative is distinct from other issues: it's not driven by a single policy failure but by accumulated frustration with the political system itself. Reddit threads and X posts from Inland Empire and Central Valley zip codes show 18-21 year olds expressing that voting 'doesn't matter' more than any other California region. The discourse is notably cross-partisan — disillusionment is expressed equally toward Democrats who 'promise and don't deliver' and Republicans who 'don't represent us on anything.' Latino voters in this cohort, who represent the largest ethnic bloc in these regions, show particularly strong disengagement signal. Strategically, this narrative represents the largest untapped pool of potential votes in California — mobilizing even 20% of disengaged 18-21 Inland Empire voters would shift multiple competitive Assembly seats.",
    volume: 1870,
    velocityPct: 18,
    velocityDir: "up",
    sentiment: { positive: 8, neutral: 30, negative: 62 },
    emotions: ["cynicism", "resignation", "frustration"],
    sources: ["reddit", "x", "news"],
    category: "Civic Engagement",
    regions: ["Inland Empire", "Central Valley", "Sacramento"],
    primaryRegion: "Inland Empire",
    coordinates: [34.1083, -117.2898],
    demographics: {
      primaryAgeGroup: "18-21",
      ageBreakdown: { "18-21": 62, "22-25": 25, "26-29": 10, "30-34": 3 },
      ethnicityBreakdown: { Latino: 52, White: 28, Black: 12, Asian: 5, Other: 3 },
    },
    electoralImpact:
      "Largest untapped potential vote pool in California. Mobilizing 20% of disengaged 18-21 Inland Empire voters would shift 3-4 competitive Assembly seats.",
    trendData: [
      { day: "May 2", volume: 88 },
      { day: "May 3", volume: 100 },
      { day: "May 4", volume: 95 },
      { day: "May 5", volume: 110 },
      { day: "May 6", volume: 120 },
      { day: "May 7", volume: 115 },
      { day: "May 8", volume: 128 },
      { day: "May 9", volume: 138 },
      { day: "May 10", volume: 145 },
      { day: "May 11", volume: 150 },
      { day: "May 12", volume: 155 },
      { day: "May 13", volume: 160 },
      { day: "May 14", volume: 165 },
      { day: "May 15", volume: 168 },
    ],
    samplePosts: [
      {
        platform: "reddit",
        username: "u/fontana_21",
        text: "I turned 18 in January. I'm not registering. Democrats promise everything and deliver nothing. Republicans don't even try. There's literally no one to vote for who understands what it's like to grow up in Fontana.",
        engagement: 4900,
      },
      {
        platform: "x",
        username: "@ie_youth_org",
        text: "Running registration drives in the IE. The #1 response when we ask why people aren't registered: 'nothing changes.' Not apathy — active cynicism. These are motivated non-voters. The right message can move them.",
        engagement: 1800,
      },
      {
        platform: "news",
        username: "Press-Enterprise",
        text: "Inland Empire voter registration rates among 18-21 year olds lag the statewide average by 18 percentage points, a gap that has widened every election cycle since 2018, according to the CA Secretary of State's office.",
        engagement: 3400,
      },
    ],
    keyQuotes: [
      "There's literally no one to vote for who understands what it's like to grow up in Fontana.",
      "Not apathy — active cynicism. These are motivated non-voters.",
      "The right message can move them.",
    ],
    relatedIds: ["politician-age", "rent-burden"],
  },
];

export const mockChatResponses: Record<string, { answer: string; citations: string[] }> = {
  rent: {
    answer:
      "Rent burden is the highest-volume narrative among young California voters right now, with 4,312 posts and a 47% week-over-week spike. The dominant emotional shift is from frustration to resignation — discourse has moved from 'this is unfair' to 'I'm planning to leave.' LA Metro and Bay Area show the strongest signal. Out-migration intent is up sharply in the 26-29 cohort, and Prop 33 (rent control expansion) is the primary electoral mechanism being discussed. Candidates who engage specifically on rent burden with concrete plans are seeing measurably higher youth engagement in competitive districts.",
    citations: ["Reddit · r/LosAngeles", "Reddit · r/bayarea", "LA Times"],
  },
  housing: {
    answer:
      "Rent burden is the highest-volume narrative among young California voters right now, with 4,312 posts and a 47% week-over-week spike. The dominant emotional shift is from frustration to resignation — discourse has moved from 'this is unfair' to 'I'm planning to leave.' LA Metro and Bay Area show the strongest signal. Out-migration intent is up sharply in the 26-29 cohort, and Prop 33 (rent control expansion) is the primary electoral mechanism being discussed.",
    citations: ["Reddit · r/LosAngeles", "Reddit · r/bayarea", "LA Times"],
  },
  student: {
    answer:
      "Student debt is framing candidate evaluations for the 22-25 cohort more than any other issue. The emotional tone is cynicism rather than outrage — frustration that both parties have failed to deliver. However, this cuts both ways: candidates who propose specific debt plans see 15-20% higher youth volunteer signups in our data. 3,187 posts in the last 7 days with a 38% velocity increase, concentrated in Bay Area, LA Metro, and Sacramento.",
    citations: ["Reddit · r/studentloans", "SF Chronicle", "X · @youthvote_ca"],
  },
  debt: {
    answer:
      "Student debt is framing candidate evaluations for the 22-25 cohort more than any other issue. The emotional tone is cynicism rather than outrage — frustration that both parties have failed to deliver. However, this cuts both ways: candidates who propose specific debt plans see 15-20% higher youth volunteer signups in our data.",
    citations: ["Reddit · r/studentloans", "SF Chronicle", "X · @youthvote_ca"],
  },
  climate: {
    answer:
      "Climate anxiety is the strongest first-time voter mobilizer in the Bay Area 18-21 cohort. Unlike other issues, the discourse has moved past 'will this happen' to 'how do I build my life around it' — young Californians are factoring climate projections into career choices, zip codes, and voting decisions simultaneously. 2,834 posts, 29% velocity increase. Candidates are being evaluated on climate voting records with granular attention by this cohort.",
    citations: ["Reddit · r/California", "SF Chronicle", "X · @climatetech_careers"],
  },
  politician: {
    answer:
      "The politician age gap is the fastest-growing narrative this week at 52% velocity — and it's the primary driver of third-party exploration in competitive Assembly districts. The discourse is distinct from abstract 'old politicians bad' sentiment — it's specifically about decision-makers who won't live with the long-term consequences of their choices. Sacramento is the highest-volume region. Third-party and independent registrations among 18-29 voters are up 22% since January.",
    citations: ["Reddit · r/California", "CalMatters", "X · @youngca_politics"],
  },
  age: {
    answer:
      "The politician age gap is the fastest-growing narrative this week at 52% velocity — and it's the primary driver of third-party exploration in competitive Assembly districts. Sacramento is the highest-volume region. Third-party registrations among 18-29 voters are up 22% since January.",
    citations: ["Reddit · r/California", "CalMatters"],
  },
  mental: {
    answer:
      "Mental health is the most cross-demographic issue in the dataset — appearing consistently across ethnicity and region lines more than any other narrative. It shows the strongest positive mobilization signal: users engaging with this topic report voting intentions at 28% higher rates than baseline. The policy focus is Prop 1 spending allocation — community services versus inpatient beds. 2,918 posts, 33% velocity increase.",
    citations: ["Reddit · r/California", "CalMatters", "X · @prop1_analysis"],
  },
  gun: {
    answer:
      "Gun violence is the #1 first-time voter conversion issue in the 18-21 cohort. Campus voter registration drives cite it as the primary mobilizing topic. The discourse is personal, not abstract — posts reference specific lockdown drills, specific incidents at schools attended. 2,541 posts, 41% velocity. San Diego and LA Metro are the highest-volume regions, concentrated near UC and CSU campuses.",
    citations: ["Reddit · r/ucsd", "LA Times", "X · @ca_youth_safety"],
  },
  voting: {
    answer:
      "Civic disengagement is the most strategically significant narrative in the dataset for campaigns. 18-21 year olds in Inland Empire and Central Valley are expressing active cynicism — not apathy — about the electoral system. This is a motivated non-voter pool. Latino voters in these regions show the strongest disengagement signal. Mobilizing 20% of disengaged IE 18-21 voters would shift 3-4 competitive Assembly seats. The right message on rent, student debt, or representation can move this group.",
    citations: ["Reddit · r/InlandEmpire", "Press-Enterprise", "X · @ie_youth_org"],
  },
  disengagement: {
    answer:
      "Civic disengagement is the most strategically significant narrative in the dataset for campaigns. 18-21 year olds in Inland Empire and Central Valley show the highest rates of electoral cynicism in California. This is a motivated non-voter pool. Mobilizing 20% of disengaged IE 18-21 voters would shift 3-4 competitive Assembly seats.",
    citations: ["Reddit · r/InlandEmpire", "Press-Enterprise"],
  },
  reproductive: {
    answer:
      "Reproductive rights remains a top-3 mobilizing issue for young California women voters — the 'issue fatigue' that analysts predicted has not materialized. Women's voter registration in the 18-29 cohort is still running 34% above pre-Dobbs baseline. The discourse has shifted from 'protecting California' to 'what happens if federal law changes.' 3,104 posts, 35% velocity. Functions primarily as a pro-turnout signal for already-registered voters.",
    citations: ["Reddit · r/California", "CalMatters", "X · @dobbs_watch_ca"],
  },
  default: {
    answer:
      "Across all narratives in the California 18-34 dataset, the most pressing signals right now are: (1) Rent burden is at 4,312 posts with a 47% velocity spike — out-migration intent is the new dominant emotion. (2) Politician age gap is the fastest-growing at 52% — driving third-party exploration and is a depressed-turnout risk. (3) Gun violence is the strongest first-time voter conversion driver in the 18-21 cohort. (4) Civic disengagement in Inland Empire represents the largest single pool of mobilizable votes. Would you like me to go deeper on any of these?",
    citations: ["Reddit · r/California", "LA Times", "X · trending"],
  },
};
