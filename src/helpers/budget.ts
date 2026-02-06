import supabase from "./supabaseClient";

export type Budget = {
  id: string;
  name: string;
  amount: number;
};

export async function createBudget(formData: FormData) {
  const name = formData.get("name") as string;
  const amount = formData.get("amount");
  const user = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id);
  const { data, error } = await supabase.from("budget").insert([
    {
      user_id: user,
      name: name,
      amount: amount,
    },
  ]);
  if (error) {
    throw error;
  }
  console.log("Creating budget");
  return data;
}

export async function getBudgets() {
  const { data, error } = await supabase
    .from("budget")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  console.log("Getting budgets");
  return data;
}

export async function updateBudget(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const amount = formData.get("amount");
  const { data, error } = await supabase
    .from("budget")
    .update({
      name: name,
      amount: amount ? parseFloat(amount.toString()) : null,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Updating budget");
  return data;
}

export async function deleteBudget(formData: FormData) {
  const id = formData.get("id") as string;
  const { data, error } = await supabase.from("budget").delete().eq("id", id);
  if (error) {
    throw error;
  }
  console.log("Deleting income");
  return data;
}
