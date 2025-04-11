import { useMutation } from "@tanstack/vue-query";
import { useAuth } from "./useAuth";

export function useSignUpMutation() {
  const { signUp } = useAuth();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await signUp(email, password);
    },
  });
}

export function useSignInMutation() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await signIn(email, password);
    },
  });
}

export function useSignOutMutation() {
  const { signOut } = useAuth();

  return useMutation({
    mutationFn: async () => {
      return await signOut();
    },
  });
}
