// components/QuizSkeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const Loader  = () =>  {
  return (
    <div className="flex min-h-screen pt-2 bg-background">
      <Card className="flex flex-col w-full max-w-3xl mx-auto my-4">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6 space-y-6">
          <Skeleton className="h-2 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="grid gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 border-t">
          <div className="flex w-full gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24 ml-auto" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Loader