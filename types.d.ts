// Type declarations for SVG imports processed by svg-sprite-webpack-loader
declare module "*.svg" {
  /**
   * When importing an SVG file with svg-sprite-webpack-loader,
   * you get a string that represents the href to the symbol in the sprite file.
   * This includes both the path to the sprite file and the symbol ID.
   *
   * @example
   * import iconHref from './icon.svg';
   * // iconHref = "/sprite.svg#my-icon"
   *
   * // Use in HTML:
   * <svg><use href={iconHref} /></svg>
   */
  const symbolHref: string;
  export default symbolHref;
}
