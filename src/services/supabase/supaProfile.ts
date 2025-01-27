import { supabase } from '@/services/supabase/supabaseClient'

export const fetchProfile = ({ column, value }: { column: string; value: string }) => {
  return supabase.from('users').select().eq(column, value).single()
}

/*
async function updateUserProfile(userId, fullName, orderNumber) {
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      order_number: orderNumber,
    },
  });

  if (authError) {
    console.error('Failed to update auth metadata:', authError.message);
    return;
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: fullName, order_number: orderNumber })
    .eq('id', userId);

  if (profileError) {
    console.error('Failed to update profile:', profileError.message);
  } else {
    console.log('Profile and metadata updated successfully!');
  }
} */
