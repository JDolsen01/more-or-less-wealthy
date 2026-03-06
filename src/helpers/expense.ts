import supabase from "./supabaseClient";
import { getStartAndEndDates, type Terms } from "./terms";

export type Expense = {
  id: string;
  date: string;
  name: string;
  budget: string;
  amount: number;
};

export async function createExpense(formData: FormData) {
  const date = formData.get("date") as string;
  const name = formData.get("name") as string;
  const budget = formData.get("budget") ? Number(formData.get("budget")) : null;
  const amount = Number(formData.get("amount"));
  const user = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id);
  const { data, error } = await supabase.from("expense").insert([
    {
      user_id: user,
      date: date ? new Date(date.toString()) : null,
      name: name,
      budget: budget,
      amount: amount ? parseFloat(amount.toString()) : null,
    },
  ]);
  if (error) {
    throw error;
  }
  console.log("Creating expense");
  return data;
}

export async function getExpenses() {
  const { data, error } = await supabase
    .from("expense")
    .select("*")
    .order("date", { ascending: true });
  if (error) {
    throw error;
  }
  console.log("Getting expenses");
  return data;
}

export async function getExpensesByTerm(term: Terms, page: number) {
  const [startDate, endDate] = getStartAndEndDates(term, page);
  console.log("Getting expenses by term with", {
    term,
    page,
    startDate,
    endDate,
  });
  const { data, error } = await supabase
    .from("expense")
    .select("*")
    .gte("date", startDate.toISOString().split("T")[0])
    .lte("date", endDate.toISOString().split("T")[0])
    .order("date", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
}

export async function getMostRecentExpenses(limit: number) {
  const { data, error } = await supabase
    .from("expense")
    .select("date, name, amount", { count: "exact" })
    .order("date", { ascending: false })
    .limit(limit);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateExpense(formData: FormData) {
  const id = formData.get("id") as string;
  const date = formData.get("date") as string;
  const name = formData.get("name") as string;
  const budget = formData.get("budget") ? Number(formData.get("budget")) : null;
  const amount = formData.get("amount");
  const { data, error } = await supabase
    .from("expense")
    .update({
      date: date ? new Date(date.toString()) : null,
      name: name,
      budget: budget,
      amount: amount ? parseFloat(amount.toString()) : null,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Updating expense");
  return data;
}

export async function deleteExpense(formData: FormData) {
  const id = formData.get("id") as string;
  const { data, error } = await supabase.from("expense").delete().eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Deleting expense");
  return data;
}

export async function getTotalExpenses() {
  const { data, error } = await supabase
    .from("expense")
    .select("amount", { count: "exact" });
  if (error) {
    throw error;
  }
  const total = data.reduce((sum, expense) => sum + expense.amount, 0);
  console.log("Getting total expenses");
  return total;
}
