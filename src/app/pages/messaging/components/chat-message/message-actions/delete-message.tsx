import { useCallback, useState } from "react";
import { Message } from "@/types/Messaging/Message";
import { AlertDialog } from "@radix-ui/themes";
import { DeleteMessageModal } from "../action-modals/delete-message-modal";

export const useDeleteMessage = () => {
  const [message, setMessage] = useState<null | Message>(null);

  const onClose = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    setDeleteMessage: setMessage,
    isOpen: message !== null,
    onClose,
  };
};
interface DeleteMessageDialogProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
}
export const DeleteMessageDialog = ({
  message,
  isOpen,
  onClose,
}: DeleteMessageDialogProps) => {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onClose}>
      <AlertDialog.Content>
        {message && <DeleteMessageModal onClose={onClose} message={message} />}
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
