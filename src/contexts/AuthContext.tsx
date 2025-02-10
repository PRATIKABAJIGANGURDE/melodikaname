import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser, getCurrentUser, signIn, signOut, signUp } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignIn = async (
    email: string,
    password: string,
    rememberMe = false,
  ) => {
    try {
      const { user } = await signIn({ email, password, rememberMe });
      setUser(user as AuthUser);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        className: "bg-slate-800 border-slate-700 text-slate-300",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/50 text-slate-300",
      });
      throw error;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    try {
      await signUp({ email, password, fullName });
      toast({
        title: "Welcome!",
        description: "Please check your email to confirm your account.",
        className: "bg-slate-800 border-slate-700 text-slate-300",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/50 text-slate-300",
      });
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
        className: "bg-slate-800 border-slate-700 text-slate-300",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/50 text-slate-300",
      });
    }
  };

  const value = {
    user,
    isLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
