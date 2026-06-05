"use client";

import { CardHeader, CardTitle, CardContent } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { Label } from "@repo/ui/label";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { useChangePassword } from "../../../features/auth";

export default function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { mutate, isPending } = useChangePassword();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate(form);
  }

  return (
    <div className="w-full mx-auto sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Change your password</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showCurrentPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showNewPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}
