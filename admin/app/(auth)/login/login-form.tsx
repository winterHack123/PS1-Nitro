"use client";

import { useAuth } from "@/components/providers/supabase-auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateCompanyEmail } from "@/utils/validator";
import { Loader, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { signInWithEmail, user, requestResetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem("email", email);
    router.push("/");
  };

  const handleResetPassword = async () => {
    if (!validateCompanyEmail(email)) {
      return toast.error("Enter a valid email!");
    } else {
      try {
        const error = await requestResetPassword(email);

        if (error) {
          return toast.error(error);
        } else {
          toast.success("Check your mail for link!");
        }
      } catch (error) {
        console.log("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-8">
      {/* Main Container */}
      <div className="w-[80%] max-w-lg">
        {/* Text */}
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <Input
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 flex w-full justify-between">
            <div className="flex">
              <div className="text-sm ml-2">Forgot Password?</div>
            </div>

            <div className="flex">
              <div
                onClick={() => handleResetPassword()}
                className="text-sm text-[#01B4BC] ml-2 cursor-pointer"
              >
                Click here to reset
              </div>
            </div>
          </div>

          {!loading ? (
            <Button
              variant="subtle"
              type="submit"
              className="flex items-center w-[92%] gap-2 mt-5 bg-[#01B4BC] text-white"
            >
              <Mail size="16" className="mr-1" />
              Login with Email
            </Button>
          ) : (
            <Button
              variant="subtle"
              className="flex items-center w-[92%] gap-2 mt-5 bg-[#01B4BC] text-white"
            >
              <Loader className="animate-spin" />
            </Button>
          )}

          <div className="mt-4 text-red-500"> </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
