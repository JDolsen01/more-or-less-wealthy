import Table from "../components/Table";

const budgets = [
  { Name: "Marketing", Budget: 5000, Spent: 2500 },
  { Name: "Research", Budget: 8000, Spent: 9000 },
  { Name: "Development", Budget: 10000, Spent: 4000 },
  { Name: "Sales", Budget: 7000, Spent: 3000 },
];

function Budgets() {
  return (
    <div className="flex flex-col items-center justify-start px-4">
      <h1 className="text-2xl font-bold mt-4">Budgets</h1>
      <div className="tabs tabs-border w-full max-w-4xl mt-4">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table data={budgets} />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Overspent"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table data={budgets.filter((b) => b.Spent > b.Budget)} />
        </div>
      </div>
    </div>
  );
}

export default Budgets;
