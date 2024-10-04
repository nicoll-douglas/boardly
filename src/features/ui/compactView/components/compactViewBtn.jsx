import { IconButton } from "@chakra-ui/react";
import { MdViewStream } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import useCompactView from "../hooks/useCompactView";

export default function CompactViewBtn() {
  const { compactView, setCompactView } = useCompactView();
  //
  return (
    <IconButton
      variant={"ghost"}
      size={"sm"}
      icon={
        compactView ? <MdViewStream size={20} /> : <FiAlignJustify size={20} />
      }
      onClick={() => setCompactView((v) => !v)}
      aria-label="Toggle compact view"
      aria-pressed={compactView}
    />
  );
}
