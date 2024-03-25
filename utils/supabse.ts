import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qdoxynjkmbgpgncnmadr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkb3h5bmprbWJncGduY25tYWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzMTY2ODEsImV4cCI6MjAyNjg5MjY4MX0.QAZPh3N_Ogvo7tReTFRI4fyYoMzTfhJzFZ6AZzxWyh0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
