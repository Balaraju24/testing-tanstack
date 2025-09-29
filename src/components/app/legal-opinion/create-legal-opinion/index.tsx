import SearchDropdown from "@/components/core/SearchDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createLegalOpinionAPI,
  createManagerLegalOpinionAPI,
  getOrganizationDataAPI,
} from "@/http/services/legalOpinion";
import { loanTypeOptions, propertyOptions } from "@/lib/constants/litigation";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateLegalOpinion = () => {
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState<any>("");
  const [organizationSearch, setOrganizationSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loanApplicationNumber, setLoanApplicationNumber] = useState("");
  const [loanType, setLoanType] = useState("");
  const [loanTypeSearch, setLoanTypeSearch] = useState("");
  const [customLoanType, setCustomLoanType] = useState(""); // New state for custom loan type
  const [showCustomLoanInput, setShowCustomLoanInput] = useState(false); // New state to show/hide custom input
  const [loanAmount, setLoanAmount] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  const [customPropertyType, setCustomPropertyType] = useState(""); // New state for custom property type
  const [showCustomPropertyInput, setShowCustomPropertyInput] = useState(false); // New state to show/hide custom input
  const [errors, setErrors] = useState<{
    customer_name?: string;
    organisation_name?: string;
  }>({});

  const { isManager, isAdmin } = useUserDetails();

  // Add "Other" option to loan types
  const extendedLoanTypeOptions = [
    ...loanTypeOptions,
    { value: "other", label: "Other (Please specify)" },
  ];

  const filteredLoanTypes = extendedLoanTypeOptions.filter(
    (loan) =>
      loan.label.toLowerCase().includes(loanTypeSearch.toLowerCase()) ||
      loan.value.toLowerCase().includes(loanTypeSearch.toLowerCase())
  );

  // Add "Other" option to property types
  const extendedPropertyOptions = [
    ...propertyOptions,
    "Other (Please specify)",
  ];

  const filteredProperties = extendedPropertyOptions.filter((property) =>
    property.toLowerCase().includes(propertySearch.toLowerCase())
  );

  const { isLoading, data: organisationData } = useQuery({
    queryKey: ["organisation_name", "location_id"],
    queryFn: async () => {
      const response = await getOrganizationDataAPI();
      if (response?.status === 200 || response?.status === 201) {
        return response?.data?.data;
      }
    },
    enabled: isManager() || isAdmin(),
    refetchOnWindowFocus: false,
  });

  const filteredOrganizations =
    organisationData?.filter((org: any) => {
      const searchTerm = organizationSearch.toLowerCase();
      const orgName = org.organisation_name.toLowerCase();
      const locationName = org.location.name.toLowerCase();
      const combinedString = `${orgName} ${locationName}`;

      return (
        orgName.includes(searchTerm) ||
        locationName.includes(searchTerm) ||
        combinedString.includes(searchTerm)
      );
    }) || [];

  const { mutate: createLegalOpinionService, isPending: isPendingCustomer } =
    useMutation({
      mutationFn: async (payload: {
        case_type_acrym: string;
        customer_name: string;
        loan_type: string;
        property_type: string;
        loan_application_number: string;
        loan_amount: number;
        service_id: number;
      }) => {
        const response = await createLegalOpinionAPI(payload);
        return response;
      },
      onSuccess: (data) => {
        toast.success(data.data.message);
        navigate({ to: "/legal-opinion" });
      },
      onError: (error: any) => {
        if (error.status == 422) {
          setErrors(error.data.errData);
        } else {
          toast.error(error.message || "Something went wrong.");
        }
      },
    });

  const {
    mutate: createManagerLegalOpinionService,
    isPending: isPendingManager,
  } = useMutation({
    mutationFn: async (payload: {
      case_type_acrym: string;
      customer_name: string;
      loan_type: string;
      property_type: string;
      loan_application_number: string;
      loan_amount: number;
      service_id: number;
      location_id: number;
      organisation_name: string;
      user_id: number;
    }) => {
      const response = await createManagerLegalOpinionAPI(payload);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      setOrganisation("");
      navigate({ to: "/legal-opinion" });
    },
    onError: (error: any) => {
      if (error.status == 422) {
        setErrors(error.data.errData);
      } else {
        toast.error(error.message || "Something went wrong.");
      }
    },
  });

  const handleSubmit = () => {
    // Determine the final loan type and property type to send
    const finalLoanType = loanType === "other" ? customLoanType : loanType;
    const finalPropertyType =
      propertyType === "other (please specify)"
        ? customPropertyType
        : propertyType;

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
        user_id: organisation.id || "",
      });
    } else {
      createLegalOpinionService({
        case_type_acrym: "LO",
        customer_name: customerName,
        loan_type: finalLoanType,
        property_type: finalPropertyType,
        loan_application_number: loanApplicationNumber,
        loan_amount: Number(loanAmount),
        service_id: 1,
      });
    }
  };

  const handleOrganizationSelect = (org: any) => {
    setOrganisation(org);
    setOrganizationSearch(`${org.organisation_name}`);
  };

  const handleOrganizationSearchChange = (value: string) => {
    setOrganizationSearch(value);
    if (
      organisation &&
      !`${organisation.organisation_name} ${organisation.location.name}`
        .toLowerCase()
        .includes(value.toLowerCase())
    ) {
      setOrganisation("");
    }
  };

  const clearOrganization = () => {
    setOrganisation("");
    setOrganizationSearch("");
    setErrors((prev) => ({ ...prev, organisation_name: undefined }));
  };

  const handleLoanTypeSelect = (option: any) => {
    setLoanType(option.value);
    setLoanTypeSearch(option.label);

    if (option.value === "other") {
      setShowCustomLoanInput(true);
    } else {
      setShowCustomLoanInput(false);
      setCustomLoanType("");
    }
  };

  const handleLoanTypeSearchChange = (value: string) => {
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

  const handlePropertySelect = (property: string) => {
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

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] justify-center items-center bg-white">
      <div className="flex justify-center items-center py-8">
        <div className="w-full max-w-3xl px-4">
          <div className="flex justify-between items-center mb-8">
            <div
              className="border border-gray-300 p-2 cursor-pointer hover:bg-gray-50 "
              onClick={() => navigate({ to: "/legal-opinion" })}
            >
              <ArrowLeft className="h-4 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-light text-amber-600">
                Fill the details below
              </h2>
            </div>
            <div className="w-12"></div>
          </div>

          <form className="bg-white border border-gray-300 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {(isManager() || isAdmin()) && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Organization{" "}
                  <span className="text-sm text-red-600">&#42;</span>
                </label>
                <SearchDropdown
                  placeholder="Search organization..."
                  options={filteredOrganizations}
                  value={organisation}
                  searchValue={organizationSearch}
                  onSearchChange={handleOrganizationSearchChange}
                  onSelect={handleOrganizationSelect}
                  onClear={clearOrganization}
                  getOptionLabel={(org) =>
                    `${org.organisation_name} ${org.location.name}`
                  }
                  getOptionKey={(org) =>
                    `${org.organisation_name}_${org.location.id || org.location.name}`
                  }
                  isSelected={(org) =>
                    organisation &&
                    organisation.organisation_name === org.organisation_name &&
                    organisation.location.id === org.location.id
                  }
                  renderOption={(org, isSelected) => (
                    <>
                      <span className="flex gap-2">
                        {org.organisation_name}{" "}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                    </>
                  )}
                  isLoading={isLoading}
                  loadingText="Loading organizations..."
                  noOptionsText="No organizations found"
                />
                {errors?.organisation_name && (
                  <p className="text-xs 3xl:text-sm text-red-500 font-medium">
                    {errors?.organisation_name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Customer Name{" "}
                <span className="text-sm text-red-600">&#42;</span>
              </label>
              <Input
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.charAt(0).toUpperCase() + value.slice(1);
                  if (/^[A-Za-z_ ]*$/.test(value)) {
                    setCustomerName(value);
                  }
                }}
                className="rounded-none bg-slate-100"
              />
              {errors?.customer_name && (
                <p className="text-xs 3xl:text-sm text-red-500 font-medium">
                  {errors?.customer_name}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Loan Application Number
              </label>
              <Input
                placeholder="Enter application number"
                value={loanApplicationNumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.toUpperCase();
                  if (/^[A-Za-z0-9 -/]*$/.test(value)) {
                    setLoanApplicationNumber(value);
                  }
                }}
                className="rounded-none bg-slate-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Type of Loan
              </label>
              <SearchDropdown
                placeholder="Search or select loan type..."
                options={filteredLoanTypes}
                value={loanType}
                searchValue={loanTypeSearch}
                onSearchChange={handleLoanTypeSearchChange}
                onSelect={handleLoanTypeSelect}
                onClear={clearLoanType}
                getOptionLabel={(option) => option.label}
                getOptionKey={(option) => option.value}
                isSelected={(option) => loanType === option.value}
              />

              {/* Custom loan type input */}
              {showCustomLoanInput && (
                <div className="mt-2">
                  <Input
                    placeholder="Please specify loan type..."
                    value={customLoanType}
                    onChange={(e) => setCustomLoanType(e.target.value)}
                    className="rounded-none bg-slate-50"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Loan Amount
              </label>
              <Input
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setLoanAmount(value);
                  }
                }}
                className="rounded-none bg-slate-100"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Type of Property
              </label>
              <SearchDropdown
                placeholder="Search property type..."
                options={filteredProperties}
                value={propertyType}
                searchValue={propertySearch}
                onSearchChange={setPropertySearch}
                onSelect={handlePropertySelect}
                onClear={clearProperty}
                getOptionLabel={(property) => property}
                getOptionKey={(property) => property}
                isSelected={(property) =>
                  propertyType === property.toLowerCase()
                }
                width="w-full"
                maxHeight="max-h-40"
              />

              {/* Custom property type input */}
              {showCustomPropertyInput && (
                <div className="mt-2">
                  <Input
                    placeholder="Please specify property type..."
                    value={customPropertyType}
                    onChange={(e) => setCustomPropertyType(e.target.value)}
                    className="rounded-none bg-slate-50"
                  />
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 flex justify-end">
            <Button
              className="bg-black text-white hover:bg-gray-800 !rounded-none cursor-pointer"
              onClick={handleSubmit}
              disabled={isPendingManager || isPendingCustomer}
            >
              {isPendingManager || isPendingCustomer ? (
                <>
                  Submitting...
                  <Loader2 className="animate-spin ml-1 h-4 w-4" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLegalOpinion;
