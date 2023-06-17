import { useState, useContext, useEffect } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useSession, signIn } from "next-auth/react";

import { TopicContext } from "@/context/TopicContext";

interface PropsTypes {
  _id: string;
}

const Like = ({ _id }: PropsTypes) => {
  const [isLiked, setIsLiked] = useState(false);
  const { topics, mutate } = useContext(TopicContext);
  const { status }: any = useSession();

  useEffect(() => {
    const index = topics.findIndex((topic: any) => topic._id === _id);
    topics[index] && setIsLiked(topics[index]?.isLiked);
  }, [topics]);

  const handleChange = async () => {
    try {
      setIsLiked(!isLiked);
      await fetch(`/api/topics/${_id}/like`, {
        method: "POST",
        body: JSON.stringify({ topic_id: _id }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Tooltip label="Like">
      <ActionIcon
        className="icon_btn"
        onClick={
          status === "unauthenticated" ? () => signIn("facebook") : handleChange
        }
      >
        {isLiked ? (
          <IconHeartFilled style={{ color: "#ffb7c1" }} size="2rem" />
        ) : (
          <IconHeart size="2rem" />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default Like;
