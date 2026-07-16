import "./style.css";
import { HOME, SEARCH, SETTINGS } from "./generated/icons";

const icons = [
  ["Home", HOME],
  ["Search", SEARCH],
  ["Settings", SETTINGS],
] as const;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Typed SVG sprite</h1>
  <div class="icons">
    ${icons
      .map(
        ([label, href]) => `
          <figure>
            <svg aria-label="${label}" role="img"><use href="${href}"></use></svg>
            <figcaption>${label}</figcaption>
          </figure>
        `,
      )
      .join("")}
  </div>
`;

