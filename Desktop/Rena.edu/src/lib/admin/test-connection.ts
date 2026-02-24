// Test Supabase connection
import { supabase } from "@/lib/supabase";

export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  try {
    // Try a simple query to test connection
    const { data, error } = await supabase
      .from("booking_requests")
      .select("id")
      .limit(1);

    if (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
        details: error,
      };
    }

    return {
      success: true,
      message: "Successfully connected to Supabase!",
      details: { data },
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection error: ${err.message}`,
      details: err,
    };
  }
}
