import * as Yup from "yup";

export const gradeLevelValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Grade level name must be at least 2 characters")
    .required("Grade level name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
});

export const employeeValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[+]?[1-9]\d{7,14}$/, "Invalid phone number")
    .required("Phone is required"),

  country: Yup.string().trim().required("Country is required"),
  state: Yup.string().trim().required("State is required"),

  address: Yup.string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),

  role: Yup.string().trim().required("Role is required"),
  department: Yup.string().trim().required("Department is required"),

  gradeLevel: Yup.string().trim().required("Grade level is required"),
});
