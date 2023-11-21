import { useState } from "react";
import {
  FaEdit,
  FaTable,
  FaChartPie,
  FaRegCalendarAlt,
  FaMapMarkedAlt,
  FaSun,
  FaMoon,
  FaRegWindowClose,
  FaMailBulk,
} from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhiteModeActive, setIsWhiteModeActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkModeFunc = () => {
    document.documentElement.classList.toggle("dark");
    setIsWhiteModeActive((prev) => !prev);
  };

  return (
    <div className="flex flex-row bg-white/70 px-6 shadow-2xl dark:bg-gray-900 print:hidden sm:flex-col sm:px-3">
      {/* desktop */}
      <div className="hidden items-center justify-center gap-8 py-3 print:hidden sm:flex sm:flex-col lg:gap-12">
        <Link href="/">
          <div className="my-6 text-xl font-extrabold leading-6 tracking-wider text-gray-900 duration-500 hover:text-white dark:text-lighterBlue dark:hover:text-lightBlue">
            MM
          </div>
        </Link>
        <Link href="/machinesstatus">
          <FaEdit className="h-[25px] w-[25px] fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
        </Link>
        <Link href="/kanbanboard">
          <FaTable className="h-[25px] w-[25px] fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
        </Link>
        <Link href="/mails">
          <FaMailBulk className="h-[25px] w-[25px] fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
        </Link>
        <Link href="/statistics">
          <FaChartPie className="h-[25px] w-[25px] fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
        </Link>
        <Link href="/timetable">
          <FaRegCalendarAlt className="h-[25px] w-[25px] fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
        </Link>
        <Link href="/localizations">
          <FaMapMarkedAlt className="h-[25px] w-[25px] fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
        </Link>
        <div onClick={toggleDarkModeFunc}>
          {isWhiteModeActive ? (
            <FaMoon className="h-[25px] w-[25px] cursor-pointer fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
          ) : (
            <FaSun className="h-[25px] w-[25px] cursor-pointer fill-gray-900 duration-500 hover:fill-white dark:fill-lighterBlue dark:hover:fill-lightBlue" />
          )}
        </div>
      </div>
      {/* mobile */}
      <div className="flex w-full justify-between px-2 sm:hidden">
        <Link href="/">
          <div className="py-4 text-xl font-extrabold leading-6 tracking-wider text-gray-900 dark:text-lighterBlue">
            MM
          </div>
        </Link>
        {/* hamburger menu */}
        {/* todo delete svg and replace with animation on the spans */}
        {!isMenuOpen ? (
          <div
            onClick={toggleMenu}
            className="flex h-full w-[30px] flex-col justify-center gap-[3px]"
          >
            <span className="h-[1px]  border border-gray-900 dark:border-lighterBlue"></span>
            <span className="h-[1px]  border border-gray-900 dark:border-lighterBlue"></span>
            <span className="h-[1px] w-[70%] self-end border border-gray-900 dark:border-lighterBlue"></span>
          </div>
        ) : (
          <div
            className="flex items-center justify-center"
            onClick={toggleMenu}
          >
            <FaRegWindowClose size={30} className="fill-gray-800" />
          </div>
        )}

        {isMenuOpen && (
          <ul className="fixed left-0 top-14 z-50 flex h-screen w-screen flex-col items-center justify-start bg-gray-900/50 text-white backdrop-blur-sm">
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/">
                Manage machines
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/machinesstatus">
                Set status
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/kanbanboard">
                Kanbanboard
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/mails">
                Mailbox
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/statistics">
                Statistics
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/timetable">
                Timetable
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              <Link className="font-medium" href="/localizations">
                Localiztions
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800">
              {isWhiteModeActive ? (
                <div
                  onClick={toggleDarkModeFunc}
                  className="group flex cursor-pointer gap-2 font-medium"
                >
                  Turn dark mode{" "}
                  <FaMoon className="w-[25px]fill-gray-900 h-[25px]" />
                </div>
              ) : (
                <div
                  onClick={toggleDarkModeFunc}
                  className="group flex cursor-pointer gap-2 font-medium"
                >
                  Turn light mode{" "}
                  <FaSun className="w-[25px]fill-gray-900 h-[25px]" />
                </div>
              )}
            </li>
            <li
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full justify-center py-2 duration-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-lightBlue dark:hover:text-gray-800"
            >
              <span className="cursor-pointer font-medium">Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
