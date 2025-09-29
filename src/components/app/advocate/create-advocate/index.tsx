import AdvocateImage from "@/assets/person.png";
import { DateOfBirthPicker } from "@/components/core/DateOfBirthPicker";
import LoadingComponent from "@/components/core/Loading";
import DeleteStrokeIcon from "@/components/icons/delete-stroke-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelect from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  addAdvocateAPI,
  addManagerAPI,
  singleAdvocateAPI,
  singleManagerAPI,
  updateAdvocateAPI,
  updateManagerAPI,
} from "@/http/services/advocate";
import { getAllLocationsListAPI } from "@/http/services/location";
import { qualifications } from "@/lib/constants/advocate";
import { stateOptions } from "@/lib/constants/stateConstants";
import { extractKeyFromUrl } from "@/utils/helpers/app";
import { deletePayload } from "@/utils/helpers/deletePayload";
import { formatAadhaar } from "@/utils/helpers/formatAadhaar";
import { sliceFilename } from "@/utils/helpers/manage";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useParams, useRouter } from "@tanstack/react-router";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CertificateUpload from "./CertificateUpload";
import MultiSelectLocations from "./MultiSelectLocations";
import ProfileUpload from "./ProfileUplod";

dayjs.extend(isSameOrAfter);
export const CreateAdvocate = () => {
  const router = useRouter();
  const { advocate_id, manager_id } = useParams({ strict: false });
  const location = useLocation();
  const stateRef = useRef<HTMLDivElement>(null);
  const inputRefs: any = {
    first_name: useRef(null),
    gender: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    date_of_birth: useRef(null),
    last_name: useRef(null),
    address: useRef(null),
    bio: useRef(null),
    experience: useRef(null),
    qualification: useRef(null),
    degree_certificate: useRef(null),
    aadhaar: useRef(null),
    advocate_code: useRef(null),
    bar_council_enrollment_id: useRef(null),
    area_of_interest: useRef(null),
    achievements: useRef(null),
    bar_affiliations: useRef(null),
    location_id: useRef(null),
    stream: useRef(null),
    state: useRef(null),
  };
  const shouldUseSingleSelection =
    location.pathname.includes("/create-manager") ||
    location.pathname.includes("/edit-manager");
  const isEditingManager = location.pathname.includes("/edit-manager");
  const [selectOther, setSelectOther] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const [previewImage, setPreviewImage] = useState<any>(() => {
    return localStorage.getItem("previewImage") || null;
  });
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    designation: "",
    experience: "",
    bio: "",
    profile_pic: "",
    qualification: "",
    degree_certificate: "",
    aadhaar: "",
    advocate_code: "",
    bar_council_enrollment_id: "",
    bar_affiliations: "",
    area_of_interest: [] as string[],
    achievements: "",
    location_id: [] as number[],
    state: "",
  });
  const { isAdmin } = useUserDetails();
  const displayAadhaar = formatAadhaar(formData.aadhaar);
  const filteredStates = stateOptions.filter((state) =>
    state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const { data: advocateData, isLoading: isAdvocateLoading } = useQuery({
    queryKey: [advocate_id || manager_id],
    queryFn: async () => {
      const response = manager_id
        ? await singleManagerAPI(manager_id)
        : await singleAdvocateAPI(advocate_id);

      if (response?.status === 200 || response?.status === 201) {
        return response.data.data;
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!manager_id || !!advocate_id,
  });

  const { isLoading: isLocationsLoading, data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await getAllLocationsListAPI();
      return Array.isArray(response?.data?.data) ? response.data?.data : [];
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateAddAdvocate, isPending: isLoadingAddAdvocate } =
    useMutation({
      mutationKey: ["add-advocate"],
      mutationFn: async (formData: any) => {
        const processedFormData = { ...formData };
        if (shouldUseSingleSelection && formData.state) {
          const stateName =
            stateOptions.find((state) => state.code === formData.state)?.name ||
            formData.state;
          processedFormData.state = stateName;
        }

        const response = shouldUseSingleSelection
          ? await addManagerAPI(
              deletePayload(processedFormData, [
                "designation",
                "address",
                "profile_pic",
                "bar_affiliations",
                "achievements",
              ])
            )
          : await addAdvocateAPI(
              deletePayload(processedFormData, [
                "designation",
                "address",
                "profile_pic",
                "bar_affiliations",
                "achievements",
              ])
            );

        return response?.data;
      },
      onSuccess: async (data) => {
        setErrors({});
        toast.success(
          `${shouldUseSingleSelection ? "Manager" : "Advocate"} Added Successfully`,
          {
            action: {
              label: "✕",
              onClick: () => {
                toast.dismiss();
              },
            },
          }
        );
        if (shouldUseSingleSelection) {
          router.navigate({ to: "/managers" });
        } else {
          router.navigate({ to: `/advocates` });
        }
      },
      onError: (error: any) => {
        if (error?.status === 422) {
          setErrors(error?.data?.errData || {});

          const errorKeys = Object.keys(
            error?.data?.errData || {}
          ) as (keyof typeof inputRefs)[];

          if (errorKeys.length > 0) {
            const ref = inputRefs[errorKeys[0]]?.current;
            if (ref) {
              ref.focus();
            }
          }
        } else {
          toast.error(
            `Failed to Add the ${shouldUseSingleSelection ? "Manager" : "Advocate"}`,
            {
              action: {
                label: "✕",
                onClick: () => {
                  toast.dismiss();
                },
              },
            }
          );
        }
      },
    });

  const { mutate: mutateUpdateAdvocate, isPending: isLoadingUpdateAdvocate } =
    useMutation({
      mutationKey: ["Update-advocate"],
      mutationFn: async (data: any) => {
        if (data.profile_pic) {
          data.profile_pic = extractKeyFromUrl(data.profile_pic);
        }
        if (data.degree_certificate) {
          data.degree_certificate = extractKeyFromUrl(data.degree_certificate);
        }

        if (shouldUseSingleSelection && data.state) {
          const stateName =
            stateOptions.find((state) => state.code === data.state)?.name ||
            data.state;
          data.state = stateName;
        }

        const response = isEditingManager
          ? await updateManagerAPI({
              payload: deletePayload(data, [
                "designation",
                "address",
                "profile_pic",
                "bar_affiliations",
                "achievements",
              ]),
              manager_id: manager_id,
            })
          : await updateAdvocateAPI({
              payload: deletePayload(data, [
                "designation",
                "address",
                "profile_pic",
                "bar_affiliations",
                "achievements",
              ]),
              advocate_id: advocate_id,
            });

        return response?.data;
      },
      onSuccess: async (data) => {
        setErrors({});
        toast.success(
          `${isEditingManager ? "Manager" : "Advocate"} Details Updated Successfully`,
          {
            action: {
              label: "✕",
              onClick: () => {
                toast.dismiss();
              },
            },
          }
        );
        if (manager_id) {
          router.navigate({ to: "/managers" });
        } else {
          router.navigate({ to: `/advocates` });
        }
      },
      onError: (error: any) => {
        if (error?.status === 422) {
          setErrors(error?.data?.errData || {});
          const errorKeys = Object.keys(
            error?.data?.errData || {}
          ) as (keyof typeof inputRefs)[];

          if (errorKeys.length > 0) {
            const ref = inputRefs[errorKeys[0]]?.current;
            if (ref) {
              ref.focus();
            }
          }
        } else {
          toast.error(error?.message, {
            action: {
              label: "✕",
              onClick: () => {
                toast.dismiss();
              },
            },
          });
        }
      },
    });

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const shouldUseSingleSelection =
      location.pathname.includes("/create-manager") ||
      location.pathname.includes("/edit-manager");

    const updatedFormData = {
      ...formData,
      address: formData.address?.trim() === "" ? null : formData.address,
      designation:
        formData.designation?.trim() === "" ? null : formData.designation,
      phone: formData.phone ? `+91${formData.phone}` : "",
      location_id: shouldUseSingleSelection
        ? formData.location_id.length > 0
          ? formData.location_id[0]
          : null
        : formData.location_id,
    };

    if (advocate_id || manager_id) {
      mutateUpdateAdvocate({
        ...updatedFormData,
        id: Number(advocate_id || manager_id),
      });
    } else {
      mutateAddAdvocate(updatedFormData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev: any) => ({ ...prev, [id]: null }));
  };

  const handleFileKeyGenerated = (fileKey: string) => {
    setFormData((prev: any) => ({
      ...prev,
      profile_pic: fileKey,
    }));
    localStorage.setItem("previewImage", previewImage);
  };

  const handleFileUploads = (fileKey: string) => {
    setFormData((prev: any) => ({
      ...prev,
      degree_certificate: fileKey,
    }));
  };

  const handleOptionChange = (value: string) => {
    if (value === "others") {
      setSelectOther(true);
      setFormData({ ...formData, qualification: "" });
    } else {
      setSelectOther(false);
      setFormData({ ...formData, qualification: value });
    }
  };

  const handleRemoveFile = (event: any) => {
    setFormData((prev: any) => ({
      ...prev,
      degree_certificate: "",
    }));
  };

  const handleChangeAadhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formattedValue = value.replace(/\D+/g, "");
    formattedValue = formattedValue.slice(0, 12);
    setFormData((prev: any) => ({
      ...prev,
      aadhaar: formattedValue,
    }));
  };

  const handleDateOfBirth = (value: Date | undefined) => {
    setFormData((prev: any) => ({
      ...prev,
      date_of_birth: value ? dayjs(value).format("YYYY-MM-DD") : "",
    }));
  };

  const handleStateSelect = (state: { name: string; code: string }) => {
    setFormData((prev: any) => ({
      ...prev,
      state: state.code,
    }));
    setStateSearch(state.name);
    setIsStateOpen(false);
    if (errors.state) {
      setErrors((prev: any) => ({
        ...prev,
        state: undefined,
      }));
    }
  };

  const clearState = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev: any) => ({
      ...prev,
      state: "",
    }));
    setStateSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateRef.current &&
        !stateRef.current.contains(event.target as Node)
      ) {
        setIsStateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("previewImage");
    };
  }, []);

  useEffect(() => {
    if (advocateData) {
      setSelectValue(
        advocateData.qualification === !qualifications
          ? advocateData.qualification
          : ""
      );

      let locationIds = [];
      if (isEditingManager) {
        if (advocateData.location_id) {
          locationIds = Array.isArray(advocateData.location_id)
            ? advocateData.location_id
            : [advocateData.location_id];
        }
      } else {
        locationIds =
          advocateData.advocate_locations?.map((loc) => loc.location_id) || [];
      }

      setFormData({
        first_name: advocateData.first_name || "",
        last_name: advocateData.last_name || "",
        gender: advocateData.gender || "",
        date_of_birth: advocateData.date_of_birth || "",
        email: advocateData.email || "",
        phone: advocateData.phone?.replace("+91", "") || "",
        address: advocateData.address || "",
        experience: advocateData.experience || "",
        bio: advocateData.bio || "",
        profile_pic: advocateData.profile_pic_url,
        qualification: advocateData.qualification || "",
        degree_certificate: advocateData.degree_certificate || "",
        aadhaar: advocateData.aadhaar || "",
        advocate_code: advocateData.advocate_code || "",
        bar_council_enrollment_id: advocateData.bar_council_enrollment_id || "",
        bar_affiliations: advocateData.bar_affiliations || "",
        area_of_interest: advocateData.area_of_interest || "",
        achievements: advocateData.achievements || "",
        location_id: locationIds,
        stream: advocateData.stream || "",
        state: advocateData.state || "",
      });

      if (shouldUseSingleSelection && advocateData.state) {
        const stateOption = stateOptions.find(
          (s) => s.code === advocateData.state
        );
        setStateSearch(stateOption?.name || advocateData.state);
      }
    }
  }, [advocateData, shouldUseSingleSelection, isEditingManager]);

  return (
    <>
      <div className="relative h-[calc(100%-2px)] overflow-hidden">
        {isAdvocateLoading || isLocationsLoading ? (
          <LoadingComponent
            loading={isAdvocateLoading || isLocationsLoading}
            className="bg-white"
          />
        ) : (
          <div className="flex gap-8 items-start relative overflow-hidden">
            <Card className="w-3/4 bg-white rounded-none z-20 flex flex-col h-[calc(100vh-90px)] border-gray-300">
              <div className="flex-1 overflow-y-scroll p-4">
                <form onSubmit={handleUpdateSubmit} className="space-y-7">
                  <div className="space-y-1">
                    <h2 className="text-base font-normal">Personal Details</h2>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor="first_name"
                          className="text-xs text-opacity-80"
                        >
                          First Name{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          ref={inputRefs.first_name}
                          onChange={(e) => {
                            let value = e.target.value;
                            value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                            if (/^[A-Za-z_ ]*$/.test(value)) {
                              handleChange({
                                target: { id: e.target.id, value },
                              } as React.ChangeEvent<HTMLInputElement>);
                            }
                          }}
                          className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                        ></Input>
                        {errors.first_name && (
                          <span className="text-red-500 text-xs">
                            {errors.first_name[0]}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="last_name"
                          className="text-xs text-opacity-80"
                        >
                          Last Name
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={(e) => {
                            let value = e.target.value;
                            value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                            if (/^[A-Za-z_ ]*$/.test(value)) {
                              handleChange({
                                target: { id: e.target.id, value },
                              } as React.ChangeEvent<HTMLInputElement>);
                            }
                          }}
                          className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                        ></Input>
                        {errors.last_name && (
                          <span className="text-red-500 text-xs">
                            {errors.last_name[0]}
                          </span>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs text-opacity-80">
                          Gender{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <RadioGroup
                          value={formData.gender || ""}
                          ref={inputRefs.gender}
                          onValueChange={(value) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              gender: value,
                            }))
                          }
                          className="flex space-x-5"
                        >
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem
                              value="MALE"
                              id="MALE"
                              className="text-black border-gray-400 cursor-pointer"
                            />
                            <Label
                              htmlFor="MALE"
                              className="text-sm text-opacity-80 cursor-pointer"
                            >
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="FEMALE"
                              id="FEMALE"
                              className="text-black border-gray-400 cursor-pointer"
                            />
                            <Label
                              htmlFor="FEMALE"
                              className="text-sm text-opacity-80 cursor-pointer"
                            >
                              Female
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="OTHER"
                              id="OTHER"
                              className="text-black border-gray-400 cursor-pointer"
                            />
                            <Label
                              htmlFor="OTHER"
                              className="text-sm text-opacity-80 cursor-pointer"
                            >
                              Other
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.gender && (
                          <span className="text-red-500 text-xs block">
                            {errors.gender[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Label
                          htmlFor="date_of_birth"
                          className="text-xs text-opacity-80"
                        >
                          Date of Birth{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <DateOfBirthPicker
                          value={
                            formData?.date_of_birth
                              ? dayjs(
                                  formData.date_of_birth,
                                  "YYYY-MM-DD"
                                ).toDate()
                              : undefined
                          }
                          onDateSelect={handleDateOfBirth}
                        />
                        {errors.date_of_birth && (
                          <span className="text-red-500 text-xs">
                            {errors.date_of_birth[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-normal">Contact Details</h2>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor="email"
                          className="text-xs text-opacity-80"
                        >
                          Email{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          ref={inputRefs.email}
                          onChange={handleChange}
                          className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none !focus:border-0"
                        ></Input>
                        {errors.email && (
                          <span className="text-red-500 text-xs">
                            {errors.email[0]}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="phone"
                          className="text-xs text-opacity-80"
                        >
                          Phone{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          ref={inputRefs.phone}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              handleChange(e);
                            }
                          }}
                          className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                        ></Input>
                        {errors.phone && (
                          <span className="text-red-500 text-xs">
                            {errors.phone[0]}
                          </span>
                        )}
                      </div>

                      {shouldUseSingleSelection ? (
                        <>
                          <div className="space-y-1 relative" ref={stateRef}>
                            <Label className="text-xs text-opacity-80">
                              State{" "}
                              <span className="text-sm text-red-600">
                                &#42;
                              </span>
                            </Label>
                            <div className="relative">
                              <Input
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
                                    setFormData((prev: any) => ({
                                      ...prev,
                                      state: "",
                                    }));
                                  }
                                }}
                                onFocus={() => setIsStateOpen(true)}
                                className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none pr-20"
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
                                    className={`h-4 w-4 text-gray-400 transition-transform ${isStateOpen ? "rotate-180" : ""}`}
                                  />
                                </button>
                              </div>
                            </div>

                            {isStateOpen && (
                              <div className="absolute z-50 w-full bg-white border border-gray-200 shadow-lg rounded-sm max-h-48 overflow-y-auto top-full mt-1">
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
                                      <span className="flex-1">
                                        {state.name}
                                      </span>
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

                            {errors.state && (
                              <span className="text-red-500 text-xs">
                                {errors.state[0]}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 pt-1">
                            <Label
                              htmlFor="address"
                              className="text-xs text-opacity-80"
                            >
                              Address
                            </Label>
                            <Textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              ref={inputRefs.address}
                              onChange={handleChange}
                              className="resize-none rounded-none bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none h-9"
                            ></Textarea>
                            {errors.address && (
                              <span className="text-red-500 text-xs">
                                {errors.address[0]}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2 space-y-1">
                          <Label
                            htmlFor="address"
                            className="text-xs text-opacity-80"
                          >
                            Address
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            ref={inputRefs.address}
                            onChange={handleChange}
                            className="resize-none rounded-none bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none h-16"
                          ></Textarea>
                          {errors.address && (
                            <span className="text-red-500 text-xs">
                              {errors.address[0]}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-normal">
                      Professional Details
                    </h2>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                      <div className="space-y-1  ">
                        <Label className="text-xs text-opacity-80">
                          Work Location
                          <span className="text-sm text-red-600 ">&#42;</span>
                        </Label>
                        <MultiSelectLocations
                          value={formData.location_id}
                          isAdmin={isAdmin}
                          onValueChange={(value) =>
                            setFormData({ ...formData, location_id: value })
                          }
                          locations={locations}
                        />
                        {errors.location_id && (
                          <span className="text-red-500 text-xs">
                            {errors.location_id[0]}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1  ">
                        <Label className="text-xs text-opacity-80">
                          Area of Interest{" "}
                          <span className="text-sm text-red-600 ">&#42;</span>
                        </Label>
                        <MultiSelect
                          value={formData.area_of_interest}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              area_of_interest: value,
                            })
                          }
                        />
                        {errors.area_of_interest && (
                          <span className="text-red-500 text-xs">
                            {errors.area_of_interest[0]}
                          </span>
                        )}
                      </div>
                      <div className=" flex flex-col ">
                        <div className="space-y-1 flex flex-col">
                          <Label className="text-xs text-opacity-80">
                            Qualification{" "}
                            <span className="text-sm text-red-600">&#42;</span>
                          </Label>
                          <RadioGroup
                            value={
                              formData.qualification.length > 0
                                ? qualifications.includes(
                                    formData.qualification
                                  )
                                  ? formData.qualification
                                  : "others"
                                : ""
                            }
                            ref={inputRefs.qualification}
                            onValueChange={handleOptionChange}
                            className="flex"
                          >
                            {qualifications.map((q) => (
                              <div
                                key={q}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={q}
                                  id={q}
                                  className="text-black border-gray-400 cursor-pointer"
                                />
                                <Label
                                  htmlFor={q}
                                  className="text-sm text-opacity-80 cursor-pointer"
                                >
                                  {q}
                                </Label>
                              </div>
                            ))}

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="others"
                                id="others"
                                className="text-black border-gray-400 cursor-pointer"
                              />
                              <Label
                                htmlFor="others"
                                className="text-sm text-opacity-80 cursor-pointer"
                              >
                                Others
                              </Label>
                            </div>

                            <div className="block">
                              <Input
                                className={`rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none ${selectOther || (!qualifications.includes(formData.qualification) && formData.qualification) ? "visible" : "invisible"} `}
                                value={selectValue || formData.qualification}
                                onChange={(e: any) => {
                                  let value = e.target.value;
                                  if (/^[A-Za-z -._]*$/.test(value)) {
                                    handleChange({
                                      target: { id: e.target.id, value },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                    setSelectValue(value);
                                    setFormData({
                                      ...formData,
                                      qualification: value,
                                    });
                                  }
                                }}
                              />
                            </div>
                          </RadioGroup>
                          {errors.qualification && (
                            <span className="text-red-500 text-xs">
                              {errors.qualification[0]}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 mt-2">
                          <Label className="text-xs text-opacity-80 invisible">
                            File Upload
                          </Label>
                          {formData.degree_certificate === "" ? (
                            <div className="">
                              <CertificateUpload
                                onFileKeyGenerated={handleFileUploads}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between w-full bg-slate-100 p-2 h-9 rounded-none">
                              <span className="font-medium text-gray-800">
                                {sliceFilename(
                                  formData.degree_certificate &&
                                    formData.degree_certificate.replace(
                                      "nyaya-tech/",
                                      ""
                                    ),
                                  25
                                )}
                              </span>
                              <button
                                onClick={handleRemoveFile}
                                className="text-red-500 hover:text-red-700 ml-2 font-semibold cursor-pointer"
                              >
                                <DeleteStrokeIcon />
                              </button>
                            </div>
                          )}
                          {errors.degree_certificate && (
                            <span className="text-red-500 text-xs">
                              {errors.degree_certificate[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid">
                        <div className="space-y-1">
                          <Label
                            htmlFor="experience"
                            className="text-xs text-opacity-80"
                          >
                            Experience{" "}
                            <span className="text-sm text-red-600">&#42;</span>
                          </Label>
                          <Input
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            ref={inputRefs.experience}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d{0,2}$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                          ></Input>
                          {errors.experience && (
                            <span className="text-red-500 text-xs">
                              {errors.experience[0]}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 mt-1">
                          <Label
                            htmlFor="aadhaar"
                            className="text-xs text-opacity-80"
                          >
                            Aadhaar Number{" "}
                            <span className="text-sm text-red-600">&#42;</span>
                          </Label>
                          <Input
                            className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                            id="aadhaar"
                            name="aadhaar"
                            value={displayAadhaar}
                            ref={inputRefs.aadhaar}
                            onChange={handleChangeAadhaar}
                          ></Input>
                          {errors.aadhaar && (
                            <span className="text-red-500 text-xs">
                              {errors.aadhaar[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="advocate_code"
                          className="text-xs text-opacity-80"
                        >
                          Advocate Code{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Input
                          className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                          id="advocate_code"
                          value={formData.advocate_code}
                          ref={inputRefs.advocate_code}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.toUpperCase();
                            if (/^[A-Za-z0-9 ]*$/.test(value)) {
                              handleChange({
                                target: { id: e.target.id, value },
                              } as React.ChangeEvent<HTMLInputElement>);
                            }
                          }}
                        ></Input>
                        {errors.advocate_code && (
                          <span className="text-red-500 text-xs">
                            {errors.advocate_code[0]}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="bar_council_enrollment_id"
                          className="text-xs text-opacity-80"
                        >
                          Bar Council Enrollment ID{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Input
                          className="rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                          id="bar_council_enrollment_id"
                          value={formData.bar_council_enrollment_id}
                          ref={inputRefs.bar_council_enrollment_id}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.toUpperCase();
                            if (/^[A-Za-z0-9 ]*$/.test(value)) {
                              handleChange({
                                target: { id: e.target.id, value },
                              } as React.ChangeEvent<HTMLInputElement>);
                            }
                          }}
                        ></Input>
                        {errors.bar_council_enrollment_id && (
                          <span className="text-red-500 text-xs">
                            {errors.bar_council_enrollment_id[0]}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="bar_affliations"
                          className="text-xs text-opacity-80"
                        >
                          Bar Affliations
                        </Label>
                        <Textarea
                          className="resize-none rounded-none h-20 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                          id="bar_affiliations"
                          value={formData.bar_affiliations}
                          ref={inputRefs.bar_affiliations}
                          onChange={handleChange}
                        ></Textarea>
                        {errors.achievements && (
                          <span className="text-red-500 text-xs">
                            {errors.achievements[0]}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 ">
                        <Label
                          htmlFor="achievements"
                          className="text-xs text-opacity-80"
                        >
                          Achievements
                        </Label>
                        <Textarea
                          className="rounded-none h-20 resize-none bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                          id="achievements"
                          name="achievements"
                          value={formData.achievements}
                          ref={inputRefs.achievements}
                          onChange={handleChange}
                        ></Textarea>
                        {errors.achievements && (
                          <span className="text-red-500 text-xs">
                            {errors.achievements[0]}
                          </span>
                        )}
                      </div>
                      <div className=" col-span-2 space-y-1">
                        <Label
                          htmlFor="bio"
                          className="text-xs text-opacity-80"
                        >
                          Bio{" "}
                          <span className="text-sm text-red-600">&#42;</span>
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={
                            formData?.bio.charAt(0).toUpperCase() +
                            formData?.bio.slice(1)
                          }
                          ref={inputRefs.bio}
                          onChange={handleChange}
                          className="resize-none rounded-none h-20 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                        ></Textarea>
                        {errors.bio && (
                          <span className="text-red-500 text-xs">
                            {errors.bio[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className=" p-2 flex gap-5 justify-end">
                <Button
                  type="button"
                  className="bg-white cursor-pointer rounded-none border h-8 px-6 active:scale-95 transition-all duration-300 ease-in-out  border-black text-sm "
                  onClick={() => {
                    if (shouldUseSingleSelection) {
                      router.navigate({ to: "/managers" });
                    } else {
                      router.navigate({ to: "/advocates" });
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateSubmit}
                  className="bg-black text-white cursor-pointer rounded-none h-8 px-6 text-sm active:scale-95 transition-all duration-300 ease-in-out  hover:bg-black/60 hover:text-white"
                  disabled={isLoadingAddAdvocate || isLoadingUpdateAdvocate}
                >
                  {isLoadingAddAdvocate || isLoadingUpdateAdvocate
                    ? "Saving..."
                    : advocate_id || manager_id
                      ? "Update"
                      : "Create"}
                </Button>
              </div>
            </Card>
            <Card className="p-4 border-gray-300 rounded-none bg-white">
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="w-52 h-52 overflow-hidden">
                  <img
                    src={previewImage || formData.profile_pic || AdvocateImage}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <ProfileUpload
                  onFileKeyGenerated={handleFileKeyGenerated}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};
