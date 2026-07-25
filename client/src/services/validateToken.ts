import { supabase } from "../api/supabase";

export default async function validateToken() {
  const {
		data: { session },
	} = await supabase.auth.getSession();

	return session?.access_token ?? null;
}