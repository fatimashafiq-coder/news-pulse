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
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={dateValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center w-full">
          <div className="flex flex-col w-full sm:w-auto">
            <Field
              type="date"
              name="startDate"
              className="
                px-3 py-2
                border border-gray-300
                rounded-lg
                shadow-sm
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
                focus:border-blue-400
                transition
                text-gray-700
                text-sm
                w-full
               
              "
            />
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <p className="hidden sm:block font-medium text-gray-600 text-sm">to</p>
          
          <div className="flex flex-col w-full sm:w-auto">
            <Field
              type="date"
              name="endDate"
              max={today}
              className="
                px-3 py-2
                border border-gray-300
                rounded-lg
                shadow-sm
                focus:outline-none
                focus:ring-2 focus:ring-blue-400
                focus:border-blue-400
                transition
                text-gray-700
                text-sm
                w-full
              "
            />
            <ErrorMessage
              name="endDate"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            className="
              w-full sm:w-auto
              px-4 py-2 
              bg-black text-white 
              font-semibold rounded-lg 
              shadow-md hover:bg-gray-800 
              transition-colors duration-200 
              text-sm tracking-wide
              mt-2 sm:mt-0
            "
          >
            Filter
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default DateFilterDropdown;