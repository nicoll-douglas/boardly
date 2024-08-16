import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export default function EditProfileBtn(props) {
  return (
    <IconButton icon={<EditIcon />} variant={"ghost"} size={"sm"} {...props} />
  );
}
