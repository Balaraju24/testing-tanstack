import DefaultUserIcon from "@/components/icons/default-user";
import EditNoteIcon from "@/components/icons/edit-note-icon";
import FemaleIcon from "@/components/icons/female-icon";
import MaleIcon from "@/components/icons/male-icon";
import ViewIcon from "@/components/icons/view-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColorByFirstLetter } from "@/utils/helpers/getColorByFirstLetter";
import { useUserDetails } from "@/utils/hooks/useUserPermissions";
import { useRouter } from "@tanstack/react-router";

export default function LawyerColumns() {
  const router = useRouter();
  const { isAdmin } = useUserDetails();

  return [
    {
      accessorFn: (row: any) => row.serial,
      id: "serial",
      header: () => <span className=" text-sm">S No</span>,
      footer: (props: any) => props.column.id,
      width: "50px",
      maxWidth: "50px",
      minWidth: "50px",
      cell: (info: any) => (
        <span className="text-sm">{info.getValue() || "--"}</span>
      ),
    },
    {
      accessorFn: (row: any) => {
        const capitalize = (str: string) =>
          str.replace(/\b\w/g, (char) => char.toUpperCase());

        const firstName = row.first_name ? capitalize(row.first_name) : "";
        const lastName = row.last_name ? capitalize(row.last_name) : "";

        return {
          fullname: `${firstName} ${lastName}`,
          avatar: row.profile_pic || null,
        };
      },
      id: "first_name",
      cell: (info: any) => {
        const { fullname, avatar } = info.getValue() || {
          fullname: "--",
          avatar: null,
        };
        return (
          <span className="flex gap-2 items-center">
            {avatar ? (
              <Avatar className="w-7 h-7 border-0">
                <AvatarImage
                  src={avatar}
                  className="object-center"
                ></AvatarImage>
              </Avatar>
            ) : (
              <Avatar className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F7F7F7] border border-grey-900">
                <DefaultUserIcon className="w-4 h-4" />
              </Avatar>
            )}
            <span
              className="self-center text-xs truncate w-40"
              title={fullname}
            >
              {fullname}
            </span>
          </span>
        );
      },
      width: "160px",
      maxWidth: "160px",
      minWidth: "160px",
      header: () => <span className="text-sm">Name</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.gender,
      id: "gender",
      cell: (info: any) => {
        return (
          <span className="text-xs flex gap-2 [&_svg]:size-4 items-center ">
            {info.getValue() == "MALE" ? (
              <MaleIcon />
            ) : info.getValue() == "FEMALE" ? (
              <FemaleIcon />
            ) : null}{" "}
            {info.getValue() || "--"}
          </span>
        );
      },
      width: "90px",
      maxWidth: "90px",
      minWidth: "90px",
      header: () => <span className="text-sm">Gender</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.advocate_locations || [],
      id: "location",
      cell: (info: any) => {
        const locations = info.getValue();
        if (!Array.isArray(locations) || locations.length === 0) {
          return <span className="text-xs">--</span>;
        }

        return (
          <div className="flex flex-wrap gap-1 items-center">
            {locations.slice(0, 1).map((loc: any) => {
              const { background, color } = getColorByFirstLetter(
                loc.location.name
              );
              return (
                <div
                  key={loc.id}
                  className="px-2 py-1 cursor-pointer rounded-full text-[10px] font-medium w-24 truncate whitespace-nowrap overflow-hidden"
                  style={{
                    backgroundColor: background,
                    color: "#333333",
                  }}
                  title={loc.location.name}
                >
                  {loc.location.name}
                </div>
              );
            })}
            {locations.length > 1 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-[10px] font-normal px-2 rounded-full py-1 bg-sky-200 text-blue-700 cursor-pointer">
                      +{locations.length - 1}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-white max-w-xs overflow-y-auto"
                    style={{ maxHeight: "150px" }}
                  >
                    {locations.slice(1).map((loc: any) => {
                      const { background, color } = getColorByFirstLetter(
                        loc.location.name
                      );
                      return (
                        <div
                          key={loc.id}
                          className="px-2 py-1 cursor-pointer rounded-full text-xs 3xl:text-sm font-medium mb-1 w-24 truncate whitespace-nowrap overflow-hidden"
                          title={loc.location.name}
                          style={{
                            backgroundColor: background,
                            color: "#333333",
                          }}
                        >
                          {loc.location.name}
                        </div>
                      );
                    })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => <span className="text-sm">Location</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) => row.area_of_interest || [],
      id: "designation",
      cell: (info: any) => {
        const interests = info.getValue();
        if (!Array.isArray(interests) || interests.length === 0) {
          return <span className="text-xs">--</span>;
        }

        return (
          <div className="flex flex-wrap gap-1 items-center">
            {interests.slice(0, 1).map((interest: string) => {
              const { background, color } = getColorByFirstLetter(interest);
              return (
                <div
                  key={interest}
                  title={interest}
                  className="px-2 py-1 cursor-pointer rounded-full text-[10px] font-medium w-24 truncate whitespace-nowrap overflow-hidden"
                  style={{
                    backgroundColor: background,
                    color: "#333333",
                  }}
                >
                  {interest}
                </div>
              );
            })}
            {interests.length > 1 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-[10px] font-normal px-2 rounded-full py-1 bg-sky-200 text-blue-700 cursor-pointer">
                      +{interests.length - 1}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-white max-w-xs overflow-y-auto"
                    style={{ maxHeight: "150px" }}
                  >
                    {interests.slice(1).map((interest: string) => {
                      const { background, color } =
                        getColorByFirstLetter(interest);
                      return (
                        <div
                          key={interest}
                          className="px-2 py-1 cursor-pointer rounded-full text-xs 3xl:text-sm font-medium mb-1 w-24 truncate whitespace-nowrap overflow-hidden"
                          style={{
                            backgroundColor: background,
                            color: "#333333",
                          }}
                          title={interest}
                        >
                          {interest}
                        </div>
                      );
                    })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
      width: "170px",
      maxWidth: "170px",
      minWidth: "170px",
      header: () => <span className="text-sm">Area of Interest</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.email,
      id: "email",
      cell: (info: any) => {
        return (
          <div
            className="text-xs truncate w-32 2xl:w-full"
            title={info.getValue()}
          >
            {info.getValue() || "--"}
          </div>
        );
      },
      width: "150px",
      maxWidth: "150px",
      minWidth: "150px",
      header: () => <span className="text-sm">Email</span>,
      footer: (props: any) => props.column.id,
    },
    {
      accessorFn: (row: any) =>
        row.phone
          ? row.phone.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3")
          : "--",
      id: "phone",
      cell: (info: any) => {
        return <span className="text-xs">{info.getValue() ?? "--"}</span>;
      },
      width: "120px",
      maxWidth: "120px",
      minWidth: "120px",
      header: () => <span className="text-sm">Phone</span>,
      footer: (props: any) => props.column.id,
    },

    {
      accessorFn: (row: any) => row.actions,
      id: "actions",
      cell: (info: any) => (
        <div className="table-action-buttons flex space-x-3   items-center  cursor-pointer">
          <span
            onClick={() => {
              router.navigate({ to: `/view-advocate/${info.row.original.id}` });
            }}
            title="View Advocate"
          >
            <ViewIcon className={"size-4"} />
          </span>
          {!isAdmin() && (
            <span
              onClick={() => {
                router.navigate({
                  to: `/edit-advocate/${info.row.original.id}`,
                });
              }}
              title="Edit Advocate"
            >
              <EditNoteIcon className={"size-4 text-black"} />
            </span>
          )}
        </div>
      ),
      header: () => <span className="text-sm">Actions</span>,
      footer: (props: any) => props.column.id,
      width: "80px",
      minWidth: "80px",
      maxWidth: "80px",
    },
  ];
}
