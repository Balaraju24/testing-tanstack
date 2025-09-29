// Constants for LoanDetails component

export const LOAN_DATA_FIELDS = [
  {
    label: "Customer Name",
    getValueFn: (serviceData: any) =>
      serviceData?.customer_name ||
      serviceData?.user?.first_name + " " + serviceData?.user?.last_name ||
      "--"
  },
  {
    label: "Organization / Individual",
    getValueFn: (serviceData: any) =>
      serviceData?.organisation_name ||
      serviceData?.user?.organisation_name ||
      "--"
  },
  {
    label: "Loan Application Number",
    getValueFn: (serviceData: any) =>
      serviceData?.loan_application_number || "--"
  },
  {
    label: "Type of Loan",
    getValueFn: (serviceData: any) =>
      serviceData?.loan_type || "--"
  },
  {
    label: "Loan Amount",
    getValueFn: (serviceData: any) =>
      parseFloat(serviceData?.loan_amount) !== 0
        ? `${parseFloat(serviceData.loan_amount).toLocaleString("en-IN")}`
        : "--"
  },
  {
    label: "Type of Property",
    getValueFn: (serviceData: any) =>
      serviceData?.property_type || "--"
  }
];

export const HEADER_CONFIG = {
  SHOW_ACTION_BUTTON: (isUser: boolean) => !isUser,
  SHOW_UPLOAD_BUTTON: false,
  SHOW_NOTE_BUTTON: false
};