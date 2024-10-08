import React from "react";
import {
  Clienticon,
  Dashboardicon,
  LinkgeneratorIcon,
  MeetingIcon,
  VolumePointsIcon,
} from "../../svgs";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { FaGem } from "react-icons/fa";

function Clubfeature({ setOpen }) {
  const { clubSystem } = useSelector((state) => state.user);
  // console.log("clubSystem => ", clubSystem);

  const features = [
    {
      name: "Club Dashboard",
      route: "/club-dashboard",
      icon: <Dashboardicon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Club Customers",
      route: "/club-clients",
      icon: <Clienticon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Link Generator",
      route: "/linkgenerator",
      icon: <LinkgeneratorIcon h={20} w={20} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Meeting",
      route: "/meeting",
      icon: <MeetingIcon h={22} w={22} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Volume Points",
      route: "/volume-points",
      icon: <VolumePointsIcon h={22} w={22} c={"#036231"} />,
      subroute: null,
    },
    {
      name: "Free Trial Users",
      route: "/free-trial-users",
      icon: <FaGem h={25} w={25} fill="#036231" />,
      subroute: null,
    },
  ];
  return (
    <div className="flex flex-col h-full gap-2 mt-4">
      {features.map((feature, index) => {
        {
          /* console.log("index => ", index);
        console.log("feature.name => ", feature.name); */
        }
        if (index === 4 && clubSystem !== 2) {
          return null;
        }
        return (
          <SideBarItem
            key={index}
            name={feature.name}
            route={feature.route}
            child={feature.icon}
            sub={feature.subroute}
            setOpen={setOpen}
          />
        );
      })}
    </div>
  );
}

export default Clubfeature;
