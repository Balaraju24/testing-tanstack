import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { L as LocationIcon } from './location-icon-BjUVjaW-.mjs';
import { a as singleAdvocateAPI } from './advocate-Cvw6EtWS.mjs';
import { a as addOrganizationAPI, u as updateOrganizationAPI } from './organization-9L2vrBNN.mjs';
import { s as stateOptions } from './stateConstants-CKjWDC1S.mjs';
import { d as deletePayload } from './deletePayload-CnkJRSrW.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { PhoneIcon, X, Search, ChevronDown, Check } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';

function OrganizationIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18.75 16.2498H17.5V7.49984C17.5 7.16832 17.3683 6.85037 17.1339 6.61595C16.8995 6.38153 16.5815 6.24984 16.25 6.24984H11.25V2.49984C11.2501 2.27348 11.1888 2.05133 11.0726 1.8571C10.9563 1.66287 10.7895 1.50385 10.59 1.39702C10.3904 1.29018 10.1656 1.23953 9.93951 1.25049C9.71342 1.26144 9.49454 1.33358 9.30625 1.45921L3.05625 5.62484C2.8848 5.73923 2.74429 5.89424 2.64724 6.07607C2.55019 6.2579 2.49961 6.46091 2.5 6.66702V16.2498H1.25C1.08424 16.2498 0.925268 16.3157 0.808058 16.4329C0.690848 16.5501 0.625 16.7091 0.625 16.8748C0.625 17.0406 0.690848 17.1996 0.808058 17.3168C0.925268 17.434 1.08424 17.4998 1.25 17.4998H18.75C18.9158 17.4998 19.0747 17.434 19.1919 17.3168C19.3092 17.1996 19.375 17.0406 19.375 16.8748C19.375 16.7091 19.3092 16.5501 19.1919 16.4329C19.0747 16.3157 18.9158 16.2498 18.75 16.2498ZM16.25 7.49984V16.2498H11.25V7.49984H16.25ZM3.75 6.66702L10 2.49984V16.2498H3.75V6.66702ZM8.75 8.74984V9.99984C8.75 10.1656 8.68415 10.3246 8.56694 10.4418C8.44973 10.559 8.29076 10.6248 8.125 10.6248C7.95924 10.6248 7.80027 10.559 7.68306 10.4418C7.56585 10.3246 7.5 10.1656 7.5 9.99984V8.74984C7.5 8.58408 7.56585 8.4251 7.68306 8.30789C7.80027 8.19068 7.95924 8.12484 8.125 8.12484C8.29076 8.12484 8.44973 8.19068 8.56694 8.30789C8.68415 8.4251 8.75 8.58408 8.75 8.74984ZM6.25 8.74984V9.99984C6.25 10.1656 6.18415 10.3246 6.06694 10.4418C5.94973 10.559 5.79076 10.6248 5.625 10.6248C5.45924 10.6248 5.30027 10.559 5.18306 10.4418C5.06585 10.3246 5 10.1656 5 9.99984V8.74984C5 8.58408 5.06585 8.4251 5.18306 8.30789C5.30027 8.19068 5.45924 8.12484 5.625 8.12484C5.79076 8.12484 5.94973 8.19068 6.06694 8.30789C6.18415 8.4251 6.25 8.58408 6.25 8.74984ZM6.25 13.1248V14.3748C6.25 14.5406 6.18415 14.6996 6.06694 14.8168C5.94973 14.934 5.79076 14.9998 5.625 14.9998C5.45924 14.9998 5.30027 14.934 5.18306 14.8168C5.06585 14.6996 5 14.5406 5 14.3748V13.1248C5 12.9591 5.06585 12.8001 5.18306 12.6829C5.30027 12.5657 5.45924 12.4998 5.625 12.4998C5.79076 12.4998 5.94973 12.5657 6.06694 12.6829C6.18415 12.8001 6.25 12.9591 6.25 13.1248ZM8.75 13.1248V14.3748C8.75 14.5406 8.68415 14.6996 8.56694 14.8168C8.44973 14.934 8.29076 14.9998 8.125 14.9998C7.95924 14.9998 7.80027 14.934 7.68306 14.8168C7.56585 14.6996 7.5 14.5406 7.5 14.3748V13.1248C7.5 12.9591 7.56585 12.8001 7.68306 12.6829C7.80027 12.5657 7.95924 12.4998 8.125 12.4998C8.29076 12.4998 8.44973 12.5657 8.56694 12.6829C8.68415 12.8001 8.75 12.9591 8.75 13.1248Z",
          fill: "black"
        }
      )
    }
  );
}
const CreateOrganization = () => {
  const stateRef = useRef(null);
  const navigate = useNavigate();
  const { organization_id } = useParams({ strict: false });
  const [errors, setErrors] = useState({});
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
    state: ""
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
    state: ""
  };
  const inputClasses = "w-full p-3 bg-gray-100 outline-none text-xs rounded-none border-none";
  const labelClasses = "block text-xs font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-500 text-xs mt-0.5";
  const filteredStates = stateOptions.filter(
    (state) => state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );
  const buildOrganizationPayload = (formData2) => {
    var _a;
    const stateName = ((_a = stateOptions.find((state) => state.code === formData2.state)) == null ? void 0 : _a.name) || formData2.state;
    return deletePayload(
      {
        ...formData2,
        state: stateName,
        phone: formData2.phone ? `+91${formData2.phone}` : formData2.phone
      },
      ["designation", "branch_name", "branch_code"]
    );
  };
  const { data: organizationData, isLoading: isOrganizationLoading } = useQuery(
    {
      queryKey: ["organization", organization_id],
      queryFn: async () => {
        const response = await singleAdvocateAPI(organization_id);
        if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
          return response.data.data;
        }
      },
      refetchOnWindowFocus: false,
      enabled: !!organization_id
    }
  );
  const { mutate: mutateAddOrganization, isPending: isCreatePending } = useMutation({
    mutationKey: ["add-organization"],
    mutationFn: async (formData2) => {
      const processedPayload = buildOrganizationPayload(formData2);
      const response = await addOrganizationAPI(processedPayload);
      return response == null ? void 0 : response.data;
    },
    onSuccess: () => {
      setErrors({});
      toast.success("Organization Added Successfully", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setFormData(initialFormData);
      setStateSearch("");
      navigate({ to: "/organizations" });
    },
    onError: (response) => {
      var _a;
      if (response) {
        const backendErrors = ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.errData) || {};
        setErrors(backendErrors);
        toast.error("Failed to Add the Organization", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      } else {
        toast.error("Failed to Add the Organization", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const { mutate: mutateUpdateOrganization, isPending: isUpdatePending } = useMutation({
    mutationKey: ["update-organization", organization_id],
    mutationFn: async (formData2) => {
      const processedPayload = buildOrganizationPayload(formData2);
      const response = await updateOrganizationAPI(
        organization_id,
        processedPayload
      );
      return response == null ? void 0 : response.data;
    },
    onSuccess: () => {
      setErrors({});
      toast.success("Organization Updated Successfully", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setFormData(initialFormData);
      setStateSearch("");
      navigate({ to: "/organizations" });
    },
    onError: (response) => {
      var _a;
      if (response) {
        const backendErrors = ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.errData) || {};
        setErrors(backendErrors);
        toast.error("Failed to Update the Organization", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      } else {
        toast.error("Failed to Update the Organization", {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        });
      }
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const handleStateSelect = (state) => {
    setFormData((prev) => ({
      ...prev,
      state: state.code
    }));
    setStateSearch(state.name);
    setIsStateOpen(false);
    if (errors.state) {
      setErrors((prev) => ({
        ...prev,
        state: void 0
      }));
    }
  };
  const clearState = (e) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      state: ""
    }));
    setStateSearch("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (organization_id) {
      mutateUpdateOrganization(formData);
    } else {
      mutateAddOrganization(formData);
    }
  };
  const handleFirstNameChange = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^A-Za-z\s-]/g, "");
    setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
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
          state: spaceBelow < 200 && spaceAbove > 200 ? "top" : "bottom"
        }));
      }
    };
    const handleClickOutside = (event) => {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
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
    var _a, _b, _c;
    if (organizationData) {
      setFormData({
        organisation_name: organizationData.organisation_name || "",
        branch_name: organizationData.branch_name || "",
        branch_code: organizationData.branch_code || "",
        first_name: organizationData.first_name || "",
        last_name: organizationData.last_name || "",
        employee_id: organizationData.employee_id || "",
        phone: organizationData.phone ? organizationData.phone.replace("+91", "") : "",
        email: organizationData.email || "",
        is_active: (_a = organizationData.is_active) != null ? _a : true,
        is_verified: (_b = organizationData.is_verified) != null ? _b : false,
        designation: organizationData.designation || "",
        state: organizationData.state || ""
      });
      setStateSearch(
        ((_c = stateOptions.find((s) => s.code === organizationData.state)) == null ? void 0 : _c.name) || organizationData.state || ""
      );
    }
  }, [organizationData]);
  return /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden h-[calc(100%-2px)]", children: isOrganizationLoading ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isOrganizationLoading }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-2 2xl:p-4", children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "mb-2 rounded-none border border-gray-200 p-2 2xl:p-3 overflow-y-auto h-[calc(100vh-124px)] 2xl:h-[calc(100vh-160px)]",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-3 text-sm font-semibold text-gray-800", children: [
              /* @__PURE__ */ jsx(OrganizationIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("div", { className: "ml-2", children: "Organization Details" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mb-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "Organization Name",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "organisation_name",
                    value: formData.organisation_name,
                    placeholder: "Enter organization name",
                    className: inputClasses,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.charAt(0).toUpperCase() + value.slice(1);
                      if (/^[A-Za-z_ ]*$/.test(value)) {
                        handleChange({
                          target: { name: e.target.name, value }
                        });
                      }
                    }
                  }
                ),
                errors.organisation_name && errors.organisation_name.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.organisation_name.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "First Name",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "first_name",
                    value: formData.first_name,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.charAt(0).toUpperCase() + value.slice(1);
                      if (/^[A-Za-z_ ]*$/.test(value)) {
                        handleFirstNameChange({
                          target: { name: e.target.name, value }
                        });
                      }
                    },
                    placeholder: "Enter first name",
                    className: inputClasses
                  }
                ),
                errors.first_name && errors.first_name.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.first_name.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "Last Name",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "last_name",
                    value: formData.last_name,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.charAt(0).toUpperCase() + value.slice(1);
                      if (/^[A-Za-z_ ]*$/.test(value)) {
                        handleFirstNameChange({
                          target: { name: e.target.name, value }
                        });
                      }
                    },
                    placeholder: "Enter last name",
                    className: inputClasses
                  }
                ),
                errors.last_name && errors.last_name.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.last_name.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mb-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "Employee ID ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "employee_id",
                    value: formData.employee_id,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.toUpperCase();
                      if (/^[A-Za-z0-9 -]*$/.test(value)) {
                        handleChange({
                          target: { name: e.target.name, value }
                        });
                      }
                    },
                    placeholder: "Enter employee id",
                    className: inputClasses
                  }
                ),
                errors.employee_id && errors.employee_id.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.employee_id.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: labelClasses, children: "Branch Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "branch_name",
                    value: formData.branch_name,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.charAt(0).toUpperCase() + value.slice(1);
                      if (/^[A-Za-z_ ]*$/.test(value)) {
                        handleChange({
                          target: { name: e.target.name, value }
                        });
                      }
                    },
                    placeholder: "Enter branch name",
                    className: inputClasses
                  }
                ),
                errors.branch_name && errors.branch_name.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.branch_name.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "Branch Code ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "branch_code",
                    value: formData.branch_code,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.toUpperCase();
                      if (/^[A-Z0-9 -/]*$/.test(value)) {
                        handleChange({
                          target: { name: e.target.name, value }
                        });
                      }
                    },
                    placeholder: "Enter branch code",
                    className: inputClasses
                  }
                ),
                errors.branch_code && errors.branch_code.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.branch_code.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 mb-5", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelClasses, children: "Designation" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "designation",
                  value: formData.designation,
                  onChange: (e) => {
                    let value = e.target.value;
                    value = value.charAt(0).toUpperCase() + value.slice(1);
                    if (/^[A-Za-z_ ]*$/.test(value)) {
                      handleChange({
                        target: { name: e.target.name, value }
                      });
                    }
                  },
                  placeholder: "Enter designation",
                  className: inputClasses
                }
              ),
              errors.designation && errors.designation.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.designation.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-3 text-sm font-semibold text-gray-800", children: [
              /* @__PURE__ */ jsx(PhoneIcon, { className: "w-4 h-4 mr-1" }),
              /* @__PURE__ */ jsx("div", { children: "Verification Details" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "Phone Number",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "phone",
                    value: formData.phone,
                    onChange: (e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        handleChange(e);
                      }
                    },
                    placeholder: "Enter number",
                    className: inputClasses,
                    pattern: "[0-9]*"
                  }
                ),
                errors.phone && errors.phone.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.phone.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                  "Email Id",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    placeholder: "Enter email",
                    className: inputClasses
                  }
                ),
                errors.email && errors.email.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.email.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-3 text-sm font-semibold text-gray-800", children: [
              /* @__PURE__ */ jsx(LocationIcon, { className: "w-5 h-5 mr-1" }),
              /* @__PURE__ */ jsx("div", { children: "Address" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 mb-2", children: /* @__PURE__ */ jsxs("div", { className: "relative", ref: stateRef, children: [
              /* @__PURE__ */ jsxs("label", { className: labelClasses, children: [
                "State ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Search or select state...",
                    value: stateSearch,
                    onChange: (e) => {
                      setStateSearch(e.target.value);
                      setIsStateOpen(true);
                      const selectedState = stateOptions.find(
                        (state) => state.code === formData.state
                      );
                      if (selectedState && e.target.value !== selectedState.name) {
                        setFormData((prev) => ({
                          ...prev,
                          state: ""
                        }));
                      }
                    },
                    onFocus: () => setIsStateOpen(true),
                    className: `${inputClasses} pr-20`
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center", children: [
                  formData.state && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: clearState,
                      className: "p-1 hover:bg-gray-200 rounded mr-1",
                      children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center pr-3 pointer-events-none", children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-gray-400" }) }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setIsStateOpen(!isStateOpen),
                      className: "flex items-center pr-2",
                      children: /* @__PURE__ */ jsx(
                        ChevronDown,
                        {
                          className: `h-4 w-4 text-gray-400 transition-transform ${isStateOpen ? "rotate-180" : ""}`
                        }
                      )
                    }
                  )
                ] })
              ] }),
              isStateOpen && /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute z-50 w-full bg-white border border-gray-200 shadow-lg rounded-sm max-h-48 overflow-y-auto left-0 ${dropdownPosition.state === "top" ? "bottom-full mb-1" : "top-full mt-1"}`,
                  children: filteredStates.length > 0 ? filteredStates.map((state) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => handleStateSelect(state),
                      className: `flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs ${formData.state === state.code ? "bg-gray-50" : ""}`,
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "flex-1", children: state.name }),
                        formData.state === state.code && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600" })
                      ]
                    },
                    state.code
                  )) : /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-xs text-gray-400", children: "No states found" })
                }
              ),
              errors.state && errors.state.length > 0 && /* @__PURE__ */ jsx("div", { className: errorClasses, children: errors.state.map((error, index) => /* @__PURE__ */ jsx("p", { children: error }, index)) })
            ] }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-end", children: [
      organization_id && /* @__PURE__ */ jsx(
        "button",
        {
          className: "bg-white text-black px-4 py-2 rounded-none text-sm font-normal border transition cursor-pointer",
          onClick: () => navigate({ to: "/organizations" }),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSubmit,
          className: "bg-black text-white px-4 py-2 rounded-none text-sm font-normal hover:bg-gray-800 transition cursor-pointer",
          disabled: isCreatePending || isUpdatePending,
          children: isCreatePending || isUpdatePending ? "Saving..." : organization_id ? "Update" : "Create"
        }
      )
    ] })
  ] }) }) });
};

export { CreateOrganization as C };
//# sourceMappingURL=index-MPUvoBUR.mjs.map
