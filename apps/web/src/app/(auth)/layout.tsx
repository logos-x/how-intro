import { ReactNode} from "react";
import { Card } from '@repo/ui/card';

export default function AuthLayout({ children }: {
  children: ReactNode }) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <Card className="w-[440px] max-[425px]:w-[300px] mx-auto px-4">
          {children}
        </Card>
      </div>
    )
  }