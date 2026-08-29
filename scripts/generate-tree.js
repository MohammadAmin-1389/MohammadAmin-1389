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

  return `
<svg
  width="900"
  height="450"
  viewBox="0 0 900 450"
  xmlns="http://www.w3.org/2000/svg"
>

  <rect
    width="900"
    height="450"
    rx="20"
    fill="#0d1117"
  />

  <text
    x="450"
    y="55"
    text-anchor="middle"
    fill="#ffffff"
    font-size="30"
    font-family="Arial"
    font-weight="bold"
  >
    🌳 Developer Growth
  </text>

  <!-- Ground -->
  <path
    d="M180 370 Q450 340 720 370"
    stroke="#30363d"
    stroke-width="5"
    fill="none"
  />

  <!-- Trunk -->
  <path
    d="M450 360
       C435 310 440 255 450 210
       C460 165 450 120 450 90"
    stroke="#8b5a2b"
    stroke-width="28"
    fill="none"
    stroke-linecap="round"
  />

  <!-- Branches -->
  <path
    d="M450 250 L340 180"
    stroke="#8b5a2b"
    stroke-width="14"
    stroke-linecap="round"
  />

  <path
    d="M450 220 L300 240"
    stroke="#8b5a2b"
    stroke-width="12"
    stroke-linecap="round"
  />

  <path
    d="M450 230 L560 160"
    stroke="#8b5a2b"
    stroke-width="14"
    stroke-linecap="round"
  />

  <path
    d="M450 270 L610 230"
    stroke="#8b5a2b"
    stroke-width="12"
    stroke-linecap="round"
  />

  <!-- Leaves -->
  <circle cx="300" cy="155" r="38" fill="#238636"/>
  <circle cx="350" cy="125" r="45" fill="#2ea043"/>
  <circle cx="400" cy="145" r="40" fill="#238636"/>

  <circle cx="500" cy="125" r="45" fill="#2ea043"/>
  <circle cx="555" cy="145" r="38" fill="#238636"/>
  <circle cx="600" cy="190" r="32" fill="#2ea043"/>

  <circle cx="280" cy="235" r="30" fill="#2ea043"/>
  <circle cx="620" cy="230" r="30" fill="#238636"/>

  <!-- Stats -->

  <text
    x="450"
    y="395"
    text-anchor="middle"
    fill="#ffffff"
    font-size="18"
    font-family="Arial"
  >
    Level ${level} • ${xp} XP • ${contributions} Contributions
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
