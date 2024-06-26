"use client";
import React, { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { HiOutlineSupport } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TbSettingsCog } from "react-icons/tb";
import { RiAiGenerate } from "react-icons/ri";
import { SiFiles } from "react-icons/si";
import AirQoLogo from "@/public/images/airqo.png";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();
  const { data: session, status } = useSession();

  const handleLogout = () => {
    setLoading(true);
    signOut({ callbackUrl: "/login" }).then(() => {
      setLoading(false);
    });
  };

  const isActive = (route: string) => {
    return pathname.startsWith(route);
  };

  const links = [
    {
      href: "/report",
      icon: RiAiGenerate,
      label: "Report",
    },
    // { href: "/files", icon: SiFiles, label: "Saved Files" },
    { href: "/settings", icon: TbSettingsCog, label: "Settings" },
  ];

  const List = [
    {
      name: "Support",
      onClick: () => {
        window.location.href = "mailto:support@airqo.net";
      },
      icon: <HiOutlineSupport className="mr-2 h-4 w-4" />,
    },
    {
      name: "Settings",
      onClick: () => router.push("/settings"),
      icon: <IoSettingsOutline className="mr-2 h-4 w-4" />,
    },
    {
      name: loading ? "Logging out..." : "Logout",
      onClick: () => handleLogout(),
      icon: <IoLogOutOutline className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="hidden md:block" />
        <div className="md:hidden">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <button className="cursor-pointer">
                <IoIosMenu size={30} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-blue-600 border-none text-white flex flex-col items-center rounded-none">
              <DrawerHeader className="mx-auto w-full space-y-4 max-w-sm">
                <div className="flex flex-row items-center justify-start space-x-3">
                  <Image
                    alt="Logo"
                    src={AirQoLogo}
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <h1 className="text-xl font-bold">AQ Report</h1>
                </div>
              </DrawerHeader>
              <Separator className="bg-white" />
              <div className="flex flex-col items-center space-y-3 w-full justify-center p-4">
                {links.map(({ href, icon: Icon, label }) => (
                  <Link href={href} className="w-full" key={href}>
                    <span
                      className={`flex flex-row rounded-lg items-center justify-start space-x-3 p-2 w-full  ${
                        isActive(href) ? "bg-gray-800 text-white" : ""
                      }`}
                    >
                      <Icon />
                      <span>{label}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="flex items-center space-x-4">
          <AiOutlineBell
            className="text-gray-600 text-2xl rounded-full bg-gray-200 p-2 disabled:opacity-50 cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
            size={34}
          />
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <BsPerson
                    size={34}
                    className="text-gray-600 text-2xl cursor-pointer rounded-full bg-gray-200 p-2 dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative right-6 w-52 bg-white dark:bg-gray-800 dark:text-gray-300">
                <DropdownMenuLabel>
                  {session?.user?.email && session?.user?.email.length > 30
                    ? session?.user?.email?.slice(0, 30) + "..."
                    : session?.user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-400" />
                {List.map((item, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    className="pl-1 w-full rounded-md cursor-pointer"
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
}
