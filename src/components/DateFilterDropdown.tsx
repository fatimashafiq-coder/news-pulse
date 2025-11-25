import { Formik, Form, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validationSchema } from "../schema/validationSchema";

interface DateFilterDropdownProps {
  onSelect: (startDate: string, endDate: string) => void;
}

const DateFilterDropdown = ({ onSelect }: DateFilterDropdownProps) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const dateValidationSchema = validationSchema(todayString);
  
  const initialValues = {
    startDate: "",
    endDate: "",
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={dateValidationSchema}
        onSubmit={(values) => {
          onSelect(values.startDate,  values.endDate);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center w-full">
            <div className="flex flex-col w-full sm:w-auto">
              <DatePicker
                onChange={(date) =>
                  setFieldValue(
                    "startDate",
                    date ? date.toISOString().split("T")[0] : ""
                  )
                }
                selected={values.startDate ? new Date(values.startDate) : null}
                maxDate={today}
                className="
                  px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  text-gray-700 text-sm w-full
                "
                placeholderText="Start date"
              />
            
            </div>
            <p className="hidden sm:block font-medium text-gray-600 text-sm">
              to
            </p>
            <div className="flex flex-col w-full sm:w-auto">
              <DatePicker
                onChange={(date) =>
                  setFieldValue(
                    "endDate",
                    date ? date.toISOString().split("T")[0] : ""
                  )
                }
                   selected={values.endDate ? new Date(values.endDate) : null}
             
                maxDate={today}
                className="
                  px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  text-gray-700 text-sm w-full
                "
                placeholderText="End date"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <button
              type="submit"
              className="
                w-full sm:w-auto px-4 py-2 bg-black text-white font-semibold 
                rounded-lg shadow-md hover:bg-gray-800 transition-colors 
                text-sm mt-2 sm:mt-0
              "
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
