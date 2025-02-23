import { connect } from "mongoose";
import cron from "node-cron";
import Salary from "./models/salary.model";
import { mongodbUri } from "./config";
import dayjs from "dayjs";
import { SalaryType } from "./types/salary.type";

async function updateDebtsForMonthlySalaries() {
  try {
    await connect(mongodbUri);

    const salaries = await Salary.find({ salaryType: SalaryType.PERMONTH });

    if (salaries.length === 0) {
      console.log("Не найдено записей с типом зарплаты 'за месяц'.");
      return;
    }

    for (const salary of salaries) {
      const totalPerMonth = salary.pricings.reduce((sum, pricing) => {
        return sum + (pricing.perMonth || 0);
      }, 0);

      salary.debt += totalPerMonth;

      await salary.save();
      console.log(
        `Обновлен долг для работника ${salary.workerName} ${salary.workerSurname}`
      );
    }

    const formattedDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    console.log(
      `Обновление долгов завершено для всех соответствующих записей. Дата завершения: ${formattedDate}`
    );
  } catch (error) {
    console.error("Ошибка при обновлении долгов:", error);
  }
}

cron.schedule("0 0 1 * *", () => {
  console.log("Запуск скрипта обновления долгов в первый день месяца...");
  updateDebtsForMonthlySalaries();
});
