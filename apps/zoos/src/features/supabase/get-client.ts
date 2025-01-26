import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || "";

let client: SupabaseClient | undefined = undefined;
const isMissingEnvVars =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.substring(0, 5) === "op://" ||
  supabaseAnonKey.substring(0, 5) === "op://";

/**
 * Function to get supabase client
 *
 * - Provides error message to alert user if supabase client is requested
 * - If use function, app won't crash if Supabase env vars are missing. Instead,
 *   it will log message when client is requested and only those features
 *   requiring Supabase will not work.
 */
const getClient = () => {
  // If env vars are missing,
  if (isMissingEnvVars) {
    console.error(
      `Incorrect Supabase env vars:\n\t- VITE_SUPABASE_URL: ${supabaseUrl || undefined}\n\t- VITE_SUPABASE_KEY: ${supabaseAnonKey || undefined}\n`,
    );
  }

  if (client) {
    return client;
  }
  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
};

export { getClient };
