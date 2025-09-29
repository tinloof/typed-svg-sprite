import "./styles.css";

// Import SVG files directly - each returns its symbol ID
import homeIcon from "../assets/icons/home.svg";
import userIcon from "../assets/icons/user.svg";
import settingsIcon from "../assets/icons/settings.svg";
import githubIcon from "../assets/icons/social/github.svg";
import googleIcon from "../assets/icons/social/google.svg";
import menuIcon from "../assets/icons/navigation/menu.svg";

// Import the utility functions (you would install these as part of the package)
// For demo purposes, let's create them inline
async function detectSpriteUrl() {
  const commonUrls = [
    "/sprite.svg",
    "/public/sprite.svg",
    "/assets/sprite.svg",
  ];

  for (const url of commonUrls) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) return url;
    } catch {}
  }
  return "/sprite.svg"; // fallback - webpack output directory
}

async function createIcon(symbolId, className = "icon") {
  const spriteUrl = await detectSpriteUrl();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("fill", "currentColor");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `${spriteUrl}#${symbolId}`);

  svg.appendChild(use);
  return svg;
}

// Demo icons with their imported symbol IDs
const demoIcons = [
  { id: homeIcon, name: "Home" },
  { id: userIcon, name: "User" },
  { id: settingsIcon, name: "Settings" },
  { id: githubIcon, name: "GitHub" },
  { id: googleIcon, name: "Google" },
  { id: menuIcon, name: "Menu" },
];

// Render icons in a grid
async function renderIcons() {
  const iconsGrid = document.getElementById("icons-grid");

  console.log("Imported symbol IDs:", {
    homeIcon,
    userIcon,
    settingsIcon,
    githubIcon,
    googleIcon,
    menuIcon,
  });

  for (const { id, name } of demoIcons) {
    const iconCard = document.createElement("div");
    iconCard.className = "icon-card";

    const icon = await createIcon(id);
    const nameDiv = document.createElement("div");
    nameDiv.className = "icon-name";
    nameDiv.textContent = name;

    const idDiv = document.createElement("div");
    idDiv.className = "icon-id";
    idDiv.textContent = id;

    iconCard.appendChild(icon);
    iconCard.appendChild(nameDiv);
    iconCard.appendChild(idDiv);
    iconsGrid.appendChild(iconCard);
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", renderIcons);
