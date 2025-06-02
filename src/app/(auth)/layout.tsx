"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "professor") {
        router.push("/dashboard/professor");
      } else {
        router.push("/dashboard/aluno");
      }
    }
  }, [user, router]);

  return <>{children}</>;
} 