import React from "react";
import {
  Dashboardicon,
  Clienticon,
  Recepieicon,
  Feedicon,
  Retailicon,
  Myposticon,
  Savedposticon,
} from "../../svgs";
import SideBarItem from "./SideBarItem";
import { RiFileUserLine } from "react-icons/ri";
import { RiGalleryFill } from "react-icons/ri";

function Appfeature({ setOpen }) {
  const features = [
    {
      name: "App Dashboard",
      route: "/app-dashboard",
      icon: <Dashboardicon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Profile",
      route: "/profile",
      icon: <RiFileUserLine fontSize={25} color='#036231' />,
      subroute: null,
    },
    {
      name: "Clients",
      route: "/app-clients",
      icon: <Clienticon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Recipes",
      route: "/recipes",
      icon: <Recepieicon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Feed",
      route: "/feed",
      icon: <Feedicon h={20} w={20} c={"#036231"} />,
      subroute: [
        {
          name: "Community",
          route: "/feed/community",
          icon: <RiGalleryFill fontSize={22} color={"#036231"} />,
          subroute: null,
        },
        {
          name: "My Posts",
          route: "/feed/myposts",
          icon: <Myposticon h={20} w={20} c={"#036231"} />,
          subroute: null,
        },
        {
          name: "Saved Posts",
          route: "/feed/savedposts",
          icon: <Savedposticon h={20} w={20} c={"#036231"} />,
          subroute: null,
        },
      ],
    },
    {
      name: "Retail",
      route: "/retail",
      icon: <Retailicon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
  ];

  return (
    <div className='flex flex-col h-full gap-2 mt-2'>
      {features.map((feature, index) => (
        <SideBarItem
          key={index}
          name={feature.name}
          route={feature.route}
          child={feature.icon}
          sub={feature.subroute}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
}

export default Appfeature;
