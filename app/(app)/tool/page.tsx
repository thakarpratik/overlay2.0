"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tool/new");
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center" style={{ background: '#050507' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
    </div>
  );
}
