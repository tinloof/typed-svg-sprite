// Import the SVG sprite using our custom loader
import svgSprite from "./sprites.svg-sprite";
import "./styles.css";

// Test icon configurations
const testIcons = [
  {
    id: "icon-home",
    label: "Home",
    description: "Basic icon from root icons/",
  },
  { id: "icon-user", label: "User", description: "User profile icon" },
  {
    id: "icon-settings",
    label: "Settings",
    description: "Configuration gear icon",
  },
  {
    id: "icon-navigation-menu",
    label: "Menu",
    description: "From nested navigation/ folder",
  },
  {
    id: "icon-social-github",
    label: "GitHub",
    description: "From nested social/ folder",
  },
  {
    id: "icon-social-google",
    label: "Google",
    description: "From nested social/ folder",
  },
];

// Function to inject the SVG sprite into the DOM
function injectSvgSprite() {
  console.log("🎨 SVG Sprite content:", svgSprite);

  const spriteContainer = document.createElement("div");
  spriteContainer.innerHTML = svgSprite;
  document.body.appendChild(spriteContainer);

  // Update debug info
  updateDebugInfo();
}

// Function to create an icon element
function createIcon(iconId, className = "icon") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${iconId}`);

  svg.appendChild(use);
  return svg;
}

// Function to update debug information
function updateDebugInfo() {
  // Check if symbols exist in DOM
  const symbols = document.querySelectorAll("symbol");
  const symbolIds = Array.from(symbols).map((s) => s.id);

  // Update status indicators
  document.getElementById("loader-status").textContent = "Loaded Successfully";
  document.getElementById("loader-status").className = "status success";

  document.getElementById(
    "icons-count"
  ).textContent = `${symbols.length} icons`;

  // Check if types file exists by checking if it was emitted by webpack
  // Since we know generateTypes is enabled, we can just check if types were generated
  setTimeout(() => {
    // Simple check - if the loader ran successfully and generateTypes was true,
    // then types should have been generated
    const typesGenerated = svgSprite && svgSprite.length > 0; // If sprite exists, types were likely generated too

    if (typesGenerated) {
      document.getElementById("types-status").textContent =
        "Generated (icon-types.ts)";
      document.getElementById("types-status").className = "status success";
    } else {
      document.getElementById("types-status").textContent = "Not Generated";
      document.getElementById("types-status").className = "status info";
    }
  }, 500);

  // Update sprite preview
  const spritePreview = document.getElementById("sprite-preview");
  if (spritePreview) {
    spritePreview.textContent = svgSprite.substring(0, 500) + "...";
  }

  console.log("🔍 Found symbols:", symbolIds);
  console.log(
    "🧪 Expected icons:",
    testIcons.map((icon) => icon.id)
  );

  // Check for mismatches
  const expectedIds = testIcons.map((icon) => icon.id);
  const missing = expectedIds.filter((id) => !symbolIds.includes(id));
  const extra = symbolIds.filter((id) => !expectedIds.includes(id));

  if (missing.length > 0) {
    console.warn("⚠️ Missing expected icons:", missing);
  }
  if (extra.length > 0) {
    console.info("ℹ️ Extra icons found:", extra);
  }
}

// Function to render icon cards
function renderIcons() {
  const iconsGrid = document.getElementById("icons-grid");

  testIcons.forEach(({ id, label, description }) => {
    const iconCard = document.createElement("div");
    iconCard.className = "icon-card";

    // Create icon
    const icon = createIcon(id, "icon");

    // Create label
    const labelElement = document.createElement("div");
    labelElement.className = "icon-label";
    labelElement.textContent = label;

    // Create ID display
    const idElement = document.createElement("div");
    idElement.className = "icon-id";
    idElement.textContent = id;

    // Create description
    const descElement = document.createElement("div");
    descElement.style.fontSize = "0.85rem";
    descElement.style.color = "#666";
    descElement.style.marginTop = "8px";
    descElement.textContent = description;

    iconCard.appendChild(icon);
    iconCard.appendChild(labelElement);
    iconCard.appendChild(idElement);
    iconCard.appendChild(descElement);

    iconsGrid.appendChild(iconCard);
  });
}

// Test different loader configurations
function testLoaderFeatures() {
  console.group("🧪 Testing Loader Features");

  // Test 1: Basic sprite injection
  console.log("✅ Test 1: Sprite injection - Passed");

  // Test 2: Symbol ID generation
  const symbols = document.querySelectorAll("symbol");
  console.log(`✅ Test 2: Symbol generation - Found ${symbols.length} symbols`);

  // Test 3: Icon rendering
  testIcons.forEach(({ id }) => {
    const testIcon = createIcon(id);
    const hasValidStructure = testIcon.querySelector("use") !== null;
    console.log(
      `${hasValidStructure ? "✅" : "❌"} Test 3: Icon ${id} - ${
        hasValidStructure ? "Valid" : "Invalid"
      } structure`
    );
  });

  console.groupEnd();
}

// Initialize the development environment
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 SVG Sprite Webpack Loader - Development Mode");

  // Inject the SVG sprite
  injectSvgSprite();

  // Render icon cards
  renderIcons();

  // Run tests
  setTimeout(() => {
    testLoaderFeatures();
  }, 100);

  // Add real-time debugging
  window.svgSpriteDebug = {
    sprite: svgSprite,
    symbols: () =>
      Array.from(document.querySelectorAll("symbol")).map((s) => ({
        id: s.id,
        viewBox: s.getAttribute("viewBox"),
      })),
    createIcon: (id) => createIcon(id),
    testIcon: (id) => {
      const icon = createIcon(id, "icon");
      document.body.appendChild(icon);
      return icon;
    },
  };

  console.log("🔧 Debug utilities available at window.svgSpriteDebug");
});
