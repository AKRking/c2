import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Text } from "@mantine/core";

interface PropsTypes {
  handleChange: (event: any) => void;
  content?: [{}];
  editable?: boolean;
}

const TextEditor = ({ handleChange, content, editable }: PropsTypes) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editable: editable,
    content: content || [{}],
    onUpdate({ editor }) {
      let event = { target: { name: "", value: {} } };
      event.target.name = "description";
      event.target.value = editor.getJSON();
      handleChange(event);

      event.target.name = "mini_description";
      event.target.value = editor.getText();
      handleChange(event);
    },
  });
  return (
    <div>
      {editable && (
        <Text fz="1.4rem" fw="500" color="dark">
          Description
        </Text>
      )}
      <RichTextEditor editor={editor} onChange={() => console.log("hello")}>
        {editable && (
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold w="2.5rem" h="2.5rem" />
              <RichTextEditor.Italic w="2.5rem" h="2.5rem" />
              <RichTextEditor.Underline w="2.5rem" h="2.5rem" />
              <RichTextEditor.Strikethrough w="2.5rem" h="2.5rem" />
              <RichTextEditor.ClearFormatting w="2.5rem" h="2.5rem" />
              <RichTextEditor.Highlight w="2.5rem" h="2.5rem" />
              <RichTextEditor.Code w="2.5rem" h="2.5rem" />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 w="2.5rem" h="2.5rem" />
              <RichTextEditor.H2 w="2.5rem" h="2.5rem" />
              <RichTextEditor.H3 w="2.5rem" h="2.5rem" />
              <RichTextEditor.H4 w="2.5rem" h="2.5rem" />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote w="2.5rem" h="2.5rem" />
              <RichTextEditor.Hr w="2.5rem" h="2.5rem" />
              <RichTextEditor.BulletList w="2.5rem" h="2.5rem" />
              <RichTextEditor.OrderedList w="2.5rem" h="2.5rem" />
              <RichTextEditor.Subscript w="2.5rem" h="2.5rem" />
              <RichTextEditor.Superscript w="2.5rem" h="2.5rem" />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft w="2.5rem" h="2.5rem" />
              <RichTextEditor.AlignCenter w="2.5rem" h="2.5rem" />
              <RichTextEditor.AlignJustify w="2.5rem" h="2.5rem" />
              <RichTextEditor.AlignRight w="2.5rem" h="2.5rem" />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
        )}

        <RichTextEditor.Content fz="1.4rem" />
      </RichTextEditor>
    </div>
  );
};

export default TextEditor;
