import React from "react";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth/session";
import PortalClientLayout from "./PortalClientLayout";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/clinic-login");
  }

  const { passwordHash, salt, ...safeUser } = user;

  return (
    <PortalClientLayout user={safeUser}>
      {children}
    </PortalClientLayout>
  );
}
