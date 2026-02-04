import supabase from "./supabaseClient";

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
  return data;
}

export async function getIncome() {
  const user = await supabase.auth
    .getUser()
    .then(({ data: { user } }) => user?.id);
  const { data, error } = await supabase
    .from("income")
    .select("*")
    .eq("user_id", user)
    .order("date", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
}

export async function updateIncome(formData: FormData) {
  const id = formData.get("id") as string;
  const date = formData.get("date") as string;
  const name = formData.get("name") as string;
  const amount = Number(formData.get("amount"));
  console.log({ id, date, name, amount });
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
  return data;
}
