export type Terms = "month" | "quarter" | "year";

export function getStartAndEndDates(term: Terms, page: number) {
  const today = new Date();
  const date = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const [startDate, endDate] = (() => {
    switch (term) {
      case "month": {
        const [year, month] = date.split("-").map(Number);
        return [
          new Date(year, month - 1 + page, 1),
          new Date(year, month + page, 0), // last day of the month
        ];
      }
      case "quarter": {
        const d = new Date(date);
        const month = d.getMonth() + page * 3;
        const year = d.getFullYear();
        const quarterStartMonth = Math.floor(month / 3) * 3;
        return [
          new Date(year, quarterStartMonth, 1),
          new Date(year, quarterStartMonth + 3, 0), // last day of the quarter
        ];
      }
      case "year": {
        const [year] = date.split("-").map(Number);
        return [new Date(year + page, 0, 1), new Date(year + page, 11, 31)];
      }
      default: {
        return [new Date(date), new Date(date)];
      }
    }
  })();
  return [startDate, endDate];
}

export function getTermLabel(term: Terms, page: number) {
  const [startDate, endDate] = getStartAndEndDates(term, page);
  const start = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const end = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const label = (() => {
    switch (term) {
      case "month":
        return `${start}`;
      case "quarter":
        return `Q${Math.floor(endDate.getMonth() / 3) + 1} ${startDate.getFullYear()}`;
      case "year":
        return `${startDate.getFullYear()}`;
      default:
        return `${start} - ${end}`;
    }
  })();
  return label;
}
