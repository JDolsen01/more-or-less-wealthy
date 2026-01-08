import Table from "../components/Table";

const income = [
  { Date: "2024-01-15", Name: "Salary", Amount: "$3000" },
  { Date: "2024-01-30", Name: "Freelance Project", Amount: "$800" },
];

const expenses = [
  {
    Date: "2024-01-10",
    Name: "Groceries",
    Budget: "Food",
    Amount: "$150",
  },
  {
    Date: "2024-01-12",
    Name: "Electricity Bill",
    Budget: "Utilities",
    Amount: "$60",
  },
  {
    Date: "2024-01-20",
    Name: "Dining Out",
    Budget: "Entertainment",
    Amount: "$80",
  },
];

function Transactions() {
  return (
    <div className="flex flex-col items-center justify-start px-4">
      <h1 className="text-2xl font-bold mt-4">Transactions</h1>
      <div className="tabs tabs-border w-full max-w-4xl">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table
            data={[...income, ...expenses.map(({ Budget, ...rest }) => rest)]}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Income"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table data={income} />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Expenses"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table data={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
