import { useFrappeUpdateDoc, useSWRConfig } from "frappe-react-sdk";
import { Suspense, lazy, useEffect } from "react";
import { IconButton, Dialog, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { Message, TextMessage } from "@/types/Messaging/Message";
import { useToast } from "@atoms/use-toast";
import { ErrorBanner } from "@atoms/frappe-error-banner";
import { Loader } from "@atoms/loader";

const Tiptap = lazy(() => import("../../chat-input/tip-tap"));

interface EditMessageModalProps {
  onClose: (refresh?: boolean) => void;
  message: TextMessage;
}

export const EditMessageModal = ({
  onClose,
  message,
}: EditMessageModalProps) => {
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const {
    updateDoc,
    error,
    loading: updatingDoc,
    reset,
  } = useFrappeUpdateDoc();

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = async (html: string) => {
    return updateDoc("PP Message", message.name, { text: html }).then((d) => {
      onClose(true);
      toast({
        title: "Message updated",
        description: "Your message has been updated",
        // variant: "success",
        duration: 1000,
      });
      return mutate(`get_messages_for_channel_${d.channel_id}`);
    });
  };

  return (
    <>
      <Flex justify={"between"}>
        <Dialog.Title>Edit Message</Dialog.Title>
        <Dialog.Close disabled={updatingDoc}>
          <IconButton size="1" variant="soft" color="gray">
            <BiX size="18" />
          </IconButton>
        </Dialog.Close>
      </Flex>

      <Flex gap="2" direction="column">
        <ErrorBanner error={error} />
        <Suspense fallback={<Loader />}>
          <Tiptap
            onMessageSend={onSubmit}
            disableSessionStorage
            messageSending={updatingDoc}
            defaultText={message.text}
          />
        </Suspense>
        <Flex justify="end">
          <Text size="1" color="gray">
            Press <b>Enter</b> to save
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
