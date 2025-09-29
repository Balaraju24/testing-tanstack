import LoadingComponent from "@/components/core/Loading";
import OrganizationIcon from "@/components/icons/Dashboard/organization-icon";
import LocationIcon from "@/components/icons/location-icon";
import { singleAdvocateAPI } from "@/http/services/advocate";
import {
  addOrganizationAPI,
  updateOrganizationAPI,
} from "@/http/services/organization";
import { stateOptions } from "@/lib/constants/stateConstants";
import { FormErrors } from "@/lib/interfaces/organization";
import { deletePayload } from "@/utils/helpers/deletePayload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Check, ChevronDown, PhoneIcon, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CreateOrganization = () => {
  const stateRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { organization_id } = useParams({ strict: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({ state: "bottom" });
  const [formData, setFormData] = useState({
    organisation_name: "",
    branch_name: "",
    branch_code: "",
    first_name: "",
    last_name: "",
    employee_id: "",
    phone: "",
    email: "",
    is_active: true,
    is_verified: false,
    designation: "",
    state: "",
  });
  const initialFormData = {
    organisation_name: "",
    branch_name: "",
    branch_code: "",
    first_name: "",
    last_name: "",
    employee_id: "",
    phone: "",
    email: "",
    is_active: true,
    is_verified: false,
    designation: "",
    state: "",
  };

  const inputClasses =
    "w-full p-3 bg-gray-100 outline-none text-xs rounded-none border-none";
  const labelClasses = "block text-xs font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-xs mt-0.5";

  const filteredStates = stateOptions.filter((state) =>
    state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const buildOrganizationPayload = (formData: any) => {
    const stateName =
      stateOptions.find((state) => state.code === formData.state)?.name ||
      formData.state;

    return deletePayload(
      {
        ...formData,
        state: stateName,
        phone: formData.phone ? `+91${formData.phone}` : formData.phone,
      },
      ["designation", "branch_name", "branch_code"]
    );
  };

  const { data: organizationData, isLoading: isOrganizationLoading } = useQuery(
    {
      queryKey: ["organization", organization_id],
      queryFn: async () => {
        const response = await singleAdvocateAPI(organization_id);
        if (response?.status === 200 || response?.status === 201) {
          return response.data.data;
        }
      },
      refetchOnWindowFocus: false,
      enabled: !!organization_id,
    }
  );

  const { mutate: mutateAddOrganization, isPending: isCreatePending } =
    useMutation({
      mutationKey: ["add-organization"],
      mutationFn: async (formData: any) => {
        const processedPayload = buildOrganizationPayload(formData);
        const response = await addOrganizationAPI(processedPayload);
        return response?.data;
      },
      onSuccess: () => {
        setErrors({});
        toast.success("Organization Added Successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setFormData(initialFormData);
        setStateSearch("");
        navigate({ to: "/organizations" });
      },
      onError: (response: any) => {
        if (response) {
          const backendErrors = response?.data?.errData || {};
          setErrors(backendErrors);
          toast.error("Failed to Add the Organization", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
        } else {
          toast.error("Failed to Add the Organization", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
        }
      },
    });

  const { mutate: mutateUpdateOrganization, isPending: isUpdatePending } =
    useMutation({
      mutationKey: ["update-organization", organization_id],
      mutationFn: async (formData: any) => {
        const processedPayload = buildOrganizationPayload(formData);
        const response = await updateOrganizationAPI(
          organization_id,
          processedPayload
        );
        return response?.data;
      },
      onSuccess: () => {
        setErrors({});
        toast.success("Organization Updated Successfully", {
          action: {
            label: "✕",
            onClick: () => toast.dismiss(),
          },
        });
        setFormData(initialFormData);
        setStateSearch("");
        navigate({ to: "/organizations" });
      },
      onError: (response: any) => {
        if (response) {
          const backendErrors = response?.data?.errData || {};
          setErrors(backendErrors);
          toast.error("Failed to Update the Organization", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
        } else {
          toast.error("Failed to Update the Organization", {
            action: {
              label: "✕",
              onClick: () => toast.dismiss(),
            },
          });
        }
      },
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStateSelect = (state: { name: string; code: string }) => {
    setFormData((prev) => ({
      ...prev,
      state: state.code,
    }));
    setStateSearch(state.name);
    setIsStateOpen(false);
    if (errors.state) {
      setErrors((prev) => ({
        ...prev,
        state: undefined,
      }));
    }
  };

  const clearState = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      state: "",
    }));
    setStateSearch("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (organization_id) {
      mutateUpdateOrganization(formData);
    } else {
      mutateAddOrganization(formData);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z\s-]/g, "");
    setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  useEffect(() => {
    const checkDropdownPosition = () => {
      if (stateRef.current) {
        const rect = stateRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        setDropdownPosition((prev) => ({
          ...prev,
          state: spaceBelow < 200 && spaceAbove > 200 ? "top" : "bottom",
        }));
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateRef.current &&
        !stateRef.current.contains(event.target as Node)
      ) {
        setIsStateOpen(false);
      }
    };

    if (isStateOpen) {
      checkDropdownPosition();
      window.addEventListener("scroll", checkDropdownPosition);
      window.addEventListener("resize", checkDropdownPosition);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", checkDropdownPosition);
      window.removeEventListener("resize", checkDropdownPosition);
    };
  }, [isStateOpen]);

  useEffect(() => {
    if (organizationData) {
      setFormData({
        organisation_name: organizationData.organisation_name || "",
        branch_name: organizationData.branch_name || "",
        branch_code: organizationData.branch_code || "",
        first_name: organizationData.first_name || "",
        last_name: organizationData.last_name || "",
        employee_id: organizationData.employee_id || "",
        phone: organizationData.phone
          ? organizationData.phone.replace("+91", "")
          : "",
        email: organizationData.email || "",
        is_active: organizationData.is_active ?? true,
        is_verified: organizationData.is_verified ?? false,
        designation: organizationData.designation || "",
        state: organizationData.state || "",
      });
      setStateSearch(
        stateOptions.find((s) => s.code === organizationData.state)?.name ||
          organizationData.state ||
          ""
      );
    }
  }, [organizationData]);

  return (
    <div className="w-full overflow-hidden h-[calc(100%-2px)]">
      {isOrganizationLoading ? (
        <LoadingComponent loading={isOrganizationLoading} />
      ) : (
        <>
          <div className="bg-white p-2 2xl:p-4">
            <form
              onSubmit={handleSubmit}
              className="mb-2 rounded-none border border-gray-200 p-2 2xl:p-3 overflow-y-auto h-[calc(100vh-124px)] 2xl:h-[calc(100vh-160px)]"
            >
              <div>
                <div className="flex items-center mb-3 text-sm font-semibold text-gray-800">
                  <OrganizationIcon className="h-5 w-5" />
                  <div className="ml-2">Organization Details</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className={labelClasses}>
                      Organization Name{" "}
                      <span className="text-sm text-red-600">&#42;</span>
                    </label>
                    <input
                      type="text"
                      name="organisation_name"
                      value={formData.organisation_name}
                      placeholder="Enter organization name"
                      className={inputClasses}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                        if (/^[A-Za-z_ ]*$/.test(value)) {
                          handleChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                    />
                    {errors.organisation_name &&
                      errors.organisation_name.length > 0 && (
                        <div className={errorClasses}>
                          {errors.organisation_name.map((error, index) => (
                            <p key={index}>{error}</p>
                          ))}
                        </div>
                      )}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      First Name{" "}
                      <span className="text-sm text-red-600">&#42;</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                        if (/^[A-Za-z_ ]*$/.test(value)) {
                          handleFirstNameChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      placeholder="Enter first name"
                      className={inputClasses}
                    />
                    {errors.first_name && errors.first_name.length > 0 && (
                      <div className={errorClasses}>
                        {errors.first_name.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Last Name{" "}
                      <span className="text-sm text-red-600">&#42;</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                        if (/^[A-Za-z_ ]*$/.test(value)) {
                          handleFirstNameChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      placeholder="Enter last name"
                      className={inputClasses}
                    />
                    {errors.last_name && errors.last_name.length > 0 && (
                      <div className={errorClasses}>
                        {errors.last_name.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className={labelClasses}>
                      Employee ID <span className="text-red-600">&#42;</span>
                    </label>
                    <input
                      type="text"
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.toUpperCase();
                        if (/^[A-Za-z0-9 -]*$/.test(value)) {
                          handleChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      placeholder="Enter employee id"
                      className={inputClasses}
                    />
                    {errors.employee_id && errors.employee_id.length > 0 && (
                      <div className={errorClasses}>
                        {errors.employee_id.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Branch Name</label>
                    <input
                      type="text"
                      name="branch_name"
                      value={formData.branch_name}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                        if (/^[A-Za-z_ ]*$/.test(value)) {
                          handleChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      placeholder="Enter branch name"
                      className={inputClasses}
                    />
                    {errors.branch_name && errors.branch_name.length > 0 && (
                      <div className={errorClasses}>
                        {errors.branch_name.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Branch Code <span className="text-red-600">&#42;</span>
                    </label>
                    <input
                      type="text"
                      name="branch_code"
                      value={formData.branch_code}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.toUpperCase();
                        if (/^[A-Z0-9 -/]*$/.test(value)) {
                          handleChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      placeholder="Enter branch code"
                      className={inputClasses}
                    />
                    {errors.branch_code && errors.branch_code.length > 0 && (
                      <div className={errorClasses}>
                        {errors.branch_code.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className={labelClasses}>Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                        if (/^[A-Za-z_ ]*$/.test(value)) {
                          handleChange({
                            target: { name: e.target.name, value },
                          } as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      placeholder="Enter designation"
                      className={inputClasses}
                    />
                    {errors.designation && errors.designation.length > 0 && (
                      <div className={errorClasses}>
                        {errors.designation.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex items-center mb-3 text-sm font-semibold text-gray-800">
                  <PhoneIcon className="w-4 h-4 mr-1" />
                  <div>Verification Details</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClasses}>
                      Phone Number{" "}
                      <span className="text-sm text-red-600">&#42;</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Enter number"
                      className={inputClasses}
                      pattern="[0-9]*"
                    />
                    {errors.phone && errors.phone.length > 0 && (
                      <div className={errorClasses}>
                        {errors.phone.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Email Id{" "}
                      <span className="text-sm text-red-600">&#42;</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className={inputClasses}
                    />
                    {errors.email && errors.email.length > 0 && (
                      <div className={errorClasses}>
                        {errors.email.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-center mb-3 text-sm font-semibold text-gray-800">
                  <LocationIcon className="w-5 h-5 mr-1" />
                  <div>Address</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div className="relative" ref={stateRef}>
                    <label className={labelClasses}>
                      State <span className="text-sm text-red-600">&#42;</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search or select state..."
                        value={stateSearch}
                        onChange={(e) => {
                          setStateSearch(e.target.value);
                          setIsStateOpen(true);
                          const selectedState = stateOptions.find(
                            (state) => state.code === formData.state
                          );
                          if (
                            selectedState &&
                            e.target.value !== selectedState.name
                          ) {
                            setFormData((prev) => ({
                              ...prev,
                              state: "",
                            }));
                          }
                        }}
                        onFocus={() => setIsStateOpen(true)}
                        className={`${inputClasses} pr-20`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        {formData.state && (
                          <button
                            type="button"
                            onClick={clearState}
                            className="p-1 hover:bg-gray-200 rounded mr-1"
                          >
                            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                          </button>
                        )}
                        <div className="flex items-center pr-3 pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsStateOpen(!isStateOpen)}
                          className="flex items-center pr-2"
                        >
                          <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform ${
                              isStateOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {isStateOpen && (
                      <div
                        className={`absolute z-50 w-full bg-white border border-gray-200 shadow-lg rounded-sm max-h-48 overflow-y-auto left-0 ${
                          dropdownPosition.state === "top"
                            ? "bottom-full mb-1"
                            : "top-full mt-1"
                        }`}
                      >
                        {filteredStates.length > 0 ? (
                          filteredStates.map((state) => (
                            <div
                              key={state.code}
                              onClick={() => handleStateSelect(state)}
                              className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs ${
                                formData.state === state.code
                                  ? "bg-gray-50"
                                  : ""
                              }`}
                            >
                              <span className="flex-1">{state.name}</span>
                              {formData.state === state.code && (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-xs text-gray-400">
                            No states found
                          </div>
                        )}
                      </div>
                    )}
                    {errors.state && errors.state.length > 0 && (
                      <div className={errorClasses}>
                        {errors.state.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div className="flex gap-4 justify-end">
              {organization_id && (
                <button
                  className="bg-white text-black px-4 py-2 rounded-none text-sm font-normal border transition cursor-pointer"
                  onClick={() => navigate({ to: "/organizations" })}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded-none text-sm font-normal hover:bg-gray-800 transition cursor-pointer"
                disabled={isCreatePending || isUpdatePending}
              >
                {isCreatePending || isUpdatePending
                  ? "Saving..."
                  : organization_id
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateOrganization;
