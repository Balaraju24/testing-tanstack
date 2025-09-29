import NoDataDisplay from "@/components/core/NoDataBlock";

const EngineerPropertyValuation = () => {
  return (
    <NoDataDisplay
      // title="Engineer Property Valuation"
      onHoldMessage="Feature"
      isOnHold={true}
      height="h-[calc(100vh-200px)]"
      show={true}
    />
  );
};

export default EngineerPropertyValuation;
