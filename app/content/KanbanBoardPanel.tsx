import React from "react";
import { useSession } from "next-auth/react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import KanbanTable from "../components/KanbanTable";
import KanbanTableMobile from "../components/KanbanTableMobile";
import DataTable from "../components/DataTable";
import SwiperButtonNext from "../components/svg/SwiperButtonNext";
import SwiperButtonPrev from "../components/svg/SwiperButtonPrev";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

const KanbanBoardPanel = () => {
  const { data: session } = useSession();
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );

  const userMachinesWithAvailableStatus = userMachines.filter(
    (machine) => machine.status === "Wolne",
  );

  const userMachinesWithServicedStatus = userMachines.filter(
    (machine) => machine.status === "Serwisowane",
  );

  const userMachinesWithRentedStatus = userMachines.filter(
    (machine) => machine.status === "Wynajmowane",
  );

  if (session)
    return (
      <>
        <div className="hidden w-full justify-between gap-3 pb-16 sm:flex">
          <KanbanTable
            data={userMachinesWithAvailableStatus}
            status="Available"
          />
          <KanbanTable
            data={userMachinesWithServicedStatus}
            status="Serviced"
          />
          <KanbanTable data={userMachinesWithRentedStatus} status="Rented" />
        </div>

        <div className="relative flex w-full sm:hidden">
          <div className="swiper-button-prev">
            <SwiperButtonPrev />
          </div>
          <div className="swiper-button-next">
            <SwiperButtonNext />
          </div>
          <Swiper
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            direction="horizontal"
            className="flex w-[80%] justify-center"
            spaceBetween={80}
          >
            <SwiperSlide key={1}>
              <KanbanTableMobile
                data={userMachinesWithAvailableStatus}
                status="Available"
              />
            </SwiperSlide>
            <SwiperSlide key={2}>
              <KanbanTableMobile
                data={userMachinesWithServicedStatus}
                status="Serviced"
              />
            </SwiperSlide>
            <SwiperSlide key={3}>
              <KanbanTableMobile
                data={userMachinesWithRentedStatus}
                status="Rented"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <DataTable
          data={userMachinesWithAvailableStatus}
          header="Available Machines"
        />
        <DataTable
          data={userMachinesWithServicedStatus}
          header="Serviced Machines"
        />
        <DataTable
          data={userMachinesWithRentedStatus}
          header="Rented Machines"
        />
      </>
    );
};

export default KanbanBoardPanel;
