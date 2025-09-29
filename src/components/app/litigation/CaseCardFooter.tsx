import { useNavigate, useRouter } from "@tanstack/react-router";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import ManageIcon from "@/components/icons/manage-icon";
import NotesIconCard from "@/components/icons/notes-icon-card";
import SummaryIconCard from "@/components/icons/summary-icon-card";
import TodoIcon from "@/components/icons/todo-icon";
import ViewIconGrid from "@/components/icons/view-icon-grid";
import FilesIconCard from "@/components/icons/files-icon-card";
import ChatIconCard from "@/components/icons/chat-icon-card";

export const CaseCardFooter = ({ record }) => {
  const router = useRouter();
  const navigate = useNavigate();
  const serviceType = record?.service_type;
  const case_id = record?.id;
  const { isUser } = useUserDetails();

  const handleManage = (service_id: number) => {
    if (serviceType !== "Litigation") {
      sessionStorage.setItem("case-origin", "legal-opinion");
    } else {
      sessionStorage.setItem("case-origin", "litigation");
    }

    const userPath = isUser() ? "/user/manage" : "/manage";

    if (serviceType === "Litigation") {
      navigate({
        to: `/litigations/service/${service_id}${userPath}`,
      });
    } else if (serviceType === "Legal opinion") {
      navigate({
        to: `/legal-opinion/service/${service_id}${userPath}`,
      });
    }
  };
  return (
    <div>
      <div className="pt-2 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 pb-2">
            {serviceType === "Litigation" && (
              <div
                className="relative w-8 h-8 cursor-pointer bg-gray-200 hover:text-white [&_svg]:size-6 flex items-center justify-center rounded-full   before:content-[''] before:absolute before:scale-0 hover:before:scale-100 before:inset-0 before:bg-transparent before:rounded-full before:transition-all before:duration-300 hover:before:bg-black after:content-[''] after:absolute after:inset-0 after:rounded-full "
                onClick={() => {
                  router.navigate({
                    to: `/litigations/service/${case_id}/case-history`,
                  });
                }}
              >
                <div className="z-10" title="case history">
                  <SummaryIconCard />
                </div>

                {record?.summary_unread_count > 0 && (
                  <span className="absolute -top-1 right-0 z-20 text-xs bg-black text-white rounded-full h-fit w-fit px-1.5 flex items-center justify-center">
                    {record?.summary_unread_count}
                  </span>
                )}
              </div>
            )}
            <div
              className="relative cursor-pointer w-8 h-8 bg-gray-200 hover:text-white [&_svg]:size-6 flex items-center justify-center rounded-full   before:content-[''] before:absolute before:scale-0 hover:before:scale-100 before:inset-0 before:bg-transparent before:rounded-full before:transition-all before:duration-300 hover:before:bg-black after:content-[''] after:absolute after:inset-0 after:rounded-full "
              onClick={() => {
                if (serviceType !== "Litigation") {
                  router.navigate({
                    to: `/legal-opinion/service/${record.id}/notes`,
                  });
                } else {
                  router.navigate({
                    to: `/litigations/service/${case_id}/notes`,
                  });
                }
              }}
            >
              {" "}
              <div className="z-10" title="notes">
                <NotesIconCard />
              </div>
              {record?.notes_unread_count > 0 && (
                <span className="absolute -top-1 right-0 z-20 text-xs bg-black text-white rounded-full h-fit w-fit px-1.5 flex items-center justify-center">
                  {record?.notes_unread_count}
                </span>
              )}
            </div>
            <div
              className="relative cursor-pointer w-8 h-8 bg-gray-200 hover:text-white [&_svg]:size-6 flex items-center justify-center rounded-full   before:content-[''] before:absolute before:scale-0 hover:before:scale-100 before:inset-0 before:bg-transparent before:rounded-full before:transition-all before:duration-300 hover:before:bg-black after:content-[''] after:absolute after:inset-0 after:rounded-full "
              onClick={() => {
                if (serviceType !== "Litigation") {
                  router.navigate({
                    to: `/legal-opinion/service/${record.id}/chat`,
                  });
                } else {
                  router.navigate({
                    to: `/litigations/service/${case_id}/chat`,
                  });
                }
              }}
            >
              <div className="z-10" title="chat">
                <ChatIconCard />
              </div>

              {record?.unread_messages > 0 && (
                <span className="absolute -top-1 right-0 z-20 text-xs bg-black text-white rounded-full h-fit w-fit px-1.5 flex items-center justify-center">
                  {record?.unread_messages}
                </span>
              )}
            </div>
            <div
              className="relative cursor-pointer w-8 h-8 bg-gray-200 hover:text-white [&_svg]:size-6 flex items-center justify-center rounded-full   before:content-[''] before:absolute before:scale-0 hover:before:scale-100 before:inset-0 before:bg-transparent before:rounded-full before:transition-all before:duration-300 hover:before:bg-black after:content-[''] after:absolute after:inset-0 after:rounded-full "
              onClick={() => {
                if (serviceType !== "Litigation") {
                  router.navigate({
                    to: `/legal-opinion/service/${record.id}/files`,
                  });
                } else {
                  router.navigate({
                    to: `/litigations/service/${case_id}/files`,
                  });
                }
              }}
            >
              <div className="z-10" title="files">
                <FilesIconCard />
              </div>

              {record?.files_unviewed_count > 0 && (
                <span className="absolute -top-1 right-0 z-20 text-xs bg-black text-white rounded-full h-fit w-fit px-1.5 flex items-center justify-center">
                  {record?.files_unviewed_count}
                </span>
              )}
            </div>
            <div
              className="relative cursor-pointer w-8 h-8 bg-gray-200 hover:text-white [&_svg]:size-5 flex items-center justify-center rounded-full   before:content-[''] before:absolute before:scale-0 hover:before:scale-100 before:inset-0 before:bg-transparent before:rounded-full before:transition-all before:duration-300 hover:before:bg-black after:content-[''] after:absolute after:inset-0 after:rounded-full "
              onClick={() => {
                sessionStorage.setItem("openTodoSheet", "true");
                if (serviceType !== "Litigation") {
                  router.navigate({
                    to: `/legal-opinion/service/${case_id}/notes`,
                  });
                } else {
                  router.navigate({
                    to: `/litigations/service/${case_id}/case-history`,
                  });
                }
              }}
            >
              <div className="z-10">
                <TodoIcon />
              </div>
              {record?.todo_unread_count > 0 && (
                <span className="absolute -top-1 right-0 z-20 text-xs bg-black text-white rounded-full h-fit w-fit px-1.5 flex items-center justify-center">
                  {record?.todo_unread_count}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2 pb-2">
            <button
              className="flex items-center space-x-1 px-3 cursor-pointer py-1 text-xs text-gray-600 border border-gray-200  hover:bg-gray-200"
              onClick={() => {
                if (serviceType !== "Litigation") {
                  sessionStorage.setItem("case-origin", "legal-opinion");
                  router.navigate({
                    to: `/legal-opinion/service/${case_id}/notes`,
                  });
                } else {
                  sessionStorage.setItem("case-origin", "litigation");
                  router.navigate({
                    to: `/litigations/service/${case_id}/case-history`,
                  });
                }
              }}
            >
              <ViewIconGrid className="" />
              <span className="text-xs text-black">View</span>
            </button>
            <button
              className="flex items-center space-x-1 px-3 py-1 text-xs cursor-pointer text-gray-600 border border-gray-200  hover:bg-gray-200"
              onClick={() => {
                handleManage(record?.id);
              }}
            >
              <ManageIcon className="" />
              <span className="text-xs text-black">Manage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
