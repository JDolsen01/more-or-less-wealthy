import supabase from "./supabaseClient";

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
  const budget = Number(formData.get("budget"));
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

export async function updateExpense(formData: FormData) {
  const id = formData.get("id") as string;
  const date = formData.get("date") as string;
  const name = formData.get("name") as string;
  const budget = Number(formData.get("budget"));
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
