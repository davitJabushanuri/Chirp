/* eslint-disable import/no-anonymous-default-export */
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export default () => {
  return createServerComponentSupabaseClient({ headers, cookies });
};
