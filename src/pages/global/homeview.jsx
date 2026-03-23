import { useEffect } from "react"
import { useMachines } from "../../hooks";

export default function Home() {
  const { state, getMachines } = useMachines();

  useEffect(() => {
    getMachines();
  }, [getMachines]);

  return (
    <div>
      <h1 className="text-3xl text-red-500">HOMEVIEW</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
};