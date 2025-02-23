import { model, Schema } from "mongoose";
import { ISalary, SalaryType } from "../types/salary.type";
import { Currency } from "../types/currency.type";

const SalarySchema = new Schema<ISalary>(
  {
    workerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    workerName: {
      type: String,
      required: true,
    },
    workerSurname: {
      type: String,
      required: false,
    },
    salaryType: {
      type: String,
      enum: Object.values(SalaryType),
      required: true,
    },
    salaryCurrency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
    },
    pricings: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          required: false,
        },
        for: {
          type: Schema.Types.ObjectId,
          required: false,
        },
        machineId: {
          type: Schema.Types.ObjectId,
          required: false,
        },
        forName: {
          type: String,
          required: true,
        },
        perUnit: {
          type: Number,
          required: false,
        },
        perMonth: {
          type: Number,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
    paid: {
      type: Number,
      default: 0,
    },
    debt: {
      type: Number,
      default: 0,
    },
    periodStart: {
      type: String,
      required: false,
    },
    lastUpdate: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Salary = model<ISalary>("Salary", SalarySchema);

export default Salary;
