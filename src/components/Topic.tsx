"use client";
import { useContext } from "react";
import { Paper, ActionIcon, Text, Tooltip } from "@mantine/core";
import {
  IconPencil,
  IconTrash,
  IconHeart,
  IconBookmark,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import { ModalContext } from "@/context/ModalContext";
import Like from "./Like";
import Bookmark from "./Bookmark";

interface PropsTypes {
  topicInfo: {
    _id: string;
    title: string;
    mini_description: "";
    isLiked: boolean;
    isBookmarked: boolean;
  };
}

const Topic = ({ topicInfo }: PropsTypes) => {
  const { data }: any = useSession();
  const { setModalInfo, setDeleteModalInfo } = useContext(ModalContext);

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      className="w-[30rem] flex items-center flex-col"
    >
      <Text lineClamp={2} className="text-2xl font-bold pb-2">
        {topicInfo.title}
      </Text>
      <Text lineClamp={3} fz="1.2rem" className="pb-2 text-left h-[6rem]">
        {topicInfo.mini_description}
      </Text>
      <div className="w-full flexBetween">
        <Text
          className="text-xl font-semibold underline cursor-pointer"
          onClick={() =>
            setModalInfo({ opened: true, type: "view", _id: topicInfo._id })
          }
        >
          View More
        </Text>
        <div className="flexCenter">
          {data?.user.admin && (
            <>
              <Tooltip label="Edit">
                <ActionIcon
                  className="icon_btn"
                  onClick={() =>
                    setModalInfo({
                      opened: true,
                      type: "edit",
                      _id: topicInfo._id,
                    })
                  }
                >
                  <IconPencil size="2rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  className="icon_btn"
                  onClick={() =>
                    setDeleteModalInfo({ opened: true, _id: topicInfo._id })
                  }
                >
                  <IconTrash size="2rem" />
                </ActionIcon>
              </Tooltip>
            </>
          )}
          <Like _id={topicInfo._id} />
          <Bookmark _id={topicInfo._id} />
        </div>
      </div>
    </Paper>
  );
};

export default Topic;
