import { UseContextAPI } from "@/components/context/Provider";
import OverflowContentTooltip from "@/components/core/OverflowContentTooltip";
import AddressIcon from "@/components/icons/address-icon";
import DefaultUserIcon from "@/components/icons/default-user";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserDetails } from "@/lib/interfaces/chat";
import { Mail, Smartphone } from "lucide-react";

export function UserCardMini({
  name,
  avatar,
  phone,
  email,
  designation,
  address,
}: UserDetails) {
  const { serviceData } = UseContextAPI();
  const isLitigation = serviceData?.service_type === "Litigation";
  return (
    <div className="space-y-0 w-full font-light">
      <div className="flex justify-between items-center w-full">
        <div className=" flex gap-0 items-center">
          <Avatar className="flex items-center justify-center mx-1 mb-1">
            {avatar ? (
              <AvatarImage
                src={avatar}
                className="rounded-full h-7 w-7 object-top object-cover"
              />
            ) : (
              <DefaultUserIcon className={"h-4 w-4"} />
            )}
          </Avatar>
          <div className="flex flex-col font-light">
            <div className="leading-2 w-24">
              <OverflowContentTooltip text={name} />
            </div>
            {designation && (
              <div className="text-gray-400 text-sm">{designation}</div>
            )}
          </div>
        </div>
      </div>
      <div className="ml-3 space-y-1 xl:text-[10px] 2xl:text-xs 3xl:text-sm">
        <div className="flex gap-2 items-center">
          <Smartphone strokeWidth={1} className="flex-none w-4 h-4" />
          {phone?.replace(/^(\+91)(\d{5})(\d{5})$/, "$1 $2$3")}
        </div>
        {email && (
          <div
            className={`flex gap-2 items-center overflow-hidden ${isLitigation ? "w-56" : "w-32"}`}
            title={email}
          >
            <Mail strokeWidth={1} size={20} className="flex-none w-4 h-4" />
            <span className="truncate block whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer">
              {email}
            </span>
          </div>
        )}
        {address && (
          <div className="flex gap-2 items-center overflow-auto">
            <AddressIcon />
            {address}
          </div>
        )}
      </div>
    </div>
  );
}
