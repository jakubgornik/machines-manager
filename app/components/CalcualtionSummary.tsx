const CalcualtionSummary = ({
  header,
  income,
  expenses,
}: {
  header: string;
  income: {
    name: string;
    calculated: number;
  };
  expenses: {
    name: string;
    calculated: number;
  };
}) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-gray-900 py-3 ">
        <span className="text-lg font-semibold text-lighterBlue sm:text-xl">
          {header}
        </span>
        <div className="w-full border-b border-gray-800 pb-2 text-center"></div>
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-around sm:gap-0">
          <span className="text-base font-semibold text-green-400 sm:text-lg">
            {`Przychody:  ${Math.floor(income.calculated)} zł`}
          </span>
          <span className="text-base font-semibold text-red-400 sm:text-lg">
            {`Wydatki:  ${Math.floor(expenses.calculated)} zł`}
          </span>
        </div>
        <div className="w-full border-b border-gray-800 pb-2 text-center"></div>
        <span className="text-base font-semibold text-white sm:text-lg">{`Bilans:  ${Math.floor(
          income.calculated - expenses.calculated,
        )} zł`}</span>
      </div>
    </div>
  );
};

export default CalcualtionSummary;
