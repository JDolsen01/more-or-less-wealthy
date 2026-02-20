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
