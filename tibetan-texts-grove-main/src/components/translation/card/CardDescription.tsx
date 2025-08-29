import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import { highlightText } from "@/utils/highlightText";
import { useAuth } from "@/hooks/useAuth";

interface CardDescriptionProps {
  translationId: string;
  description?: string;
  isEditing: boolean;
  editedDescription: string;
  setEditedDescription: (value: string) => void;
  setIsEditingDescription: (value: boolean) => void;
  searchQuery?: string;
  onSave?: (description: string) => Promise<void>;
  isSaving?: boolean;
}

const CardDescription = ({
  translationId,
  description,
  isEditing,
  editedDescription,
  setEditedDescription,
  setIsEditingDescription,
  searchQuery,
  onSave,
  isSaving = false
}: CardDescriptionProps) => {
  const { isAdmin } = useAuth();

  const handleSave = async () => {
    if (onSave) {
      await onSave(editedDescription);
      setIsEditingDescription(false);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Enter description..."
          className="min-h-[100px] resize-none"
          disabled={isSaving}
        />
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditedDescription(displayDescription || '');
              setIsEditingDescription(false);
            }}
            disabled={isSaving}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Use editedDescription if it exists and is not empty, otherwise use the original description
  const displayDescription = editedDescription || description;

  return (
    <div className="relative">
      {displayDescription ? (
        <p className="text-sm text-muted-foreground">
          {searchQuery ? highlightText(displayDescription, searchQuery) : displayDescription}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground italic">No description available</p>
      )}
      {isAdmin && (
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-0 right-0 h-8 w-8 bg-[#F97316] hover:bg-[#F97316]/80"
          onClick={() => setIsEditingDescription(true)}
        >
          <Pencil className="h-4 w-4 text-white" />
        </Button>
      )}
    </div>
  );
};

export default CardDescription;
