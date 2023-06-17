import { Text, AspectRatio } from "@mantine/core";

import TextEditor from "./TextEditor";

interface ITopic {
  _id: string;
  title: string;
  chapter_name: string;
  chapter_number: string;
  youtube_url: string;
  mini_description: string;
  description: [{}];
}

interface PropsTypes {
  topicInfo?: ITopic;
  mutate: any;
}

const TopicView = ({ topicInfo, mutate }: PropsTypes) => {
  mutate();

  return (
    <div className="p-[1.5rem] pt-0">
      <Text fz="2rem" fw="bold">
        {topicInfo?.title}
      </Text>
      <AspectRatio ratio={16 / 9} mt="2rem" mb="2rem">
        <iframe
          src={`https://www.youtube.com/embed/${topicInfo?.youtube_url
            .split(/[=/]/)
            .at(-1)}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
      <TextEditor
        content={topicInfo?.description}
        handleChange={() => {}}
        editable={false}
      />
    </div>
  );
};

export default TopicView;
