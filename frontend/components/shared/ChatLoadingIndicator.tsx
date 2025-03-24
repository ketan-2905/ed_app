"use client";
import { Skeleton } from "@/components/ui/skeleton";

const  ChatLoadingIndicator = () => {
  return (
    <div className="flex items-start max-w-2xl">
      <div className="flex-1 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export default ChatLoadingIndicator