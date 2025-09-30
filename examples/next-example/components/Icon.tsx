export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** The symbol ID returned from importing an SVG file (can be full href with path) */
  id: string;
  /** Size shorthand for width and height */
  size?: number | string;
}

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
  // If id contains #, it's already a full href, otherwise assume it's just the symbol id
  const href = id.includes("#") ? id : `#${id}`;

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
      <use href={`/_next/${href}`} />
    </svg>
  );
}
