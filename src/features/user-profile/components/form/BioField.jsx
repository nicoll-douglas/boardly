import LabelWithCounter from "@/components/form/LabelWithCounter";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  UnorderedList,
  ListItem,
  Skeleton,
  Textarea,
} from "@chakra-ui/react";
import bioValidation from "../../data/bioValidation";
import useMaxLength from "@/lib/hooks/useMaxLength";

export default function BioField({ form, isLoaded, initial }) {
  const { onChange, ...rest } = form.register("bio", bioValidation);
  const { length, onLengthChange } = useMaxLength(initial?.length);

  return (
    <FormControl isInvalid={form.formState.errors.bio} mb={6}>
      <LabelWithCounter
        length={length}
        maxLength={bioValidation.maxLength.value}
      >
        Bio
      </LabelWithCounter>
      <Skeleton isLoaded={isLoaded}>
        <Textarea
          resize={"none"}
          data-testid="profile-bio"
          placeholder="Enter bio"
          size={"md"}
          minH={32}
          onChange={(e) => {
            onChange(e);
            onLengthChange(e);
          }}
          {...rest}
        />
      </Skeleton>
      <FormErrorMessage>{form.formState.errors.bio?.message}</FormErrorMessage>
      <FormHelperText>
        <UnorderedList>
          <ListItem>Must be no more than 100 characters long</ListItem>
        </UnorderedList>
      </FormHelperText>
    </FormControl>
  );
}
