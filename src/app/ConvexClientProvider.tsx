"use client";
import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient("https://quaint-oyster-954.convex.cloud");

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return(
    <ClerkProvider publishableKey="pk_test_bG92aW5nLWdvYmJsZXItMjkuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        
      {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  ) 
}

