import { usePathname, useRouter } from "next/navigation";
import { Downarrowicon } from "../../svgs";
import { useState, useEffect } from "react";

function SideBarItem({ name, route, child, sub, setOpen }) {
  const path = usePathname();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sub && path.includes(route)) {
      setShow(true);
    }
  }, [path, sub, route]);

  const handleClick = () => {
    setOpen(false)
    if (sub) {
      setShow((prev) => !prev);
    } else {
      router.push(route);
    }
  };

  return (
    <>
      <button
        className={`w-full relative rounded-md py-[2px] flex items-center gap-3 cursor-pointer pl-5 ${path.includes(route) ? "bg-[#90C8444D]" : "bg-transparent"
          }`}
        onClick={handleClick}
      >
        {child}
        <p className={`text-[14px] font-medium text-[#494949]`}>{name}</p>
        {sub && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShow((prev) => !prev);
            }}
            className={`absolute right-3 transition-all duration-150 ${show ? "rotate-180" : "rotate-0"
              }`}
          >
            <Downarrowicon h={15} w={15} c={"#036231"} />
          </button>
        )}
      </button>
      <div className="ml-8 mt-1 flex flex-col gap-1">
        {sub &&
          show &&
          sub.map((s, i) => (
            <SideBarItem
              name={s.name}
              route={s.route}
              child={s.icon}
              sub={s.subroute}
              key={i}
            />
          ))}
      </div>
    </>
  );
}

export default SideBarItem;
