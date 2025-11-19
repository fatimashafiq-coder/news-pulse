import * as Yup from "yup";

export const validationSchema = (today: string) => {
  return Yup.object({
    startDate: Yup.date()
      .required("Start date is required")
      .max(Yup.ref("endDate"), "Start date cannot be after end date"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .max(today, "End date cannot be in the future"),
  });
};
