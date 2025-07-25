import { ContextMenu, Flex } from "@radix-ui/themes";
import { Message } from "@/types/Messaging/Message";
import { useContext } from "react";
import {
  BiBookmarkMinus,
  BiBookmarkPlus,
  BiCopy,
  BiEditAlt,
  BiTrash,
} from "react-icons/bi";
import { FrappeConfig, FrappeContext } from "frappe-react-sdk";
import { useMessageCopy } from "./use-message-copy";
import { AuthContext } from "@/lib/auth/auth-provider";
import { useToast } from "@atoms/use-toast";

export interface MessageContextMenuProps {
  message: Message;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  isOwner: boolean;
}

export const MessageContextMenu = ({
  message,
  onEdit,
  onDelete,
  isOwner,
}: MessageContextMenuProps) => {
  const copy = useMessageCopy(message);
  return (
    <ContextMenu.Content>
      <ContextMenu.Group>
        {message.message_type === "Text" && (
          <ContextMenu.Item onClick={copy}>
            <Flex gap="2">
              <BiCopy size="18" />
              Copy
            </Flex>
          </ContextMenu.Item>
        )}
      </ContextMenu.Group>

      {/* <ContextMenu.Separator /> */}

      {isOwner && (
        <ContextMenu.Group>
          <ContextMenu.Separator />
          {message.message_type === "Text" && (
            <ContextMenu.Item onClick={onEdit}>
              <Flex gap="2">
                <BiEditAlt size="18" />
                Edit
              </Flex>
            </ContextMenu.Item>
          )}
          <ContextMenu.Item color="red" onClick={onDelete}>
            <Flex gap="2">
              <BiTrash size="18" />
              Delete
            </Flex>
          </ContextMenu.Item>
        </ContextMenu.Group>
      )}
    </ContextMenu.Content>
  );
};
