import { supabase } from '../lib/supabase';

// Helper function to sync a localStorage key to Supabase database
export async function syncToSupabase(key: string, value: string | null) {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return; // Skip if Supabase is not configured yet
  }
  try {
    if (value === null) {
      await supabase.from('site_content').delete().eq('key', key);
    } else {
      await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' });
    }
  } catch (error) {
    console.error(`Error syncing ${key} to Supabase:`, error);
  }
}

// Helper to pull all content from Supabase and cache it in localStorage
export async function pullFromSupabase() {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return; // Skip if Supabase is not configured yet
  }
  try {
    const { data, error } = await supabase.from('site_content').select('key, value');
    if (error) {
      console.warn("Supabase fetch failed (table might not exist yet):", error.message);
      return;
    }
    if (data) {
      data.forEach((row) => {
        if (row.key && row.value !== null) {
          localStorage.setItem(row.key, row.value);
        }
      });
    }
  } catch (error) {
    console.error("Error pulling database from Supabase:", error);
  }
}
