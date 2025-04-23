/** @format */

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useRouter } from "expo-router";

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "",
    iosClientId: "542222212171-1jqn1bvpt1j6t3b8ajt99ipo5o6i0opo.apps.googleusercontent.com",
    webClientId: "542222212171-oh6g6rpgf2aoo45oa4m30q9gt84k3mev.apps.googleusercontent.com",
  });

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "542222212171-oh6g6rpgf2aoo45oa4m30q9gt84k3mev.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  //   redirectUri: "https://eduquest-1a0bd.firebaseapp.com/__/auth/handler",
  // });

  useEffect(() => {
    console.log("response", response);
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUser(userCredential.user);
          router.replace("/home"); // Redirect to home after login
        })
        .catch((error) => console.error("Firebase Auth Error:", error));
    }
  }, [response]);

  return { user, promptAsync };
}
