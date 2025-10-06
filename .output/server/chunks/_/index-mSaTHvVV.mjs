import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { S as SearchDropdown } from './SearchDropdown-DfUKvMvl.mjs';
import { B as Button } from './router-e7zdrxGz.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import { a as getOrganizationDataAPI, c as createLegalOpinionAPI, b as createManagerLegalOpinionAPI } from './legalOpinion-qNiAW4Gj.mjs';
import { l as loanTypeOptions, p as propertyOptions } from './litigation-b6202F6J.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import '@tanstack/react-router-ssr-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'framer-motion';
import 'react-error-boundary';
import './fetch-Cpm1bFFM.mjs';
import 'js-cookie';
import './legal-notice-icon-ivaufGCR.mjs';
import './userDetails-Dbr9T6uw.mjs';
import '@tanstack/react-store';

const CreateLegalOpinion = () => {
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState("");
  const [organizationSearch, setOrganizationSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loanApplicationNumber, setLoanApplicationNumber] = useState("");
  const [loanType, setLoanType] = useState("");
  const [loanTypeSearch, setLoanTypeSearch] = useState("");
  const [customLoanType, setCustomLoanType] = useState("");
  const [showCustomLoanInput, setShowCustomLoanInput] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  const [customPropertyType, setCustomPropertyType] = useState("");
  const [showCustomPropertyInput, setShowCustomPropertyInput] = useState(false);
  const [errors, setErrors] = useState({});
  const { isManager, isAdmin } = useUserDetails();
  const extendedLoanTypeOptions = [
    ...loanTypeOptions,
    { value: "other", label: "Other (Please specify)" }
  ];
  const filteredLoanTypes = extendedLoanTypeOptions.filter(
    (loan) => loan.label.toLowerCase().includes(loanTypeSearch.toLowerCase()) || loan.value.toLowerCase().includes(loanTypeSearch.toLowerCase())
  );
  const extendedPropertyOptions = [
    ...propertyOptions,
    "Other (Please specify)"
  ];
  const filteredProperties = extendedPropertyOptions.filter(
    (property) => property.toLowerCase().includes(propertySearch.toLowerCase())
  );
  const { isLoading, data: organisationData } = useQuery({
    queryKey: ["organisation_name", "location_id"],
    queryFn: async () => {
      var _a;
      const response = await getOrganizationDataAPI();
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
        return (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data;
      }
    },
    enabled: isManager() || isAdmin(),
    refetchOnWindowFocus: false
  });
  const filteredOrganizations = (organisationData == null ? void 0 : organisationData.filter((org) => {
    const searchTerm = organizationSearch.toLowerCase();
    const orgName = org.organisation_name.toLowerCase();
    const locationName = org.location.name.toLowerCase();
    const combinedString = `${orgName} ${locationName}`;
    return orgName.includes(searchTerm) || locationName.includes(searchTerm) || combinedString.includes(searchTerm);
  })) || [];
  const { mutate: createLegalOpinionService, isPending: isPendingCustomer } = useMutation({
    mutationFn: async (payload) => {
      const response = await createLegalOpinionAPI(payload);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate({ to: "/legal-opinion" });
    },
    onError: (error) => {
      if (error.status == 422) {
        setErrors(error.data.errData);
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    }
  });
  const {
    mutate: createManagerLegalOpinionService,
    isPending: isPendingManager
  } = useMutation({
    mutationFn: async (payload) => {
      const response = await createManagerLegalOpinionAPI(payload);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      setOrganisation("");
      navigate({ to: "/legal-opinion" });
    },
    onError: (error) => {
      if (error.status == 422) {
        setErrors(error.data.errData);
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    }
  });
  const handleSubmit = () => {
    const finalLoanType = loanType === "other" ? customLoanType : loanType;
    const finalPropertyType = propertyType === "other (please specify)" ? customPropertyType : propertyType;
    if (isManager() || isAdmin()) {
      createManagerLegalOpinionService({
        case_type_acrym: "LO",
        customer_name: customerName,
        loan_type: finalLoanType,
        property_type: finalPropertyType,
        loan_application_number: loanApplicationNumber,
        loan_amount: Number(loanAmount),
        service_id: 1,
        location_id: organisation.location_id || "",
        organisation_name: organisation.organisation_name || "",
        user_id: organisation.id || ""
      });
    } else {
      createLegalOpinionService({
        case_type_acrym: "LO",
        customer_name: customerName,
        loan_type: finalLoanType,
        property_type: finalPropertyType,
        loan_application_number: loanApplicationNumber,
        loan_amount: Number(loanAmount),
        service_id: 1
      });
    }
  };
  const handleOrganizationSelect = (org) => {
    setOrganisation(org);
    setOrganizationSearch(`${org.organisation_name}`);
  };
  const handleOrganizationSearchChange = (value) => {
    setOrganizationSearch(value);
    if (organisation && !`${organisation.organisation_name} ${organisation.location.name}`.toLowerCase().includes(value.toLowerCase())) {
      setOrganisation("");
    }
  };
  const clearOrganization = () => {
    setOrganisation("");
    setOrganizationSearch("");
    setErrors((prev) => ({ ...prev, organisation_name: void 0 }));
  };
  const handleLoanTypeSelect = (option) => {
    setLoanType(option.value);
    setLoanTypeSearch(option.label);
    if (option.value === "other") {
      setShowCustomLoanInput(true);
    } else {
      setShowCustomLoanInput(false);
      setCustomLoanType("");
    }
  };
  const handleLoanTypeSearchChange = (value) => {
    setLoanTypeSearch(value);
    const selectedLoanType = extendedLoanTypeOptions.find(
      (option) => option.value === loanType
    );
    if (selectedLoanType && value !== selectedLoanType.label) {
      setLoanType("");
      setShowCustomLoanInput(false);
      setCustomLoanType("");
    }
  };
  const clearLoanType = () => {
    setLoanType("");
    setLoanTypeSearch("");
    setShowCustomLoanInput(false);
    setCustomLoanType("");
  };
  const handlePropertySelect = (property) => {
    const lowerProperty = property.toLowerCase();
    setPropertyType(lowerProperty);
    setPropertySearch(property);
    if (lowerProperty === "other (please specify)") {
      setShowCustomPropertyInput(true);
    } else {
      setShowCustomPropertyInput(false);
      setCustomPropertyType("");
    }
  };
  const clearProperty = () => {
    setPropertyType("");
    setPropertySearch("");
    setShowCustomPropertyInput(false);
    setCustomPropertyType("");
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col h-[calc(100vh-120px)] justify-center items-center bg-white", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-3xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "border border-gray-300 p-2 cursor-pointer hover:bg-gray-50 ",
          onClick: () => navigate({ to: "/legal-opinion" }),
          children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-6" })
        }
      ),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-light text-amber-600", children: "Fill the details below" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-12" })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "bg-white border border-gray-300 p-4 grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      (isManager() || isAdmin()) && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: [
          "Organization",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          SearchDropdown,
          {
            placeholder: "Search organization...",
            options: filteredOrganizations,
            value: organisation,
            searchValue: organizationSearch,
            onSearchChange: handleOrganizationSearchChange,
            onSelect: handleOrganizationSelect,
            onClear: clearOrganization,
            getOptionLabel: (org) => `${org.organisation_name} ${org.location.name}`,
            getOptionKey: (org) => `${org.organisation_name}_${org.location.id || org.location.name}`,
            isSelected: (org) => organisation && organisation.organisation_name === org.organisation_name && organisation.location.id === org.location.id,
            renderOption: (org, isSelected) => /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("span", { className: "flex gap-2", children: [
                org.organisation_name,
                " "
              ] }),
              isSelected && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600" })
            ] }),
            isLoading,
            loadingText: "Loading organizations...",
            noOptionsText: "No organizations found"
          }
        ),
        (errors == null ? void 0 : errors.organisation_name) && /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:text-sm text-red-500 font-medium", children: errors == null ? void 0 : errors.organisation_name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: [
          "Customer Name",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Enter customer name",
            value: customerName,
            onChange: (e) => {
              let value = e.target.value;
              value = value.charAt(0).toUpperCase() + value.slice(1);
              if (/^[A-Za-z_ ]*$/.test(value)) {
                setCustomerName(value);
              }
            },
            className: "rounded-none bg-slate-100"
          }
        ),
        (errors == null ? void 0 : errors.customer_name) && /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:text-sm text-red-500 font-medium", children: errors == null ? void 0 : errors.customer_name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: "Loan Application Number" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Enter application number",
            value: loanApplicationNumber,
            onChange: (e) => {
              let value = e.target.value;
              value = value.toUpperCase();
              if (/^[A-Za-z0-9 -/]*$/.test(value)) {
                setLoanApplicationNumber(value);
              }
            },
            className: "rounded-none bg-slate-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: "Type of Loan" }),
        /* @__PURE__ */ jsx(
          SearchDropdown,
          {
            placeholder: "Search or select loan type...",
            options: filteredLoanTypes,
            value: loanType,
            searchValue: loanTypeSearch,
            onSearchChange: handleLoanTypeSearchChange,
            onSelect: handleLoanTypeSelect,
            onClear: clearLoanType,
            getOptionLabel: (option) => option.label,
            getOptionKey: (option) => option.value,
            isSelected: (option) => loanType === option.value
          }
        ),
        showCustomLoanInput && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Please specify loan type...",
            value: customLoanType,
            onChange: (e) => setCustomLoanType(e.target.value),
            className: "rounded-none bg-slate-50"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: "Loan Amount" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Enter loan amount",
            value: loanAmount,
            onChange: (e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setLoanAmount(value);
              }
            },
            className: "rounded-none bg-slate-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: "Type of Property" }),
        /* @__PURE__ */ jsx(
          SearchDropdown,
          {
            placeholder: "Search property type...",
            options: filteredProperties,
            value: propertyType,
            searchValue: propertySearch,
            onSearchChange: setPropertySearch,
            onSelect: handlePropertySelect,
            onClear: clearProperty,
            getOptionLabel: (property) => property,
            getOptionKey: (property) => property,
            isSelected: (property) => propertyType === property.toLowerCase(),
            width: "w-full",
            maxHeight: "max-h-40"
          }
        ),
        showCustomPropertyInput && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Please specify property type...",
            value: customPropertyType,
            onChange: (e) => setCustomPropertyType(e.target.value),
            className: "rounded-none bg-slate-50"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx(
      Button,
      {
        className: "bg-black text-white hover:bg-gray-800 !rounded-none cursor-pointer",
        onClick: handleSubmit,
        disabled: isPendingManager || isPendingCustomer,
        children: isPendingManager || isPendingCustomer ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "Submitting...",
          /* @__PURE__ */ jsx(Loader2, { className: "animate-spin ml-1 h-4 w-4" })
        ] }) : "Submit"
      }
    ) })
  ] }) }) });
};
const SplitComponent = CreateLegalOpinion;

export { SplitComponent as component };
//# sourceMappingURL=index-mSaTHvVV.mjs.map
