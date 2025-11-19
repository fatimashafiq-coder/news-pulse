import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../schema/validationSchema";

interface DateFilterDropdownProps {
  onSelect: (startDate: string, endDate: string) => void;
}

const DateFilterDropdown = ({ onSelect }: DateFilterDropdownProps) => {
  const initialValues = {
    startDate: "",
    endDate: "",
  };

  const today = new Date().toISOString().split("T")[0];
  const dateValidationSchema = validationSchema(today);

  const handleSubmit = (values: typeof initialValues) => {
    onSelect(values.startDate, values.endDate);
  };

  return (
    <div className="flex gap-4 items-center mb-6 flex-wrap">
      <Formik
        initialValues={initialValues}
        validationSchema={dateValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex gap-4 items-center flex-wrap">
            <div className="flex flex-col">
              <Field type="date" name="startDate" className="border p-1" />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <p className="font-medium">to</p>

            <div className="flex flex-col">
              <Field
                type="date"
                name="endDate"
                className="border p-1"
                max={today}
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="border px-3 py-1 bg-blue-500 text-white rounded"
            >
              Filter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DateFilterDropdown;
