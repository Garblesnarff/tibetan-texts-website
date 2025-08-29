import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const LoadingState = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8">
      {/* Loading Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-tibetan-brown" />
          <h3 className="text-lg font-medium text-muted-foreground">
            Loading sacred texts...
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Discovering wisdom from the Tibetan Buddhist tradition
        </p>
      </div>

      {/* Loading Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading Footer */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
          <Loader2 className="h-4 w-4 animate-spin text-tibetan-brown" />
          <span className="text-sm text-muted-foreground">
            Gathering teachings from ancient wisdom...
          </span>
        </div>
      </div>
    </div>
  );
};
