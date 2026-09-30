import { supabase } from "../config/supabase.js";

export async function checkDatabaseConnection() {
	const { error } = await supabase
		.from("announces")
		.select("id")
		.limit(1);

	if (error) throw error;
}