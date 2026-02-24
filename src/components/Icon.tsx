type IconList =
  | "chart"
  | "list"
  | "repeat"
  | "dollar"
  | "plus"
  | "inbox"
  | "inboxPlus"
  | "inboxMinus"
  | "edit"
  | "delete"
  | "complete"
  | "dots";

interface IconProps {
  type: IconList;
  className?: string;
}

const svgPaths: { [key in IconProps["type"]]: React.ReactElement } = {
  chart: (
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <path d="M21 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6V3" />
      <path d="M14.5 7v9a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 17 5.5h-1A1.5 1.5 0 0 0 14.5 7m-7 4v5A1.5 1.5 0 0 0 9 17.5h1a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 10 9.5H9A1.5 1.5 0 0 0 7.5 11" />
    </g>
  ),
  list: (
    <path
      fill="currentColor"
      d="M11 5.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zm0 5.5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zm0 5.5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zM6.25 4.5a.75.75 0 0 0-1.068-.68l-2 .938a.75.75 0 0 0 .636 1.359l.932-.437v4.445a.75.75 0 0 0 1.5 0zm-2 10.781c0-.317.29-.656.75-.656h.04c.439 0 .71.322.71.618a.7.7 0 0 1-.16.444l-2.676 3.345A.75.75 0 0 0 3.5 20.25h3a.75.75 0 1 0 0-1.5H5.06l1.701-2.126a2.2 2.2 0 0 0 .49-1.38c0-1.216-1.037-2.12-2.21-2.12H5c-1.196 0-2.25.921-2.25 2.157v.174a.75.75 0 0 0 1.5 0z"
    />
  ),
  repeat: (
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <path d="m17 3l4 3l-4 3" />
      <path d="M3 12v-2a4 4 0 0 1 4-4h14M7 21l-4-3l4-3" />
      <path d="M21 12v2a4 4 0 0 1-4 4H3" />
    </g>
  ),
  dollar: (
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M17 5h-5m0 0H9.5a3.5 3.5 0 1 0 0 7H12m0-7V3m0 2v7m0 0h2.5a3.5 3.5 0 1 1 0 7H12m0-7v7m0 0H6m6 0v2"
    />
  ),
  plus: (
    <path
      fill="currentColor"
      d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
    />
  ),
  inbox: (
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <path d="M3.25 13h3.68a2 2 0 0 1 1.664.89l.812 1.22a2 2 0 0 0 1.664.89h1.86a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 17.07 13h3.68" />
      <path d="m5.45 4.11l-2.162 7.847A8 8 0 0 0 3 14.082V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.918a8 8 0 0 0-.288-2.125L18.55 4.11A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11" />
    </g>
  ),
  inboxPlus: (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M3.25 13h3.68a2 2 0 0 1 1.664.89l.812 1.22a2 2 0 0 0 1.664.89h1.86a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 17.07 13h3.68" />
      <path d="m5.45 4.11l-2.162 7.847A8 8 0 0 0 3 14.082V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.918a8 8 0 0 0-.288-2.125L18.55 4.11A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11M12.003 6L12 11.28" />
      <path d="M14.5 9.347L12 12L9.5 9.347" />
    </g>
  ),
  inboxMinus: (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M3.25 13h3.68a2 2 0 0 1 1.664.89l.812 1.22a2 2 0 0 0 1.664.89h1.86a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 17.07 13h3.68" />
      <path d="m5.45 4.11l-2.162 7.847A8 8 0 0 0 3 14.082V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.918a8 8 0 0 0-.288-2.125L18.55 4.11A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11M12.003 12L12 6.72" />
      <path d="M14.5 8.653L12 6L9.5 8.653" />
    </g>
  ),
  edit: (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z" />
      <path d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3" />
    </g>
  ),
  delete: (
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5"
    />
  ),
  complete: (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M3.25 13h3.68a2 2 0 0 1 1.664.89l.812 1.22a2 2 0 0 0 1.664.89h1.86a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 17.07 13h3.68" />
      <path d="m5.45 4.11l-2.162 7.847A8 8 0 0 0 3 14.082V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.918a8 8 0 0 0-.288-2.125L18.55 4.11A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11" />
      <path d="m10.3 8.742l1.034 1.182c.095.108.266.1.35-.017L13.784 7" />
    </g>
  ),
  dots: (
    <path
      fill="currentColor"
      d="M12 11a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 12 11m4 0a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 16 11m-8 0a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 8 11"
    />
  ),
};

function Icon({ type, className }: IconProps) {
  return (
    <svg
      className={`size-[1.2em] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {
        "<!-- Icon from Myna UI Icons by Praveen Juge - https://github.com/praveenjuge/mynaui-icons/blob/main/LICENSE -->"
      }
      {svgPaths[type]}
    </svg>
  );
}

export type { IconList };
export default Icon;
