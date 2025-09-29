export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** The symbol ID returned from importing an SVG file */
  id: string;
  /** Size shorthand for width and height */
  size?: number | string;
}

const spriteUrl = "/sprite.svg";

export function Icon({
  id,
  size = 24,
  width,
  height,
  className = "",
  viewBox = "0 0 24 24",
  fill = "currentColor",
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      width={width || size}
      height={height || size}
      viewBox={viewBox}
      fill={fill}
      aria-hidden="true"
      {...props}
    >
      <use href={`${spriteUrl}#${id}`} />
    </svg>
  );
}
