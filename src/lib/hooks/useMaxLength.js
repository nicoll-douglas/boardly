import { useState } from "react";

export default function useMaxLength(initial) {
  const [length, setLength] = useState(initial || 0);

  function onLengthChange(e) {
    setLength(e.target.value.length);
  }

  return { length, onLengthChange };
}
