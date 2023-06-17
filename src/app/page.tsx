"use client";
import { useContext } from "react";
import { LoadingOverlay, Flex } from "@mantine/core";

import Navbar from "../components/Navbar";
import Topic from "@/components/Topic";
import TopicModal from "@/components/TopicModal";
import DeleteModal from "@/components/DeleteModal";
import { TopicContext } from "@/context/TopicContext";

const Home = () => {
  const { topics, isLoading } = useContext(TopicContext);

  if (isLoading) return <LoadingOverlay visible={true} />;

  return (
    <main className="w-full p-[10rem] max-sm:p-[1rem] max-sm:pt-[10rem]">
      <Navbar />
      <Flex
        wrap="wrap"
        gap="md"
        className="max-sm:items-center max-sm:justify-center"
      >
        {topics.map((topicInfo: any) => (
          <Topic topicInfo={topicInfo} key={topicInfo._id} />
        ))}
      </Flex>
      <TopicModal />
      <DeleteModal />
    </main>
  );
};

export default Home;
