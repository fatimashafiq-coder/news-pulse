import * as Yup from "yup";

export const validationSchema = (today: string) => {
  return Yup.object({
    startDate: Yup.date()
      .max(Yup.ref("endDate"), "Start date cannot be after end date"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .max(today, "End date cannot be in the future"),
  });
};
