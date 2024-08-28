import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import useProfileContext from "../../hooks/useProfileContext";
import SelectPronouns from "./PronounsField";
import AgeField from "./AgeField";
import BioField from "./BioField";
import useProtectedSubmission from "@/lib/hooks/useProtectedSubmission";
import editProfile from "../../services/editProfile";
import useSubmitHandlers from "@/lib/hooks/useSubmitHandlers";
import DOMPurify from "dompurify";

export default function EditProfileForm({ onClose }) {
  const { isLoading, profile = {} } = useProfileContext();
  const form = useForm({
    shouldUnregister: true,
    defaultValues: {
      bio: profile?.bio && DOMPurify.sanitize(profile.bio),
      age: profile.age,
      pronouns: profile.pronouns,
    },
  });
  const { handlers, accessToken } = useProtectedSubmission(form, {
    onSuccess: {
      message: "Successfully updated profile",
      callback: onClose,
    },
    invalidate: ["GET /api/me"],
  });
  const onSubmit = useSubmitHandlers(
    async () => editProfile(accessToken, form),
    handlers
  );

  const isLoaded = !isLoading;
  const values = form.watch();
  const isInitial =
    values.age === profile.age &&
    values.bio === profile.bio &&
    values.pronouns === profile.pronouns;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <AgeField form={form} isLoaded={isLoaded} />
      <SelectPronouns form={form} isLoaded={isLoaded} />
      <BioField form={form} isLoaded={isLoaded} initial={profile.bio} />
      <Button
        w={"full"}
        type="submit"
        data-testid="profile-submit"
        isLoading={form.formState.isSubmitting}
        isDisabled={isLoading || isInitial}
      >
        Save
      </Button>
    </form>
  );
}
