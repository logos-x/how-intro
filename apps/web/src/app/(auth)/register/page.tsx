"use client";

import { CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { Label } from "@repo/ui/label";
import { GoogleChromeLogoIcon, AppleLogoIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { useRegister } from "../../../features/auth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate(form);
  }

  return (
    <div className="w-full mx-auto sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Enter your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">User Name</Label>
            <Input
              id="username"
              placeholder="John Doe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t" />
            <span className="px-2 text-xs text-muted-foreground uppercase">
              Or continue with
            </span>
            <div className="flex-grow border-t" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              <GoogleChromeLogoIcon className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" type="button">
              <AppleLogoIcon className="mr-2 h-4 w-4" /> Apple
            </Button>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline font-medium">
              Sign In
            </a>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
