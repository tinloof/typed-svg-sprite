import type { LoaderContext } from "webpack";
interface LoaderOptions {
    /**
     * URL path where the sprite file will be served from.
     * This is the base URL that will be prepended to the sprite filename.
     */
    url: string;
    /**
     * Filename for the sprite file.
     * @default "sprite.svg"
     */
    filename?: string;
    /**
     * Directory containing SVG files (relative to project root).
     * Used to generate symbol IDs consistently with the sprite generator.
     * If not provided, uses the project root.
     * @default undefined
     */
    inputDir?: string;
}
/**
 * SVG Sprite Webpack Loader
 *
 * Transforms SVG imports into sprite symbol references.
 *
 * Note: This loader only generates symbol references.
 * You must generate the actual sprite file separately using the CLI tool:
 * `svg-sprite-generate --input <icons-dir> --output <sprite-path>`
 *
 * @example
 * // Input
 * import homeIcon from './icons/home.svg';
 *
 * // Output
 * const homeIcon = '/sprite.svg#icons-home';
 */
declare const svgSpriteLoader: (this: LoaderContext<LoaderOptions>, source: string) => string;
export default svgSpriteLoader;
