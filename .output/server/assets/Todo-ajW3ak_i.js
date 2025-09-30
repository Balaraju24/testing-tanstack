import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { c as getAllTodoCountsAPI, t as todoMarkAsReadAPI, d as getAllTodoAPI } from "./notification-kzFgGftV.js";
import { l as labelStage, a as labelSubStages } from "./statusConstants-t7T05Rlh.js";
import { f as formatDateWithTime } from "./manage-CWSyPq63.js";
import { u as useUserDetails } from "./useUserPermissions-IrViIWLA.js";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useRef, useState, useCallback, useEffect } from "react";
import { N as NotesCloseIcon } from "./notes-close-icon-FqM48RJz.js";
import { T as TodoIcon } from "./todo-icon-DEoezyPT.js";
import { B as Button } from "./router-o2MrkizZ.js";
import { S as Sheet, e as SheetTrigger, a as SheetContent, b as SheetHeader, c as SheetTitle, f as SheetClose } from "./sheet-BXmbu-1p.js";
import { S as Skeleton } from "./skeleton-CElu2WzA.js";
function NoTasks() {
  return /* @__PURE__ */ jsxs("svg", { width: "241", height: "160", viewBox: "0 0 241 160", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("path", { d: "M93.457 68.4319V35.9039C93.457 28.9599 99.0861 23.3308 106.03 23.3308H168.894C175.838 23.3308 181.467 28.9599 181.467 35.9039V123.914C181.467 130.858 175.838 136.487 168.894 136.487H134.232", stroke: "#E1E4E5", strokeWidth: "1.31147" }),
    /* @__PURE__ */ jsx("path", { d: "M162.102 38.6018H137.434M162.102 69.2901H137.434M162.102 54.0194H137.434M162.102 84.8546H137.434M162.102 100.126H137.434M162.102 115.69H137.434", stroke: "#E1E4E5", strokeWidth: "4.04907", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M129.151 49.8867C129.151 42.2819 122.986 36.1169 115.381 36.1169C107.776 36.1169 101.611 42.2819 101.611 49.8867C101.611 57.4915 107.776 63.6564 115.381 63.6564C122.986 63.6564 129.151 57.4915 129.151 49.8867Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M119.857 47.4116L113.852 53.3455L110.25 49.7852", stroke: "white", strokeWidth: "2.7432", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M109.235 90.3498V83.489C109.235 79.6983 106.161 76.6282 102.365 76.6282H87.4302C83.6347 76.6282 80.5605 79.6983 80.5605 83.489V90.3498", stroke: "black", strokeWidth: "4.64133", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M118.928 135.054H70.7858C66.9858 135.054 63.9082 131.976 63.9082 128.176V104.437L82.0767 116.427L82.0786 116.428C83.6954 117.496 85.5385 118.173 87.4621 118.405C88.9495 120.691 91.5271 122.203 94.4578 122.203H94.9789C97.8957 122.203 100.463 120.706 101.953 118.438C103.983 118.242 105.934 117.551 107.636 116.428L107.638 116.427L125.806 104.437V128.176C125.806 131.976 122.728 135.054 118.928 135.054ZM88.0167 108.565C89.5463 106.708 91.8637 105.523 94.4578 105.523H94.9789C97.6058 105.523 99.949 106.738 101.478 108.636C101.755 108.56 102.018 108.44 102.257 108.282L102.259 108.281L124.694 93.4754C123.467 91.5933 121.344 90.3499 118.928 90.3499H70.7858C68.3703 90.3499 66.2466 91.5933 65.0199 93.4757L87.4549 108.281L87.4567 108.282C87.6327 108.398 87.8207 108.493 88.0167 108.565Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M63.9084 104.437L65.1866 102.501C64.8368 102.269 64.431 102.138 64.0123 102.119C63.5935 102.1 63.1775 102.195 62.8084 102.393C62.4393 102.592 62.1309 102.887 61.916 103.247C61.7011 103.607 61.5877 104.018 61.5879 104.437H63.9084ZM82.077 116.427L83.3559 114.49L83.3551 114.49L82.077 116.427ZM82.0788 116.428L80.7999 118.364H80.8002L82.0788 116.428ZM87.4623 118.405L89.4076 117.14C89.2226 116.855 88.9776 116.615 88.6897 116.436C88.4017 116.256 88.078 116.142 87.7412 116.101L87.4623 118.405ZM101.953 118.438L101.73 116.128C101.385 116.161 101.052 116.271 100.755 116.451C100.458 116.63 100.205 116.873 100.014 117.163L101.953 118.438ZM107.636 116.428L108.915 118.364L108.916 118.363L107.636 116.428ZM107.638 116.427L106.36 114.49L106.358 114.491L107.638 116.427ZM125.806 104.437H128.127C128.127 104.018 128.013 103.607 127.798 103.247C127.583 102.887 127.275 102.592 126.906 102.394C126.537 102.195 126.121 102.1 125.702 102.119C125.284 102.138 124.878 102.269 124.528 102.5L125.806 104.437ZM88.017 108.565L87.2135 110.742C87.6653 110.909 88.1579 110.931 88.6228 110.805C89.0878 110.679 89.502 110.412 89.8082 110.04L88.017 108.565ZM101.478 108.636L99.6706 110.091C99.9544 110.444 100.335 110.706 100.766 110.844C101.196 110.983 101.658 110.993 102.095 110.873L101.478 108.636ZM102.257 108.282L100.98 106.344L100.979 106.345L102.257 108.282ZM102.259 108.281L103.537 110.217H103.537L102.259 108.281ZM124.695 93.4754L125.973 95.4125C126.484 95.0747 126.842 94.5481 126.966 93.9477C127.091 93.3473 126.973 92.722 126.639 92.2082L124.695 93.4754ZM65.0202 93.4757L63.0759 92.2085C62.7411 92.7222 62.6233 93.3476 62.7481 93.9479C62.8729 94.5482 63.2303 95.0748 63.742 95.4125L65.0202 93.4757ZM87.4551 108.281L86.177 110.217L86.1778 110.218L87.4551 108.281ZM87.457 108.282L88.7362 106.345L88.7346 106.344L87.457 108.282ZM70.786 137.375H118.929V132.733H70.786V137.375ZM61.5879 128.176C61.5879 133.258 65.7044 137.375 70.786 137.375V132.733C68.2676 132.733 66.229 130.695 66.229 128.176H61.5879ZM61.5879 104.437V128.176H66.229V104.437H61.5879ZM83.3551 114.49L65.1866 102.501L62.6303 106.374L80.7988 118.363L83.3551 114.49ZM83.3578 114.491L83.3559 114.49L80.798 118.363L80.7999 118.364L83.3578 114.491ZM87.7412 116.101C86.1749 115.912 84.674 115.361 83.3575 114.491L80.8002 118.364C82.7173 119.63 84.9027 120.433 87.1836 120.709L87.7412 116.101ZM94.458 119.882C92.3452 119.882 90.485 118.795 89.4076 117.14L85.5172 119.671C87.4146 122.587 90.7095 124.523 94.458 124.523V119.882ZM94.9791 119.882H94.458V124.523H94.9791V119.882ZM100.014 117.163C98.9346 118.806 97.082 119.882 94.9791 119.882V124.523C98.7098 124.523 101.991 122.605 103.893 119.712L100.014 117.163ZM106.357 114.491C104.972 115.406 103.383 115.968 101.73 116.128L102.177 120.747C104.583 120.515 106.897 119.697 108.915 118.364L106.357 114.491ZM106.358 114.491L106.356 114.492L108.916 118.363L108.917 118.362L106.358 114.491ZM124.528 102.5L106.36 114.49L108.916 118.363L127.084 106.374L124.528 102.5ZM128.127 128.176V104.437H123.486V128.176H128.127ZM118.929 137.375C124.01 137.375 128.127 133.258 128.127 128.176H123.486C123.486 130.695 121.447 132.733 118.929 132.733V137.375ZM89.8082 110.04C90.9159 108.695 92.5866 107.844 94.458 107.844V103.203C91.1412 103.203 88.177 104.72 86.2255 107.09L89.8082 110.04ZM94.458 107.844H94.9791V103.203H94.458V107.844ZM94.9791 107.844C96.874 107.844 98.5634 108.717 99.6706 110.091L103.285 107.18C101.335 104.759 98.338 103.203 94.9791 103.203V107.844ZM100.979 106.345C100.942 106.369 100.903 106.387 100.861 106.399L102.095 110.873C102.607 110.732 103.093 110.511 103.536 110.218L100.979 106.345ZM100.981 106.343L100.98 106.344L103.535 110.219L103.537 110.217L100.981 106.343ZM123.416 91.5386L100.981 106.343L103.537 110.217L125.973 95.4125L123.416 91.5386ZM118.929 92.6704C120.528 92.6704 121.934 93.4904 122.751 94.7426L126.639 92.2082C125.001 89.6965 122.161 88.0293 118.929 88.0293V92.6704ZM70.786 92.6704H118.929V88.0293H70.786V92.6704ZM66.9642 94.7426C67.7804 93.4904 69.1871 92.6704 70.786 92.6704V88.0293C67.554 88.0293 64.7132 89.6965 63.0759 92.2085L66.9642 94.7426ZM88.7332 106.343L66.2983 91.5386L63.742 95.4125L86.177 110.217L88.7332 106.343ZM88.7346 106.344L88.7327 106.343L86.1778 110.218L86.1796 110.219L88.7346 106.344ZM88.8204 106.388C88.7908 106.377 88.7625 106.363 88.7362 106.345L86.178 110.218C86.5019 110.432 86.8493 110.608 87.2135 110.742L88.8204 106.388Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M72.549 75.035H71.6848C71.4757 75.035 71.3074 75.2052 71.3074 75.4121V76.2764C71.3074 76.4854 71.4776 76.6537 71.6848 76.6537H72.549C72.6489 76.6533 72.7447 76.6134 72.8153 76.5427C72.8859 76.472 72.9257 76.3763 72.9261 76.2764V75.4121C72.9262 75.3625 72.9165 75.3135 72.8976 75.2677C72.8787 75.2219 72.8509 75.1803 72.8159 75.1452C72.7808 75.1102 72.7392 75.0824 72.6934 75.0635C72.6477 75.0446 72.5986 75.0349 72.549 75.035ZM69.552 75.035H68.688C68.588 75.0354 68.4923 75.0752 68.4216 75.1458C68.3509 75.2165 68.311 75.3122 68.3106 75.4121V76.2764C68.3106 76.4854 68.4808 76.6537 68.688 76.6537H69.552C69.6519 76.6533 69.7477 76.6135 69.8184 76.5428C69.8891 76.4721 69.9289 76.3763 69.9293 76.2764V75.4121C69.9289 75.3122 69.889 75.2165 69.8183 75.1458C69.7476 75.0752 69.6519 75.0354 69.552 75.035ZM66.5541 75.035H65.6898C65.5899 75.0354 65.4942 75.0752 65.4235 75.1458C65.3528 75.2165 65.3129 75.3122 65.3125 75.4121V76.2764C65.3125 76.4854 65.4826 76.6537 65.6898 76.6537H66.5541C66.654 76.6533 66.7497 76.6134 66.8203 76.5427C66.891 76.472 66.9308 76.3763 66.9312 76.2764V75.4121C66.9313 75.3625 66.9216 75.3135 66.9027 75.2677C66.8838 75.2219 66.856 75.1803 66.821 75.1452C66.7859 75.1102 66.7443 75.0824 66.6985 75.0635C66.6527 75.0446 66.6036 75.0349 66.5541 75.035ZM63.5578 75.035H62.6938C62.5939 75.0354 62.4982 75.0752 62.4275 75.1458C62.3568 75.2165 62.3169 75.3122 62.3165 75.4121V76.2764C62.3165 76.4854 62.4866 76.6537 62.6938 76.6537H63.5578C63.7669 76.6537 63.9368 76.4836 63.9368 76.2764V75.4121C63.9356 75.3121 63.8953 75.2166 63.8244 75.146C63.7536 75.0755 63.6578 75.0356 63.5578 75.035ZM60.5616 75.035H59.6976C59.4885 75.035 59.3184 75.2052 59.3184 75.4121V76.2764C59.3184 76.4854 59.4885 76.6537 59.6976 76.6537H60.5616C60.6615 76.6533 60.7573 76.6135 60.828 76.5428C60.8987 76.4721 60.9385 76.3763 60.9389 76.2764V75.4121C60.9385 75.3122 60.8986 75.2165 60.8279 75.1458C60.7572 75.0752 60.6615 75.0354 60.5616 75.035ZM69.4432 78.3025H68.5789C68.479 78.3028 68.3832 78.3427 68.3126 78.4133C68.2419 78.4839 68.202 78.5796 68.2016 78.6796V79.5454C68.2019 79.6454 68.2418 79.7412 68.3125 79.8118C68.3832 79.8825 68.4789 79.9224 68.5789 79.9227H69.4432C69.652 79.9227 69.8202 79.7526 69.8202 79.5454V78.6814C69.8205 78.6317 69.811 78.5825 69.7922 78.5365C69.7734 78.4905 69.7457 78.4486 69.7106 78.4134C69.6756 78.3782 69.6339 78.3503 69.588 78.3312C69.5421 78.3122 69.4928 78.3024 69.4432 78.3025ZM66.4461 78.3025H65.5821C65.4822 78.3028 65.3864 78.3427 65.3158 78.4133C65.2451 78.4839 65.2052 78.5796 65.2048 78.6796V79.5454C65.2051 79.6454 65.245 79.7412 65.3157 79.8118C65.3864 79.8825 65.4821 79.9224 65.5821 79.9227H66.4461C66.5461 79.9224 66.6418 79.8825 66.7125 79.8118C66.7832 79.7412 66.8231 79.6454 66.8234 79.5454V78.6814C66.8237 78.6317 66.8142 78.5824 66.7953 78.5364C66.7765 78.4904 66.7487 78.4486 66.7136 78.4134C66.6786 78.3782 66.6369 78.3502 66.5909 78.3312C66.545 78.3122 66.4958 78.3024 66.4461 78.3025ZM63.4496 78.3025H62.5853C62.3765 78.3025 62.2064 78.4724 62.2064 78.6796V79.5454C62.2064 79.7526 62.3765 79.9227 62.5853 79.9227H63.4496C63.5495 79.9223 63.6452 79.8824 63.7158 79.8118C63.7864 79.7411 63.8263 79.6453 63.8266 79.5454V78.6814C63.8267 78.5812 63.7871 78.4851 63.7164 78.414C63.6457 78.343 63.5498 78.3029 63.4496 78.3025ZM66.5541 71.5251H65.6898C65.5899 71.5255 65.4941 71.5654 65.4234 71.6361C65.3527 71.7067 65.3128 71.8025 65.3125 71.9025V72.7667C65.3125 72.9755 65.4826 73.1438 65.6898 73.1438H66.5541C66.654 73.1434 66.7496 73.1035 66.8203 73.0329C66.8909 72.9623 66.9307 72.8666 66.9312 72.7667V71.9025C66.9313 71.8529 66.9216 71.8038 66.9027 71.758C66.8838 71.7122 66.856 71.6706 66.821 71.6355C66.7859 71.6005 66.7443 71.5727 66.6985 71.5537C66.6527 71.5348 66.6037 71.5251 66.5541 71.5251ZM63.5578 71.5251H62.6938C62.5939 71.5255 62.4981 71.5654 62.4274 71.6361C62.3567 71.7067 62.3168 71.8025 62.3165 71.9025V72.7667C62.3165 72.9755 62.4866 73.1438 62.6938 73.1438H63.5578C63.658 73.1439 63.7542 73.1042 63.8252 73.0336C63.8962 72.9629 63.9363 72.8669 63.9368 72.7667V71.9025C63.9357 71.8025 63.8954 71.7068 63.8245 71.6363C63.7536 71.5657 63.6579 71.5258 63.5578 71.5251Z", fill: "#E1E4E5" }),
    /* @__PURE__ */ jsx("path", { d: "M73.3755 59.5258C72.3112 59.5258 71.4483 58.663 71.4483 57.5986C71.4483 56.5342 72.3112 55.6714 73.3755 55.6714C74.4399 55.6714 75.3027 56.5342 75.3027 57.5986C75.3027 58.663 74.4399 59.5258 73.3755 59.5258Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M79.5974 44.6065C78.3395 44.6065 77.3198 43.5868 77.3198 42.3289C77.3198 41.071 78.3395 40.0513 79.5974 40.0513C80.8553 40.0513 81.875 41.071 81.875 42.3289C81.875 43.5868 80.8553 44.6065 79.5974 44.6065Z", fill: "#E1E4E5" }),
    /* @__PURE__ */ jsx("path", { d: "M173.426 90.5814C172.789 90.5814 172.272 91.098 172.272 91.7353C172.272 92.3726 172.789 92.8892 173.426 92.8892C174.063 92.8892 174.58 92.3726 174.58 91.7353C174.58 91.098 174.063 90.5814 173.426 90.5814Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M174.122 62.4257C173.057 62.4257 172.194 61.5629 172.194 60.4985C172.194 59.4341 173.057 58.5713 174.122 58.5713C175.186 58.5713 176.049 59.4341 176.049 60.4985C176.049 61.5629 175.186 62.4257 174.122 62.4257Z", fill: "black" }),
    /* @__PURE__ */ jsx("path", { d: "M172.965 108.495C172.583 108.495 172.273 108.805 172.273 109.188C172.273 109.57 172.583 109.881 172.965 109.881C173.348 109.881 173.658 109.57 173.658 109.188C173.658 108.805 173.348 108.495 172.965 108.495Z", fill: "#E1E4E5" }),
    /* @__PURE__ */ jsx("path", { d: "M173.356 80.1074C172.68 80.1074 172.133 79.5595 172.133 78.8836C172.133 78.2078 172.68 77.6599 173.356 77.6599C174.032 77.6599 174.58 78.2078 174.58 78.8836C174.58 79.5595 174.032 80.1074 173.356 80.1074Z", fill: "#E1E4E5" }),
    /* @__PURE__ */ jsx("path", { d: "M173.039 50.4923C172.513 50.4923 172.087 50.0657 172.087 49.5395C172.087 49.0133 172.513 48.5867 173.039 48.5867C173.566 48.5867 173.992 49.0133 173.992 49.5395C173.992 50.0657 173.566 50.4923 173.039 50.4923Z", fill: "#E1E4E5" }),
    /* @__PURE__ */ jsx("path", { d: "M84.818 49.761H84.8602C85.1106 53.3071 87.7476 53.3618 87.7476 53.3618C87.7476 53.3618 84.8396 53.4183 84.8396 57.5157C84.8396 53.4183 81.9316 53.3618 81.9316 53.3618C81.9316 53.3618 84.5676 53.3071 84.818 49.761Z", fill: "#E1E4E5" })
  ] });
}
function RedirectionIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("rect", { width: "20", height: "20", rx: "10", fill: "black" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M3.80859 10.6666C3.80859 10.5454 3.85877 10.4291 3.94806 10.3434C4.03737 10.2577 4.15848 10.2095 4.28477 10.2095H13.6113L10.1381 6.876C10.0939 6.83353 10.0588 6.78311 10.0349 6.72761C10.0109 6.67213 9.99859 6.61265 9.99859 6.55259C9.99859 6.49253 10.0109 6.43305 10.0349 6.37756C10.0588 6.32207 10.0939 6.27165 10.1381 6.22918C10.1824 6.18671 10.2349 6.15301 10.2927 6.13003C10.3505 6.10704 10.4125 6.09521 10.4751 6.09521C10.5376 6.09521 10.5995 6.10704 10.6574 6.13003C10.7152 6.15301 10.7677 6.18671 10.8119 6.22918L15.0975 10.3432C15.1417 10.3857 15.1769 10.4361 15.2009 10.4916C15.2248 10.5471 15.2372 10.6065 15.2372 10.6666C15.2372 10.7267 15.2248 10.7862 15.2009 10.8417C15.1769 10.8972 15.1417 10.9476 15.0975 10.9901L10.8119 15.1041C10.7226 15.1899 10.6014 15.2381 10.4751 15.2381C10.3487 15.2381 10.2275 15.1899 10.1381 15.1041C10.0488 15.0184 9.99859 14.902 9.99859 14.7807C9.99859 14.6594 10.0488 14.543 10.1381 14.4573L13.6113 11.1238H4.28477C4.15848 11.1238 4.03737 11.0756 3.94806 10.9899C3.85877 10.9042 3.80859 10.7879 3.80859 10.6666Z",
            fill: "white"
          }
        )
      ]
    }
  );
}
function TodoCaseIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M21.0203 13.6528C21.4368 14.0789 21.4368 14.7696 21.0203 15.1956L15.3313 21.0139C14.9148 21.4399 14.2395 21.4399 13.8228 21.0139L10.9784 18.1047C10.5619 17.6787 10.5619 16.988 10.9784 16.562C11.395 16.1359 12.0704 16.1359 12.4869 16.562L14.5771 18.6996L19.5117 13.6528C19.9283 13.2268 20.6037 13.2268 21.0203 13.6528Z",
            fill: "black"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M11.9565 3.8225C12.3846 3.1259 13.1356 2.66666 13.9826 2.66666H18.0148C18.8618 2.66666 19.6128 3.1259 20.041 3.8225L20.796 5.05099C21.542 5.109 22.2495 5.17142 22.867 5.22951C24.6651 5.39868 26.0659 6.82342 26.2071 8.60691C26.3967 11.0038 26.6654 14.9031 26.6654 17.7925C26.6654 20.5195 26.4264 23.6156 26.2398 25.6213C26.0764 27.3777 24.6847 28.7563 22.9216 28.9229C21.0059 29.1039 18.1584 29.3333 15.9987 29.3333C13.839 29.3333 10.9915 29.1039 9.07574 28.9229C7.31267 28.7563 5.92098 27.3777 5.75758 25.6213C5.57096 23.6156 5.33203 20.5195 5.33203 17.7925C5.33203 14.9031 5.60068 11.0038 5.79034 8.60691C5.93144 6.82342 7.33235 5.39868 9.13042 5.22951C9.74794 5.17142 10.4554 5.109 11.2014 5.05099L11.9565 3.8225ZM10.6979 7.14963C10.2098 7.19039 9.74652 7.232 9.32503 7.27166C8.53124 7.34635 7.91143 7.97236 7.8485 8.76768C7.65894 11.1634 7.39655 14.9915 7.39655 17.7925C7.39655 20.4233 7.62838 23.4445 7.81332 25.4325C7.88502 26.2031 8.49163 26.8072 9.27116 26.8808C11.1823 27.0613 13.9451 27.282 15.9987 27.282C18.0523 27.282 20.8151 27.0613 22.7262 26.8808C23.5058 26.8072 24.1124 26.2031 24.184 25.4325C24.369 23.4445 24.6008 20.4233 24.6008 17.7925C24.6008 14.9915 24.3384 11.1634 24.1488 8.76768C24.086 7.97236 23.4662 7.34635 22.6723 7.27167C22.2508 7.232 21.7876 7.19039 21.2995 7.14963C21.2456 7.44039 21.1438 7.71786 21.0015 7.96811C20.6126 8.65191 19.8776 9.19642 18.9323 9.19642H13.065C12.1198 9.19642 11.3848 8.65191 10.9959 7.96811C10.8536 7.71786 10.7517 7.44039 10.6979 7.14963ZM13.9826 4.71794C13.9092 4.71794 13.8007 4.7576 13.7184 4.89162L12.8008 6.38444C12.7873 6.40643 12.7758 6.4283 12.7661 6.44995C12.6921 6.61508 12.7075 6.80802 12.7933 6.95896C12.8752 7.10299 12.9773 7.14514 13.065 7.14514H18.9323C19.02 7.14514 19.1222 7.10299 19.204 6.95896C19.2899 6.80802 19.3052 6.61508 19.2312 6.44995C19.2215 6.4283 19.21 6.40643 19.1966 6.38444L18.279 4.89162C18.1967 4.7576 18.0882 4.71794 18.0148 4.71794H13.9826Z",
            fill: "black"
          }
        )
      ]
    }
  );
}
const Todo = ({ case_id, iconType }) => {
  const observer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todo");
  const { isUser } = useUserDetails();
  const fetchTodo = async ({ pageParam = 1 }) => {
    const queryParams = {
      page: pageParam,
      page_size: 10,
      ...activeTab === "completed" && { is_completed: true },
      ...case_id && { case_id }
    };
    const response = await getAllTodoAPI(queryParams);
    return {
      data: response?.data?.data?.records || [],
      nextCursor: response?.data?.data?.pagination_info?.next_page ? response?.data?.data?.pagination_info?.current_page + 1 : null,
      prevCursor: response?.data?.data?.pagination_info?.current_page !== 1 ? response?.data?.data?.pagination_info?.current_page - 1 : null,
      totalRecords: response?.data?.data?.pagination_info?.total_records
    };
  };
  const {
    data: TodoData,
    refetch: refetchTodoData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["getAllTodo", activeTab, case_id || "all"],
    queryFn: fetchTodo,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    refetchOnWindowFocus: false,
    enabled: isTodoOpen
  });
  const lastTodoRef = useCallback(
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
  const { data: TodoCounts, refetch: refetchTodoCount } = useQuery({
    queryKey: ["TodoCounts", case_id],
    queryFn: async () => {
      const response = await getAllTodoCountsAPI({ case_id });
      return response?.data?.data?.count || 0;
    },
    refetchOnWindowFocus: false
  });
  const { mutate: markAsReadTodo, isPending: markasRead } = useMutation({
    mutationFn: async (markID) => {
      const response = await todoMarkAsReadAPI(markID);
      return response?.data;
    },
    onSuccess: (data, todoID) => {
      if (data) {
        setIsTodoOpen(false);
        setActiveTab("todo");
        refetchTodoData();
        refetchTodoCount();
      }
    },
    onError: (error) => {
    }
  });
  const allTodo = TodoData?.pages.map((page) => page.data).flat() || [];
  useEffect(() => {
    const isOnSummaryPage = location.pathname.includes("/service/") && (location.pathname.endsWith("/case-history") || location.pathname.endsWith("/notes"));
    const shouldOpenTodo = sessionStorage.getItem("openTodoSheet") === "true";
    if (isOnSummaryPage && shouldOpenTodo && case_id) {
      setIsTodoOpen(true);
      sessionStorage.removeItem("openTodoSheet");
    }
  }, [location.pathname, case_id, allTodo]);
  const handlePopoverToggle = () => {
    setIsTodoOpen((prev) => !prev);
  };
  const handleTodoClick = (todo) => {
    if (!todo?.is_marked) {
      markAsReadTodo(todo?.id);
    }
    const encodedStage = encodeURIComponent(todo?.case_stage);
    const encodedSubStage = encodeURIComponent(todo?.case_sub_stage);
    setIsTodoOpen(false);
    setActiveTab("todo");
    const base = isUser() ? "user/manage" : "manage";
    let serviceType = todo?.case?.service_type?.toLowerCase().replace(/\s+/g, "-") || "";
    if (serviceType === "litigation") {
      serviceType = "litigations";
    }
    navigate({
      to: `/${serviceType}/service/${todo?.case_id}/${base}?stage=${encodedStage}&sub_stage=${encodedSubStage}`
    });
  };
  return /* @__PURE__ */ jsxs(
    Sheet,
    {
      open: isTodoOpen,
      onOpenChange: (open) => {
        setIsTodoOpen(open);
        if (open) {
          setActiveTab("todo");
        }
      },
      children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            className: `relative  px-1  ${iconType === "alternate" ? "[&_svg]:size-5 h-8 w-8 " : "[&_svg]:size-4 h-7 w-7  py-1 "} rounded-full border border-gray-300 cursor-pointer bg-white hover:bg-white`,
            onClick: handlePopoverToggle,
            children: [
              iconType === "alternate" ? /* @__PURE__ */ jsx(TodoCaseIcon, {}) : /* @__PURE__ */ jsx(TodoIcon, {}),
              TodoCounts > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-1 text-xs bg-red-500 text-white rounded-full text-[10px] w-fit h-fit px-1.5 flex items-center justify-center", children: TodoCounts < 999 ? TodoCounts : "999+" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "w-3/12  font-primary gap-1 space-y-1  bg-white p-0 shadow-md rounded-md border border-gray-200", children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "flex flex-row justify-between items-center space-y-0 px-2 pt-3", children: [
            /* @__PURE__ */ jsx(SheetTitle, { className: "text-md font-normal leading-none", children: "To do Notifications" }),
            /* @__PURE__ */ jsx(SheetClose, { children: /* @__PURE__ */ jsx(NotesCloseIcon, { className: "w-5 h-5 cursor-pointer" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex border-b border-b-gray-200", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `px-4 cursor-pointer py-2 ${activeTab === "todo" ? "border-b-2 border-black" : ""}`,
                onClick: () => setActiveTab("todo"),
                children: "To do"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: `px-4 cursor-pointer py-2 ${activeTab === "completed" ? "border-b-2 border-black" : ""}`,
                onClick: () => setActiveTab("completed"),
                children: "Completed"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: " h-[calc(100vh-95px)] overflow-y-auto", children: isLoading && !isFetchingNextPage ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "h-20 my-1 px-3 py-2 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-32 bg-gray-200 " }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20 bg-gray-200" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-2 px-2 mt-2 border border-gray-200 space-y-4", children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-40 bg-gray-200 " }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-52 bg-gray-200 " })
            ] })
          ] }, index)) }) : allTodo?.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("ul", { className: "", children: allTodo.map((todo, index) => {
              const isLastTodo = index === allTodo.length - 1;
              return /* @__PURE__ */ jsx(
                "li",
                {
                  ref: isLastTodo ? lastTodoRef : null,
                  className: " border-b border-white border-b-gray-200 last:border-none cursor-pointer bg-white ",
                  onClick: () => handleTodoClick(todo),
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `py-3 px-2 flex gap-2 ${!todo?.is_marked && "bg-blue-100"} `,
                      children: [
                        !todo?.is_marked && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 mt-2 bg-sky-500 rounded-full" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-2 grow", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                            /* @__PURE__ */ jsx("div", { className: "text-sm 3xl:md px-1  border border-gray-300 bg-gray-100", children: todo?.case?.cnr_number || todo?.case?.cmp_number || todo?.case?.ref_id || todo?.case?.temp_id || "--" }),
                            /* @__PURE__ */ jsx("div", { className: "text-xs font-light 3xl:text-sm text-gray-500", children: formatDateWithTime(todo.created_at) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "p-2 border border-gray-200 bg-white flex justify-between", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("div", { className: "font-normal text-sm 3xl:text-md", children: labelStage[todo.case_stage] }),
                              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 3xl:text-md", children: labelSubStages[todo.case_sub_stage] })
                            ] }),
                            /* @__PURE__ */ jsx("div", { className: "self-end [&_svg]:size-4", children: /* @__PURE__ */ jsx(RedirectionIcon, {}) })
                          ] })
                        ] })
                      ]
                    }
                  )
                },
                index
              );
            }) }),
            isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-gray-500 mt-2", children: "Loading more Todos..." })
          ] }) : isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "h-20 mb-2 px-3 py-4 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3  w-32 bg-gray-200 " }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20 bg-gray-200" })
            ] }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-10 my-4 rounded-none  w-full bg-gray-200 " })
          ] })) }) : /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(NoTasks, {}),
            /* @__PURE__ */ jsx("div", { className: "text-base", children: "No Tasks Available" }),
            /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-gray-500", children: "You have no tasks at the moment. Stay organized and check back later!" })
          ] }) })
        ] })
      ]
    }
  );
};
export {
  Todo as T
};
