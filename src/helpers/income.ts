import supabase from "./supabaseClient";

export type Income = {
  id: string;
  date: string;
  name: string;
  amount: number;
};

export type Terms = "month" | "quarter" | "year";

export async function createIncome(formData: FormData) {
  const date = formData.get("date") as string;
  const name = formData.get("name") as string;
  const amount = Number(formData.get("amount"));
  const user = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id);
  const { data, error } = await supabase.from("income").insert([
    {
      user_id: user,
      date: date ? new Date(date.toString()) : null,
      name: name,
      amount: amount ? parseFloat(amount.toString()) : null,
    },
  ]);
  if (error) {
    throw error;
  }
  console.log("Creating income");
  return data;
}

export async function getIncomes() {
  const { data, error } = await supabase
    .from("income")
    .select("*")
    .order("date", { ascending: true });
  if (error) {
    throw error;
  }
  console.log("Getting incomes");
  return data;
}

export async function getIncomesByTerm(term: Terms, page: number) {
  const today = new Date();
  const date = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const [startDate, endDate] = (() => {
    switch (term) {
      case "month": {
        const [year, month] = date.split("-").map(Number);
        console.log("Calculating month term with", { year, month, page });
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
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  const { data, error } = await supabase
    .from("income")
    .select("*")
    .gte("date", startDate.toISOString().split("T")[0])
    .lte("date", endDate.toISOString().split("T")[0])
    .order("date", { ascending: true });
  if (error) {
    throw error;
  }
  console.log("Getting incomes by term");
  return data;
}

export async function updateIncome(formData: FormData) {
  const id = formData.get("id") as string;
  const date = formData.get("date") as string;
  const name = formData.get("name") as string;
  const amount = Number(formData.get("amount"));
  const { data, error } = await supabase
    .from("income")
    .update({
      date: date ? new Date(date.toString()) : null,
      name: name,
      amount: amount ? parseFloat(amount.toString()) : null,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Updating income");
  return data;
}

export async function deleteIncome(formData: FormData) {
  const id = formData.get("id") as string;
  const { data, error } = await supabase.from("income").delete().eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Deleting income");
  return data;
}
