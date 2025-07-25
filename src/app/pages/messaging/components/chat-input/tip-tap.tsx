import {
  EditorContent,
  EditorContext,
  Extension,
  ReactRenderer,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React, { useContext, useEffect } from "react";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import "./tiptap.styles.css";
import Mention from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";

import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import { Plugin } from "prosemirror-state";
import { Box } from "@radix-ui/themes";

import { Message } from "@/types/Messaging/Message";
import { TextFormattingMenu } from "./text-formatting-menu";
import { UserListContext } from "../../context/user-list-provider";
import {
  ChannelListContext,
  ChannelListContextType,
} from "../../context/channel-list-provider";
import { ToolPanel } from "./tool-panel";
import { useSessionStickyState } from "../../hooks/use-sticky-state";
const lowlight = createLowlight(common);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("json", json);
lowlight.register("python", python);
export interface ToolbarFileProps {
  fileInputRef: React.MutableRefObject<any>;
  addFile: (files: File) => void;
}
type TiptapEditorProps = {
  slotBefore?: React.ReactNode;
  slotAfter?: React.ReactNode;
  placeholder?: string;
  sessionStorageKey?: string;
  clearReplyMessage?: () => void;
  disableSessionStorage?: boolean;
  fileProps?: ToolbarFileProps;
  onMessageSend: (message: string, json: any) => Promise<void>;
  messageSending: boolean;
  defaultText?: string;
  replyMessage?: Message | null;
};

export const UserMention = Mention.extend({
  name: "userMention",
}).configure({
  suggestion: {
    char: "@",
    pluginKey: new PluginKey("userMention"),
  },
});

export const ChannelMention = Mention.extend({
  name: "channelMention",
}).configure({
  suggestion: {
    char: "#",
    pluginKey: new PluginKey("channelMention"),
  },
});
const Tiptap = ({
  slotBefore,
  fileProps,
  onMessageSend,
  replyMessage,
  clearReplyMessage,
  placeholder = "Type a message...",
  messageSending,
  sessionStorageKey = "tiptap-editor",
  disableSessionStorage = false,
  defaultText = "",
}: TiptapEditorProps) => {
  const { enabledUsers } = useContext(UserListContext);

  const { channels } = useContext(ChannelListContext) as ChannelListContextType;

  // this is a dummy extension only to create custom keydown behavior
  const KeyboardHandler = Extension.create({
    name: "keyboardHandler",
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          const isCodeBlockActive = this.editor.isActive("codeBlock");
          const isListItemActive = this.editor.isActive("listItem");
          const hasContent = this.editor.getText().trim().length > 0;

          if (isCodeBlockActive || isListItemActive) {
            return false;
          }
          let html = "";
          let json = {};
          if (hasContent) {
            html = this.editor.getHTML();
            json = this.editor.getJSON();
          }

          this.editor.setEditable(false);

          onMessageSend(html, json)
            .then(() => {
              this.editor.commands.clearContent(true);
              this.editor.setEditable(true);
            })
            .catch(() => {
              this.editor.setEditable(true);
            });
          return this.editor.commands.clearContent(true);
        },

        "Mod-Enter": () => {
          const isCodeBlockActive = this.editor.isActive("codeBlock");
          const isListItemActive = this.editor.isActive("listItem");
          const hasContent = this.editor.getText().trim().length > 0;
          /**
           * when inside of a codeblock and setting for sending the message with CMD/CTRL-Enter
           * force calling the `onSubmit` function and clear the editor content
           */
          if (isCodeBlockActive) {
            return this.editor.commands.newlineInCode();
          }

          if (isListItemActive) {
            return false;
          }

          if (!isCodeBlockActive && !isListItemActive) {
            let html = "";
            let json = {};
            if (hasContent) {
              html = this.editor.getHTML();
              json = this.editor.getJSON();
            }

            this.editor.setEditable(false);
            onMessageSend(html, json)
              .then(() => {
                this.editor.commands.clearContent(true);
                this.editor.setEditable(true);
              })
              .catch(() => {
                this.editor.setEditable(true);
              });
            return this.editor.commands.clearContent(true);
          }

          return false;
        },
        Backspace: () => {
          const isEditorEmpty = this.editor.isEmpty;

          if (isEditorEmpty) {
            // Clear the reply message if the editor is empty
            clearReplyMessage?.();
            return this.editor.commands.clearContent(true);
          }

          return false;
        },

        // 'Shift-Enter': () => {
        //     /**
        //      * currently we do not have an option to show a soft line break in the posts, so we overwrite
        //      * the behavior from tiptap with the default behavior on pressing enter
        //      */
        //     return this.editor.commands.first(({ commands }) => [
        //         () => commands.newlineInCode(),
        //         () => commands.createParagraphNear(),
        //         () => commands.liftEmptyBlock(),
        //         () => commands.splitBlock(),
        //     ]);
        // },
      };
    },
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              drop(view, event) {
                const hasFiles =
                  event.dataTransfer &&
                  event.dataTransfer.files &&
                  event.dataTransfer.files.length;

                if (!hasFiles || !fileProps) {
                  return;
                }

                const images = Array.from(event.dataTransfer.files).filter(
                  (file) => /image/i.test(file.type),
                );

                if (images.length === 0) {
                  return;
                }

                event.preventDefault();

                images.forEach((image) => {
                  fileProps.addFile(image);
                });
              },
              paste(view, event) {
                const hasFiles =
                  event.clipboardData &&
                  event.clipboardData.files &&
                  event.clipboardData.files.length;

                if (!hasFiles || !fileProps) {
                  return;
                }

                const images = Array.from(event.clipboardData.files).filter(
                  (file) => /image/i.test(file.type),
                );

                if (images.length === 0) {
                  return;
                }

                event.preventDefault();

                images.forEach((image) => {
                  fileProps.addFile(image);
                });
              },
            },
          },
        }),
      ];
    },
  });
  const extensions = [
    StarterKit.configure({
      heading: false,
      codeBlock: false,
      listItem: {
        HTMLAttributes: {
          class: "rt-Text rt-r-size-2",
        },
      },
      paragraph: {
        HTMLAttributes: {
          class: "rt-Text rt-r-size-2",
        },
      },
    }),

    Underline,
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: {
        class: "bg-[var(--yellow-6)] dark:bg-[var(--yellow-11)] px-2 py-1",
      },
    }),
    Link.configure({
      protocols: ["mailto", "https", "http"],
    }),
    Placeholder.configure({
      // Pick a random placeholder from the list.
      placeholder,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    KeyboardHandler,
  ];

  const [content, setContent] = useSessionStickyState(
    defaultText,
    sessionStorageKey,
    disableSessionStorage,
  );

  const editor = useEditor(
    {
      extensions,
      autofocus: "end",
      content,
      editorProps: {
        attributes: {
          class: "tiptap-editor" + (replyMessage ? " replying" : ""),
        },
      },
      onUpdate({ editor }) {
        setContent(editor.getHTML());
      },
    },
    [replyMessage],
  );

  useEffect(() => {
    setTimeout(() => {
      editor?.chain().focus().run();
    }, 50);
  }, [replyMessage, editor]);

  return (
    <Box className="border rounded-radius2 border-gray-300 dark:border-gray-500 dark:bg-gray-3 shadow-md ">
      <EditorContext.Provider value={{ editor }}>
        {slotBefore}
        <EditorContent editor={editor} />
        <ToolPanel>
          <TextFormattingMenu />
        </ToolPanel>
      </EditorContext.Provider>
    </Box>
  );
};

export default Tiptap;
