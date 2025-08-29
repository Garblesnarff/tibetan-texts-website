import { Search, BookOpen, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  isSearching?: boolean;
  searchQuery?: string;
  activeCategory?: string;
}

export const EmptyState = ({ isSearching, searchQuery, activeCategory }: EmptyStateProps) => {
  const navigate = useNavigate();

  if (isSearching && searchQuery) {
    const suggestions = [
      { term: searchQuery + " meditation", label: "Add 'meditation'" },
      { term: searchQuery + " wisdom", label: "Add 'wisdom'" },
      { term: searchQuery + " compassion", label: "Add 'compassion'" },
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] px-4">
        <Card className="w-full max-w-md border-border/50">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-3 bg-tibetan-gold/10 rounded-full">
                <Search className="h-8 w-8 text-tibetan-brown" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">
                No results found for "{searchQuery}"
                {activeCategory && ` in ${activeCategory}`}
              </h3>
              <p className="text-sm text-muted-foreground">
                Try broadening your search or explore different terms
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Try these suggestions:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion.term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-tibetan-gold/20 hover:text-tibetan-brown transition-colors duration-200"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(suggestion.term)}`)}
                    >
                      {suggestion.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="hover:bg-tibetan-gold/10"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Browse All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="hover:bg-tibetan-gold/10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] px-4">
      <Card className="w-full max-w-md border-border/50">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-3 bg-tibetan-gold/10 rounded-full">
              <BookOpen className="h-8 w-8 text-tibetan-brown" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              No translations available
            </h3>
            <p className="text-sm text-muted-foreground">
              The library is currently being populated with sacred texts
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Check back soon or explore our categories
            </p>

            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/categories")}
                className="hover:bg-tibetan-gold/10"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Categories
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="hover:bg-tibetan-gold/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
