import { useEffect, useState } from "react";

export default function useSearchBoards(list) {
  const [filteredList, setFilteredList] = useState(list);
  const [value, setValue] = useState("");

  useEffect(() => {
    setFilteredList(list);
    setValue("");
  }, [list]);

  function onChange(e) {
    setValue(e.target.value);
    const query = e.target.value.toLowerCase();
    const newList = list.filter((listitem) =>
      `/${listitem.name}`.toLowerCase().includes(query)
    );
    setFilteredList(newList);
  }

  return { onChange, value, setValue, filteredList, list };
}
