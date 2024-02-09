import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined | string>(
    "iddle"
  );
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        return setSession("error");
      } else {
        setSession(data?.session);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session };
};
