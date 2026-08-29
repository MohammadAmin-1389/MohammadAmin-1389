const fs = require("fs");

const token = process.env.GROWTH_TREE_TOKEN;

if (!token) {
  throw new Error("GROWTH_TREE_TOKEN is not available");
}

const username = "MohammadAmin-1389";

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

async function getContributions() {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
  });

  const data = await response.json();

  if (data.errors) {
    console.error(data.errors);
    throw new Error("GitHub GraphQL request failed");
  }

  return data.data.user.contributionsCollection
    .contributionCalendar.totalContributions;
}

function createTree(contributions) {
  let level = 1;

  if (contributions >= 100) level = 2;
  if (contributions >= 250) level = 3;
  if (contributions >= 500) level = 4;
  if (contributions >= 800) level = 5;
  if (contributions >= 1200) level = 6;
  if (contributions >= 1700) level = 7;
  if (contributions >= 2300) level = 8;
  if (contributions >= 3000) level = 9;
  if (contributions >= 4000) level = 10;

  const xp = contributions * 10;

  let stage;
  let stageEmoji;

  if (level <= 2) {
    stage = "Seedling";
    stageEmoji = "🌱";
  } else if (level <= 4) {
    stage = "Young Tree";
    stageEmoji = "🌿";
  } else if (level <= 6) {
    stage = "Growing Tree";
    stageEmoji = "🌳";
  } else if (level <= 8) {
    stage = "Mature Tree";
    stageEmoji = "🌳";
  } else {
    stage = "Ancient Tree";
    stageEmoji = "🌲";
  }

  let tree = "";

  // =========================
  // LEVEL 1-2
  // =========================

  if (level <= 2) {
    tree = `
      <!-- Small trunk -->
      <path
        d="M450 390 L450 250"
        stroke="#8b5a2b"
        stroke-width="14"
        stroke-linecap="round"
      />

      <!-- Small branches -->
      <path
        d="M450 300 L400 260"
        stroke="#8b5a2b"
        stroke-width="8"
        stroke-linecap="round"
      />

      <path
        d="M450 285 L500 245"
        stroke="#8b5a2b"
        stroke-width="8"
        stroke-linecap="round"
      />

      <!-- Leaves -->
      <circle cx="395" cy="255" r="25" fill="#2ea043"/>
      <circle cx="505" cy="240" r="25" fill="#238636"/>
      <circle cx="450" cy="220" r="30" fill="#2ea043"/>
    `;
  }

  // =========================
  // LEVEL 3-4
  // =========================

  else if (level <= 4) {
    tree = `
      <!-- Trunk -->
      <path
        d="M450 390
           C445 340 450 300 450 230"
        stroke="#8b5a2b"
        stroke-width="20"
        fill="none"
        stroke-linecap="round"
      />

      <!-- Branches -->
      <path
        d="M450 310 L350 235"
        stroke="#8b5a2b"
        stroke-width="10"
        stroke-linecap="round"
      />

      <path
        d="M450 285 L550 210"
        stroke="#8b5a2b"
        stroke-width="10"
        stroke-linecap="round"
      />

      <!-- Leaves -->
      <circle cx="340" cy="225" r="32" fill="#238636"/>
      <circle cx="390" cy="190" r="38" fill="#2ea043"/>
      <circle cx="450" cy="180" r="42" fill="#238636"/>
      <circle cx="520" cy="175" r="38" fill="#2ea043"/>
      <circle cx="570" cy="205" r="30" fill="#238636"/>
    `;
  }

  // =========================
  // LEVEL 5-6
  // =========================

  else if (level <= 6) {
    tree = `
      <!-- Large trunk -->
      <path
        d="M450 390
           C430 330 440 270 450 200
           C460 160 455 130 450 100"
        stroke="#8b5a2b"
        stroke-width="28"
        fill="none"
        stroke-linecap="round"
      />

      <!-- Main branches -->
      <path
        d="M450 285 L320 185"
        stroke="#8b5a2b"
        stroke-width="14"
        stroke-linecap="round"
      />

      <path
        d="M450 260 L580 165"
        stroke="#8b5a2b"
        stroke-width="14"
        stroke-linecap="round"
      />

      <!-- Leaves -->
      <circle cx="300" cy="175" r="40" fill="#238636"/>
      <circle cx="350" cy="135" r="48" fill="#2ea043"/>
      <circle cx="410" cy="145" r="42" fill="#238636"/>

      <circle cx="490" cy="125" r="48" fill="#2ea043"/>
      <circle cx="550" cy="140" r="45" fill="#238636"/>
      <circle cx="610" cy="175" r="35" fill="#2ea043"/>
    `;
  }

  // =========================
  // LEVEL 7-8
  // =========================

  else if (level <= 8) {
    tree = `
      <!-- Massive trunk -->
      <path
        d="M450 390
           C420 320 435 260 450 190
           C465 140 455 100 450 70"
        stroke="#8b5a2b"
        stroke-width="36"
        fill="none"
        stroke-linecap="round"
      />

      <!-- Branches -->
      <path
        d="M450 285 L280 170"
        stroke="#8b5a2b"
        stroke-width="16"
        stroke-linecap="round"
async function main() {
  const contributions = await getContributions();

  console.log(`Contributions: ${contributions}`);

  const svg = createTree(contributions);

  fs.writeFileSync(
    "assets/growth-tree.svg",
    svg.trim()
  );

  console.log("Growth tree updated successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
