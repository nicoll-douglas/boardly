import { useEffect, useState } from "react";

export default function useShowDelay(delay = 400) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, []);

  return show;
}
