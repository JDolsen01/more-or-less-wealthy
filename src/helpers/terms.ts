export type Terms = "month" | "quarter" | "year";

function getNumberOfDaysInTerm(term: Terms, page: number) {
  const [startDate, endDate] = getStartAndEndDates(term, page);
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
}

function getNumberOfMonthsInTerm(term: Terms, page: number) {
  const [startDate, endDate] = getStartAndEndDates(term, page);
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    1 + // +1 to include both start and end months
    (endDate.getFullYear() - startDate.getFullYear()) * 12
  );
}

function getDataPointsInTerm(term: Terms, page: number) {
  switch (term) {
    case "month":
      const datapointsM: number[] = new Array(
        getNumberOfDaysInTerm(term, page),
      ).fill(0);
      return datapointsM;
    case "quarter":
    case "year":
      const datapointsQY: number[] = new Array(
        getNumberOfMonthsInTerm(term, page),
      ).fill(0);
      return datapointsQY;
    default:
      return [];
  }
}

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

function parseLocalDate(dateString: string) {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function setTermDatapoints(
  term: Terms,
  page: number,
  data: { date: string; amount: number }[],
) {
  const datapoints = getDataPointsInTerm(term, page);
  const [startDate] = getStartAndEndDates(term, page);

  data.forEach(({ date, amount }) => {
    const d = parseLocalDate(date);
    const index = (() => {
      switch (term) {
        case "month":
          return d.getDate() - 1; // convert to 0-based index
        case "quarter": {
          const startMonth = startDate.getMonth();
          const startYear = startDate.getFullYear();
          return (d.getFullYear() - startYear) * 12 + d.getMonth() - startMonth;
        }
        case "year":
          return d.getMonth(); // month is already 0-based
        default:
          return 0;
      }
    })();

    if (index >= 0 && index < datapoints.length) {
      datapoints[index] += amount;
    }
  });
  return datapoints;
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
