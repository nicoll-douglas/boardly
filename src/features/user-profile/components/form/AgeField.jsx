import isDigits from "@/lib/utils/isDigits";
import {
  FormControl,
  NumberInput,
  FormLabel,
  FormErrorMessage,
  NumberInputField,
  Skeleton,
} from "@chakra-ui/react";
import ageValidation from "../../data/ageValidation";

export default function AgeField({ form, isLoaded }) {
  return (
    <FormControl isInvalid={form.formState.errors.age} mb={6}>
      <FormLabel>Age</FormLabel>
      <NumberInput step={1} isValidCharacter={isDigits}>
        <Skeleton isLoaded={isLoaded}>
          <NumberInputField
            data-testid="profile-age"
            {...form.register("age", ageValidation)}
          />
        </Skeleton>
      </NumberInput>
      <FormErrorMessage>{form.formState.errors.age?.message}</FormErrorMessage>
    </FormControl>
  );
}
