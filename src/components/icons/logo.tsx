import LogoPath from "~/assets/nyaya-tech-logo.svg";

function Logo() {
  return (
    <div className="text-center">
      <p className="text-base text-center text-white  bg-black p-1 group-data-[state=expanded]:!hidden">NT</p>
      <img
        src={LogoPath}
        alt="logo"
        className="w-full border border-black mt-6 group-data-[collapsible=icon]:!hidden"
      />
    </div>
  );
}

export default Logo;
