import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UploadDialog } from "./upload/UploadDialog";
import { useFileUpload } from "@/hooks/useFileUpload";

/**
 * AdminUpload component handles the file upload functionality for administrators
 * Includes authentication checks and file upload management
 */
export function AdminUpload() {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    uploading,
    progress,
    title,
    setTitle,
    tibetanTitle,
    setTibetanTitle,
    open,
    setOpen,
    handleFileUpload,
    handleSubmit,
    sourceFile,
    translationFile,
    toast
  } = useFileUpload();

  /**
   * Verifies if the current user has admin privileges
   */
  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    // Set admin status based on email
    setIsAdmin(user?.email === 'wonky.coin@gmail.com');
  };

  useState(() => {
    checkAdminStatus();
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Upload Translation
        </Button>
      </DialogTrigger>
      <UploadDialog
        open={open}
        onOpenChange={setOpen}
        onFileUpload={handleFileUpload}
        uploading={uploading}
        progress={progress}
        title={title}
        setTitle={setTitle}
        tibetanTitle={tibetanTitle}
        setTibetanTitle={setTibetanTitle}
        handleSubmit={handleSubmit}
        sourceFile={sourceFile}
        translationFile={translationFile}
      />
    </Dialog>
  );
}