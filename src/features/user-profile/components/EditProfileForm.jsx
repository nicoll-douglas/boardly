import { useForm } from "react-hook-form";
import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormErrorMessage,
  Button,
  Select,
  Textarea,
  FormHelperText,
  UnorderedList,
  ListItem,
  Input,
} from "@chakra-ui/react";
import ageValidation from "../data/ageValidation";
import bioValidation from "../data/bioValidation";
import getImgValidation from "@/lib/utils/getImgValidation";
import useProtectedSubmission from "@/lib/hooks/useProtectedSubmission";
import isDigits from "@/lib/utils/isDigits";

export default function EditProfileForm({ onClose }) {
  const form = useForm({ shouldUnregister: true });
  const onSubmit = useProtectedSubmission(form, "/api/me/profile", {
    onSuccess: {
      message: "Successfully updated profile",
      callback: onClose,
    },
    formData: true,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormControl mb={6} isInvalid={form.formState.errors.profilePicture}>
        <FormLabel>Profile picture</FormLabel>
        <Input
          type="file"
          multiple={false}
          accept="image/*"
          {...form.register(
            "profilePicture",
            getImgValidation({ required: false })
          )}
        />
        <FormErrorMessage>
          {form.formState.errors.profilePicture?.message}
        </FormErrorMessage>
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl isInvalid={form.formState.errors.age} mb={6}>
        <FormLabel>Age</FormLabel>
        <NumberInput step={1} allowMouseWheel isValidCharacter={isDigits}>
          <NumberInputField {...form.register("age", ageValidation)} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>
          {form.formState.errors.age?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb={6} isInvalid={form.formState.errors.pronouns}>
        <FormLabel>Pronouns</FormLabel>
        <Select placeholder="Select pronouns" {...form.register("pronouns")}>
          <option value={"he/him"}>he/him</option>
          <option value={"she/her"}>she/her</option>
          <option value={"they/them"}>they/them</option>
          <option value={"none"}>none</option>
        </Select>
        <FormErrorMessage>
          {form.formState.errors.pronouns?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={form.formState.errors.bio} mb={6}>
        <FormLabel>Bio</FormLabel>
        <Textarea
          resize={"none"}
          placeholder="Enter bio"
          {...form.register("bio", bioValidation)}
          size={"md"}
        />
        <FormErrorMessage>
          {form.formState.errors.bio?.message}
        </FormErrorMessage>
        <FormHelperText>
          <UnorderedList>
            <ListItem>Must be no more than 100 characters long</ListItem>
          </UnorderedList>
        </FormHelperText>
      </FormControl>
      <Button w={"full"} type="submit" isLoading={form.formState.isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
