import ReactDOM from "react-dom";

export function PreloadSprite() {
  ReactDOM.preload("/sprite.svg", { as: "image" });

  return null;
}
