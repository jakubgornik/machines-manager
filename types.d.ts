import type { DefaultUser } from "next-auth";

type MachineData = {
  id: string;
  machineName: string;
  machineDesc: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  owner?: string;
  ownerMail?: string;
  pricePerHour?: number;
  ownerLocalization?: string;
};

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
  }
}
