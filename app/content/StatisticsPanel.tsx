"use client";
import CalcualtionSummary from "../components/CalcualtionSummary";
import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useGetMachinesWithTimeDifference } from "../hooks/useGetMachinesWithTimeDifference";

const StatisticsPanel = () => {
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );
  const userMachinesWithTimeDifference =
    useGetMachinesWithTimeDifference(userMachines);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year <= currentYear + 10; year++) {
    years.push(year);
  }

  const [toggleSummary, setToggleSummary] = useState(true);
  const [selectInputsData, setSelectInputsData] = useState({
    year: currentYear,
    q: "Q1",
  });

  const toggleSummaryState = () => {
    setToggleSummary((prev) => !prev);
  };

  const updateInputsState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectInputsData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const filteredByYear = userMachinesWithTimeDifference.filter((item) => {
    const itemYear = item.startDate
      ? new Date(item.startDate)?.getFullYear().toString()
      : undefined;
    return itemYear === selectInputsData.year.toString();
  });

  const filteredByQuarter = filteredByYear.filter((item) => {
    if (!item.startDate || !item.endDate) return false;

    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);

    const selectedQuarter = getQuarter(selectInputsData.q);

    function getQuarter(q: string) {
      if (q === "Q1") return 1;
      else if (q === "Q2") return 2;
      else if (q === "Q3") return 3;
      else if (q === "Q4") return 4;
      return -1;
    }

    const startQuarter = Math.floor(startDate.getMonth() / 3) + 1;
    const endQuarter = Math.floor(endDate.getMonth() / 3) + 1;

    return startQuarter === selectedQuarter && endQuarter === selectedQuarter;
  });

  //   console.log(userMachinesWithTimeDifference);
  //   console.log(filteredByYear);
  //   console.log(filteredByQuarter);

  //   TODO: based on filteredByYear, filteredByQuarter calculate for both arrays expenses and income -> timeDiff * pph,
  //    calcualte balance = income - expenses, pass expenses and income for given q/year to components as props
  //    render and display statistics via recharts
  //    (in year mode) piechart and simple bar chart to represent exp,inc in given year (pass array with 2 objects representing inc, exp)
  //    (in quarters mode) piechart and simple bar chart to represent exp,inc in given Q (pass array with 2 objects representing inc, exp)
  //    (in quarters mode) for stackedbarchart filteredByQuarter must be filtered again to extract each month and for that month calcualte exp,inc ()

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full justify-around gap-4">
        <div className="relative my-4 w-1/2 text-sm sm:text-base">
          <select
            onChange={updateInputsState}
            name="year"
            id="year"
            className="w-full appearance-none border-b-2 border-lighterBlue bg-gray-900 px-2 py-3 leading-normal text-white focus:outline-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label
            htmlFor="year"
            className="pointer-events-none absolute -left-4 -top-5 px-4 text-white sm:-left-4 sm:-top-6"
          >
            Rok
          </label>
        </div>
        <div className="relative my-4 w-1/2 text-sm sm:text-base">
          <select
            onChange={updateInputsState}
            name="q"
            id="q"
            className="w-full appearance-none border-b-2 border-lighterBlue bg-gray-900 px-2 py-3 leading-normal text-white focus:outline-none"
          >
            <option key={"q1"} value="Q1">
              Q1
            </option>
            <option key={"q2"} value="Q2">
              Q2
            </option>
            <option key={"q3"} value="Q3">
              Q3
            </option>
            <option key={"q4"} value="Q4">
              Q4
            </option>
          </select>
          <label
            htmlFor="q"
            className="pointer-events-none absolute -left-4 -top-5 px-4 text-white sm:-left-4 sm:-top-6"
          >
            Kwartał
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div
          onClick={toggleSummaryState}
          className={`cursor-pointer border-2 border-gray-900 px-6 py-2 text-sm font-semibold sm:text-base  ${
            toggleSummary
              ? "bg-lighterBlue text-gray-900"
              : "bg-gray-800 text-lighterBlue"
          }`}
        >
          Roczne
        </div>
        <div
          onClick={toggleSummaryState}
          className={`cursor-pointer border-2 border-gray-900 px-6 py-2 text-sm font-semibold sm:text-base  ${
            !toggleSummary
              ? "bg-lighterBlue text-gray-900"
              : "bg-gray-800 text-lighterBlue"
          }`}
        >
          Kwartalne
        </div>
      </div>
      {toggleSummary ? (
        <CalcualtionSummary
          header={"Zestawienie roczne"}
          income={3}
          expenses={1}
        />
      ) : (
        <CalcualtionSummary
          header={"Zestawienie kwartalne"}
          income={3}
          expenses={1}
        />
      )}
    </div>
  );
};

export default StatisticsPanel;
