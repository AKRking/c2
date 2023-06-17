import { useContext, useState } from "react";
import { Modal, LoadingOverlay, ScrollArea, Group } from "@mantine/core";

import { ModalContext } from "@/context/ModalContext";
import TopicForm from "./TopicForm";
import { getPostById } from "@/hooks/topics";
import TopicView from "./TopicView";
import Like from "./Like";
import Bookmark from "./Bookmark";

const TopicModal = () => {
  const { modalInfo, setModalInfo } = useContext(ModalContext);

  const { data, isLoading, mutate } = getPostById(
    modalInfo.type !== "create" && modalInfo.opened,
    modalInfo._id
  );

  if (isLoading) return <LoadingOverlay visible={isLoading} />;

  return (
    <Modal.Root
      centered={true}
      size="55%"
      radius="md"
      opened={modalInfo.opened}
      onClose={() => setModalInfo({ opened: false, type: "view" })}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header p="2rem">
          <Modal.Title fz="1.4rem">
            {modalInfo.type === "create" && "Add New Topic"}
            {modalInfo.type === "edit" && "Edit Topic"}
            {modalInfo.type === "view" &&
              `${data?.data.chapter_name} - ${data?.data.chapter_number}`}
          </Modal.Title>
          <Group ml="auto">
            <Like _id={data?.data._id} />
            <Bookmark _id={data?.data._id} />
          </Group>
          <Modal.CloseButton size="lg" ml="1rem" />
        </Modal.Header>
        <Modal.Body p="0.5rem">
          {modalInfo.type === "create" && <TopicForm edit={false} />}
          {modalInfo.type === "edit" && (
            <TopicForm edit={true} topicInfo={data?.data} />
          )}
          {modalInfo.type === "view" && (
            <TopicView topicInfo={data?.data} mutate={mutate} />
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default TopicModal;
