import supabase from "./supabaseClient";

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
