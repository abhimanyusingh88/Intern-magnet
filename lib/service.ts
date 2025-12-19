import { supabase } from "./supabase/supabase";

export async function GetUser(email: string) 
{
    
    const { data: user,error } = await supabase
  .from('users')
  .select("*")
  .eq("email",email)
  .single()
  if(error)
  {
    // Return null instead of throwing to handle gracefully
    return null;
  }
  return user;
}
export async function InsertUser(newUser: any)
{
   const { data, error } = await supabase.from('users').insert([newUser]).select().single();

  if (error) {
    console.error(error);
    throw new Error('User could not be created');
  }

  return data;
}