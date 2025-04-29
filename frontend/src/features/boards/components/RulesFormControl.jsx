import { FormControl, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { LabelWithCounter } from "@/components/form";
import validation from "../data/boardValidation";
import { useMaxLength } from "@/hooks";

export default function RulesFormControl({ form, initialLength }) {
  const { onChange, ...rest } = form.register("rules", validation.rules);
  const { length, onChange: onLengthChange } = useMaxLength(initialLength);

  return (
    <FormControl isInvalid={form.formState.errors.rules} mb={6}>
      <LabelWithCounter
        length={length}
        maxLength={validation.rules.maxLength.value}
      >
        Rules
      </LabelWithCounter>
      <Textarea
        resize={"none"}
        placeholder="Enter rules..."
        rows={8}
        whiteSpace={"pre-wrap"}
        onChange={(e) => {
          onChange(e);
          onLengthChange(e);
        }}
        {...rest}
      />
      <FormErrorMessage>
        {form.formState.errors.rules?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
