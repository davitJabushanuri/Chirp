import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { PinIcon } from "@/assets/pin-icon";
import { ReportIcon } from "@/assets/report-icon";
import { TrashIcon } from "@/assets/trash-icon";
import { Button } from "@/components/elements/button";
import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import {
  Avatar,
  LinkToProfile,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { SnoozeNotificationsIcon } from "../assets/snooze-notifications-icon";
import { useDeleteConversation } from "../hooks/use-delete-conversation";
import { IConversation } from "../types";

export const ConversationCard = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const user = conversation?.users.filter(
    (user) => user.id !== session?.user?.id,
  )[0];
  const lastMessage = conversation?.messages[conversation?.messages.length - 1];

  const mutation = useDeleteConversation();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router?.push(`/messages/${conversation?.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") router?.push(`/messages/${conversation?.id}`);
      }}
      className="group relative flex cursor-pointer gap-2 p-4 outline-offset-[-2px] transition-colors duration-200 ease-in-out hover:bg-neutral-300 focus-visible:bg-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-100 active:bg-neutral-400 "
    >
      <div className="mt-2">
        <LinkToProfile userId={user?.id} tabIndex={-1}>
          <Avatar userImage={user?.profile_image_url} />
        </LinkToProfile>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <UserName name={user?.name} isVerified={user?.verified} />

            <EllipsisWrapper>
              <UserScreenName screenName={user?.email?.split("@")[0]} />
            </EllipsisWrapper>
            <span className="text-tertiary-100">·</span>
            <CreateDate
              focus={false}
              hover={false}
              date={lastMessage?.created_at}
            />
          </div>
          <div className="ml-auto">
            <Tooltip text="More">
              <Button
                aria-expanded={isModalOpen}
                aria-haspopup="menu"
                aria-label="More"
                data-title="More"
                ref={buttonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                className="invisible fill-tertiary-100 hover:bg-primary-100/10 hover:fill-primary-100 focus-visible:bg-primary-100/10 active:bg-primary-100/15 group-hover:visible"
              >
                <DotIcon />
              </Button>
            </Tooltip>

            <AnimatePresence>
              {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} background="none">
                  <Menu
                    onClose={() => setIsModalOpen}
                    trackScroll={true}
                    ref={buttonRef}
                  >
                    <MenuItem onClick={() => setIsModalOpen(false)}>
                      <PinIcon /> Pin conversation
                    </MenuItem>

                    <MenuItem onClick={() => setIsModalOpen(false)}>
                      <SnoozeNotificationsIcon /> Snooze conversation
                    </MenuItem>

                    <MenuItem onClick={() => setIsModalOpen(false)}>
                      <ReportIcon /> Report conversation
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        mutation.mutate({ conversationId: conversation?.id });
                        setIsModalOpen(false);
                      }}
                      color="red"
                    >
                      <TrashIcon /> Delete conversation
                    </MenuItem>
                  </Menu>
                </Modal>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-flow-col overflow-hidden">
          {lastMessage?.image &&
          lastMessage?.sender_id === session?.user?.id ? (
            <span className="truncate text-milli text-tertiary-100">
              You sent a photo
            </span>
          ) : lastMessage?.image &&
            lastMessage?.receiver_id === session?.user?.id ? (
            <span className="truncate text-milli font-medium text-tertiary-100">
              Sent a photo
            </span>
          ) : (
            <span className="truncate text-milli text-tertiary-100">
              {lastMessage?.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
