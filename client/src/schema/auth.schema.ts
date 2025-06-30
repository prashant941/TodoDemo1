import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("**Valid email required")
    .required("**Email is required"),
  password: yup
    .string()
    .min(6, "**Password must be at least 6 characters")
    .required("**Password is required"),
});
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});