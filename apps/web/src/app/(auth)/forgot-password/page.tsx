"use client";

import { useForgotPassword } from "@/features/auth";
import { Button } from "@repo/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  
  const { mutate: forgotPasswordMutate, isPending } = useForgotPassword();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    forgotPasswordMutate({ email });
  }

  return (
    <div className="w-full mx-auto sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Quên mật khẩu</CardTitle>
        <CardDescription>
          Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button className="w-full" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send link'}
          </Button>
          <div className="text-center text-sm">
            <a href="/login" className="underline font-medium">
              Quay lại đăng nhập
            </a>
          </div>
        </form>
      </CardContent>
    </div>
  );
}