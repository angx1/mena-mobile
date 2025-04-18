import { View, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Link, useRouter } from "expo-router";
import { Redirect } from "expo-router";

import SignIn from "@/app/(auth)/sign-in";
import Home from "@/app/(tabs)/home";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View className="w-full">
      {session && session.user ? (
        <Home key={session.user.id} session={session} />
      ) : (
        <SignIn />
      )}
    </View>
  );
}
