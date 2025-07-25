import { useFrappePostCall, useSWRConfig } from "frappe-react-sdk";
import { Message } from "@/types/Messaging/Message";

export const useSendMessage = (
  channelID: string,
  selectedMessage?: Message | null
) => {
  const { mutate } = useSWRConfig();
  const { call, loading } = useFrappePostCall(
    "parent_portal.api.pp_message.send_message"
  );

  const sendMessage = async (content: string, json?: any): Promise<void> => {
    if (content) {
      return call({
        channel_id: channelID,
        text: content,
        json: json,
        is_reply: selectedMessage ? 1 : 0,
        linked_message: selectedMessage ? selectedMessage.name : null,
      }).then(() => {
        mutate(`get_messages_for_channel_${channelID}`);
      });
    } else {
      return Promise.resolve();
    }
  };

  return {
    sendMessage,
    loading,
  };
};
