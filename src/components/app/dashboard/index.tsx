import CalendarHearingsSection from "./CalendarHearingsSection";
import StatisticsSection from "./StatisticsSection";

const LegalDashboard = () => {
  return (
    <div className=" bg-gray-50 p-0">
      <div className="">
        <div className="grid grid-cols-10 gap-2">
          <StatisticsSection />
          <CalendarHearingsSection />
        </div>
      </div>
    </div>
  );
};

export default LegalDashboard;
