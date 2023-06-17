import { useState, useContext } from "react";
import { TextInput, Modal, Button, LoadingOverlay } from "@mantine/core";

import TextEditor from "./TextEditor";
import { ModalContext } from "@/context/ModalContext";
import { TopicContext } from "@/context/TopicContext";

interface ITopic {
  _id?: string;
  title: string;
  chapter_name: string;
  chapter_number: string;
  youtube_url: string;
  mini_description: string;
  description: [{}];
}

interface PropsTypes {
  edit: boolean;
  topicInfo?: ITopic;
}

const TopicForm = ({ edit, topicInfo }: PropsTypes) => {
  const [topic, setTopic] = useState<ITopic>({
    title: topicInfo?.title || "",
    chapter_name: topicInfo?.chapter_name || "",
    chapter_number: topicInfo?.chapter_number || "",
    youtube_url: topicInfo?.youtube_url || "",
    mini_description: topicInfo?.mini_description || "",
    description: topicInfo?.description || [{}],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useContext(TopicContext);
  const { setModalInfo } = useContext(ModalContext);

  const handleChange = (event: any) => {
    setTopic((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mini_description = topic.mini_description.substring(0, 300);
    topic.mini_description = mini_description;

    try {
      setIsLoading(true);
      if (edit) {
        await fetch(`/api/topics/${topicInfo?._id}`, {
          method: "PUT",
          body: JSON.stringify(topic),
        });
      } else {
        await fetch("/api/topics", {
          method: "POST",
          body: JSON.stringify(topic),
        });
      }
      setIsLoading(false);
      mutate();
      setModalInfo({ opened: false, type: "view" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="p-[1.5rem] pt-0" onSubmit={handleSubmit}>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Title"
        placeholder="Enter topic title"
        size="xl"
        mb="1rem"
        value={topic.title}
        name="title"
        onChange={handleChange}
      />
      <TextInput
        label="Chapter Name"
        placeholder="Enter chapter name"
        size="xl"
        mb="1rem"
        value={topic.chapter_name}
        name="chapter_name"
        onChange={handleChange}
      />
      <TextInput
        label="Chapter Number"
        placeholder="Enter chapter Number"
        size="xl"
        mb="1rem"
        value={topic.chapter_number}
        name="chapter_number"
        onChange={handleChange}
      />
      <TextInput
        label="YouTube URL"
        placeholder="Add youtube url"
        size="xl"
        mb="1rem"
        value={topic.youtube_url}
        name="youtube_url"
        onChange={handleChange}
      />
      <TextEditor
        editable={true}
        handleChange={handleChange}
        content={topicInfo?.description}
      />
      <Button
        variant="outline"
        className="btn float-right mt-4 mb-8 w-[12rem]"
        type="submit"
      >
        {edit ? "Update" : "Submit"}
      </Button>
    </form>
  );
};

export default TopicForm;
