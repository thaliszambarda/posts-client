import { Toaster } from "sonner";

import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { EditModal } from "@/components/modals/edit-modal";

export const Providers = () => {
  return (
    <>
      <ConfirmationModal />
      <EditModal />
      <Toaster richColors />
    </>
  );
};
