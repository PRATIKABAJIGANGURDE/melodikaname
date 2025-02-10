import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { resetPassword } from "@/lib/auth";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music2, Eye, EyeOff, Info } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface AuthFormProps {
  onSubmit?: (values: any) => void;
  isLoading?: boolean;
  defaultTab?: "login" | "register";
}

const AuthForm = ({
  onSubmit = (values) => console.log("Form submitted:", values),
  isLoading = false,
  defaultTab = "login",
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState<"login" | "register">(
    defaultTab,
  );

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleForgotPassword = async (email: string) => {
    try {
      await resetPassword(email);
      toast({
        title: "Password Reset",
        description: "Check your email for the password reset link.",
        className: "bg-slate-800 border-slate-700 text-slate-300",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset link",
        variant: "destructive",
        className: "bg-slate-800 border-red-500/50 text-slate-300",
      });
    }
  };

  return (
    <Card className="w-[400px] p-6 bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Music2 className="h-6 w-6 text-purple-400" />
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          SongAI
        </span>
      </div>

      <Tabs
        value={currentTab}
        onValueChange={(v) => setCurrentTab(v as "login" | "register")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-900/50">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <div className="space-y-2 mb-4 text-center">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-400">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={loginForm.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-slate-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                      </FormControl>
                      <label
                        htmlFor="rememberMe"
                        className="text-sm font-medium leading-none text-slate-300 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </FormItem>
                  )}
                />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-sm text-purple-400 hover:text-purple-300 p-0"
                    >
                      Forgot password?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-300">
                        Reset Password
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-slate-400">
                        Enter your email address and we'll send you a link to
                        reset your password.
                      </p>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                      />
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        onClick={() =>
                          handleForgotPassword(loginForm.getValues().email)
                        }
                      >
                        Send Reset Link
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="register">
          <div className="space-y-2 mb-4 text-center">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Create Account
            </h2>
            <p className="text-sm text-slate-400">
              Sign up to start generating songs
            </p>
          </div>

          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-slate-300">
                      Password
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-800 border-slate-700 text-slate-300">
                            <p>Password must contain:</p>
                            <ul className="list-disc list-inside text-sm">
                              <li>At least 8 characters</li>
                              <li>One uppercase letter</li>
                              <li>One lowercase letter</li>
                              <li>One number</li>
                              <li>One special character</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Create a password"
                          type={showPassword ? "text" : "password"}
                          className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          className="bg-slate-900/50 border-slate-700 text-slate-300 placeholder:text-slate-500 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-slate-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 mt-1"
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none text-slate-300"
                      >
                        Accept terms and conditions
                      </label>
                      <p className="text-sm text-slate-400">
                        By creating an account, you agree to our{" "}
                        <Button
                          variant="link"
                          className="text-purple-400 hover:text-purple-300 p-0 h-auto font-medium"
                        >
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button
                          variant="link"
                          className="text-purple-400 hover:text-purple-300 p-0 h-auto font-medium"
                        >
                          Privacy Policy
                        </Button>
                      </p>
                    </div>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
