"use client";
import CalcualtionSummary from "../components/CalcualtionSummary";
import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUserMachines } from "../hooks/useGetUserMachines";
import { useGetMachinesWithTimeDifference } from "../hooks/useGetMachinesWithTimeDifference";
import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#4ade80", "#f87171"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
interface ExtendedMachineData extends machineData {
  timeDifference: number;
}

interface ResultItem {
  name: string;
  calculated: number;
}

const StatisticsPanel = () => {
  const userId = useGetUserId();
  const userMachines = useGetUserMachines(userId).filter(
    (machine) => machine !== null,
  );
  const userMachinesWithTimeDifference =
    useGetMachinesWithTimeDifference(userMachines);

  const currentYear = new Date().getFullYear();

  // to populate select input
  const years = [];
  for (let year = currentYear; year <= currentYear + 10; year++) {
    years.push(year);
  }

  const [selectInputsData, setSelectInputsData] = useState({
    year: currentYear,
    q: "Q1",
  });

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

  const calculateIncomeExpenses = (data: ExtendedMachineData[]) => {
    const calculatedIncome = data
      .filter(
        (item) =>
          item.status === "Wynajmowane" && item.pricePerHour !== undefined,
      )
      .reduce((acc, item) => {
        if (item.pricePerHour) {
          return acc + item.pricePerHour * item.timeDifference;
        }
        return acc;
      }, 0);

    const calculatedExpenses = data
      .filter(
        (item) =>
          item.status === "Serwisowane" && item.pricePerHour !== undefined,
      )
      .reduce((acc, item) => {
        if (item.pricePerHour) {
          return acc + item.pricePerHour * item.timeDifference;
        }
        return acc;
      }, 0);

    return [
      { name: "income", calculated: Math.floor(calculatedIncome) },
      { name: "expenses", calculated: Math.floor(calculatedExpenses) },
    ];
  };

  // Data for basic charts, representing incomes and expenses in given year/quarter
  const dataInGivenYear = calculateIncomeExpenses(filteredByYear);
  const dataInGivenQuarter = calculateIncomeExpenses(filteredByQuarter);

  const convertToCombinedObject = (
    dataArray: ResultItem[],
  ): { name: string; expenses: number; income: number } => {
    return dataArray.reduce(
      (acc, item) => {
        if (item.name === "income") {
          acc.income = item.calculated;
        } else if (item.name === "expenses") {
          acc.expenses = item.calculated;
        }
        return acc;
      },
      { name: "Expenses and income", expenses: 0, income: 0 },
    );
  };

  const combinedDataInGivenYear = convertToCombinedObject(dataInGivenYear);
  const combinedDataInGivenQuarter =
    convertToCombinedObject(dataInGivenQuarter);

  const quarterByMonths = (filteredByQuarter: ExtendedMachineData[]) => {
    const firstMonth: ExtendedMachineData[] = [];
    const secondMonth: ExtendedMachineData[] = [];
    const thirdMonth: ExtendedMachineData[] = [];

    filteredByQuarter.forEach((item) => {
      if (!item.endDate) return false;
      const endDate = new Date(item.endDate);
      const month = endDate.getMonth() % 3;

      switch (month) {
        case 0:
          firstMonth.push(item);
          break;
        case 1:
          secondMonth.push(item);
          break;
        case 2:
          thirdMonth.push(item);
          break;
        default:
          break;
      }
    });

    return [firstMonth, secondMonth, thirdMonth];
  };

  const eachMonthOfQuarter = quarterByMonths(filteredByQuarter);

  const calculateExpensesIncomeForEachMonthOfQuarter = (
    eachMonthOfQuarter: ExtendedMachineData[][],
  ) => {
    const result = eachMonthOfQuarter.map((month, index) => {
      let expenses = 0;
      let income = 0;

      month.forEach((item) => {
        if (item.status === "Wynajmowane" && item.pricePerHour !== undefined) {
          income += item.pricePerHour * item.timeDifference;
        } else if (
          item.status === "Serwisowane" &&
          item.pricePerHour !== undefined
        ) {
          expenses += item.pricePerHour * item.timeDifference;
        }
      });

      return {
        name: `Month ${index + 1}`,
        expenses: Math.floor(expenses) || 0,
        income: Math.floor(income) || 0,
      };
    });

    return result;
  };

  const eachMonthOfQuarterData =
    calculateExpensesIncomeForEachMonthOfQuarter(eachMonthOfQuarter);

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
      <CalcualtionSummary
        header={"Zestawienie roczne"}
        income={dataInGivenYear[0]}
        expenses={dataInGivenYear[1]}
      />

      <div className="flex w-full flex-col items-center justify-around gap-4 sm:flex-row">
        <BarChart
          width={300}
          height={300}
          data={[combinedDataInGivenYear]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4ade80" />
          <Bar dataKey="expenses" fill="#f87171" />
        </BarChart>

        <PieChart width={300} height={300}>
          <Pie
            data={dataInGivenYear}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#73abd1"
            dataKey="calculated"
          >
            {dataInGivenYear.map((en, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      <CalcualtionSummary
        header={"Zestawienie kwartalne"}
        income={dataInGivenQuarter[0]}
        expenses={dataInGivenQuarter[1]}
      />

      <div className="flex w-full flex-col items-center justify-around gap-4 sm:flex-row">
        <BarChart
          width={300}
          height={300}
          // data={dataInGivenQuarter}
          data={[combinedDataInGivenQuarter]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Bar dataKey="calculated" fill="#73abd1" /> */}
          <Bar dataKey="income" fill="#4ade80" />
          <Bar dataKey="expenses" fill="#f87171" />
        </BarChart>

        <PieChart width={300} height={300}>
          <Pie
            data={dataInGivenQuarter}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#73abd1"
            dataKey="calculated"
          >
            {dataInGivenYear.map((en, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="hidden w-full justify-center overflow-hidden mobile:flex">
        <div className="h-[300px] w-[300px] sm:w-[500px] ">
          <ResponsiveContainer className="h-full w-full ">
            <BarChart
              // width={300}
              // height={300}
              data={eachMonthOfQuarterData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" stackId="a" fill="#4ade80" />
              <Bar dataKey="expenses" stackId="a" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
