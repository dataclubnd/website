import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ixngtmkmxywhcnfwsodv.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_x7E5SBJ7lr4A787o50jkPg_bfXgUa5t'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)