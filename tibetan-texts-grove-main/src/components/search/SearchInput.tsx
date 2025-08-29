import { useState, useRef, KeyboardEvent } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchSuggestions } from "./SearchSuggestions";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  selectedCategory?: string | null;
}

export function SearchInput({ value, onChange, onClear, onKeyDown, selectedCategory }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const {
    suggestions,
    history,
    isLoading,
    error,
    isOffline,
    addToHistory,
    clearHistory,
    clearHistoryItem,
    retryFetch
  } = useSearchSuggestions(value, selectedCategory);

  useOnClickOutside(containerRef, () => setIsFocused(false));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
      addToHistory(value);
      setIsFocused(false);
    }
    onKeyDown?.(e);
  };

  const handleSelect = (term: string) => {
    onChange(term);
    addToHistory(term);
    setIsFocused(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const quickSearches = [
    { term: "meditation", label: "Meditation" },
    { term: "compassion", label: "Compassion" },
    { term: "wisdom", label: "Wisdom" },
    { term: "enlightenment", label: "Enlightenment" }
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto mb-8 md:mb-12">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-tibetan-gold/20 to-tibetan-maroon/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-tibetan-brown transition-colors duration-200" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            className="pl-12 pr-12 py-3 text-base md:text-lg border-0 bg-transparent placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-tibetan-gold/50 focus-visible:ring-offset-2"
            placeholder="Search sacred texts, teachings, and wisdom..."
          />
          {value && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
              onClick={() => {
                onClear();
                setIsFocused(false);
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>

      {/* Quick Search Suggestions */}
      {!value && !isFocused && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickSearches.map((search) => (
              <Badge
                key={search.term}
                variant="secondary"
                className="cursor-pointer hover:bg-tibetan-gold/20 hover:text-tibetan-brown transition-colors duration-200 px-3 py-1"
                onClick={() => handleSelect(search.term)}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {search.label}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search Suggestions Dropdown */}
      <SearchSuggestions
        searchQuery={value}
        suggestions={suggestions}
        history={history}
        isLoading={isLoading}
        error={error}
        isOffline={isOffline}
        onSelect={handleSelect}
        onClearHistory={clearHistory}
        onClearHistoryItem={clearHistoryItem}
        onRetry={retryFetch}
        visible={isFocused}
      />
    </div>
  );
}
