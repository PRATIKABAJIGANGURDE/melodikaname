import { supabase } from "./db";

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AuthError {
  message: string;
}

export async function signUp({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function signIn({
  email,
  password,
  rememberMe = false,
}: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!rememberMe) {
      // Set session expiry to 1 day if remember me is not checked
      await supabase.auth.updateUser({
        data: { session_expiry: 86400 }, // 24 hours in seconds
      });
    }

    return { user: data.user, session: data.session };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return {
      id: user.id,
      email: user.email!,
      full_name: profile?.full_name,
      avatar_url: profile?.avatar_url,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
