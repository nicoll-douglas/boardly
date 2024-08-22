import {
  FormControl,
  FormLabel,
  Skeleton,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function PronounsField({ form, isLoaded }) {
  return (
    <FormControl mb={6} isInvalid={form.formState.errors.pronouns}>
      <FormLabel>Pronouns</FormLabel>
      <Skeleton isLoaded={isLoaded}>
        <Select
          data-testid="profile-pronouns"
          placeholder="Select pronouns"
          {...form.register("pronouns", { required: false })}
        >
          <option value={"he/him"}>he/him</option>
          <option value={"she/her"}>she/her</option>
          <option value={"they/them"}>they/them</option>
        </Select>
      </Skeleton>
      <FormErrorMessage>
        {form.formState.errors.pronouns?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
