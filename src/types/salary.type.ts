import { Document, Types } from "mongoose";
import { Currency } from "./currency.type";

export enum SalaryType {
  PERUNIT = "за единицу",
  PERMONTH = "за месяц",
}
export interface IPricing {
  _id?: Types.ObjectId;
  for?: Types.ObjectId;
  machineId?: Types.ObjectId;
  forName: string;
  perUnit?: number;
  perMonth?: number;
  quantity?: number;
}

export interface ISalary extends Document {
  workerId: Types.ObjectId;
  workerName: string;
  workerSurname: string;
  salaryType: SalaryType;
  salaryCurrency: Currency;
  pricings: IPricing[];
  paid: number;
  debt: number;
  periodStart?: string;
  lastUpdate?: string;
  isActive: boolean;
}
