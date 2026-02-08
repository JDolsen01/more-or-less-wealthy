type DataPoint = {
  key: string;
  value: number[];
};

interface BarChartProps {
  className?: string;
  data: DataPoint[];
}

const COLOR_PALETTE = [
  "primary",
  "secondary",
  "accent",
  "neutral",
  "accent-content",
];

function BarChart({ className, data }: BarChartProps) {
  if (!data || data.length === 0)
    return <div className={className}>No data available</div>;

  // Find max value for scaling
  const maxValue = Math.max(...data.flatMap((d) => d.value));

  return (
    <div className={className}>
      {/* Legend */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {data.map((dataPoint, index) => (
          <div key={dataPoint.key} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-xs bg-${COLOR_PALETTE[index % COLOR_PALETTE.length]}`}
            />
            <span className="text-sm">{dataPoint.key}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="flex flex-auto gap-1 md:gap-2 w-full pb-8">
        {data[0].value.map((_, barIndex) => (
          <div key={barIndex} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-1 w-full h-48">
              {data.map((dataPoint, dataIndex) => (
                <div
                  key={`${dataPoint.key}-${barIndex}`}
                  className={`w-1/${dataIndex + 1} rounded-t-xs transition-all bg-${COLOR_PALETTE[dataIndex % COLOR_PALETTE.length]}`}
                  style={{
                    height: `${(dataPoint.value[barIndex] / maxValue) * 100}%`,
                    minHeight: dataPoint.value[barIndex] > 0 ? "4px" : "0px",
                  }}
                  title={`${dataPoint.key}: ${dataPoint.value[barIndex]}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
