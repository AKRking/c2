import { useState, useContext, useEffect } from "react";
import { ActionIcon, Tooltip, Loader } from "@mantine/core";
import { IconBookmarkFilled, IconBookmark } from "@tabler/icons-react";
import { useSession, signIn } from "next-auth/react";

import { TopicContext } from "@/context/TopicContext";

interface PropsTypes {
  _id: string;
}

const Bookmark = ({ _id }: PropsTypes) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { status }: any = useSession();
  const { topics, mutate } = useContext(TopicContext);

  useEffect(() => {
    const index = topics.findIndex((topic: any) => topic._id === _id);
    topics[index] && setIsBookmarked(topics[index]?.isBookmarked);
  }, [topics]);

  const handleChange = async () => {
    try {
      setIsBookmarked(!isBookmarked);
      await fetch(`/api/topics/${_id}/bookmark`, {
        method: "POST",
        body: JSON.stringify({ topic_id: _id }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Tooltip label="Bookmark">
      <ActionIcon
        className="icon_btn"
        onClick={
          status === "unauthenticated" ? () => signIn("facebook") : handleChange
        }
      >
        {isBookmarked ? (
          <IconBookmarkFilled style={{ color: "#6a83b6" }} size="2rem" />
        ) : (
          <IconBookmark size="2rem" />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default Bookmark;
