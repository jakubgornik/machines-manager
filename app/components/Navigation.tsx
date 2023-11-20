import { useState } from "react";
import {
  FaEdit,
  FaTable,
  FaChartPie,
  FaRegCalendarAlt,
  FaMapMarkedAlt,
  FaEllipsisV,
  FaRegWindowClose,
  FaMailBulk,
} from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex flex-row bg-gray-900 px-6 shadow-xl print:hidden sm:flex-col sm:px-3">
      {/* desktop */}
      <div className="hidden items-center justify-center gap-8 py-3 print:hidden sm:flex sm:flex-col lg:gap-12">
        <Link href="/">
          <div className="my-6 text-xl font-extrabold leading-6 tracking-wider text-lighterBlue">
            MM
          </div>
        </Link>
        <Link href="/machinesstatus">
          <FaEdit className="h-[25px] w-[25px] fill-lighterBlue duration-500 hover:fill-lightBlue" />
        </Link>
        <Link href="/kanbanboard">
          <FaTable className="h-[25px] w-[25px] fill-lighterBlue duration-500 hover:fill-lightBlue" />
        </Link>
        <Link href="/mails">
          <FaMailBulk className="h-[25px] w-[25px] fill-lighterBlue duration-500 hover:fill-lightBlue" />
        </Link>
        <Link href="/statistics">
          <FaChartPie className="h-[25px] w-[25px] fill-lighterBlue duration-500 hover:fill-lightBlue" />
        </Link>
        <Link href="/timetable">
          <FaRegCalendarAlt className="h-[25px] w-[25px] fill-lighterBlue duration-500 hover:fill-lightBlue" />
        </Link>
        <Link href="/localizations">
          <FaMapMarkedAlt className="h-[25px] w-[25px] fill-lighterBlue duration-500 hover:fill-lightBlue" />
        </Link>
      </div>
      {/* mobile */}
      <div className="flex w-full justify-between px-2 sm:hidden">
        <Link href="/">
          <div className="py-4 text-xl font-extrabold leading-6 tracking-wider text-lighterBlue">
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
            <span className="h-[1px]  border border-lighterBlue"></span>
            <span className="h-[1px]  border border-lighterBlue"></span>
            <span className="h-[1px] w-[70%] self-end border border-lighterBlue"></span>
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
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/">
                Zarzadzaj maszynami
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/machinesstatus">
                Ustaw status
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/kanbanboard">
                Tablica statusów
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/mails">
                Poczta
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/statistics">
                Statystyki
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/timetable">
                Kalendarz
              </Link>
            </li>
            <li className="flex w-full justify-center py-2 duration-300 hover:bg-lightBlue hover:text-gray-800">
              <Link className="font-semibold " href="/localizations">
                Lokalizacje
              </Link>
            </li>
            <li
              onClick={() => {
                signOut();
              }}
              className="flex w-full  justify-center py-2 font-semibold duration-300 hover:bg-lightBlue hover:text-gray-800"
            >
              <span className="cursor-pointer font-semibold">Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
