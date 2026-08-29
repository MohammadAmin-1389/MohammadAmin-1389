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

  // Tree growth
  const trunkHeight = 100 + level * 15;
  const trunkWidth = 14 + level * 2;

  const leafRadius = 18 + level * 2;

  // More branches as level increases
  const extraBranches = Math.min(level, 8);

  let branches = "";
  let leaves = "";

  for (let i = 0; i < extraBranches; i++) {
    const side = i % 2 === 0 ? -1 : 1;

    const startX = 450 + side * (i * 8);
    const startY = 260 - i * 20;

    const endX = 450 + side * (100 + i * 15);
    const endY = startY - 70;

    branches += `
      <path
        d="M${startX} ${startY}
           L${endX} ${endY}"
        stroke="#8b5a2b"
        stroke-width="${Math.max(6, 14 - i)}"
        stroke-linecap="round"
      />
    `;

    leaves += `
      <circle
        cx="${endX}"
        cy="${endY}"
        r="${leafRadius}"
        fill="#2ea043"
      />
    `;
  }

  return `
<svg
  width="900"
  height="500"
  viewBox="0 0 900 500"
  xmlns="http://www.w3.org/2000/svg"
>

  <!-- Background -->
  <rect
    width="900"
    height="500"
    rx="20"
    fill="#0d1117"
  />

  <!-- Title -->
  <text
    x="450"
    y="55"
    text-anchor="middle"
    fill="#ffffff"
    font-size="30"
    font-family="Arial"
    font-weight="bold"
  >
    Developer Growth
  </text>

  <!-- Ground -->
  <path
    d="M150 405 Q450 375 750 405"
    stroke="#30363d"
    stroke-width="5"
    fill="none"
  />

  <!-- Main trunk -->
  <path
    d="M450 395
       C440 340 445 280 450 220
       C455 180 450 140 ${level >= 5 ? "L450 100" : "L450 130"}"
    stroke="#8b5a2b"
    stroke-width="${trunkWidth}"
    fill="none"
    stroke-linecap="round"
  />

  <!-- Main branches -->
  <path
    d="M450 275 L340 200"
    stroke="#8b5a2b"
    stroke-width="14"
    stroke-linecap="round"
  />

  <path
    d="M450 250 L560 175"
    stroke="#8b5a2b"
    stroke-width="14"
    stroke-linecap="round"
  />

  ${branches}

  <!-- Leaves -->
  <circle cx="330" cy="185" r="${leafRadius}" fill="#238636"/>
  <circle cx="375" cy="150" r="${leafRadius + 5}" fill="#2ea043"/>
  <circle cx="425" cy="170" r="${leafRadius}" fill="#238636"/>

  <circle cx="500" cy="145" r="${leafRadius + 5}" fill="#2ea043"/>
  <circle cx="550" cy="175" r="${leafRadius}" fill="#238636"/>

  ${leaves}

  <!-- Level -->
  <text
    x="450"
    y="440"
    text-anchor="middle"
    fill="#ffffff"
    font-size="22"
    font-family="Arial"
    font-weight="bold"
  >
    LEVEL ${level}
  </text>

  <!-- Stats -->
  <text
    x="450"
    y="470"
    text-anchor="middle"
    fill="#8b949e"
    font-size="16"
    font-family="Arial"
  >
    ${contributions} Contributions • ${xp} XP
  </text>

</svg>
`;
}

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
