interface TableProps {
  title?: string;
  data: Array<Record<string, any>>;
}

function Table({ title, data }: TableProps) {
  const columns = Object.keys(data[0] || {});
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table table-auto w-full min-w-max">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-base-300">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="whitespace-nowrap">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
