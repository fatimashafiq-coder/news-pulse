import { type Article } from "../types/article";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../schema/validationSchema";

interface DateFilterDropdownProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

const DateFilterDropdown = ({ articles, onFilter }: DateFilterDropdownProps) => {
  const initialValues = {
    startDate: "",
    endDate: "",
  };

  const today = new Date().toISOString().split("T")[0];
  const dateValidationSchema = validationSchema(today);

  const handleSubmit = (values: typeof initialValues) => {
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    end.setHours(23, 59, 59, 999);

    const filtered = articles.filter((article) => {
      const articleDate = new Date(article.publishedAt);
      return articleDate >= start && articleDate <= end;
    });

    onFilter(filtered);
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
              <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
            </div>

            <p className="font-medium">to</p>

            <div className="flex flex-col">
              <Field
                type="date"
                name="endDate"
                className="border p-1"
                max={today}
              />
              <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="border px-3 py-1 bg-blue-500 text-white rounded">
              Filter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DateFilterDropdown;
