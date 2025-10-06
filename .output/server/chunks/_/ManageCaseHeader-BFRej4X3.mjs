import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { u as useCaseCompletion } from './index-Bb_5490h.mjs';
import { U as UseContextAPI } from './Provider-DRuE0d-A.mjs';
import { A as ApproveDialog, C as CompleteLogo } from './complete-logo-DwVwh2_J.mjs';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Sparkles, Award, CheckCircle, Scale, X } from 'lucide-react';
import React__default, { useState, useEffect, useRef, useCallback } from 'react';
import { A as ApprovedIcon } from './approved-Icon-D4Mj_64A.mjs';
import { N as NotesCloseIcon } from './notes-close-icon-FqM48RJz.mjs';
import { B as Button, c as cn } from './router-e7zdrxGz.mjs';
import { Drawer as Drawer$1 } from 'vaul';
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent, d as TooltipArrow } from './tooltip-BKF0DBvK.mjs';
import { C as CaseStageStatus, k as caseViewNoteAPI, h as caseViewAddNoteAPI, j as caseUpdateNoteAPI, i as caseViewNoteDeleteAPI, c as caseViewNotesAPI } from './manage-tW0NLyej.mjs';
import { c as getAllTodoCountsAPI } from './notification-kzFgGftV.mjs';
import { s as singleServiceAPI } from './service-1g9dZr4o.mjs';
import { u as useUserDetails } from './useUserPermissions-IrViIWLA.mjs';
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useNavigate, useSearch } from '@tanstack/react-router';
import { toast } from 'sonner';
import { a as uploadDocumentAPI } from './fileUpload-BBm5-XTb.mjs';
import { $ as $fetch } from './fetch-Cpm1bFFM.mjs';
import axios from 'axios';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useDropzone } from 'react-dropzone';
import { D as DefaultUserIcon } from './default-user-EV710LEP.mjs';
import { N as NotesDeleteIcon } from './notes-delete-icon-CyozBLV8.mjs';
import { N as NotesEditIcon } from './notes-edit-icon-B2gT4vHe.mjs';
import { N as NotesHeadIcon } from './notes-head-icon-BuoOTi3l.mjs';
import { N as NotesIconCard, S as SummaryIconCard } from './summary-icon-card-CWzIqgof.mjs';
import { A as Avatar, a as AvatarImage } from './avatar-xL-W5RbG.mjs';
import { I as Input } from './input-CcfBn-WR.mjs';
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetHeader, d as SheetTitle, e as SheetClose } from './sheet-vrO17VYZ.mjs';
import { S as Skeleton } from './skeleton-BAyQx-Zm.mjs';
import { T as Textarea } from './textarea-BfKn0GZN.mjs';
import { u as userStore } from './userDetails-Dbr9T6uw.mjs';
import dayjs from 'dayjs';
import { useStore } from '@tanstack/react-store';
import { L as LoadingComponent } from './Loading-DQypZbMn.mjs';

const calculateChunks = (fileSize) => {
  const MIN_CHUNK_SIZE_BYTES = 5 * 1024 * 1024;
  const MAX_CHUNK_SIZE_BYTES = 20 * 1024 * 1024;
  let chunkSize = MIN_CHUNK_SIZE_BYTES;
  if (fileSize > 0 && fileSize <= 500 * 1024 * 1024) {
    chunkSize = Math.min(15 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (fileSize > 500 * 1024 * 1024 && fileSize <= 1 * 1024 * 1024 * 1024) {
    chunkSize = Math.min(12 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (fileSize > 1 * 1024 * 1024 * 1024 && fileSize <= 2 * 1024 * 1024 * 1024) {
    chunkSize = Math.min(15 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (fileSize > 2 * 1024 * 1024 * 1024 && fileSize <= 3 * 1024 * 1024 * 1024) {
    chunkSize = Math.min(18 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (fileSize > 3 * 1024 * 1024 * 1024 && fileSize <= 4 * 1024 * 1024 * 1024) {
    chunkSize = Math.min(20 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  } else if (fileSize > 4 * 1024 * 1024 * 1024 && fileSize <= 5 * 1024 * 1024 * 1024) {
    chunkSize = Math.min(20 * 1024 * 1024, MAX_CHUNK_SIZE_BYTES);
  }
  const totalCountChunks = Math.ceil(fileSize / chunkSize);
  return { chunkSize, totalChunks: totalCountChunks };
};
const bytesToMB = (bytes) => {
  return bytes / (1024 * 1024);
};
const fileSizeInMB = (fileSize) => {
  return (fileSize / (1024 * 1024)).toFixed(2);
};
const getSubStageTitle = (subStages, subStageCode) => {
  var _a;
  if (!subStageCode) return void 0;
  return (_a = subStages == null ? void 0 : subStages.find((sub) => sub.code === subStageCode)) == null ? void 0 : _a.title;
};
const isSubStageCompleted = (subStages, subStageCode) => {
  var _a;
  if (!subStageCode) return false;
  return ((_a = subStages == null ? void 0 : subStages.find((sub) => sub.code === subStageCode)) == null ? void 0 : _a.status) === "completed";
};
const formatDate = (value, format = "MM-DD-YYYY") => {
  if (!value) return "";
  return dayjs(value).format(format);
};
const SuccessAnimation = ({
  isVisible,
  title,
  message,
  caseNumber,
  onComplete
}) => {
  if (!isVisible) return null;
  React__default.useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, 4e3);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-500 flex items-center justify-center bg-gradient-to-br from-black/80 via-black/90 to-black/95 backdrop-blur-sm",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden", children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: {
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            },
            animate: {
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [null, -100]
            },
            transition: {
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            },
            className: "absolute w-2 h-2 bg-white rounded-full"
          },
          i
        )) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0, opacity: 0, rotateY: 180 },
            animate: { scale: 1, opacity: 1, rotateY: 0 },
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2
            },
            className: "relative bg-white rounded-3xl p-12 text-center max-w-lg mx-4 shadow-2xl border-4 border-gray-100",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  },
                  transition: {
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  },
                  className: "absolute -top-6 -left-6 text-yellow-400",
                  children: /* @__PURE__ */ jsx(Star, { className: "h-12 w-12 fill-current" })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    rotate: -360,
                    scale: [1, 1.2, 1]
                  },
                  transition: {
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, delay: 0.5 }
                  },
                  className: "absolute -top-4 -right-4 text-blue-400",
                  children: /* @__PURE__ */ jsx(Sparkles, { className: "h-10 w-10 fill-current" })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    rotate: 360,
                    y: [-5, 5, -5]
                  },
                  transition: {
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    y: { duration: 2, repeat: Infinity }
                  },
                  className: "absolute -bottom-4 -left-4 text-green-400",
                  children: /* @__PURE__ */ jsx(Award, { className: "h-8 w-8 fill-current" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative mb-8", children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { scale: 0, rotate: -180 },
                    animate: { scale: 1, rotate: 0 },
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.5
                    },
                    className: "relative",
                    children: [
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          animate: {
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.1, 0.3]
                          },
                          transition: {
                            duration: 2,
                            repeat: Infinity
                          },
                          className: "absolute inset-0 bg-green-500 rounded-full blur-xl"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          animate: {
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          },
                          transition: {
                            duration: 3,
                            repeat: Infinity
                          },
                          className: "relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 shadow-2xl",
                          children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-20 w-20 text-white fill-current" })
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: { rotate: 360 },
                    transition: { duration: 8, repeat: Infinity, ease: "linear" },
                    className: "absolute inset-0 flex items-center justify-center",
                    children: /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        animate: {
                          y: [-40, -50, -40],
                          rotate: -360
                        },
                        transition: {
                          y: { duration: 2, repeat: Infinity },
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                        },
                        className: "absolute",
                        children: /* @__PURE__ */ jsx(Scale, { className: "h-8 w-8 text-gray-700" })
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 1, duration: 0.8 },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.h2,
                      {
                        animate: {
                          scale: [1, 1.02, 1]
                        },
                        transition: {
                          duration: 2,
                          repeat: Infinity
                        },
                        className: "text-3xl font-bold text-gray-900 mb-4",
                        children: title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.p,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { delay: 1.3 },
                        className: "text-gray-600 text-lg leading-relaxed mb-6",
                        children: message
                      }
                    ),
                    caseNumber && /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: 1.6, type: "spring" },
                        className: "bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border-2 border-gray-200",
                        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3", children: [
                          /* @__PURE__ */ jsx(
                            motion.div,
                            {
                              animate: { rotate: [0, 10, -10, 0] },
                              transition: { duration: 2, repeat: Infinity },
                              children: /* @__PURE__ */ jsx(Scale, { className: "h-6 w-6 text-gray-700" })
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 font-medium", children: "File ID" }),
                            /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-gray-900", children: [
                              "#",
                              caseNumber
                            ] })
                          ] })
                        ] })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { width: 0 },
                  animate: { width: "100%" },
                  transition: { duration: 4, ease: "linear" },
                  className: "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-b-3xl"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -50 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 2, duration: 0.8 },
                  className: "absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg",
                  children: "\u2713 Completed"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", children: [...Array(50)].map((_, i) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: {
              opacity: 0,
              y: -100,
              x: Math.random() * window.innerWidth,
              rotate: 0
            },
            animate: {
              opacity: [0, 1, 0],
              y: window.innerHeight + 100,
              rotate: 360
            },
            transition: {
              duration: 3,
              delay: Math.random() * 2 + 1,
              ease: "easeOut"
            },
            className: `absolute w-3 h-3 ${i % 4 === 0 ? "bg-yellow-400" : i % 4 === 1 ? "bg-green-400" : i % 4 === 2 ? "bg-blue-400" : "bg-red-400"} rounded-full`
          },
          i
        )) })
      ]
    }
  );
};
const UploadIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "30",
      height: "30",
      viewBox: "0 0 24 24",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M11.5 15.577V6.927L9.17 9.257L8.462 8.539L12 5L15.539 8.539L14.831 9.258L12.5 6.927V15.577H11.5ZM5 19V14.962H6V18H18V14.962H19V19H5Z",
          fill: "currentColor"
        }
      )
    }
  );
};
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(Drawer$1.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Drawer$1.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs(
      Drawer$1.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      ),
      ...props
    }
  );
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Drawer$1.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const handleAPIErrorResponse = async (response) => {
  switch (response == null ? void 0 : response.status) {
    case 422:
      return {
        type: "VALIDATION_ERROR",
        message: response == null ? void 0 : response.message,
        error_data: response == null ? void 0 : response.errors,
        status: response == null ? void 0 : response.status
      };
    case 409:
      return {
        type: "CONFLICT",
        message: response == null ? void 0 : response.message,
        error_data: response == null ? void 0 : response.errors,
        status: response == null ? void 0 : response.status
      };
    case 401:
      return {
        type: "Invalid_Credentials",
        message: response == null ? void 0 : response.message,
        error_data: response == null ? void 0 : response.message,
        status: response == null ? void 0 : response.status
      };
    case 400:
      return {
        type: "BAD_REQUEST",
        message: response == null ? void 0 : response.message,
        error_data: response == null ? void 0 : response.error,
        status: response == null ? void 0 : response.status
      };
    case 403:
      return {
        type: "FORBIDDEN",
        message: response == null ? void 0 : response.message,
        error_data: response == null ? void 0 : response.error,
        status: response == null ? void 0 : response.status
      };
    default:
      return {
        type: "OTHER",
        message: response == null ? void 0 : response.message,
        error_data: response == null ? void 0 : response.error,
        status: response == null ? void 0 : response.status
      };
  }
};
const startUploadMultipartFileAPI = async (body) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/start-multipart-upload`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
  }
};
const getPresignedUrlsForFileAPI = async (body) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/multipart-upload-urls`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
  }
};
const mergeAllChunksAPI = async (body) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/complete-multipart-upload`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
  }
};
const abortUploadingAPI = async (body) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/abort-multipart-upload`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
  }
};
const resumeUploadAPI = async (body) => {
  try {
    const { data, success } = await $fetch.post(
      `/files/incomplete-parts`,
      body
    );
    if (!success) {
      return handleAPIErrorResponse(data);
    }
    return data;
  } catch (err) {
  }
};
const fileUploadAPI = async (payload) => {
  try {
    const response = await $fetch.post(`/files/upload`, payload);
    return response;
  } catch (err) {
    throw err;
  }
};
const DragDropIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("path", { d: "M12.4338 32.2339H9.2337C4.3337 31.8839 2.13379 28.1172 2.13379 24.7672C2.13379 21.4172 4.33372 17.6339 9.15039 17.3006C9.83372 17.2339 10.4337 17.7672 10.4837 18.4672C10.5337 19.1505 10.0171 19.7506 9.31712 19.8006C6.08378 20.0339 4.63379 22.4672 4.63379 24.7839C4.63379 27.1005 6.08378 29.5339 9.31712 29.7672H12.4338C13.1171 29.7672 13.6838 30.3339 13.6838 31.0172C13.6838 31.7005 13.1171 32.2339 12.4338 32.2339Z", fill: "#5F5F5F" }),
    /* @__PURE__ */ jsx("path", { d: "M27.783 32.233C27.7497 32.233 27.733 32.233 27.6997 32.233C27.0164 32.233 26.3831 31.6663 26.3831 30.983C26.3831 30.2663 26.9164 29.733 27.6164 29.733C29.6664 29.733 31.4997 29.0163 32.933 27.733C35.533 25.4663 35.6997 22.1997 34.9997 19.8997C34.2997 17.6163 32.3497 14.9997 28.9497 14.583C28.3997 14.5163 27.9663 14.0997 27.8663 13.5497C27.1996 9.54969 25.0497 6.78301 21.783 5.78301C18.4164 4.73301 14.483 5.76634 12.033 8.33301C9.64965 10.8163 9.09966 14.2997 10.483 18.133C10.7163 18.783 10.3831 19.4997 9.73307 19.733C9.08307 19.9663 8.36637 19.633 8.13304 18.983C6.4497 14.283 7.21639 9.78301 10.2331 6.61635C13.3164 3.38301 18.2664 2.09967 22.5164 3.39967C26.4164 4.59967 29.1663 7.81634 30.1663 12.283C33.5663 13.0497 36.2997 15.633 37.383 19.1997C38.5663 23.083 37.4997 27.083 34.583 29.6164C32.733 31.283 30.3163 32.233 27.783 32.233Z", fill: "#5F5F5F" }),
    /* @__PURE__ */ jsx("path", { d: "M19.9998 37.1335C16.6498 37.1335 13.5165 35.3501 11.7999 32.4668C11.6165 32.1835 11.4332 31.8501 11.2832 31.4835C10.7165 30.3001 10.4165 28.9501 10.4165 27.5501C10.4165 22.2668 14.7165 17.9668 19.9998 17.9668C25.2832 17.9668 29.5832 22.2668 29.5832 27.5501C29.5832 28.9668 29.2832 30.3001 28.6832 31.5335C28.5499 31.8501 28.3665 32.1835 28.1665 32.5001C26.4832 35.3501 23.3498 37.1335 19.9998 37.1335ZM19.9998 20.4668C16.0998 20.4668 12.9165 23.6501 12.9165 27.5501C12.9165 28.5835 13.1332 29.5501 13.5498 30.4335C13.6832 30.7168 13.7998 30.9501 13.9331 31.1668C15.1998 33.3168 17.5165 34.6335 19.9832 34.6335C22.4498 34.6335 24.7665 33.3168 26.0165 31.2001C26.1665 30.9501 26.2999 30.7168 26.3999 30.4835C26.8499 29.5668 27.0665 28.6001 27.0665 27.5668C27.0832 23.6501 23.8998 20.4668 19.9998 20.4668Z", fill: "#5F5F5F" }),
    /* @__PURE__ */ jsx("path", { d: "M19.0497 30.4501C18.733 30.4501 18.4164 30.3334 18.1664 30.0834L16.5163 28.4334C16.033 27.9501 16.033 27.1501 16.5163 26.6667C16.9996 26.1834 17.7996 26.1834 18.283 26.6667L19.083 27.4667L21.7497 25.0001C22.2663 24.5334 23.0497 24.5667 23.5163 25.0667C23.983 25.5667 23.9497 26.3667 23.4497 26.8334L19.8997 30.1167C19.6497 30.3334 19.3497 30.4501 19.0497 30.4501Z", fill: "#5F5F5F" })
  ] });
};
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ProgressPrimitive.Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ProgressPrimitive.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const UploadFiles = ({
  handleFileChange,
  multipleFiles,
  fileProgress,
  fileErrors,
  setMultipleFiles,
  setFileProgress,
  resumeUpload,
  abortFileUpload,
  uploadProgressStart,
  fileTitles,
  setFileTitles,
  selectedCategoryId,
  from,
  setFileErrors,
  startUploading,
  setStartUploading
}) => {
  const [file, setFile] = useState([]);
  const MULTIPART_THRESHOLD = 39558800;
  const allFilesUploaded = multipleFiles.length > 0 && multipleFiles.every((_, index) => fileProgress[index] === 100);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setFileProgress((prevProgress) => {
        const newProgress = { ...prevProgress };
        const currentLength = Object.keys(prevProgress).length;
        acceptedFiles.forEach((file2, index) => {
          const newIndex = currentLength + index;
          newProgress[newIndex] = 0;
        });
        return newProgress;
      });
      handleFileChange(acceptedFiles, false);
      setFileTitles((prev) => [
        ...prev,
        ...Array(acceptedFiles.length).fill("")
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"]
    },
    disabled: startUploading
  });
  const dropzoneClass = startUploading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100 cursor-pointer";
  const removeFileAfterAdding = (index) => {
    if (index !== void 0) {
      const updatedFiles = multipleFiles.filter((_, i) => i !== index);
      const updatedTitles = fileTitles.filter((_, i) => i !== index);
      setFileProgress((prevProgress) => {
        const newProgress = { ...prevProgress };
        delete newProgress[index];
        const shiftedProgress = {};
        Object.keys(newProgress).forEach((key) => {
          const currentIndex = parseInt(key);
          shiftedProgress[currentIndex > index ? currentIndex - 1 : currentIndex] = newProgress[key];
        });
        return shiftedProgress;
      });
      setMultipleFiles(updatedFiles);
      setFileTitles(updatedTitles);
      abortFileUpload(index);
    } else {
      setMultipleFiles([]);
      setFileTitles([]);
      setFileProgress({});
      setFileErrors([]);
      file.forEach((_, i) => abortFileUpload(i));
      setFile([]);
    }
  };
  fileTitles.every(
    (title) => title.trim() !== ""
  );
  return /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white rounded-lg ", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-4  ", children: /* @__PURE__ */ jsxs(
      "div",
      {
        ...getRootProps({
          className: `dropzone border-2  border-dashed border-gray-400 p-6 rounded-md cursor-pointer hover:border-gray-600   ${dropzoneClass}`
        }),
        children: [
          /* @__PURE__ */ jsx("input", { ...getInputProps() }),
          isDragActive ? /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Drop the file here ..." }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-y-2 text-center", children: [
            /* @__PURE__ */ jsx(DragDropIcon, {}),
            /* @__PURE__ */ jsx("p", { className: "text-base font-medium", children: "Choose a file or drag and drop it here" }),
            /* @__PURE__ */ jsx("p", { className: "text-red-600 font-light text-xs flex justify-center items-center", children: "Accept only JPEG, PNG, JPG, WEBP and PDF format files. File size must be less than 50 MB" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 max-h-[calc(100vh-330px)] overflow-auto", children: multipleFiles.map((item, index) => {
      var _a;
      item.size > MULTIPART_THRESHOLD;
      const error = fileErrors.find((error2) => error2.id === index);
      return /* @__PURE__ */ jsxs("div", { className: "flex mb-2 p-2 bg-gray-100 rounded-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 ", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
            item.name.length > 15 ? `${item.name.slice(0, 12)}...` : item.name,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              "(",
              item.type,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Progress,
            {
              value: fileProgress[index],
              className: "my-1 h-2 bg-gray-300"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
              (_a = fileProgress[index]) == null ? void 0 : _a.toFixed(2),
              "%"
            ] }),
            error ? /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs", children: error.reason || "Upload Failed" }) : /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
              bytesToMB(item.size).toFixed(2),
              " MB"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between ", children: [
          /* @__PURE__ */ jsx("div", { className: "flex ", children: fileProgress[index] === 100 ? /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-500 w-5 h-5 mr-2" }) : "" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                removeFileAfterAdding(index), setStartUploading(false);
              },
              className: "ml-2 hover:bg-black  h-fit py-1 bg-black text-white rounded-none px-1 cursor-pointer",
              disabled: allFilesUploaded || !selectedCategoryId && from === "sidebar",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
            }
          ) })
        ] })
      ] }, index);
    }) }),
    !(multipleFiles.length === 0) && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => removeFileAfterAdding(),
          className: "rounded-none h-fit py-1 hover:bg-black bg-black text-white cursor-pointer",
          disabled: allFilesUploaded || startUploading || !selectedCategoryId && from === "sidebar",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            uploadProgressStart();
          },
          disabled: allFilesUploaded || startUploading || !selectedCategoryId && from === "sidebar",
          className: "rounded-none h-fit py-1 hover:bg-black bg-black text-white cursor-pointer",
          children: "Upload"
        }
      )
    ] })
  ] });
};
const MultiPartUploadComponent = ({
  showFileUpload,
  setShowFileUpload,
  from,
  onUploadSuccess
}) => {
  const { service_id } = useParams({ strict: false });
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [abortedFiles, setAbortedFiles] = useState(/* @__PURE__ */ new Set());
  const [fileProgress, setFileProgress] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [fileFormData, setFileFormData] = useState({
    chunkSize: "",
    unit: "MB",
    totalChunksParts: "",
    chunkSizeInBytes: 0
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [uploadFileDetails, setUploadFileDetails] = useState([]);
  const [presignedUrlsMap, setPresignedUrlsMap] = useState({});
  const [etagsMap, setEtagsMap] = useState({});
  const [fileTitles, setFileTitles] = useState(
    Array(multipleFiles.length).fill("")
  );
  const [startUploading, setStartUploading] = useState(false);
  const search = useSearch({ strict: false });
  const stage = search.stage;
  const subStage = search.sub_stage;
  const handleFileChange = async (files) => {
    const newFiles = Array.from(files);
    setMultipleFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setFileProgress((prev) => ({
      ...prev,
      ...Object.fromEntries(
        newFiles.map((_, index) => [index, 0])
      )
    }));
    setFileErrors([]);
  };
  const uploadProgressStart = async () => {
    setStartUploading(true);
    const newFiles = Array.from(multipleFiles);
    for (const [index, file] of newFiles.entries()) {
      if (fileProgress[index] !== 100) {
        try {
          const { chunkSize, totalChunks } = calculateChunks(file.size);
          setFileFormData((prev) => ({
            ...prev,
            chunkSize: chunkSize.toString(),
            totalChunksParts: totalChunks.toString(),
            chunkSizeInBytes: chunkSize
          }));
          if (file.size > 39558800) {
            await startUploadEvent(file, index, chunkSize, totalChunks);
          } else {
            await getPresignedUrls(file, index);
          }
        } catch (error) {
          setFileErrors((prev) => [
            ...prev,
            { file, id: index, reason: error.message }
          ]);
          setStartUploading(false);
        }
      }
    }
  };
  const startUploadEvent = async (file, index, chunkSize, totalChunks) => {
    const MAX_SIZE_MB = 50;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      setFileErrors((prev) => [
        ...prev,
        {
          file,
          id: index,
          reason: `File size exceeds ${MAX_SIZE_MB} MB limit`
        }
      ]);
      return;
    }
    try {
      setStartUploading(true);
      const response = await startUploadMultipartFileAPI({
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_path: file.name,
        case_stage: stage,
        case_sub_stage: subStage
      });
      if (response == null ? void 0 : response.success) {
        const { upload_id, file_key } = response.data;
        setUploadFileDetails((prev) => {
          var _a, _b;
          return {
            ...prev,
            [index]: {
              upload_id,
              file_key: (_a = response.data) == null ? void 0 : _a.file_key,
              file_name: file.name,
              name: file.name,
              path: (_b = response.data) == null ? void 0 : _b.file_key
            }
          };
        });
        await uploadFileIntoChunks(
          upload_id,
          file,
          index,
          file_key,
          chunkSize,
          totalChunks
        );
      } else {
        throw new Error("Failed to start upload");
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: error.message }
      ]);
      setStartUploading(false);
    }
  };
  const fetchPresignedUrls = async (fileIndex, uploadId, key, totalChunks) => {
    var _a;
    try {
      if (presignedUrlsMap[fileIndex]) {
        return presignedUrlsMap[fileIndex];
      }
      const response = await getPresignedUrlsForFileAPI({
        file_key: key,
        upload_id: uploadId,
        parts: totalChunks
      });
      if (((_a = response.data) == null ? void 0 : _a.length) === 0 || !response) {
        throw new Error("Failed to get presigned URLs");
      }
      const presignedUrls = response.data.upload_urls;
      setPresignedUrlsMap((prev) => ({ ...prev, [fileIndex]: presignedUrls }));
      return presignedUrls;
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        {
          file: multipleFiles[fileIndex],
          id: fileIndex,
          reason: error.message
        }
      ]);
      setStartUploading(false);
    }
  };
  const uploadFileIntoChunks = async (uploadId, file, index, key, chunkSize, totalChunks, unuploadedParts, initialProgress) => {
    const etags = [];
    const chunkProgresses = new Array(totalChunks).fill(0);
    try {
      const existingEtags = (unuploadedParts == null ? void 0 : unuploadedParts.length) ? etagsMap[index] || [] : [];
      existingEtags.forEach((part) => {
        chunkProgresses[part.PartNumber - 1] = 1;
      });
      if (initialProgress === 100) {
        for (let i = 0; i < totalChunks; i++) {
          chunkProgresses[i] = 1;
        }
      }
      const initialProgressPercent = chunkProgresses.reduce((sum, progress) => sum + progress, 0) / totalChunks * 100;
      setFileProgress((prev) => ({
        ...prev,
        [index]: parseFloat(initialProgressPercent.toFixed(2))
      }));
      const partsToUpload = unuploadedParts || Array.from({ length: totalChunks }, (_, i) => i + 1);
      const presignedUrls = await fetchPresignedUrls(
        index,
        uploadId,
        key,
        partsToUpload.length
      );
      const uploadPromises = partsToUpload.map(async (partNumber) => {
        const chunkIndex = partNumber - 1;
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const url = presignedUrls[chunkIndex];
        try {
          const { etag } = await uploadChunk(
            url,
            file,
            partNumber,
            start,
            end,
            file.size,
            (partNumber2, chunkProgress) => {
              chunkProgresses[chunkIndex] = chunkProgress;
              const totalLoaded = chunkProgresses.reduce(
                (sum, progress) => sum + progress,
                0
              );
              const overallProgress = totalLoaded / totalChunks * 100;
              setFileProgress((prev) => ({
                ...prev,
                [index]: parseFloat(overallProgress.toFixed(2))
              }));
            }
          );
          etags.push({ ETag: etag, PartNumber: partNumber });
        } catch (error) {
          setFileErrors((prev) => [
            ...prev,
            { file, id: index, reason: error.message }
          ]);
          setStartUploading(false);
        }
      });
      await Promise.all(uploadPromises);
      const allEtags = [...existingEtags, ...etags];
      if (allEtags.length === totalChunks) {
        await mergeFileChunks(uploadId, key, allEtags, index, file);
        setPresignedUrlsMap((prev) => {
          const newMap = { ...prev };
          delete newMap[index];
          return newMap;
        });
        setEtagsMap((prev) => {
          const newMap = { ...prev };
          delete newMap[index];
          return newMap;
        });
      } else {
        setEtagsMap((prev) => ({ ...prev, [index]: allEtags }));
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: error.message }
      ]);
      setStartUploading(false);
    }
  };
  const uploadChunk = async (url, file, partNumber, start, end, totalFileSize, progressCallback) => {
    const chunk = file.slice(start, end);
    const response = await axios.put(url, chunk, {
      headers: {
        "Content-Type": file.type || "application/octet-stream"
      },
      onUploadProgress: (progressEvent) => {
        const { loaded } = progressEvent;
        const chunkProgress = loaded / (end - start);
        progressCallback(partNumber, chunkProgress);
      }
    });
    const etag = response.headers["etag"];
    return { etag };
  };
  const mergeFileChunks = async (uploadId, fileKey, etags, index, file) => {
    const sortedEtags = etags.slice().sort((a, b) => a.PartNumber - b.PartNumber);
    try {
      const response = await mergeAllChunksAPI({
        file_key: fileKey,
        upload_id: uploadId,
        parts: sortedEtags
      });
      if (!response.success) {
        setFileProgress((prev) => ({ ...prev, [index]: 99 }));
        throw new Error("Failed to merge chunks");
      } else {
        setFileProgress((prev) => ({ ...prev, [index]: 100 }));
        const payload = {
          case_id: Number(service_id),
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          key: fileKey,
          case_stage: stage,
          case_sub_stage: subStage
        };
        await uploadDocsMutation.mutate(payload);
        setStartUploading(false);
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        {
          file: { name: fileKey },
          id: index,
          reason: error.message
        }
      ]);
      setStartUploading(false);
    } finally {
    }
  };
  const resumeUploadForMultipart = async (file, index) => {
    var _a, _b, _c, _d;
    let body = {
      upload_id: (_a = uploadFileDetails[index]) == null ? void 0 : _a.upload_id,
      file_key: (_b = uploadFileDetails[index]) == null ? void 0 : _b.file_key,
      parts: +fileFormData.totalChunksParts
    };
    try {
      const response = await resumeUploadAPI(body);
      if (!response.success) {
        throw new Error("Failed to resume upload");
      }
      const unuploadedParts = response.data || [];
      const { chunkSize, totalChunks } = calculateChunks(file.size);
      await uploadFileIntoChunks(
        (_c = uploadFileDetails[index]) == null ? void 0 : _c.upload_id,
        file,
        index,
        (_d = uploadFileDetails[index]) == null ? void 0 : _d.file_key,
        chunkSize,
        totalChunks,
        unuploadedParts,
        fileProgress[index]
      );
    } catch (error) {
      setStartUploading(false);
    }
  };
  const resumeUpload = async (file, index) => {
    let erros = [...fileErrors];
    erros = erros.filter((error) => error.id !== index);
    setFileErrors(erros);
    if (file.size > 39558800) {
      await resumeUploadForMultipart(file, index);
    }
  };
  const abortFileUpload = async (index) => {
    const uploadDetails = uploadFileDetails[index];
    if (!(uploadDetails == null ? void 0 : uploadDetails.upload_id) || !(uploadDetails == null ? void 0 : uploadDetails.file_key)) {
      return;
    }
    const body = {
      upload_id: uploadDetails.upload_id,
      file_key: uploadDetails.file_key
    };
    try {
      const response = await abortUploadingAPI(body);
      if (!response.success) {
        throw new Error("Failed to abort upload");
      }
      onUploadSuccess == null ? void 0 : onUploadSuccess();
      setAbortedFiles((prev) => new Set(prev.add(index)));
      toast.success("File upload aborted successfully");
      setStartUploading(false);
    } catch (error) {
    }
  };
  const getPresignedUrls = async (file, index) => {
    try {
      const payload = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };
      const response = await fileUploadAPI({
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        case_stage: stage,
        case_sub_stage: subStage
      });
      const result = response;
      if (response.status === 200 || response.status === 201) {
        const { upload_id, file_key } = result == null ? void 0 : result.data;
        setUploadFileDetails((prev) => [
          ...prev,
          {
            upload_id,
            file_key,
            file_name: file.name,
            name: file.name,
            path: file.name
          }
        ]);
        await uploadFileToS3(
          result.data.data.target_url,
          file,
          index,
          result.data.data.file_key
        );
      } else {
        throw new Error(result.message || "Failed to generate presigned URL");
      }
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: error.message }
      ]);
      setStartUploading(false);
    }
  };
  const uploadDocsMutation = useMutation({
    mutationFn: async (payload) => {
      var _a, _b;
      try {
        const response = await uploadDocumentAPI(payload);
        if (((_a = response.data) == null ? void 0 : _a.status) === 200 || ((_b = response.data) == null ? void 0 : _b.status) === 201) {
          toast.success("File uploaded successfully");
          return response;
        } else {
          throw new Error("Failed to upload ");
        }
      } catch (error) {
        toast.error("Failed to upload.");
      }
    },
    onSuccess: () => {
      onUploadSuccess == null ? void 0 : onUploadSuccess();
    },
    onError: () => {
    }
  });
  const uploadFileToS3 = async (url, file, index, key) => {
    try {
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type || "application/octet-stream"
        },
        onUploadProgress: (progressEvent) => {
          const chunkProgress = progressEvent.loaded / file.size * 100;
          setFileProgress((prev) => ({
            ...prev,
            [index]: parseFloat(chunkProgress.toFixed(2))
          }));
        }
      });
      const payload = {
        case_id: Number(service_id),
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        key,
        case_stage: stage,
        case_sub_stage: subStage
      };
      await uploadDocsMutation.mutate(payload);
    } catch (error) {
      setFileErrors((prev) => [
        ...prev,
        { file, id: index, reason: error.message }
      ]);
      setStartUploading(false);
    }
  };
  useEffect(() => {
  }, [showFileUpload]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    UploadFiles,
    {
      handleFileChange,
      multipleFiles,
      previewImages,
      fileProgress,
      fileErrors,
      setMultipleFiles,
      setFileFormData,
      fileFormData,
      setFileProgress,
      resumeUpload,
      abortFileUpload,
      abortedFiles,
      uploadProgressStart,
      fileTitles,
      setFileTitles,
      selectedCategoryId,
      setSelectedCategoryId,
      setShowFileUpload,
      from,
      setFileErrors,
      startUploading,
      setStartUploading
    }
  ) });
};
const NotesPlusIcon = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      width: "13",
      height: "12",
      viewBox: "0 0 13 12",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M0.875 6H6.5M6.5 6H12.125M6.5 6V0.375M6.5 6V11.625",
          stroke: "#434343",
          strokeWidth: "1.40625",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
const ServiceCaseHistory = () => {
  const observer = useRef(null);
  const search = useSearch({ strict: false });
  const { service_id } = useParams({ strict: false });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [isEditNotesOpen, setIsEditNotesOpen] = useState(false);
  const [editNoteRecord, setEditNoteRecord] = useState(null);
  const userDetails = useStore(userStore, (state) => state["user"]);
  const userType = userDetails == null ? void 0 : userDetails.id;
  const stage = search.stage;
  const subStage = search.sub_stage;
  const fetchCaseNotes = async ({ pageParam = 1 }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    try {
      if (!service_id) return;
      let queryParams = {};
      queryParams = {
        case_stage: stage,
        case_sub_stage: subStage && encodeURIComponent(subStage),
        types: "SUMMARY"
      };
      const response = await caseViewNotesAPI(service_id, queryParams);
      return {
        data: (_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data) == null ? void 0 : _b.records,
        nextCursor: ((_e = (_d = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.data) == null ? void 0 : _d.pagination_info) == null ? void 0 : _e.next_page) ? ((_h = (_g = (_f = response == null ? void 0 : response.data) == null ? void 0 : _f.data) == null ? void 0 : _g.pagination_info) == null ? void 0 : _h.current_page) + 1 : null,
        prevCursor: ((_k = (_j = (_i = response == null ? void 0 : response.data) == null ? void 0 : _i.data) == null ? void 0 : _j.pagination_info) == null ? void 0 : _k.current_page) !== 1 ? ((_n = (_m = (_l = response == null ? void 0 : response.data) == null ? void 0 : _l.data) == null ? void 0 : _m.pagination_info) == null ? void 0 : _n.current_page) - 1 : null,
        totalRecords: (_q = (_p = (_o = response == null ? void 0 : response.data) == null ? void 0 : _o.data) == null ? void 0 : _p.pagination_info) == null ? void 0 : _q.total_records
      };
    } catch (err) {
      throw new Error("Failed to fetch case notes");
    }
  };
  const {
    data: caseNotes,
    fetchNextPage,
    hasNextPage,
    isFetching: isLoadingCaseNote,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["case-summary", service_id],
    queryFn: fetchCaseNotes,
    getNextPageParam: (lastPage) => {
      var _a;
      return (_a = lastPage == null ? void 0 : lastPage.nextCursor) != null ? _a : null;
    },
    getPreviousPageParam: (firstPage) => {
      var _a;
      return (_a = firstPage == null ? void 0 : firstPage.prevCursor) != null ? _a : null;
    },
    refetchOnWindowFocus: false
  });
  useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  const allRecords = (caseNotes == null ? void 0 : caseNotes.pages.map((e) => e.data).flat()) || [];
  const { mutate: mutateAddNote, isPending: isLoadingAddNote } = useMutation({
    mutationKey: ["add-summary", service_id],
    mutationFn: async (data) => {
      const payload = {
        ...data,
        case_stage: stage,
        case_sub_stage: subStage,
        case_id: Number(service_id),
        type: "SUMMARY"
      };
      const response = await caseViewAddNoteAPI(payload);
      return response;
    },
    onSuccess: async (data) => {
      var _a;
      setNoteTitle("");
      setNoteContent("");
      setNoteError("");
      setTitleError("");
      setIsAddNotesOpen(false);
      toast.success((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.message, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      refetch();
    },
    onError: (error) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      if ((error == null ? void 0 : error.status) == 422) {
        setNoteError((_c = (_b = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) == null ? void 0 : _b.note) == null ? void 0 : _c[0]);
        setTitleError((_f = (_e = (_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errData) == null ? void 0 : _e.title) == null ? void 0 : _f[0]);
      } else if ((error == null ? void 0 : error.status) === 409) {
        (_g = error == null ? void 0 : error.data) == null ? void 0 : _g.message;
      }
      toast.error(
        ((_h = error == null ? void 0 : error.data) == null ? void 0 : _h.message) || (error == null ? void 0 : error.message) || ((_j = (_i = error == null ? void 0 : error.data) == null ? void 0 : _i.data) == null ? void 0 : _j.error),
        {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        }
      );
    }
  });
  const { mutate: mutateDeleteNote, isPending: isLoadingDeleteNote } = useMutation({
    mutationKey: ["delete-summary", service_id],
    mutationFn: async (noteId) => {
      const response = await caseViewNoteDeleteAPI(noteId);
      if (response.status === 200 || response.status === 204) {
        return response == null ? void 0 : response.data;
      } else {
        throw response;
      }
    },
    onSuccess: async () => {
      toast.success("Summary Deleted Successfully", {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      refetch();
    },
    onError: (error) => {
      var _a, _b, _c, _d, _e;
      if ((error == null ? void 0 : error.status) == 422) {
        setNoteError((_c = (_b = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) == null ? void 0 : _b.note) == null ? void 0 : _c[0]);
        const { details } = (_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errors;
      } else if ((error == null ? void 0 : error.status) === 409) {
        (_e = error == null ? void 0 : error.data) == null ? void 0 : _e.message;
      }
    }
  });
  const { mutate: mutateUpdateNote, isPending: isLoadingUpdateNote } = useMutation({
    mutationKey: ["update-summary", service_id],
    mutationFn: async (data) => {
      const response = await caseUpdateNoteAPI({
        ...data,
        noteId: data.noteId,
        payload: {
          case_id: Number(service_id),
          type: "SUMMARY",
          title: data.title,
          note: data.note
        }
      });
      return response;
    },
    onSuccess: async (data) => {
      var _a;
      setNoteTitle("");
      setNoteContent("");
      setNoteError("");
      setTitleError("");
      toast.success((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.message, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setIsEditNotesOpen(false);
      refetch();
    },
    onError: (error) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      if ((error == null ? void 0 : error.status) == 422) {
        setNoteError((_c = (_b = (_a = error == null ? void 0 : error.data) == null ? void 0 : _a.errData) == null ? void 0 : _b.note) == null ? void 0 : _c[0]);
        setTitleError((_f = (_e = (_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errData) == null ? void 0 : _e.title) == null ? void 0 : _f[0]);
        const { details } = (_g = error == null ? void 0 : error.data) == null ? void 0 : _g.errors;
      } else if ((error == null ? void 0 : error.status) === 409) {
        (_h = error == null ? void 0 : error.data) == null ? void 0 : _h.message;
      }
      toast.error(
        ((_i = error == null ? void 0 : error.data) == null ? void 0 : _i.message) || (error == null ? void 0 : error.message) || ((_k = (_j = error == null ? void 0 : error.data) == null ? void 0 : _j.data) == null ? void 0 : _k.error),
        {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        }
      );
    }
  });
  const resetNoteFields = () => {
    setNoteError("");
    setTitleError("");
    setNoteTitle("");
    setNoteContent("");
  };
  const closeNoteForms = () => {
    setIsAddNotesOpen(false);
    setIsEditNotesOpen(false);
    resetNoteFields();
    setNoteError("");
    setTitleError("");
  };
  const handleEditClick = (record) => {
    setIsEditNotesOpen(true);
    setEditNoteRecord(record);
    setNoteTitle(record.title);
    setNoteContent(record.note);
  };
  const handleDeleteNote = (noteId) => {
    mutateDeleteNote(noteId);
  };
  const handleSaveNote = () => {
    if (isAddNotesOpen) {
      mutateAddNote({
        title: noteTitle,
        note: noteContent
      });
    } else if (isEditNotesOpen && editNoteRecord) {
      mutateUpdateNote({
        noteId: editNoteRecord == null ? void 0 : editNoteRecord.id,
        title: noteTitle,
        note: noteContent,
        case_stage: editNoteRecord == null ? void 0 : editNoteRecord.case_stage,
        case_sub_stage: editNoteRecord == null ? void 0 : editNoteRecord.case_sub_stage
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };
  return /* @__PURE__ */ jsxs(
    Sheet,
    {
      open: isNotesOpen,
      onOpenChange: (isOpen) => {
        setIsNotesOpen(isOpen);
        setIsAddNotesOpen(false);
        setIsEditNotesOpen(false);
        setNoteContent("");
        setNoteTitle("");
        setNoteError("");
        setTitleError("");
      },
      children: [
        /* @__PURE__ */ jsx(SheetTrigger, { children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `border-gray-200 px-1 ${blur} bg-gray-100 hover:bg-gray-200   border-x py-1 flex items-center justify-center cursor-pointer`,
              children: /* @__PURE__ */ jsx(SummaryIconCard, { className: "w-6 h-6" })
            }
          ) }),
          /* @__PURE__ */ jsxs(TooltipContent, { className: "bg-black text-white text-xs rounded-none", children: [
            "Case History",
            /* @__PURE__ */ jsx(TooltipArrow, {})
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "bg-white w-4/12 p-2 font-primary ", children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "flex flex-row p-2 pb-4 items-center justify-between border-b border-b-gray-300", children: [
            /* @__PURE__ */ jsxs(SheetTitle, { className: "flex   items-center gap-2  ", children: [
              /* @__PURE__ */ jsx(NotesHeadIcon, { className: "w-7 h-7" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-smd 3xl:text-base text-black", children: "Case History" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              isAddNotesOpen || isEditNotesOpen ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "text-xs text-gray-600 hover:text-black cursor-pointer",
                    onClick: closeNoteForms,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 hover:text-black", children: /* @__PURE__ */ jsx(NotesPlusIcon, { className: "w-3 h-3" }) })
              ] }) : /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-1 cursor-pointer",
                  onClick: () => setIsAddNotesOpen(true),
                  children: [
                    /* @__PURE__ */ jsx(NotesPlusIcon, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs 3xl:text-sm text-[#444] font-medium", children: "New" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                SheetClose,
                {
                  onClick: () => {
                    setIsAddNotesOpen(false);
                    setIsEditNotesOpen(false);
                    setNoteContent("");
                    setNoteTitle("");
                    setNoteError("");
                    setTitleError("");
                  },
                  children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "w-7 h-7 cursor-pointer" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 h-[calc(100vh-70px)] overflow-y-auto", children: [
            isAddNotesOpen && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Title",
                  value: noteTitle.charAt(0).toUpperCase() + noteTitle.slice(1),
                  onChange: (e) => setNoteTitle(e.target.value),
                  className: "border border-black rounded-none text-md font-normal focus:!outline-none"
                }
              ),
              titleError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: titleError }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  placeholder: "Write your summary here...",
                  className: "w-full h-44 p-2 border border-black rounded-none text-md resize-none focus:!outline-none ",
                  value: noteContent.charAt(0).toUpperCase() + noteContent.slice(1),
                  onChange: (e) => setNoteContent(e.target.value),
                  onKeyDown: handleKeyDown
                }
              ),
              noteError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: noteError }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end ", children: /* @__PURE__ */ jsx(
                Button,
                {
                  className: "text-xs bg-black text-white px-8 rounded-none h-8 hover:bg-black cursor-pointer",
                  onClick: handleSaveNote,
                  disabled: isLoadingAddNote,
                  children: isLoadingAddNote ? "Saving..." : "Save"
                }
              ) })
            ] }),
            isEditNotesOpen && editNoteRecord && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  className: "border border-black rounded-none text-md font-normal focus:!outline-none",
                  placeholder: "Title",
                  value: noteTitle,
                  onChange: (e) => setNoteTitle(e.target.value)
                }
              ),
              titleError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: titleError }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  className: "w-full h-44 p-2 border border-black rounded-none text-md resize-none focus:!outline-none ",
                  placeholder: "Write your notes here...",
                  value: noteContent,
                  onChange: (e) => setNoteContent(e.target.value),
                  onKeyDown: handleKeyDown
                }
              ),
              noteError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: noteError }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
                Button,
                {
                  className: "text-xs bg-black text-white px-8 rounded-none h-8 hover:bg-black cursor-pointer",
                  onClick: handleSaveNote,
                  disabled: isLoadingUpdateNote,
                  children: isLoadingUpdateNote ? "Updating..." : "Update"
                }
              ) })
            ] }),
            !isAddNotesOpen && !isEditNotesOpen && /* @__PURE__ */ jsx(Fragment, { children: isLoadingCaseNote ? (
              // Skeleton Loader when data is loading
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [...Array(10)].map((_, index) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 bg-gray-200" }),
                /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-full bg-gray-200" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
                  /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-6 bg-gray-200" }),
                  /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-6 bg-gray-200" })
                ] })
              ] }, index)) })
            ) : allRecords.length > 0 ? allRecords.map((record, index) => {
              var _a, _b, _c, _d, _e, _f;
              return /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
                    /* @__PURE__ */ jsx(Avatar, { className: "flex items-center justify-center h-8 w-8", children: ((_a = record == null ? void 0 : record.created_by) == null ? void 0 : _a.profile_pic) ? /* @__PURE__ */ jsx(
                      AvatarImage,
                      {
                        src: (_b = record == null ? void 0 : record.created_by) == null ? void 0 : _b.profile_pic
                      }
                    ) : /* @__PURE__ */ jsx(DefaultUserIcon, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      (_c = record == null ? void 0 : record.created_by) == null ? void 0 : _c.first_name,
                      " ",
                      (_d = record == null ? void 0 : record.created_by) == null ? void 0 : _d.last_name,
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: (record == null ? void 0 : record.updated_at) === null ? formatDate(record == null ? void 0 : record.created_at) : formatDate(record == null ? void 0 : record.updated_at) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end", children: [
                    ((_e = record == null ? void 0 : record.created_by) == null ? void 0 : _e.id) === userType && /* @__PURE__ */ jsx(
                      Button,
                      {
                        className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                        onClick: () => handleEditClick(record),
                        disabled: isLoadingDeleteNote,
                        children: /* @__PURE__ */ jsx(NotesEditIcon, { className: "w-4 h-4 cursor-pointer" })
                      }
                    ),
                    ((_f = record == null ? void 0 : record.created_by) == null ? void 0 : _f.id) === userType && /* @__PURE__ */ jsx(
                      Button,
                      {
                        className: "bg-transparent px-2 h-fit py-1 cursor-pointer",
                        onClick: () => handleDeleteNote(record == null ? void 0 : record.id),
                        disabled: isLoadingDeleteNote,
                        children: /* @__PURE__ */ jsx(NotesDeleteIcon, { className: "w-4 h-4 cursor-pointer" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1 mt-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm 3xl:text-base text-black opacity-90  font-medium", children: record == null ? void 0 : record.title }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs 3xl:text-sm text-[#444] list-none opacity-80 font-normal ", children: record == null ? void 0 : record.note.split("\n").map((note, index2) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "text-black capitalize text-opacity-90",
                      children: [
                        note.trim(),
                        " "
                      ]
                    },
                    index2
                  )) })
                ] })
              ] }, index);
            }) : /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm h-full flex items-center justify-center", children: "No Case History available" }) })
          ] })
        ] })
      ]
    }
  );
};
const CaseNotes = () => {
  var _a;
  const { service_id } = useParams({ strict: false });
  const search = useSearch({ strict: false });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAddNotesOpen, setIsAddNotesOpen] = useState(false);
  const [editNoteRecord, setEditNoteRecord] = useState(null);
  const stage = search.stage;
  const subStage = search.sub_stage;
  const { refetchCaseNotes, setNotes, notesId, setNotesId } = UseContextAPI();
  const { isFetching } = useQuery({
    queryKey: ["case-note", notesId],
    enabled: !!notesId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      var _a2, _b, _c, _d, _e, _f;
      if (!notesId) return;
      const response = await caseViewNoteAPI(notesId);
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
        setNoteTitle((_b = (_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.data) == null ? void 0 : _b.title);
        setNoteContent((_d = (_c = response == null ? void 0 : response.data) == null ? void 0 : _c.data) == null ? void 0 : _d.note);
        setEditNoteRecord((_e = response == null ? void 0 : response.data) == null ? void 0 : _e.data);
        return (_f = response == null ? void 0 : response.data) == null ? void 0 : _f.data;
      }
    }
  });
  const { mutate: mutateAddNote, isPending: isLoadingAddNote } = useMutation({
    mutationKey: ["add-note", service_id],
    mutationFn: async (data) => {
      let title = data.title;
      if (subStage === "ONBD#ADEC") {
        title = "Case Facts and Opinion";
      } else if (subStage === "TRPH#JUDG") {
        title = "Judgement & Further Process";
      }
      const payload = {
        ...data,
        title,
        case_stage: stage,
        case_sub_stage: subStage && subStage,
        case_id: Number(service_id),
        type: "NOTE"
      };
      const response = await caseViewAddNoteAPI(payload);
      return response;
    },
    onSuccess: async (data) => {
      var _a2;
      setNoteTitle("");
      setNoteContent("");
      setNoteError("");
      setTitleError("");
      setIsAddNotesOpen(false);
      toast.success((_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.message, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      setIsNotesOpen(false);
      refetchCaseNotes();
    },
    onError: (error) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
      if ((error == null ? void 0 : error.status) == 422) {
        setNoteError((_c = (_b = (_a2 = error == null ? void 0 : error.data) == null ? void 0 : _a2.errData) == null ? void 0 : _b.note) == null ? void 0 : _c[0]);
        setTitleError((_f = (_e = (_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errData) == null ? void 0 : _e.title) == null ? void 0 : _f[0]);
      }
      toast.error(
        ((_g = error == null ? void 0 : error.data) == null ? void 0 : _g.message) || (error == null ? void 0 : error.message) || ((_i = (_h = error == null ? void 0 : error.data) == null ? void 0 : _h.data) == null ? void 0 : _i.error),
        {
          action: {
            label: "\u2715",
            onClick: () => toast.dismiss()
          }
        }
      );
    }
  });
  const { mutate: mutateUpdateNote, isPending: isLoadingUpdateNote } = useMutation({
    mutationKey: ["update-note", service_id],
    mutationFn: async (data) => {
      const response = await caseUpdateNoteAPI({
        ...data,
        noteId: data.noteId,
        payload: {
          case_id: Number(service_id),
          type: "NOTE",
          title: data.title,
          note: data.note
        }
      });
      return response;
    },
    onSuccess: async (data) => {
      var _a2;
      setNoteTitle("");
      setNoteContent("");
      setNoteError("");
      setTitleError("");
      setNotesId(null);
      toast.success((_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.message, {
        action: {
          label: "\u2715",
          onClick: () => toast.dismiss()
        }
      });
      refetchCaseNotes();
      setNotes(null);
    },
    onError: (error) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      if ((error == null ? void 0 : error.status) == 422) {
        setNoteError((_c = (_b = (_a2 = error == null ? void 0 : error.data) == null ? void 0 : _a2.errData) == null ? void 0 : _b.note) == null ? void 0 : _c[0]);
        setTitleError((_f = (_e = (_d = error == null ? void 0 : error.data) == null ? void 0 : _d.errData) == null ? void 0 : _e.title) == null ? void 0 : _f[0]);
      } else if ((error == null ? void 0 : error.status) === 409) {
        (_g = error == null ? void 0 : error.data) == null ? void 0 : _g.message;
      }
      toast.error(
        ((_h = error == null ? void 0 : error.data) == null ? void 0 : _h.message) || (error == null ? void 0 : error.message) || ((_j = (_i = error == null ? void 0 : error.data) == null ? void 0 : _i.data) == null ? void 0 : _j.error)
      );
    }
  });
  const handleSaveNote = () => {
    if (!!notesId) {
      mutateUpdateNote({
        noteId: editNoteRecord.id,
        title: noteTitle,
        note: noteContent,
        case_stage: editNoteRecord.case_stage,
        case_sub_stage: editNoteRecord.case_sub_stage
      });
    } else {
      mutateAddNote({
        title: noteTitle,
        note: noteContent
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };
  return /* @__PURE__ */ jsxs(
    Sheet,
    {
      open: isNotesOpen || !!notesId,
      onOpenChange: (isOpen) => {
        setIsNotesOpen(isOpen);
        setIsAddNotesOpen(!!!notesId && isOpen);
        setNoteContent("");
        setNoteTitle("");
        setNoteError("");
        setTitleError("");
        setNotesId(null);
      },
      children: [
        /* @__PURE__ */ jsx(SheetTrigger, { children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `border-gray-200 px-1 bg-gray-100 [&_svg]:size-6 hover:bg-gray-200 border-x py-1 flex items-center justify-center cursor-pointer`,
              onClick: () => setIsAddNotesOpen(true),
              children: /* @__PURE__ */ jsx(NotesIconCard, {})
            }
          ) }),
          /* @__PURE__ */ jsxs(TooltipContent, { className: "bg-black text-white text-xs rounded-none", children: [
            "Notes",
            /* @__PURE__ */ jsx(TooltipArrow, {})
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "bg-white w-4/12 p-2 font-primary", children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "flex flex-row p-2 pb-4 items-center justify-between border-b border-gray-300", children: [
            /* @__PURE__ */ jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(NotesHeadIcon, { className: "w-7 h-7" }),
              /* @__PURE__ */ jsx("span", { className: "font-normal text-smd 3xl:text-base text-black ", children: "Notes" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-6 cursor-pointer", children: /* @__PURE__ */ jsx(
              SheetClose,
              {
                onClick: () => {
                  setIsAddNotesOpen(false);
                  setNoteContent("");
                  setNoteTitle("");
                  setNoteError("");
                  setTitleError("");
                },
                children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "w-7 h-7 cursor-pointer" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2 h-[calc(100vh-70px)] overflow-y-auto", children: [
            isAddNotesOpen && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Title",
                  value: subStage === "ONBD#ADEC" ? "Case Facts and Opinion" : subStage === "TRPH#JUDG" ? "Judgement & Further Process" : ((_a = noteTitle == null ? void 0 : noteTitle.charAt(0)) == null ? void 0 : _a.toUpperCase()) + (noteTitle == null ? void 0 : noteTitle.slice(1)),
                  disabled: subStage === "ONBD#ADEC" || subStage === "TRPH#JUDG",
                  onChange: (e) => setNoteTitle(e.target.value),
                  className: "border border-gray-300 rounded-none text-md font-normal focus:!outline-none"
                }
              ),
              titleError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: titleError }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  placeholder: "Write your notes here...",
                  className: "w-full h-44 p-2 border border-gray-300 rounded-none text-md resize-none focus:!outline-none",
                  value: noteContent.charAt(0).toUpperCase() + noteContent.slice(1),
                  onChange: (e) => setNoteContent(e.target.value),
                  onKeyDown: handleKeyDown
                }
              ),
              noteError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: noteError }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
                Button,
                {
                  className: "text-xs bg-black text-white cursor-pointer px-8 rounded-none h-8 hover:bg-black",
                  onClick: handleSaveNote,
                  disabled: isLoadingAddNote,
                  children: isLoadingAddNote ? "Saving..." : "Save"
                }
              ) })
            ] }),
            !!notesId && /* @__PURE__ */ jsx("div", { className: "relative h-full", children: isFetching ? /* @__PURE__ */ jsx(LoadingComponent, { loading: isFetching }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  className: "border border-gray-300 rounded-none text-md font-normal focus:!outline-none",
                  placeholder: "Title",
                  value: noteTitle,
                  onChange: (e) => setNoteTitle(e.target.value)
                }
              ),
              titleError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: titleError }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  className: "w-full h-44 p-2 border border-gray-300 rounded-none text-md resize-none focus:!outline-none",
                  placeholder: "Write your notes here...",
                  value: noteContent,
                  onChange: (e) => setNoteContent(e.target.value),
                  onKeyDown: handleKeyDown
                }
              ),
              noteError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: noteError }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
                Button,
                {
                  className: "text-xs bg-black text-white px-8 rounded-none h-8 hover:bg-black",
                  onClick: handleSaveNote,
                  disabled: isLoadingUpdateNote,
                  children: isLoadingUpdateNote ? "Updating..." : "Update"
                }
              ) })
            ] }) })
          ] })
        ] })
      ]
    }
  );
};
const ManageCaseHeader = ({
  showActionButton,
  caseStage,
  caseSubStage,
  blur: blur2,
  showUploadButton = true,
  showNoteButton = true,
  showSummaryButton = true
}) => {
  const { service_id } = useParams({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const [showDemoSuccess, setShowDemoSuccess] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isUser } = useUserDetails();
  const { completeSubStage } = useCaseCompletion();
  const {
    caseStagesData,
    caseStagesIsLoading,
    getCaseStagesRefetch,
    getAllDocsRefetch,
    serviceData
  } = UseContextAPI();
  const subStage = search.sub_stage;
  const isLegalOpinion = (serviceData == null ? void 0 : serviceData.service_type) === "Legal opinion";
  const isCurrentStageCompleted = isSubStageCompleted(
    caseStagesData == null ? void 0 : caseStagesData.sub_stages,
    subStage
  );
  const subStageTitle = getSubStageTitle(caseStagesData == null ? void 0 : caseStagesData.sub_stages, subStage);
  const shouldShowCaseSummary = !isCurrentStageCompleted && showSummaryButton && !isUser() && !isLegalOpinion;
  const { data: singleCaseDetails, refetch: refetchSingleCaseDetails } = useQuery({
    queryKey: ["single-service-details", service_id],
    enabled: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        if (!service_id) return;
        const response = await singleServiceAPI(service_id);
        if (response.status === 200 || response.status === 201) {
          const { data } = response == null ? void 0 : response.data;
          return data;
        }
      } catch {
        throw new Error("Failed to fetch case data");
      }
    }
  });
  const { refetch: refetchTodoCount } = useQuery({
    queryKey: ["TodoCounts", service_id],
    queryFn: async () => {
      var _a, _b;
      const response = await getAllTodoCountsAPI({ case_id: service_id });
      return ((_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data) == null ? void 0 : _b.count) || 0;
    },
    enabled: false,
    refetchOnWindowFocus: false
  });
  const { mutateAsync: mutateCaseStageStatus, isPending: isUpdateCaseStage } = useMutation({
    mutationFn: async () => {
      const payload = {
        case_stage: caseStage,
        case_sub_stage: caseSubStage
      };
      const response = await CaseStageStatus(service_id, payload);
      if ((response == null ? void 0 : response.status) === 200 || (response == null ? void 0 : response.status) === 201) {
        return response == null ? void 0 : response.data;
      }
    },
    onSuccess: async () => {
      var _a, _b;
      const updatedStages = await getCaseStagesRefetch();
      refetchSingleCaseDetails();
      refetchTodoCount();
      completeSubStage(subStage);
      if ((_b = (_a = updatedStages == null ? void 0 : updatedStages.data) == null ? void 0 : _a.stages) == null ? void 0 : _b.every(
        (s) => s.status === "completed"
      )) {
        setShowDemoSuccess(true);
      }
    }
  });
  const handleCompleted = () => {
    toast.promise(mutateCaseStageStatus(), {
      loading: "Stage mark as complete...",
      success: "Stage marked as completed",
      error: "Stage marked as incomplete",
      action: {
        label: "\u2715",
        onClick: () => toast.dismiss()
      }
    });
    setOpenComplete(false);
  };
  const handleUploadSuccess = () => {
    setIsDrawerOpen(false);
    getAllDocsRefetch();
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-2  border-b border-gray-200", children: [
    /* @__PURE__ */ jsx(
      "h6",
      {
        className: `text-black text-md 3xl:text-lg font-normal capitalize ${blur2} `,
        children: subStageTitle
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex  items-center gap-2 pl-2  ", children: [
      showActionButton && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => setOpenComplete(true),
            className: `flex items-center text-xs w-36 justify-center gap-2 ${blur2} active:scale-95 ease-in-out transition-all duration-300 text-white h-7 rounded-none ${isCurrentStageCompleted ? "bg-green-700 pointer-events-none" : "bg-black hover:bg-black/60"}`,
            disabled: isUpdateCaseStage,
            children: [
              isCurrentStageCompleted ? "Completed" : "Mark as complete",
              isCurrentStageCompleted && /* @__PURE__ */ jsx(ApprovedIcon, {})
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          ApproveDialog,
          {
            icon: /* @__PURE__ */ jsx(CompleteLogo, {}),
            open: openComplete,
            onOpenChange: setOpenComplete,
            title: "Complete",
            message: "Ensure all details are reviewed before marking this step as\r\n                    completed.",
            onCancel: () => setOpenComplete(false),
            onConfirm: handleCompleted,
            disabled: caseStagesIsLoading
          }
        )
      ] }),
      !isCurrentStageCompleted && showUploadButton && search.sub_stage !== "FIUP#UPAF" && /* @__PURE__ */ jsxs(
        Drawer,
        {
          open: isDrawerOpen,
          onOpenChange: setIsDrawerOpen,
          direction: "right",
          children: [
            /* @__PURE__ */ jsx(DrawerTrigger, { children: /* @__PURE__ */ jsx(
              "span",
              {
                className: ` px-1 py-1 -mt-0.5 ml-3  ${blur2}  bg-gray-100 hover:bg-gray-200  flex items-center group justify-center cursor-pointer`,
                children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, { className: "cursor-pointer", children: /* @__PURE__ */ jsx(UploadIcon, { className: "w-6 h-6 " }) }),
                  /* @__PURE__ */ jsxs(TooltipContent, { className: "bg-black text-xs text-white rounded-none", children: [
                    "Upload a file",
                    /* @__PURE__ */ jsx(TooltipArrow, {})
                  ] })
                ] }) })
              }
            ) }),
            /* @__PURE__ */ jsxs(
              DrawerContent,
              {
                className: cn(
                  "fixed inset-y-0  inset-x-[auto_0] right-0 w-4/12 h-full  shadow-lg bg-white mt-0 rounded-none font-primary [>div]:none "
                ),
                children: [
                  /* @__PURE__ */ jsxs(DrawerHeader, { className: "flex  ", children: [
                    /* @__PURE__ */ jsx(DrawerTitle, { className: "flex gap-2  " }),
                    /* @__PURE__ */ jsxs("div", { className: "flex !justify-between gap-6", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex  gap-1" }),
                      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(DrawerClose, { children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "w-7 h-7 cursor-pointer" }) }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    MultiPartUploadComponent,
                    {
                      onUploadSuccess: handleUploadSuccess
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      !isCurrentStageCompleted && showNoteButton && !isUser() && /* @__PURE__ */ jsx(CaseNotes, {}),
      shouldShowCaseSummary && /* @__PURE__ */ jsx(ServiceCaseHistory, {})
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
      SuccessAnimation,
      {
        isVisible: showDemoSuccess,
        title: "Case Completed Successfully!",
        message: `All stages for case ${singleCaseDetails == null ? void 0 : singleCaseDetails.temp_id} are now completed.`,
        caseNumber: singleCaseDetails == null ? void 0 : singleCaseDetails.temp_id,
        onComplete: () => navigate({ to: isLegalOpinion ? `/legal-opinion` : `/litigations` })
      }
    ) })
  ] });
};

export { Drawer as D, ManageCaseHeader as M, fileSizeInMB as a, DrawerTrigger as b, DrawerContent as c, DrawerClose as d, formatDate as f, getSubStageTitle as g, isSubStageCompleted as i };
//# sourceMappingURL=ManageCaseHeader-BFRej4X3.mjs.map
