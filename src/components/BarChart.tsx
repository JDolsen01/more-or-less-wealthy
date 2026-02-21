type DataPoint = {
  key: string;
  value: number[];
};

interface BarChartProps {
  className?: string;
  data: DataPoint[];
}

// Use full class names so Tailwind/DaisyUI sees the classes in source
const COLOR_CLASSES = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-neutral",
  "bg-accent-content",
];

function BarChart({ className, data }: BarChartProps) {
  if (!data || data.length === 0)
    return <div className={className}>No data available</div>;

  // Find max value for scaling
  const flattened = data.flatMap((d) => d.value);
  const maxValue = flattened.length ? Math.max(...flattened) : 0;

  return (
    <div className={className}>
      {/* Legend */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {data.map((dataPoint, index) => (
          <div key={dataPoint.key} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-xs ${COLOR_CLASSES[index % COLOR_CLASSES.length]}`}
            />
            <span className="text-sm">{dataPoint.key}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="flex flex-auto gap-1 md:gap-2 w-full pb-8">
        {data[0].value.map((_, barIndex) => (
          <div key={barIndex} className="w-full">
            <div
              className="grid items-end gap-1 w-full h-48"
              style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}
            >
              {data.map((dataPoint, dataIndex) => {
                const val = dataPoint.value[barIndex] ?? 0;
                const height = maxValue ? (val / maxValue) * 100 : 0;
                return (
                  <div
                    key={`${dataPoint.key}-${barIndex}`}
                    className={`rounded-t-xs transition-all ${COLOR_CLASSES[dataIndex % COLOR_CLASSES.length]}`}
                    style={{
                      height: `${height}%`,
                      minHeight: val > 0 ? "4px" : "4px",
                    }}
                    title={`${dataPoint.key}: ${val}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
