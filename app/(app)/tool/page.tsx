"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmailGate from "@/components/EmailGate";

export default function ToolPage() {
  const router = useRouter();
  const [hasEmail, setHasEmail] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already provided email
    const email = localStorage.getItem("user_email");
    
    if (email) {
      setHasEmail(true);
      // Redirect to new project page (upload images)
      router.push("/tool/new");
    } else {
      setHasEmail(false);
    }
  }, [router]);

  // Show loading state while checking
  if (hasEmail === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0c0e14' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Show email gate if no email
  if (!hasEmail) {
    return <EmailGate />;
  }

  // This won't show because we redirect above, but just in case
  return null;
}
