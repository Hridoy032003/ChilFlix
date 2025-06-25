import { createClient } from "@supabase/supabase-js";

const subURL = "https://mvgkwdyeoxudshtuejbn.supabase.co";
const subKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2t3ZHllb3h1ZHNodHVlamJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NjAyNDEsImV4cCI6MjA2NjIzNjI0MX0.EhsNFaVlS7_EWJCinx8UN82QegAvSFHPyI68cYLMjw4";

export const supabase = createClient(subURL, subKey);
