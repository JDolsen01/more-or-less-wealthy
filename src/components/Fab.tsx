import type { JSX } from "react";
import type { IconList } from "./Icon";
import Icon from "./Icon";

interface FabProps {
  className?: string;
  children?: JSX.Element;
  actions: Array<{
    label: string;
    icon: IconList;
    onClick: () => void;
  }>;
}

function Fab({ actions, className, children }: FabProps) {
  return (
    <>
      <div className={`fab ${className}`}>
        {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-lg btn-circle btn-primary"
        >
          <Icon type="plus" />
        </div>

        {/* buttons that show up when FAB is open */}
        {actions.map((action, index) => (
          <div
            className="tooltip tooltip-open tooltip-left"
            data-tip={action.label}
            key={index}
          >
            <button className="btn btn-lg btn-circle" onClick={action.onClick}>
              <Icon type={action.icon} />
            </button>
          </div>
        ))}
      </div>
      {children}
    </>
  );
}

export default Fab;
