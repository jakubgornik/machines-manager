import { useState } from "react";
import {
  FaEdit,
  FaTable,
  FaChartPie,
  FaRegCalendarAlt,
  FaMapMarkedAlt,
  FaEllipsisV,
  FaRegWindowClose,
} from "react-icons/fa";
import Link from "next/link";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex flex-row bg-lighterBlue px-6 shadow-xl sm:flex-col sm:px-3">
      {/* desktop */}
      <div className="hidden items-center justify-center gap-4 py-3 sm:flex sm:flex-col lg:gap-8">
        <Link href="/">
          <div className="my-6 text-xl font-extrabold leading-6 tracking-wider text-gray-800">
            MM
          </div>
        </Link>
        <Link href="/setstatus">
          <FaEdit size={30} className="fill-gray-800" />
        </Link>
        <Link href="kanbanboard">
          <FaTable size={30} className="fill-gray-800" />
        </Link>
        <Link href="statistics">
          <FaChartPie size={30} className="fill-gray-800" />
        </Link>
        <Link href="timetable">
          <FaRegCalendarAlt size={30} className="fill-gray-800" />
        </Link>
        <Link href="map">
          <FaMapMarkedAlt size={30} className="fill-gray-800" />
        </Link>
        <Link href="settings">
          <FaEllipsisV size={30} className="fill-gray-800" />
        </Link>
      </div>
      {/* mobile */}
      <div className="flex w-full justify-between px-2 sm:hidden">
        <Link href="/">
          <div className="py-2 text-xl font-extrabold leading-6 tracking-wider text-gray-800">
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
            <span className="h-[1px]  border border-gray-800"></span>
            <span className="h-[1px]  border border-gray-800"></span>
            <span className="h-[1px] w-[70%] self-end  border border-gray-800"></span>
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
          <div className="fixed left-0 top-10 z-50 flex h-screen w-screen flex-col items-center justify-start gap-6  backdrop-blur-sm">
            <Link
              className="mt-4  font-semibold duration-300 hover:text-lightBlue"
              href="setstatus"
            >
              Ustaw status
            </Link>
            <Link
              href="setstatus"
              className="font-semibold duration-300 hover:text-lightBlue"
            >
              Tablica statusów
            </Link>
            <Link
              href="setstatus"
              className="font-semibold duration-300 hover:text-lightBlue"
            >
              Statystyki
            </Link>
            <Link
              href="setstatus"
              className="font-semibold duration-300 hover:text-lightBlue"
            >
              Kalendarz
            </Link>
            <Link
              href="setstatus"
              className="font-semibold duration-300 hover:text-lightBlue"
            >
              Lokalizacje
            </Link>
            <Link
              href="setstatus"
              className="font-semibold duration-300 hover:text-lightBlue"
            >
              Ustawienia
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
