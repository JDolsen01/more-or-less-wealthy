import Icon from "./Icon";

type ActionType = "edit" | "delete" | "complete";

interface TableProps {
  title?: string;
  header: string[];
  data: Array<Record<string, any>>;
  formattedValues?: Record<string, (value: any) => string>; //for formatting specific values in the table
  actions?: {
    action: (row: Record<string, any>) => void;
    type: ActionType;
  }[];
}

function Table({ title, header, data, formattedValues, actions }: TableProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table table-auto w-full min-w-max">
          <thead>
            <tr>
              {header.map((col, index) => (
                <th key={index} className="whitespace-nowrap">
                  {col}
                </th>
              ))}
              {actions && actions.length > 0 && <th className="w-16"></th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-base-300">
                {header.map((col, colIndex) => (
                  <td key={colIndex} className="whitespace-nowrap">
                    {formattedValues && formattedValues[col]
                      ? formattedValues[col](row[col.toLowerCase()])
                      : row[col.toLowerCase()]}
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
                        className="btn btn-circle btn-xs"
                      >
                        <Icon type="dots" />
                      </div>
                      <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 mt-1 shadow-sm"
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
