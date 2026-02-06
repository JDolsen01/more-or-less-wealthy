import supabase from "./supabaseClient";

export type Recurring = {
  id: string;
  due: string;
  frequency: string;
  name: string;
  budget: string;
  amount: number;
};

export async function createRecurring(formData: FormData) {
  const due = formData.get("due") as string;
  const frequency = formData.get("frequency") as string;
  const name = formData.get("name");
  const budget = Number(formData.get("budget"));
  const amount = Number(formData.get("amount"));
  const user = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id);
  const { data, error } = await supabase.from("recurring").insert([
    {
      user_id: user,
      due: due ? new Date(due.toString()) : null,
      frequency: frequency,
      name: name,
      budget: budget,
      amount: amount ? parseFloat(amount.toString()) : null,
    },
  ]);
  if (error) {
    throw error;
  }
  console.log("Creating recurring");
  return data;
}

export async function getRecurrings() {
  const { data, error } = await supabase
    .from("recurring")
    .select("*")
    .order("due", { ascending: true });
  if (error) {
    throw error;
  }
  console.log("Getting recurring expenses");
  return data;
}

export async function updateRecurring(formData: FormData) {
  const id = formData.get("id") as string;
  const due = formData.get("due") as string;
  const frequency = formData.get("frequency") as string;
  const name = formData.get("name") as string;
  const budget = Number(formData.get("budget"));
  const amount = Number(formData.get("amount"));
  const { data, error } = await supabase
    .from("recurring")
    .update({
      due: due ? new Date(due.toString()) : null,
      frequency: frequency,
      name: name,
      budget: budget,
      amount: amount ? parseFloat(amount.toString()) : null,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Updating recurring");
  return data;
}

export async function completeRecurring(formData: FormData) {
  const id = formData.get("id") as string;
  const due = formData.get("due") as string;
  const nextDue = formData.get("nextdue") as string;
  const name = formData.get("name") as string;
  const budget = Number(formData.get("budget"));
  const amount = Number(formData.get("amount"));

  const user = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id);

  const { data: expenseData, error: expenseError } = await supabase
    .from("expense")
    .insert([
      {
        user_id: user,
        date: due,
        name: name,
        budget: budget,
        amount: amount ? parseFloat(amount.toString()) : null,
      },
    ]);
  if (expenseError) {
    throw expenseError;
  }

  const { data: recurringData, error: recurringError } = await supabase
    .from("recurring")
    .update({
      due: nextDue,
    })
    .eq("id", id);
  if (recurringError) {
    throw recurringError;
  }

  console.log("Created expense and advanced recurring due date");
  return { expense: expenseData, recurring: recurringData };
}

export async function deleteRecurring(formData: FormData) {
  const id = formData.get("id") as string;
  const { data, error } = await supabase
    .from("recurring")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Deleting recurring");
  return data;
}
