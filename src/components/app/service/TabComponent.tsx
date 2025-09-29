import { TabsTrigger } from "@/components/ui/tabs";
import { TabProps } from "@/lib/interfaces/service";

const TabComponent: React.FC<TabProps> = ({
  value,
  icon: Icon,
  label,
  activeTabValue,
}) => {
  return (
    <TabsTrigger
      className={`${
        activeTabValue === value
          ? "bg-white text-black opacity-100 font-medium"
          : " opacity-50 font-normal"
      } text-md 3xl:text-lg py-2  flex items-center gap-2 rounded-none `}
      value={value}
    >
      <div className="flex justify-center items-center w-6 h-6 bg-black rounded-full">
        <Icon />
      </div>
      {label}
    </TabsTrigger>
  );
};

export default TabComponent;
