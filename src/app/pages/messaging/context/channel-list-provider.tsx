import {
  FrappeError,
  useFrappeDocTypeEventListener,
  useFrappeGetCall,
} from "frappe-react-sdk";
import { PropsWithChildren, createContext } from "react";
import { KeyedMutator } from "swr";

import { PPChannel } from "@/types/ParentPortal/PPChannel";
import { useToast } from "@atoms/use-toast";

export type ExtraUsersData = {
  name: string;
  full_name: string;
  user_image: string;
};

export type UnreadCountData = {
  total_unread_count_in_channels: number;
  total_unread_count_in_dms: number;
  channels: { name: string; user_id?: string; unread_count: number }[];
};

export type ChannelListItem = Pick<
  PPChannel,
  | "name"
  | "channel_name"
  | "type"
  | "channel_description"
  | "is_direct_message"
  | "is_self_message"
  | "is_archived"
  | "creation"
  | "owner"
>;

export interface DMChannelListItem extends ChannelListItem {
  peer_user_id: string;
  is_direct_message: 1;
}

export interface SidebarChannelListItem extends ChannelListItem {
  is_archived: 0;
}

interface ChannelList {
  channels: ChannelListItem[];
  dm_channels: DMChannelListItem[];
  extra_users: ExtraUsersData[];
}

export interface ChannelListContextType extends ChannelList {
  mutate: KeyedMutator<{ message: ChannelList }>;
  error?: FrappeError;
  isLoading: boolean;
}
export const ChannelListContext = createContext<ChannelListContextType | null>(
  null
);

export const ChannelListProvider = ({ children }: PropsWithChildren) => {
  const channelListContextData = useFetchChannelList();
  return (
    <ChannelListContext.Provider value={channelListContextData}>
      {children}
    </ChannelListContext.Provider>
  );
};

/**
 * Hook to fetch the channel list - all channels + DM's + other users if any
 * Also listens to the channel_list_updated event to update the channel list
 */
export const useFetchChannelList = (): ChannelListContextType => {
  const { toast } = useToast();
  const { data, mutate, ...rest } = useFrappeGetCall<{ message: ChannelList }>(
    "parent_portal.api.pp_channel.get_all_channels",
    {
      hide_archived: false,
    },
    `channel_list`,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      onError: (error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
    }
  );

  console.log("ChannelListProvider.tsx: useFetchChannelList(): data:", data);

  useFrappeDocTypeEventListener("PP Channel", () => {
    mutate();
  });

  return {
    channels: data?.message.channels ?? [],
    dm_channels: data?.message.dm_channels ?? [],
    extra_users: data?.message.extra_users ?? [],
    mutate,
    ...rest,
  };
};
