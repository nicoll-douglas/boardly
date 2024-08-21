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
import { imgHelperText } from "@/lib/constants/helperText";

export default function AvatarField({ form, isLoaded }) {
  return (
    <FormControl mb={6} isInvalid={form.formState.errors.avatar}>
      <FormLabel>Profile picture</FormLabel>
      <Skeleton isLoaded={isLoaded}>
        <Input
          type="file"
          multiple={false}
          accept="image/*"
          {...form.register("avatar", getImgValidation({ required: false }))}
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
  );
}
