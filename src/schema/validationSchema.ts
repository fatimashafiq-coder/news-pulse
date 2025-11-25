import * as Yup from "yup";

export const validationSchema = (today: string) => {
  return Yup.object({
    startDate: Yup.date()
      .max(Yup.ref("endDate"),"Start Date cannot be after the end date"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .required()
      .max(today, "End date cannot be in the future"),
  });
};
