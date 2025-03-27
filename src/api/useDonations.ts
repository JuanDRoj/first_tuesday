import { supabase } from "@/lib/supabaseClient";

export type DonationForm = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  amount: number;
  type: "private" | "public";
  is_approved?: boolean;
  created_at?: Date;
};

// Get all approved donations
export const getDonations = async (isApproved?: boolean) => {
  let query = supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (isApproved !== undefined) {
    query = query.eq("is_approved", isApproved);
  }

  const { data, error } = await query;

  if (error) throw new Error("Error fetching donations: " + error.message);

  return data;
};

// Add a new donation
export const addDonation = async (donation: DonationForm) => {
  const formattedData = {
    ...donation,
    amount: Number(donation.amount),
  };

  const { error } = await supabase.from("donations").insert([formattedData]);

  if (error) throw new Error("Error adding donation: " + error.message);
};

// Update Donation
export const updateDonation = async (
  id: string,
  column: string,
  value: any
) => {
  const { error } = await supabase
    .from("donations")
    .update({ [column]: value })
    .eq("id", id)
    .select();
  if (error) throw new Error("Error adding donation: " + error.message);
};
