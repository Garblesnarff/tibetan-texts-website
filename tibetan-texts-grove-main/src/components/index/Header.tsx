import { AdminUpload } from "@/components/AdminUpload";
import { Link } from "react-router-dom";
import { Home, Settings, Folder, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const { isAdmin } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="relative mb-8 md:mb-12">
      {/* Navigation Actions */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex gap-1 md:gap-2">
          <Link to="/">
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className="hover:bg-tibetan-brown/10 transition-colors duration-200"
            >
              <Home className="h-4 w-4 md:h-5 md:w-5 text-tibetan-brown" />
              {!isMobile && <span className="sr-only">Return to Translation Hub</span>}
            </Button>
          </Link>
          <Link to="/categories">
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className="hover:bg-tibetan-brown/10 transition-colors duration-200"
            >
              <Folder className="h-4 w-4 md:h-5 md:w-5 text-tibetan-brown" />
              {!isMobile && <span className="sr-only">Browse Categories</span>}
            </Button>
          </Link>
          <Link to="/search">
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              className="hover:bg-tibetan-brown/10 transition-colors duration-200"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5 text-tibetan-brown" />
              {!isMobile && <span className="sr-only">Search Translations</span>}
            </Button>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "icon"}
                className="hover:bg-tibetan-brown/10 transition-colors duration-200"
              >
                <Settings className="h-4 w-4 md:h-5 md:w-5 text-tibetan-brown" />
                {!isMobile && <span className="sr-only">Admin Dashboard</span>}
              </Button>
            </Link>
          )}
        </div>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            100+ Texts
          </Badge>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="font-tibetan text-3xl md:text-5xl lg:text-6xl font-bold text-tibetan-maroon leading-tight">
            བོད་ཀྱི་དཔེ་མཛོད།
          </h1>
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-tibetan-brown font-medium">
            Tibetan Translation Library
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            A curated collection of Buddhist texts translated from Tibetan to English,
            preserving the wisdom and insights of the Tibetan Buddhist tradition.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2">
            <Badge variant="outline" className="text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              Sacred Texts
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Search className="h-3 w-3 mr-1" />
              Advanced Search
            </Badge>
            <Badge variant="outline" className="text-xs">
              📚 Multiple Categories
            </Badge>
          </div>
        </div>
      </div>

      {/* Admin Upload Section */}
      <div className="mt-8 md:mt-10">
        <AdminUpload />
      </div>
    </div>
  );
}
