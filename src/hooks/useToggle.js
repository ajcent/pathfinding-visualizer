import { useCallback, useState } from "react";

export default function useToggle(state) {
  const [status, setStatus] = useState(state);
  const toggle = useCallback(() => setStatus((prev) => !prev), [setStatus]);
  return [status, toggle];
}
