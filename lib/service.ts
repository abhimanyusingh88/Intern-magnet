// import { supabase } from "./supabase/supabase";

import { supabaseAdmin } from "./supabase/admin";

export async function GetUser(email: string) {

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select("*")
    .eq("email", email)
    .single()
  if (error) {
    return null;
  }
  return user;
}
export async function GetRecruiter(email: string) {

  const { data: user, error } = await supabaseAdmin
    .from('recruiter_profiles')
    .select("*")
    .eq("email", email)
    .single()
  if (error) {
    return null;
  }
  return user;
}
export async function InsertUser(newUser: any) {
  const { data, error } = await supabaseAdmin.from('users').insert([newUser]).select().single();

  if (error) {
    console.error(error);
    throw new Error('User could not be created');
  }

  return data;
}