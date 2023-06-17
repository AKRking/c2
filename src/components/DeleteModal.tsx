import { useState, useContext } from "react";
import {
  Modal,
  ScrollArea,
  Text,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";

import { ModalContext } from "@/context/ModalContext";
import { TopicContext } from "@/context/TopicContext";

const DeleteModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteModalInfo, setDeleteModalInfo } = useContext(ModalContext);
  const { mutate } = useContext(TopicContext);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const url = `/api/topics/${deleteModalInfo._id}`;
      await fetch(url, { method: "DELETE" });
      setIsLoading(false);
      mutate();
      setDeleteModalInfo({ opened: false });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal.Root
      centered={true}
      size="lg"
      radius="md"
      opened={deleteModalInfo.opened}
      onClose={() => setDeleteModalInfo({ opened: false })}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header p="2rem">
          <Modal.Title fz="1.6rem">Delete Topic</Modal.Title>
          <Modal.CloseButton size="xl" />
        </Modal.Header>
        <Modal.Body p="2rem">
          <LoadingOverlay visible={isLoading} />
          <Text fz="1.4rem">
            Are you sure you want to delete topic? this action is irreversible
            and cannot be undone.
          </Text>
          <Group mt="2rem" position="right">
            <Button
              variant="outline"
              className="btn w-[12rem]"
              onClick={() => setDeleteModalInfo({ opened: false })}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              color="red"
              className="h-[3.4rem] w-[12rem]"
              fz="1.2rem"
              onClick={handleDelete}
            >
              Delete Topic
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default DeleteModal;
