import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { B as Button, c as cn } from './router-e7zdrxGz.mjs';
import dayjs from 'dayjs';
import { X, Search, ChevronDown, Check, Circle, CalendarIcon, ChevronLeft, ChevronRight, Loader2, PlusIcon } from 'lucide-react';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-8VPYQ3UR.mjs';
import { e as extractKeyFromUrl, g as generateYears, b as getDaysInMonth } from './app-CEOvaEAI.mjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';
import { D as DeleteStrokeIcon } from './delete-stroke-icon-mn8-8d5M.mjs';
import { C as Card } from './card-CfZVGcIr.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import { L as Label } from './label-Btl29BJR.mjs';
import { g as getColorByFirstLetter } from './getColorByFirstLetter-BN8gbOeM.mjs';
import { C as Command, a as CommandInput, b as CommandList, d as CommandGroup, e as CommandItem, c as CommandEmpty } from './command-DoJaARCj.mjs';
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from './tooltip-BKF0DBvK.mjs';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { T as Textarea } from './textarea-BfKn0GZN.mjs';
import { s as singleManagerAPI, a as singleAdvocateAPI, e as addManagerAPI, f as addAdvocateAPI, u as updateManagerAPI, h as updateAdvocateAPI } from './advocate-Cvw6EtWS.mjs';
import { a as getAllLocationsListAPI } from './location-D_tPNO3m.mjs';
import { q as qualifications } from './advocate-DLfkmGnv.mjs';
import { s as stateOptions } from './stateConstants-CKjWDC1S.mjs';
import { d as deletePayload } from './deletePayload-CnkJRSrW.mjs';
import { s as sliceFilename } from './manage-CWSyPq63.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter, useParams, useLocation } from '@tanstack/react-router';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import { toast } from 'sonner';
import { f as fileUploadAPI, u as uploadToS3API } from './fileUpload-BBm5-XTb.mjs';
import { useDropzone } from 'react-dropzone';

const AdvocateImage = "/assets/person-f7q1wRxe.png";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
dayjs.extend(customParseFormat);
function DateOfBirthPicker({
  value,
  onDateSelect
}) {
  const [date, setDate] = React.useState(value != null ? value : void 0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(
    value ? value.getFullYear() : 1990
  );
  const [selectedMonth, setSelectedMonth] = React.useState(
    value ? value.getMonth() : 0
  );
  const [selectedDay, setSelectedDay] = React.useState(
    value ? value.getDate() : 1
  );
  const [yearDropdownOpen, setYearDropdownOpen] = React.useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = React.useState(false);
  const years = generateYears(1955, 2005);
  React.useEffect(() => {
    if (value) {
      setDate(value);
      setSelectedYear(value.getFullYear());
      setSelectedMonth(value.getMonth());
      setSelectedDay(value.getDate());
    }
  }, [value]);
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    const daysInMonth = getDaysInMonth(
      selectedMonth === 0 ? selectedYear - 1 : selectedYear,
      selectedMonth === 0 ? 11 : selectedMonth - 1
    );
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };
  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    const daysInMonth = getDaysInMonth(
      selectedMonth === 11 ? selectedYear + 1 : selectedYear,
      selectedMonth === 11 ? 0 : selectedMonth + 1
    );
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };
  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    setDate(newDate);
    onDateSelect(newDate);
    setIsOpen(false);
  };
  const handleClear = (e) => {
    e.stopPropagation();
    setDate(void 0);
    onDateSelect(void 0);
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
    const daysInMonth = getDaysInMonth(year, selectedMonth);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setMonthDropdownOpen(false);
    const daysInMonth = getDaysInMonth(selectedYear, month);
    if (selectedDay > daysInMonth) {
      setSelectedDay(daysInMonth);
    }
  };
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedDay(day),
            className: cn(
              "w-8 h-8 text-sm xl:text-xs rounded flex items-center justify-center relative",
              selectedDay === day ? "bg-black text-white" : "hover:bg-gray-100"
            ),
            children: day
          },
          day
        )
      );
    }
    return days;
  };
  return /* @__PURE__ */ jsxs(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        className: cn(
          "w-full p-2 justify-between text-left font-normal rounded-none bg-slate-100 cursor-pointer border border-gray-300",
          !date && "text-muted-foreground"
        ),
        children: !date ? /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full ", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Select Date of Birth" }),
          /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full", children: [
          /* @__PURE__ */ jsx("span", { children: dayjs(date).format("DD-MM-YYYY") }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "ml-1 cursor-pointer",
              onClick: handleClear,
              type: "button",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      PopoverContent,
      {
        align: "start",
        className: "w-80 p-4 bg-white border border-gray-300",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handlePrevMonth,
                className: "p-1 hover:bg-gray-100 rounded",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setMonthDropdownOpen(!monthDropdownOpen),
                    className: "px-3 py-1 text-sm xl:text-xs text-black border-gray-300 border rounded flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: MONTHS[selectedMonth].slice(0, 3) }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3" })
                    ]
                  }
                ),
                monthDropdownOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto mt-1 min-w-24", children: MONTHS.map((month, index) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleMonthChange(index),
                    className: "w-full p-2 text-left text-sm xl:text-xs hover:bg-gray-100",
                    children: month
                  },
                  month
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setYearDropdownOpen(!yearDropdownOpen),
                    className: "px-3 py-1 text-sm xl:text-xs text-black rounded border-gray-300 border flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx("span", { children: selectedYear }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3" })
                    ]
                  }
                ),
                yearDropdownOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto mt-1 min-w-16", children: years.map((year) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleYearChange(year),
                    className: "w-full p-2 text-left text-sm xl:text-xs hover:bg-gray-100",
                    children: year
                  },
                  year
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleNextMonth,
                className: "p-1 hover:bg-gray-100 rounded",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-8 h-8 text-xs font-medium text-gray-500 flex items-center justify-center",
                children: day
              },
              day
            )) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: renderDays() })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              className: "bg-black text-white hover:bg-black cursor-pointer",
              onClick: handleConfirm,
              children: "OK"
            }
          ) })
        ]
      }
    )
  ] });
}
const MultiSelect = ({
  value,
  onValueChange
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setSelectedItems(value);
  }, [value]);
  const fixedItems = [
    { id: "1", label: "Civil", value: "Civil Law" },
    { id: "2", label: "Criminal", value: "Criminal Law" },
    { id: "3", label: "MVOP", value: "MVOP law" },
    { id: "4", label: "Family", value: "Family Law" },
    { id: "5", label: "Constitution", value: "Constitution Law" },
    { id: "6", label: "Corporate", value: "Corporate Law" },
    { id: "7", label: "Banking", value: "Banking Law" },
    { id: "8", label: "Consumer", value: "Consumer Law" },
    { id: "9", label: "Labour Laws", value: "Labour Laws" }
  ];
  const filteredItems = fixedItems.filter(
    (item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleValue = (itemValue) => {
    const newValue = selectedItems.includes(itemValue) ? selectedItems.filter((value2) => value2 !== itemValue) : [...selectedItems, itemValue];
    setSelectedItems(newValue);
    onValueChange(newValue);
  };
  const confirmSelection = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, className: "cursor-pointer", children: /* @__PURE__ */ jsxs("div", { className: "w-full justify-between bg-slate-100 items-center px-2 py-2 min-h-9 text-xs rounded-none flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-wrap gap-1 h-full overflow-y-auto", children: [
        selectedItems.length === 0 ? "Select Area Of Interest" : selectedItems.slice(0, 4).map((value2) => {
          const item = fixedItems.find(
            (item2) => item2.value === value2
          );
          const { background, color } = getColorByFirstLetter(
            (item == null ? void 0 : item.label) || ""
          );
          return /* @__PURE__ */ jsxs(
            "span",
            {
              title: item == null ? void 0 : item.label,
              className: "px-2 py-0.5 rounded-full text-[10px] font-medium w-20 flex items-center gap-1",
              style: { backgroundColor: background },
              children: [
                /* @__PURE__ */ jsx("span", { className: `truncate flex-1 ${color} `, children: item == null ? void 0 : item.label }),
                /* @__PURE__ */ jsx(
                  X,
                  {
                    className: "cursor-pointer text-red-600 w-4 h-4 flex-shrink-0",
                    onClick: (e) => {
                      e.stopPropagation();
                      toggleValue(value2);
                    }
                  }
                )
              ]
            },
            value2
          );
        }),
        selectedItems.length > 4 && /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer flex items-center gap-1",
              style: { backgroundColor: "#D3D3D3", color: "#333333" },
              onClick: (e) => e.stopPropagation(),
              children: [
                "+",
                selectedItems.length - 4
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(
            TooltipContent,
            {
              className: "w-auto p-2 bg-white border rounded shadow-lg",
              style: { maxHeight: "350px", overflowY: "auto" },
              children: selectedItems.slice().map((value2) => {
                const item = fixedItems.find(
                  (item2) => item2.value === value2
                );
                const { background, color } = getColorByFirstLetter(
                  (item == null ? void 0 : item.label) || ""
                );
                return /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: "px-2 py-1 rounded-full text-xs font-medium mb-1 w-32 flex items-center gap-1",
                    style: { backgroundColor: background },
                    title: item == null ? void 0 : item.label,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "truncate flex-1", children: item == null ? void 0 : item.label }),
                      /* @__PURE__ */ jsx(
                        X,
                        {
                          className: "cursor-pointer text-red-600 w-4 h-4 flex-shrink-0",
                          onClick: (e) => {
                            e.stopPropagation();
                            toggleValue(value2);
                          }
                        }
                      )
                    ]
                  },
                  value2
                );
              })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        align: "start",
        className: "w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300 rounded-sm",
        children: /* @__PURE__ */ jsxs(Command, { children: [
          /* @__PURE__ */ jsx(
            CommandInput,
            {
              placeholder: "Select Area of Interest",
              value: searchQuery,
              onValueChange: setSearchQuery
            }
          ),
          /* @__PURE__ */ jsxs(CommandList, { className: "max-h-[220px]", children: [
            /* @__PURE__ */ jsx(CommandGroup, { children: filteredItems.map((item) => /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: item.value,
                onSelect: () => toggleValue(item.value),
                className: "cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(
                    Check,
                    {
                      className: `mr-2 h-4 w-4 ${selectedItems.includes(item.value) ? "opacity-100" : "opacity-0"}`
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { children: item.label })
                ]
              },
              item.id
            )) }),
            /* @__PURE__ */ jsx(CommandEmpty, { children: "No items found." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2 p-2 border-t border-t-gray-300", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => {
                  setSelectedItems([]);
                  onValueChange([]);
                  setOpen(false);
                },
                className: "cursor-pointer",
                children: "Clear"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: confirmSelection,
                className: "cursor-pointer",
                children: "Confirm"
              }
            )
          ] })
        ] })
      }
    )
  ] }) });
};
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full flex items-center justify-center border border-primary text-primary  focus:outline-none   disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-3 w-3 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const formatAadhaar = (aadhaar) => {
  return aadhaar.replace(/(\d{4})(?=\d)/g, "$1 ");
};
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = [".jpeg", ".jpg", ".png", ".pdf"];
const CertificateUpload = ({
  onFileKeyGenerated
}) => {
  const [rejectionMessage, setRejectionMessage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = (acceptedFiles) => {
    setRejectionMessage(null);
    acceptedFiles.forEach((file) => {
      var _a;
      const fileType = `.${(_a = file.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()}`;
      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        setRejectionMessage(`File "${file.name}" has an unsupported type.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setRejectionMessage(
          `${file.name} file exceeds the maximum size of 5MB`
        );
      } else {
        handleFileUpload(file);
      }
    });
  };
  const onDropRejected = (rejectedFiles) => {
    const message = rejectedFiles.map(
      ({ file, errors }) => errors.map((error) => {
        if (error.code === "file-invalid-type") {
          return `File "${file.name}" has an unsupported type.`;
        }
        return `File "${file.name}" was rejected. Reason: ${error.message}`;
      })
    ).flat().join(", ");
    setRejectionMessage(message);
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".pdf"]
    },
    noClick: true
  });
  const { mutate: getPresignedUrls } = useMutation({
    mutationFn: async ({ file }) => {
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size
      });
      const { target_url, file_key } = data == null ? void 0 : data.data;
      if (!target_url) {
        throw new Error("Presigned URL is missing");
      }
      await uploadTos3({ url: target_url, file });
      return { filename: file.name, fileKey: file_key };
    },
    onSuccess: ({ fileKey, filename }) => {
      setIsUploading(false);
      setUploadedFiles((prevFiles) => [...prevFiles, { filename, fileKey }]);
      if (onFileKeyGenerated) {
        onFileKeyGenerated(fileKey);
      }
    },
    onError: (error) => {
      setIsUploading(false);
    }
  });
  const uploadTos3 = async ({ url, file }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (!(response.status === 200 || response.status === 201)) {
        throw response;
      }
    } catch (error) {
    }
  };
  const handleFileUpload = (file) => {
    setIsUploading(true);
    getPresignedUrls({ file });
  };
  const handleRemoveFile = (fileKey) => {
    setUploadedFiles(
      (prevFiles) => prevFiles.filter((file) => file.fileKey !== fileKey)
    );
  };
  return /* @__PURE__ */ jsxs("div", { id: "upload-attachments", children: [
    /* @__PURE__ */ jsxs("div", { className: "py-0 flex w-full justify-between items-center", children: [
      uploadedFiles.length === 0 && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          onClick: open,
          variant: "default",
          size: "default",
          className: "rounded-none cursor-pointer h-9 w-full active:scale-95 transition-all duration-300 ease-in-out  bg-slate-100 hover:bg-slate-100",
          children: /* @__PURE__ */ jsx("span", { className: "font-primary", children: isUploading ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 animate-spin" }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx(PlusIcon, {}),
            "Upload a Certificate"
          ] }) })
        }
      ),
      uploadedFiles.map((file) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center justify-between w-full bg-slate-100 p-2 rounded-md",
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: file.filename }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleRemoveFile(file.fileKey),
                className: "text-red-500 hover:text-red-700 ml-2 font-semibold",
                children: /* @__PURE__ */ jsx(DeleteStrokeIcon, {})
              }
            )
          ]
        },
        file.fileKey
      ))
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { ...getRootProps(), className: "hidden", children: /* @__PURE__ */ jsx("input", { ...getInputProps() }) }),
      rejectionMessage && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: rejectionMessage })
    ] })
  ] });
};
const MultiSelectLocations = ({
  value,
  onValueChange,
  locations,
  isAdmin
}) => {
  const location = useLocation();
  const shouldUseSingleSelection = location.pathname.includes("/create-manager") || location.pathname.includes("/edit-manager");
  const [open, setOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [tempClearedForManagers, setTempClearedForManagers] = useState(false);
  const shouldShowClearForManagers = shouldUseSingleSelection && value.length > 0 && !tempClearedForManagers;
  const filteredLocations = locations == null ? void 0 : locations.filter(
    (location2) => {
      var _a, _b;
      return (_b = (_a = location2 == null ? void 0 : location2.name) == null ? void 0 : _a.toLowerCase()) == null ? void 0 : _b.includes(locationSearch.toLowerCase());
    }
  );
  const toggleValue = (itemValue) => {
    if (shouldUseSingleSelection) {
      const newValue = value.includes(itemValue) ? [] : [itemValue];
      onValueChange(newValue);
      setTempClearedForManagers(false);
    } else {
      const newValue = value.includes(itemValue) ? value.filter((v) => v !== itemValue) : [...value, itemValue];
      onValueChange(newValue);
    }
  };
  const confirmSelection = () => {
    setLocationSearch("");
    setOpen(false);
  };
  const handleManagerClear = (e) => {
    e.stopPropagation();
    if (shouldUseSingleSelection) {
      setLocationSearch("");
      setTempClearedForManagers(true);
    } else {
      onValueChange([]);
      setLocationSearch("");
    }
  };
  const handlePopoverClear = () => {
    if (shouldUseSingleSelection) {
      setLocationSearch("");
      setTempClearedForManagers(true);
    } else {
      setLocationSearch("");
      onValueChange([]);
    }
    setOpen(false);
  };
  const getSelectedLocationText = () => {
    if (tempClearedForManagers || value.length === 0)
      return "Select Work Location";
    if (shouldUseSingleSelection && value.length > 0) {
      const selectedLocation = locations.find((l) => l.id === value[0]);
      return (selectedLocation == null ? void 0 : selectedLocation.name) || "Unknown Location";
    }
    return "Select Work Location";
  };
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "w-full justify-between bg-slate-100 items-center px-2 py-2 min-h-9 text-xs rounded-none flex cursor-pointer", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-wrap gap-1 h-full overflow-y-auto", children: shouldUseSingleSelection ? (
        // For managers: Show plain text
        /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: getSelectedLocationText() })
      ) : (
        // For advocates: Show badges
        /* @__PURE__ */ jsxs(Fragment, { children: [
          value.length === 0 ? "Select Work Location" : value.slice(0, 4).map((id) => {
            const item = locations.find((l) => l.id === id);
            const { background, color } = getColorByFirstLetter(
              (item == null ? void 0 : item.name) || ""
            );
            return /* @__PURE__ */ jsxs(
              "span",
              {
                title: item == null ? void 0 : item.name,
                className: "px-2 py-0.5 rounded-full text-[10px] font-medium w-20 flex items-center gap-1",
                style: { backgroundColor: background },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "truncate flex-1", children: (item == null ? void 0 : item.name) || "Unknown" }),
                  /* @__PURE__ */ jsx(
                    X,
                    {
                      className: "cursor-pointer text-red-600 w-4 h-4 flex-shrink-0",
                      onClick: (e) => {
                        e.stopPropagation();
                        toggleValue(id);
                      }
                    }
                  )
                ]
              },
              id
            );
          }),
          value.length > 4 && /* @__PURE__ */ jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              "span",
              {
                className: "px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer flex items-center gap-1",
                style: {
                  backgroundColor: "#D3D3D3",
                  color: "#333333"
                },
                onClick: (e) => e.stopPropagation(),
                children: [
                  "+",
                  value.length - 4
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(
              TooltipContent,
              {
                className: "w-auto p-2 bg-white border rounded shadow-lg",
                style: { maxHeight: "350px", overflowY: "auto" },
                children: value.slice(4).map((id) => {
                  const item = locations.find((l) => l.id === id);
                  const { background, color } = getColorByFirstLetter(
                    (item == null ? void 0 : item.name) || ""
                  );
                  return /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "px-2 py-1 rounded-full text-xs font-medium mb-1 w-32 flex items-center gap-1",
                      style: { backgroundColor: background },
                      title: item == null ? void 0 : item.name,
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate flex-1", children: (item == null ? void 0 : item.name) || "Unknown" }),
                        /* @__PURE__ */ jsx(
                          X,
                          {
                            className: "cursor-pointer text-red-600 w-4 h-4 flex-shrink-0",
                            onClick: (e) => {
                              e.stopPropagation();
                              toggleValue(id);
                            }
                          }
                        )
                      ]
                    },
                    id
                  );
                })
              }
            )
          ] })
        ] })
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        shouldShowClearForManagers && /* @__PURE__ */ jsx(
          X,
          {
            className: "cursor-pointer text-gray-400 hover:text-red-600 w-4 h-4",
            onClick: handleManagerClear
          }
        ),
        /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300 rounded-sm", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(
        CommandInput,
        {
          placeholder: "Select Work Location",
          value: locationSearch,
          onValueChange: setLocationSearch
        }
      ),
      /* @__PURE__ */ jsxs(CommandList, { className: "max-h-[220px]", children: [
        /* @__PURE__ */ jsx(CommandGroup, { children: filteredLocations.map((item) => /* @__PURE__ */ jsxs(
          CommandItem,
          {
            value: item.name,
            onSelect: () => !item.assigned && toggleValue(item.id),
            className: `${item.assigned ? "cursor-not-allowed opacity-50" : "cursor-pointer"} flex justify-between items-center`,
            disabled: (isAdmin == null ? void 0 : isAdmin()) && item.assigned,
            children: [
              /* @__PURE__ */ jsx("p", { children: item.name }),
              /* @__PURE__ */ jsx(
                Check,
                {
                  className: `ml-2 h-4 w-4 ${value.includes(item.id) && !tempClearedForManagers ? "opacity-100" : "opacity-0"}`
                }
              )
            ]
          },
          item.id
        )) }),
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No items found." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2 p-2 border-t border-t-gray-300", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handlePopoverClear,
            className: "cursor-pointer ",
            children: "Clear"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: confirmSelection,
            className: "cursor-pointer",
            children: "Confirm"
          }
        )
      ] })
    ] }) })
  ] }) });
};
const ProfileUpload = ({
  onFileKeyGenerated,
  previewImage,
  setPreviewImage
}) => {
  const { advocate_id } = useParams({ strict: false });
  const [rejectionMessage, setRejectionMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const onDrop = (acceptedFiles) => {
    setRejectionMessage(null);
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setRejectionMessage(
        `File exceeds the maximum size of ${MAX_FILE_SIZE_MB}MB.`
      );
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setPreviewImage(fileUrl);
    handleFileUpload(file);
  };
  const onDropRejected = (rejectedFiles) => {
    const message = rejectedFiles.map(
      ({ file, errors }) => errors.map((error) => {
        if (error.code === "file-invalid-type") {
          return `File "${file.name}" has an unsupported type.`;
        }
        return `File "${file.name}" was rejected. Reason: ${error.message}`;
      })
    ).flat().join(", ");
    setRejectionMessage(message);
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    noClick: true,
    maxFiles: 1
  });
  const { mutate: getPresignedUrls } = useMutation({
    mutationFn: async (file) => {
      setIsUploading(true);
      const fileType = file.name.split(".").pop();
      const { data } = await fileUploadAPI({
        file_name: file.name,
        file_type: fileType,
        file_size: file.size
      });
      const { target_url, file_key } = data == null ? void 0 : data.data;
      if (!target_url) {
        throw new Error("Presigned URL is missing");
      }
      await uploadToS3({
        url: target_url,
        file
      });
      return {
        filename: file.name,
        file_type: fileType,
        file_size: file.size,
        key: file_key
      };
    },
    onSuccess: async ({ key }) => {
      onFileKeyGenerated == null ? void 0 : onFileKeyGenerated(key);
      setIsUploading(false);
    },
    onError: (error) => {
      setIsUploading(false);
      setRejectionMessage("Failed to upload file. Please try again.");
    }
  });
  const uploadToS3 = async ({ url, file }) => {
    try {
      const response = await uploadToS3API(url, file);
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
    } catch (error) {
      throw error;
    }
  };
  const handleFileUpload = (file) => {
    getPresignedUrls(file);
  };
  return /* @__PURE__ */ jsxs("div", { id: "upload-attachments", children: [
    /* @__PURE__ */ jsx("div", { className: "py-0 flex justify-center items-center", children: /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        onClick: open,
        variant: "default",
        size: "default",
        className: "h-7 cursor-pointer px-4 py-1 bg-gray-300 active:scale-95 transition-all duration-300 ease-in-out rounded-none hover:bg-gray-300",
        disabled: isUploading,
        children: [
          /* @__PURE__ */ jsx(PlusIcon, {}),
          advocate_id ? /* @__PURE__ */ jsx("span", { className: "", children: "Change" }) : /* @__PURE__ */ jsx("span", { className: "", children: "Upload" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { ...getRootProps(), className: "hidden", children: /* @__PURE__ */ jsx("input", { ...getInputProps() }) }),
      rejectionMessage && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-2", children: rejectionMessage })
    ] })
  ] });
};
dayjs.extend(isSameOrAfter);
const CreateAdvocate = () => {
  const router = useRouter();
  const { advocate_id, manager_id } = useParams({ strict: false });
  const location = useLocation();
  const stateRef = useRef(null);
  const inputRefs = {
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
    state: useRef(null)
  };
  const shouldUseSingleSelection = location.pathname.includes("/create-manager") || location.pathname.includes("/edit-manager");
  const isEditingManager = location.pathname.includes("/edit-manager");
  const [selectOther, setSelectOther] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(() => {
    return localStorage.getItem("previewImage") || null;
  });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
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
    area_of_interest: [],
    achievements: "",
    location_id: [],
    state: ""
  });
  const { isAdmin } = useUserDetails();
  const displayAadhaar = formatAadhaar(formData.aadhaar);
  const filteredStates = stateOptions.filter(
    (state) => state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );
  const { data: advocateData, isLoading: isAdvocateLoading } = useQuery({
    queryKey: [advocate_id || manager_id],
    queryFn: async () => {
      const response = manager_id ? await singleManagerAPI(manager_id) : await singleAdvocateAPI(advocate_id);
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
        return response.data.data;
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!manager_id || !!advocate_id
  });
  const { isLoading: isLocationsLoading, data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      var _a, _b;
      const response = await getAllLocationsListAPI();
      return Array.isArray((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data) ? (_b = response.data) == null ? void 0 : _b.data : [];
    },
    refetchOnWindowFocus: false
  });
  const { mutate: mutateAddAdvocate, isPending: isLoadingAddAdvocate } = useMutation({
    mutationKey: ["add-advocate"],
    mutationFn: async (formData2) => {
      var _a;
      const processedFormData = { ...formData2 };
      if (shouldUseSingleSelection && formData2.state) {
        const stateName = ((_a = stateOptions.find((state) => state.code === formData2.state)) == null ? void 0 : _a.name) || formData2.state;
        processedFormData.state = stateName;
      }
      const response = shouldUseSingleSelection ? await addManagerAPI(
        deletePayload(processedFormData, [
          "designation",
          "address",
          "profile_pic",
          "bar_affiliations",
          "achievements"
        ])
      ) : await addAdvocateAPI(
        deletePayload(processedFormData, [
          "designation",
          "address",
          "profile_pic",
          "bar_affiliations",
          "achievements"
        ])
      );
      return response == null ? void 0 : response.data;
    },
    onSuccess: async (data) => {
      setErrors({});
      toast.success(
        `${shouldUseSingleSelection ? "Manager" : "Advocate"} Added Successfully`,
        {
          action: {
            label: "\u2715",
            onClick: () => {
              toast.dismiss();
            }
          }
        }
      );
      if (shouldUseSingleSelection) {
        router.navigate({ to: "/managers" });
      } else {
        router.navigate({ to: `/advocates` });
      }
    },
    onError: (error) => {
      var _a, _b, _c;
      if ((error == null ? void 0 : error.status) === 422) {
        setErrors(((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) || {});
        const errorKeys = Object.keys(
          ((_b = error == null ? void 0 : error.data) == null ? void 0 : _b.errData) || {}
        );
        if (errorKeys.length > 0) {
          const ref = (_c = inputRefs[errorKeys[0]]) == null ? void 0 : _c.current;
          if (ref) {
            ref.focus();
          }
        }
      } else {
        toast.error(
          `Failed to Add the ${shouldUseSingleSelection ? "Manager" : "Advocate"}`,
          {
            action: {
              label: "\u2715",
              onClick: () => {
                toast.dismiss();
              }
            }
          }
        );
      }
    }
  });
  const { mutate: mutateUpdateAdvocate, isPending: isLoadingUpdateAdvocate } = useMutation({
    mutationKey: ["Update-advocate"],
    mutationFn: async (data) => {
      var _a;
      if (data.profile_pic) {
        data.profile_pic = extractKeyFromUrl(data.profile_pic);
      }
      if (data.degree_certificate) {
        data.degree_certificate = extractKeyFromUrl(data.degree_certificate);
      }
      if (shouldUseSingleSelection && data.state) {
        const stateName = ((_a = stateOptions.find((state) => state.code === data.state)) == null ? void 0 : _a.name) || data.state;
        data.state = stateName;
      }
      const response = isEditingManager ? await updateManagerAPI({
        payload: deletePayload(data, [
          "designation",
          "address",
          "profile_pic",
          "bar_affiliations",
          "achievements"
        ]),
        manager_id
      }) : await updateAdvocateAPI({
        payload: deletePayload(data, [
          "designation",
          "address",
          "profile_pic",
          "bar_affiliations",
          "achievements"
        ]),
        advocate_id
      });
      return response == null ? void 0 : response.data;
    },
    onSuccess: async (data) => {
      setErrors({});
      toast.success(
        `${isEditingManager ? "Manager" : "Advocate"} Details Updated Successfully`,
        {
          action: {
            label: "\u2715",
            onClick: () => {
              toast.dismiss();
            }
          }
        }
      );
      if (manager_id) {
        router.navigate({ to: "/managers" });
      } else {
        router.navigate({ to: `/advocates` });
      }
    },
    onError: (error) => {
      var _a, _b, _c;
      if ((error == null ? void 0 : error.status) === 422) {
        setErrors(((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) || {});
        const errorKeys = Object.keys(
          ((_b = error == null ? void 0 : error.data) == null ? void 0 : _b.errData) || {}
        );
        if (errorKeys.length > 0) {
          const ref = (_c = inputRefs[errorKeys[0]]) == null ? void 0 : _c.current;
          if (ref) {
            ref.focus();
          }
        }
      } else {
        toast.error(error == null ? void 0 : error.message, {
          action: {
            label: "\u2715",
            onClick: () => {
              toast.dismiss();
            }
          }
        });
      }
    }
  });
  const handleUpdateSubmit = (e) => {
    var _a, _b;
    e.preventDefault();
    const shouldUseSingleSelection2 = location.pathname.includes("/create-manager") || location.pathname.includes("/edit-manager");
    const updatedFormData = {
      ...formData,
      address: ((_a = formData.address) == null ? void 0 : _a.trim()) === "" ? null : formData.address,
      designation: ((_b = formData.designation) == null ? void 0 : _b.trim()) === "" ? null : formData.designation,
      phone: formData.phone ? `+91${formData.phone}` : "",
      location_id: shouldUseSingleSelection2 ? formData.location_id.length > 0 ? formData.location_id[0] : null : formData.location_id
    };
    if (advocate_id || manager_id) {
      mutateUpdateAdvocate({
        ...updatedFormData,
        id: Number(advocate_id || manager_id)
      });
    } else {
      mutateAddAdvocate(updatedFormData);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
    setErrors((prev) => ({ ...prev, [id]: null }));
  };
  const handleFileKeyGenerated = (fileKey) => {
    setFormData((prev) => ({
      ...prev,
      profile_pic: fileKey
    }));
    localStorage.setItem("previewImage", previewImage);
  };
  const handleFileUploads = (fileKey) => {
    setFormData((prev) => ({
      ...prev,
      degree_certificate: fileKey
    }));
  };
  const handleOptionChange = (value) => {
    if (value === "others") {
      setSelectOther(true);
      setFormData({ ...formData, qualification: "" });
    } else {
      setSelectOther(false);
      setFormData({ ...formData, qualification: value });
    }
  };
  const handleRemoveFile = (event) => {
    setFormData((prev) => ({
      ...prev,
      degree_certificate: ""
    }));
  };
  const handleChangeAadhaar = (e) => {
    const value = e.target.value;
    let formattedValue = value.replace(/\D+/g, "");
    formattedValue = formattedValue.slice(0, 12);
    setFormData((prev) => ({
      ...prev,
      aadhaar: formattedValue
    }));
  };
  const handleDateOfBirth = (value) => {
    setFormData((prev) => ({
      ...prev,
      date_of_birth: value ? dayjs(value).format("YYYY-MM-DD") : ""
    }));
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
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
    var _a, _b;
    if (advocateData) {
      setSelectValue(
        advocateData.qualification === !qualifications ? advocateData.qualification : ""
      );
      let locationIds = [];
      if (isEditingManager) {
        if (advocateData.location_id) {
          locationIds = Array.isArray(advocateData.location_id) ? advocateData.location_id : [advocateData.location_id];
        }
      } else {
        locationIds = ((_a = advocateData.advocate_locations) == null ? void 0 : _a.map((loc) => loc.location_id)) || [];
      }
      setFormData({
        first_name: advocateData.first_name || "",
        last_name: advocateData.last_name || "",
        gender: advocateData.gender || "",
        date_of_birth: advocateData.date_of_birth || "",
        email: advocateData.email || "",
        phone: ((_b = advocateData.phone) == null ? void 0 : _b.replace("+91", "")) || "",
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
        state: advocateData.state || ""
      });
      if (shouldUseSingleSelection && advocateData.state) {
        const stateOption = stateOptions.find(
          (s) => s.code === advocateData.state
        );
        setStateSearch((stateOption == null ? void 0 : stateOption.name) || advocateData.state);
      }
    }
  }, [advocateData, shouldUseSingleSelection, isEditingManager]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "relative h-[calc(100%-2px)] overflow-hidden", children: isAdvocateLoading || isLocationsLoading ? /* @__PURE__ */ jsx(
    LoadingComponent,
    {
      loading: isAdvocateLoading || isLocationsLoading,
      className: "bg-white"
    }
  ) : /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs(Card, { className: "w-3/4 bg-white rounded-none z-20 flex flex-col h-[calc(100vh-90px)] border-gray-300", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-scroll p-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdateSubmit, className: "space-y-7", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-normal", children: "Personal Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-5 gap-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "first_name",
                  className: "text-xs text-opacity-80",
                  children: [
                    "First Name",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "first_name",
                  name: "first_name",
                  value: formData.first_name,
                  ref: inputRefs.first_name,
                  onChange: (e) => {
                    let value = e.target.value;
                    value = value.charAt(0).toUpperCase() + value.slice(1);
                    if (/^[A-Za-z_ ]*$/.test(value)) {
                      handleChange({
                        target: { id: e.target.id, value }
                      });
                    }
                  },
                  className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                }
              ),
              errors.first_name && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.first_name[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "last_name",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Last Name",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "last_name",
                  name: "last_name",
                  value: formData.last_name,
                  onChange: (e) => {
                    let value = e.target.value;
                    value = value.charAt(0).toUpperCase() + value.slice(1);
                    if (/^[A-Za-z_ ]*$/.test(value)) {
                      handleChange({
                        target: { id: e.target.id, value }
                      });
                    }
                  },
                  className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                }
              ),
              errors.last_name && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.last_name[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs(Label, { className: "text-xs text-opacity-80", children: [
                "Gender",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs(
                RadioGroup,
                {
                  value: formData.gender || "",
                  ref: inputRefs.gender,
                  onValueChange: (value) => setFormData((prev) => ({
                    ...prev,
                    gender: value
                  })),
                  className: "flex space-x-5",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 ", children: [
                      /* @__PURE__ */ jsx(
                        RadioGroupItem,
                        {
                          value: "MALE",
                          id: "MALE",
                          className: "text-black border-gray-400 cursor-pointer"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Label,
                        {
                          htmlFor: "MALE",
                          className: "text-sm text-opacity-80 cursor-pointer",
                          children: "Male"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsx(
                        RadioGroupItem,
                        {
                          value: "FEMALE",
                          id: "FEMALE",
                          className: "text-black border-gray-400 cursor-pointer"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Label,
                        {
                          htmlFor: "FEMALE",
                          className: "text-sm text-opacity-80 cursor-pointer",
                          children: "Female"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsx(
                        RadioGroupItem,
                        {
                          value: "OTHER",
                          id: "OTHER",
                          className: "text-black border-gray-400 cursor-pointer"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Label,
                        {
                          htmlFor: "OTHER",
                          className: "text-sm text-opacity-80 cursor-pointer",
                          children: "Other"
                        }
                      )
                    ] })
                  ]
                }
              ),
              errors.gender && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs block", children: errors.gender[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "date_of_birth",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Date of Birth",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                DateOfBirthPicker,
                {
                  value: (formData == null ? void 0 : formData.date_of_birth) ? dayjs(
                    formData.date_of_birth,
                    "YYYY-MM-DD"
                  ).toDate() : void 0,
                  onDateSelect: handleDateOfBirth
                }
              ),
              errors.date_of_birth && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.date_of_birth[0] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-normal", children: "Contact Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-5 gap-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "email",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Email",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  value: formData.email,
                  ref: inputRefs.email,
                  onChange: handleChange,
                  className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none !focus:border-0"
                }
              ),
              errors.email && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.email[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "phone",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Phone",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "phone",
                  name: "phone",
                  value: formData.phone,
                  ref: inputRefs.phone,
                  onChange: (e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleChange(e);
                    }
                  },
                  className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                }
              ),
              errors.phone && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.phone[0] })
            ] }),
            shouldUseSingleSelection ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 relative", ref: stateRef, children: [
                /* @__PURE__ */ jsxs(Label, { className: "text-xs text-opacity-80", children: [
                  "State",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    Input,
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
                      className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none pr-20"
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
                isStateOpen && /* @__PURE__ */ jsx("div", { className: "absolute z-50 w-full bg-white border border-gray-200 shadow-lg rounded-sm max-h-48 overflow-y-auto top-full mt-1", children: filteredStates.length > 0 ? filteredStates.map((state) => /* @__PURE__ */ jsxs(
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
                )) : /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-xs text-gray-400", children: "No states found" }) }),
                errors.state && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.state[0] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 pt-1", children: [
                /* @__PURE__ */ jsx(
                  Label,
                  {
                    htmlFor: "address",
                    className: "text-xs text-opacity-80",
                    children: "Address"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "address",
                    name: "address",
                    value: formData.address,
                    ref: inputRefs.address,
                    onChange: handleChange,
                    className: "resize-none rounded-none bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none h-9"
                  }
                ),
                errors.address && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.address[0] })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "address",
                  className: "text-xs text-opacity-80",
                  children: "Address"
                }
              ),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "address",
                  name: "address",
                  value: formData.address,
                  ref: inputRefs.address,
                  onChange: handleChange,
                  className: "resize-none rounded-none bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none h-16"
                }
              ),
              errors.address && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.address[0] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-normal", children: "Professional Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-5 gap-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1  ", children: [
              /* @__PURE__ */ jsxs(Label, { className: "text-xs text-opacity-80", children: [
                "Work Location",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600 ", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                MultiSelectLocations,
                {
                  value: formData.location_id,
                  isAdmin,
                  onValueChange: (value) => setFormData({ ...formData, location_id: value }),
                  locations
                }
              ),
              errors.location_id && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.location_id[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1  ", children: [
              /* @__PURE__ */ jsxs(Label, { className: "text-xs text-opacity-80", children: [
                "Area of Interest",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600 ", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                MultiSelect,
                {
                  value: formData.area_of_interest,
                  onValueChange: (value) => setFormData({
                    ...formData,
                    area_of_interest: value
                  })
                }
              ),
              errors.area_of_interest && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.area_of_interest[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: " flex flex-col ", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 flex flex-col", children: [
                /* @__PURE__ */ jsxs(Label, { className: "text-xs text-opacity-80", children: [
                  "Qualification",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs(
                  RadioGroup,
                  {
                    value: formData.qualification.length > 0 ? qualifications.includes(
                      formData.qualification
                    ) ? formData.qualification : "others" : "",
                    ref: inputRefs.qualification,
                    onValueChange: handleOptionChange,
                    className: "flex",
                    children: [
                      qualifications.map((q) => /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "flex items-center space-x-2",
                          children: [
                            /* @__PURE__ */ jsx(
                              RadioGroupItem,
                              {
                                value: q,
                                id: q,
                                className: "text-black border-gray-400 cursor-pointer"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              Label,
                              {
                                htmlFor: q,
                                className: "text-sm text-opacity-80 cursor-pointer",
                                children: q
                              }
                            )
                          ]
                        },
                        q
                      )),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                        /* @__PURE__ */ jsx(
                          RadioGroupItem,
                          {
                            value: "others",
                            id: "others",
                            className: "text-black border-gray-400 cursor-pointer"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          Label,
                          {
                            htmlFor: "others",
                            className: "text-sm text-opacity-80 cursor-pointer",
                            children: "Others"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "block", children: /* @__PURE__ */ jsx(
                        Input,
                        {
                          className: `rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none ${selectOther || !qualifications.includes(formData.qualification) && formData.qualification ? "visible" : "invisible"} `,
                          value: selectValue || formData.qualification,
                          onChange: (e) => {
                            let value = e.target.value;
                            if (/^[A-Za-z -._]*$/.test(value)) {
                              handleChange({
                                target: { id: e.target.id, value }
                              });
                              setSelectValue(value);
                              setFormData({
                                ...formData,
                                qualification: value
                              });
                            }
                          }
                        }
                      ) })
                    ]
                  }
                ),
                errors.qualification && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.qualification[0] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 mt-2", children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs text-opacity-80 invisible", children: "File Upload" }),
                formData.degree_certificate === "" ? /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
                  CertificateUpload,
                  {
                    onFileKeyGenerated: handleFileUploads
                  }
                ) }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full bg-slate-100 p-2 h-9 rounded-none", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: sliceFilename(
                    formData.degree_certificate && formData.degree_certificate.replace(
                      "nyaya-tech/",
                      ""
                    ),
                    25
                  ) }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleRemoveFile,
                      className: "text-red-500 hover:text-red-700 ml-2 font-semibold cursor-pointer",
                      children: /* @__PURE__ */ jsx(DeleteStrokeIcon, {})
                    }
                  )
                ] }),
                errors.degree_certificate && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.degree_certificate[0] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxs(
                  Label,
                  {
                    htmlFor: "experience",
                    className: "text-xs text-opacity-80",
                    children: [
                      "Experience",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "experience",
                    name: "experience",
                    value: formData.experience,
                    ref: inputRefs.experience,
                    onChange: (e) => {
                      const value = e.target.value;
                      if (/^\d{0,2}$/.test(value)) {
                        handleChange(e);
                      }
                    },
                    className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                  }
                ),
                errors.experience && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.experience[0] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1 mt-1", children: [
                /* @__PURE__ */ jsxs(
                  Label,
                  {
                    htmlFor: "aadhaar",
                    className: "text-xs text-opacity-80",
                    children: [
                      "Aadhaar Number",
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none",
                    id: "aadhaar",
                    name: "aadhaar",
                    value: displayAadhaar,
                    ref: inputRefs.aadhaar,
                    onChange: handleChangeAadhaar
                  }
                ),
                errors.aadhaar && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.aadhaar[0] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "advocate_code",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Advocate Code",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none",
                  id: "advocate_code",
                  value: formData.advocate_code,
                  ref: inputRefs.advocate_code,
                  onChange: (e) => {
                    let value = e.target.value;
                    value = value.toUpperCase();
                    if (/^[A-Za-z0-9 ]*$/.test(value)) {
                      handleChange({
                        target: { id: e.target.id, value }
                      });
                    }
                  }
                }
              ),
              errors.advocate_code && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.advocate_code[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "bar_council_enrollment_id",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Bar Council Enrollment ID",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  className: "rounded-none h-9 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none",
                  id: "bar_council_enrollment_id",
                  value: formData.bar_council_enrollment_id,
                  ref: inputRefs.bar_council_enrollment_id,
                  onChange: (e) => {
                    let value = e.target.value;
                    value = value.toUpperCase();
                    if (/^[A-Za-z0-9 ]*$/.test(value)) {
                      handleChange({
                        target: { id: e.target.id, value }
                      });
                    }
                  }
                }
              ),
              errors.bar_council_enrollment_id && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.bar_council_enrollment_id[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "bar_affliations",
                  className: "text-xs text-opacity-80",
                  children: "Bar Affliations"
                }
              ),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  className: "resize-none rounded-none h-20 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none",
                  id: "bar_affiliations",
                  value: formData.bar_affiliations,
                  ref: inputRefs.bar_affiliations,
                  onChange: handleChange
                }
              ),
              errors.achievements && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.achievements[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1 ", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "achievements",
                  className: "text-xs text-opacity-80",
                  children: "Achievements"
                }
              ),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  className: "rounded-none h-20 resize-none bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none",
                  id: "achievements",
                  name: "achievements",
                  value: formData.achievements,
                  ref: inputRefs.achievements,
                  onChange: handleChange
                }
              ),
              errors.achievements && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.achievements[0] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: " col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxs(
                Label,
                {
                  htmlFor: "bio",
                  className: "text-xs text-opacity-80",
                  children: [
                    "Bio",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-red-600", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "bio",
                  name: "bio",
                  value: (formData == null ? void 0 : formData.bio.charAt(0).toUpperCase()) + (formData == null ? void 0 : formData.bio.slice(1)),
                  ref: inputRefs.bio,
                  onChange: handleChange,
                  className: "resize-none rounded-none h-20 bg-slate-100 focus:border-transparent focus:ring-0 focus:outline-none border-none"
                }
              ),
              errors.bio && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-xs", children: errors.bio[0] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: " p-2 flex gap-5 justify-end", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            className: "bg-white cursor-pointer rounded-none border h-8 px-6 active:scale-95 transition-all duration-300 ease-in-out  border-black text-sm ",
            onClick: () => {
              if (shouldUseSingleSelection) {
                router.navigate({ to: "/managers" });
              } else {
                router.navigate({ to: "/advocates" });
              }
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleUpdateSubmit,
            className: "bg-black text-white cursor-pointer rounded-none h-8 px-6 text-sm active:scale-95 transition-all duration-300 ease-in-out  hover:bg-black/60 hover:text-white",
            disabled: isLoadingAddAdvocate || isLoadingUpdateAdvocate,
            children: isLoadingAddAdvocate || isLoadingUpdateAdvocate ? "Saving..." : advocate_id || manager_id ? "Update" : "Create"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "p-4 border-gray-300 rounded-none bg-white", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 justify-center items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-52 h-52 overflow-hidden", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: previewImage || formData.profile_pic || AdvocateImage,
          className: "object-cover object-center w-full h-full"
        }
      ) }),
      /* @__PURE__ */ jsx(
        ProfileUpload,
        {
          onFileKeyGenerated: handleFileKeyGenerated,
          previewImage,
          setPreviewImage
        }
      )
    ] }) })
  ] }) }) });
};

export { CreateAdvocate as C };
//# sourceMappingURL=index-C2WHoypO.mjs.map
