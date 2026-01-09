import Table from "../components/Table";

const reocurringExpenses = [
  {
    Date: "2026-01-01",
    Name: "Gym Membership",
    Budget: "Subscription",
    Amount: "$50",
  },
  {
    Date: "2026-01-05",
    Name: "Netflix Subscription",
    Budget: "Subscription",
    Amount: "$15",
  },
  { Date: "2026-01-10", Name: "Rent", Budget: "Housing", Amount: "$1200" },
  {
    Date: "2026-01-15",
    Name: "Car Payment",
    Budget: "Transportation",
    Amount: "$300",
  },
  {
    Date: "2026-01-20",
    Name: "Internet Bill",
    Budget: "Utilities",
    Amount: "$60",
  },
];

function Recurring() {
  const pastDueExpenses = reocurringExpenses.filter(
    (exp) => new Date(exp.Date) < new Date()
  );

  return (
    <div className="flex flex-col items-center justify-start px-4">
      <h1 className="text-2xl font-bold mt-4">Recurring</h1>
      <div className="tabs tabs-border w-full max-w-4xl">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table data={reocurringExpenses} />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Past Due"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table data={pastDueExpenses} />
        </div>
      </div>
    </div>
  );
}
export default Recurring;
