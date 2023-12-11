'use client';

import { Icons } from '@/components/icons';
import { authSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import UserSocialAuth from './user-social-auth';

type UserAuthFormProps = {
  formType: 'login' | 'signup';
};

export function UserAuthForm({ formType }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: z.infer<typeof authSchema>) {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="grid gap-6">
      <UserSocialAuth />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {formType === 'signup'
                  ? 'Signup with Email'
                  : 'Login with Email'}
              </Button>
              {formType === 'signup' ? (
                <p className="text-right text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Login
                  </Link>
                </p>
              ) : (
                <p className="text-right text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/auth/signup"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Signup
                  </Link>
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
