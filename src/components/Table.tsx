import Icon from "./Icon";

type ActionType = "edit" | "delete" | "complete";

interface TableProps {
  title?: string;
  data: Array<Record<string, any>>;
  actions?: {
    action: (row: Record<string, any>) => void;
    type: ActionType;
  }[];
}

function Table({ title, data, actions }: TableProps) {
  const columns = Object.keys(data[0] || {});
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table table-auto w-full min-w-max">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={
                    "whitespace-nowrap " + (col === "id" ? "hidden" : "")
                  }
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              {actions && actions.length > 0 && <th className="w-16"></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-base-300">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={
                      "whitespace-nowrap " + (col === "id" ? "hidden" : "")
                    }
                  >
                    {typeof row[col] === "number"
                      ? `$${row[col].toFixed(2)}`
                      : row[col]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td
                    className="whitespace-nowrap w-fit"
                    key={`action-${rowIndex}`}
                  >
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-sm"
                      >
                        <Icon type="dots" />
                      </div>
                      <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 shadow-sm"
                      >
                        {actions.map((action) => (
                          <li key={action.type}>
                            <a onClick={() => action.action(row)}>
                              <Icon type={action.type} />
                              {action.type.charAt(0).toUpperCase() +
                                action.type.slice(1)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
