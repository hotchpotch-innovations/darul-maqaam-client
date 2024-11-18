import { z } from "zod";

export const adminValidationSchema = z.object({
  departmentId: z.string().nonempty("Department is required"),
  web_mail: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().email("Please enter a valid email").optional()
  ),
  designationId: z.string().nonempty("Degination is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
  name: z.string().min(1, "please enter name"),
  email: z.string().email("please enter a valid email"),
  gender: z.string().nonempty("gender is required"),
});

export const present_addressValidationSchema = z.object({
  countryId: z.string().nonempty("country is required"),
  divisionId: z.string().nonempty("division is required").optional(),
  districtId: z.string().nonempty("district is required").optional(),
  state: z.string().nonempty("State is required"),
  city: z.string().nonempty("City is required"),
  address_line: z.string().min(1, "please give address"),
});

export const social_linksValidationSchema = z.object({
  facebook: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Please enter a valid Facebook URL")
  ),
  twitter: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Please enter a valid Twitter URL").optional()
  ),
  linkedIn: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Please enter a valid LinkedIn URL").optional()
  ),
  instagram: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("Please enter a valid Instagram URL").optional()
  ),
});
