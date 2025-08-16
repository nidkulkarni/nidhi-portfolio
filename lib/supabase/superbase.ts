// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://odvwobhvkklcoxvknrrt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdndvYmh2a2tsY294dmtucnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODIwODcsImV4cCI6MjA3MDg1ODA4N30._7er4ZbUX9tlq84p6BEKa_VndYKoe4TSXlob3QarYoc"                     // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
