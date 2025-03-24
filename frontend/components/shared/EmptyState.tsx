"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EmptyState({message}: {message:string}) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/upload");
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <h2 className="text-2xl font-semibold">Please upload files</h2>
      <p >Start by selecting files to {message}.</p>
      <Button onClick={handleNavigate}>Upload Files</Button>
    </div>
  );
}
