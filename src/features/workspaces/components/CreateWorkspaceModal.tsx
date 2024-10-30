"use client";

import { ResponsiveModal } from "@/components/custom/responsive-modal";
import { CreateWorkSpacesForm } from "./CreateWorkSpacesForm";
import { useCreateWorkSpaceModal } from "../hooks/useCreateWorkSpaceModal";



export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkSpaceModal();
  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Create Workspace"
      description="Add a new workspace to organize your projects and collaborate with others."
    >
      <CreateWorkSpacesForm onCancel={close} />
    </ResponsiveModal>
  );
};
