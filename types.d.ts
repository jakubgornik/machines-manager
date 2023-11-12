type machineData = {
  id: string;
  machineName: string;
  machineDesc: string;
  status?: "Wolny" | "Wynajęty" | "Konserwacja";
  startDate?: Date;
  endDate?: Date;
  owner?: string;
  ownerMail?: string;
  pricePerHour?: number;
  ownerLocalization?: string;
};
