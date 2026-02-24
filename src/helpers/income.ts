import supabase from "./supabaseClient";
import { getStartAndEndDates, type Terms } from "./terms";

export type Income = {
  id: string;
  date: string;
  name: string;
  amount: number;
};

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
  const [startDate, endDate] = getStartAndEndDates(term, page);
  console.log("Getting incomes by term with", {
    term,
    page,
    startDate,
    endDate,
  });
  const { data, error } = await supabase
    .from("income")
    .select("*")
    .gte("date", startDate.toISOString().split("T")[0])
    .lte("date", endDate.toISOString().split("T")[0])
    .order("date", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
}

export async function getMostRecentIncome(limit: number) {
  const { data, error } = await supabase
    .from("income")
    .select("date, name, amount", { count: "exact" })
    .order("date", { ascending: false })
    .limit(limit);
  if (error) {
    throw error;
  }
  console.log("Getting most recent income");
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

export async function getTotalIncome() {
  const { data, error } = await supabase
    .from("income")
    .select("amount", { count: "exact" });
  if (error) {
    throw error;
  }
  const total =
    data?.reduce((sum, income) => sum + (income.amount || 0), 0) || 0;
  console.log("Getting total income");
  return total;
}
