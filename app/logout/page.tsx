"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAuth } from "../login/auth_service";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    clearAuth();

    router.replace("/");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8eef2",
        color: "#8f536b",
      }}
    >
      Saindo...
    </div>
  );
}