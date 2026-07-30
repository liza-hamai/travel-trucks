"use client";

import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { BsExclamationCircle } from "react-icons/bs";
import { useDebounce } from "use-debounce";
import { bookCamper } from "@/lib/api";
import css from "./BookingForm.module.css";

interface BookingValues {
  name: string;
  email: string;
}

interface BookingFormProps {
  camperId: string;
}

const initialValues: BookingValues = {
  name: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'\s-]+$/, "Name can contain only letters.")
    .min(2, "Name is too short.")
    .max(50, "Name is too long.")
    .required("Please enter your name."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
});

interface FieldWithErrorProps {
  name: keyof BookingValues;
  type?: string;
  placeholder: string;
}

function FieldWithError({ name, type = "text", placeholder }: FieldWithErrorProps) {
  const { errors } = useFormikContext<BookingValues>();

  const [debouncedError] = useDebounce(errors[name], 400);
  const hasError = Boolean(debouncedError);

  return (
    <div className={css.field}>
      {hasError && (
        <label className={css.label} htmlFor={name}>
          {placeholder}
        </label>
      )}
      <div className={css.inputWrapper}>
        <Field
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`${css.input} ${hasError ? css.inputError : ""}`}
        />
        {hasError && <BsExclamationCircle size={20} className={css.icon} />}
      </div>
      {hasError && <span className={css.error}>{debouncedError}</span>}
    </div>
  );
}

export default function BookingForm({ camperId }: BookingFormProps) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await bookCamper(camperId, values);
            toast.success("Booking successful! We will contact you soon.");
            resetForm();
          } catch {
            toast.error("Something went wrong. Please try again.");
          }
        }}
      >
        <Form className={css.form}>
          <FieldWithError name="name" placeholder="Name*" />
          <FieldWithError name="email" type="email" placeholder="Email*" />

          <button type="submit" className={css.button}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}