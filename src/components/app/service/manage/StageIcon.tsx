import ActiveStatus from "@/components/icons/active-status";

export default function StageIcon({
  status,
  icon,
}: {
  status: string;
  icon: React.ReactNode;
  name: string;
  currentPendingSubStage: any;
}) {
  const baseClass = "size-7 flex items-center justify-center ";

  if (status === "completed") {
    return (
      <div className={`${baseClass} bg-green-700 text-white`}>
        <ActiveStatus className={""} />
      </div>
    );
  }

  if (status === "progress") {
    return (
      <div className={`${baseClass} bg-orange-400 text-white`}>{icon}</div>
    );
  }

  return <div className={`${baseClass} `}>{icon}</div>;
}
