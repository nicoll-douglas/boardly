import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import useProtectedSubmission from "@/lib/hooks/useProtectedSubmission";
import destructureData from "../../utils/destructureData";
import useProfileContext from "../../hooks/useProfileContext";
import { useQueryClient } from "@tanstack/react-query";
import SelectPronouns from "./PronounsField";
import AgeField from "./AgeField";
import BioField from "./BioField";

export default function EditProfileForm({ onClose }) {
  const { isLoading, protectedData } = useProfileContext();
  const { bio, age, pronouns } = destructureData(protectedData);
  const isLoaded = !isLoading;
  const queryClient = useQueryClient();

  const form = useForm({
    shouldUnregister: true,
    defaultValues: {
      bio,
      age,
      pronouns,
    },
  });
  const values = form.watch();
  const isInitial =
    values.age === age && values.bio === bio && values.pronouns === pronouns;

  const onSubmit = useProtectedSubmission(form, "/api/me/profile/info", {
    onSuccess: {
      message: "Successfully updated profile",
      callback: () => {
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["GET /api/me"],
        });
      },
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <AgeField form={form} isLoaded={isLoaded} />
      <SelectPronouns form={form} isLoaded={isLoaded} />
      <BioField form={form} isLoaded={isLoaded} initial={bio} />
      <Button
        w={"full"}
        type="submit"
        data-testid="profile-submit"
        isLoading={form.formState.isSubmitting}
        isDisabled={!isLoaded || isInitial}
      >
        Submit
      </Button>
    </form>
  );
}
