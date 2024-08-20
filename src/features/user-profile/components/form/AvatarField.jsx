import ProfileImagePreview from "./ProfileImagePreview";
import {
  FormControl,
  FormLabel,
  Skeleton,
  Input,
  FormErrorMessage,
  FormHelperText,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import getImgValidation from "@/lib/utils/getImgValidation";
import { useState } from "react";
import { imgHelperText } from "@/lib/constants/helperText";

export default function AvatarField({ form, isLoaded, initial }) {
  const [upload, setUpload] = useState(initial);

  const { onChange, ...rest } = form.register(
    "avatar",
    getImgValidation({ required: false })
  );

  function handleUploadChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUpload(initial);
    }
  }

  return (
    <>
      <FormControl mb={6} isInvalid={form.formState.errors.avatar}>
        <FormLabel>Profile picture</FormLabel>
        <Skeleton isLoaded={isLoaded}>
          <Input
            type="file"
            multiple={false}
            accept="image/*"
            onChange={(e) => {
              onChange(e);
              handleUploadChange(e);
            }}
            {...rest}
          />
        </Skeleton>
        <FormErrorMessage>
          {form.formState.errors.avatar?.message}
        </FormErrorMessage>
        <FormHelperText>
          <UnorderedList>
            {imgHelperText.map((text, index) => (
              <ListItem key={index}>{text}</ListItem>
            ))}
          </UnorderedList>
        </FormHelperText>
      </FormControl>
      <ProfileImagePreview src={upload} />
    </>
  );
}
