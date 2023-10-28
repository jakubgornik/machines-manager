import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(/^\d{3}$/, "Enter 3 digit number")
    .required("Password number is required"),
});
