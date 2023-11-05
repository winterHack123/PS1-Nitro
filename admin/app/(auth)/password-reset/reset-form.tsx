'use client';

import { useAuth } from '@/components/providers/supabase-auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ResetForm = () => {
  const router = useRouter();
  const [hash, setHash] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { resetPassword } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password didn't match!");
    }

    setLoading(true);

    try {
      const error = await resetPassword('gvfd', password);

      if (error) {
        setError(error);
      } else {
        toast.success('Password has been reset successfully.');
        router.push('/login');
      }
    } catch (error) {
      console.log('Something went wrong!');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-8">
      {/* Main Container */}
      <div className="w-[80%] max-w-lg">
        {/* Text */}
        <div>
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <Input
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Input
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {!loading ? (
            <Button
              variant="subtle"
              type="submit"
              className="flex items-center w-[92%] gap-2 mt-5 bg-[#01B4BC] text-white"
            >
              <Mail size="16" className="mr-1" />
              Reset Password
            </Button>
          ) : (
            <Button
              variant="subtle"
              className="flex items-center w-[92%] gap-2 mt-5 bg-[#01B4BC] text-white"
            >
              <Loader className="animate-spin" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetForm;
