"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const PanicNotesLoader = () => {
  return (
    <div className="flex pt-2 bg-background w-full">
      <Card className="flex flex-col w-full max-w-4xl mx-auto my-4">        
        <CardContent className="flex-1 p-2 space-y-6">
          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-8 w-32" />
            </div>
            
            <Skeleton className="h-48 w-full" />
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-8 w-32" />
            </div>
            
            <Skeleton className="h-48 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PanicNotesLoader;