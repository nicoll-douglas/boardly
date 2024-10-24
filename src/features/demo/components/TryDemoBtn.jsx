import { Button, useToast } from "@chakra-ui/react";
import demo from "../services/demo";
import { useNavigate } from "react-router-dom";
import { useSubmitHandlers, useNotif } from "@/hooks";

export default function TryDemoBtn(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const notif = useNotif();

  const handlers = {
    200: () => {
      toast({
        status: "success",
        title: "Successfully logged in",
      });
      navigate("/home");
    },
    500: () => notif.serverError(),
  };

  const onSubmit = useSubmitHandlers(demo, handlers);

  return (
    <Button variant={"outline"} onClick={onSubmit} {...props}>
      Try Demo
    </Button>
  );
}
