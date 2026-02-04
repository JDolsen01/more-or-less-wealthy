import Icon from "./Icon";

type ActionType = "edit" | "delete" | "complete";

interface TableProps {
  title?: string;
  data: Array<Record<string, any>>;
  actions?: {
    action?: (row: Record<string, any>) => void;
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
                    "whitespace-nowrap " + (col === "Id" ? "hidden" : "")
                  }
                >
                  {col}
                </th>
              ))}
              {actions && actions.length > 0 && <th></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-base-300">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={
                      "whitespace-nowrap " + (col === "Id" ? "hidden" : "")
                    }
                  >
                    {typeof row[col] === "number"
                      ? `$${row[col].toFixed(2)}`
                      : row[col]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td
                    className="whitespace-nowrap flex flex-row gap-2"
                    key={`action-${rowIndex}`}
                  >
                    {actions.map((action) => (
                      <button
                        className="btn btn-xs btn-circle"
                        key={action.type}
                        onClick={() => action.action?.(row)}
                      >
                        <Icon type={action.type} />
                      </button>
                    ))}
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
