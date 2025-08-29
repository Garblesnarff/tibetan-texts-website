import React from "react";
import { Translation } from "@/types/translation";
import TranslationCard from "../TranslationCard";
import { VersionHistory } from "./VersionHistory";
import { TranslationMetadata } from "./TranslationMetadata";
import { useAuth } from "@/hooks/useAuth";

interface ViewerContentProps {
  currentTranslation: Translation;
  translationId: string;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
  searchQuery?: string;
  onUpdate: () => Promise<void>;
  currentVersion: any;
  onVersionSelect: (version: any) => void;
}

export const ViewerContent = ({
  currentTranslation,
  translationId,
  isEditing,
  onEditingChange,
  searchQuery,
  onUpdate,
  currentVersion,
  onVersionSelect,
}: ViewerContentProps) => {
  const { isAdmin } = useAuth();
  
  // Safely extract code from title
  const code = currentTranslation.title ? currentTranslation.title.split(' ')[0] : '';

  return (
    <div className="pt-10">
      <TranslationMetadata 
        view_count={currentTranslation.view_count || 0}
        featured={currentTranslation.featured || false}
        created_at={currentTranslation.created_at || new Date().toISOString()}
      />
      <TranslationCard
        code={code}
        englishTitle={currentTranslation.title}
        tibetanTitle={currentTranslation.tibetan_title}
        originalTibetanFileName={
          currentTranslation.metadata && 
          typeof currentTranslation.metadata === 'object' && 
          'originalTibetanFileName' in currentTranslation.metadata
            ? (currentTranslation.metadata as { originalTibetanFileName?: string }).originalTibetanFileName
            : undefined
        }
        description={currentTranslation.description}
        translationId={translationId}
        onUpdate={onUpdate}
        isEditing={isEditing}
        onEditingChange={onEditingChange}
        searchQuery={searchQuery}
        tags={currentTranslation.tags || []}
        view_count={currentTranslation.view_count}
        featured={currentTranslation.featured}
        updated_at={currentTranslation.updated_at}
        created_at={currentTranslation.created_at}
      />
      {!isEditing && isAdmin && (
        <div className="mt-6">
          <VersionHistory
            translationId={translationId}
            currentVersion={currentVersion}
            onVersionSelect={onVersionSelect}
          />
        </div>
      )}
    </div>
  );
};