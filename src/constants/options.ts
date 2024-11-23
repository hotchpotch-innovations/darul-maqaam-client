export interface ISelectOption {
  label: string;
  value: string;
}

export const gender_options: ISelectOption[] = [
  { value: "MALE", label: "MALE" },
  { value: "FEMALE", label: "FEMALE" },
  { value: "OTHERS", label: "OTHERS" },
];

export const account_types_options: ISelectOption[] = [
  { value: "individual", label: "Individual" },
  { value: "company", label: "Company" },
];

// Define the account type options array with the correct type
export const account_type_options: ISelectOption[] = [
  {
    label: "Public",
    value: "PUBLIC",
  },
  {
    label: "Private",
    value: "PRIVATE",
  },
  {
    label: "Super",
    value: "SUPER",
  },
];

export const super_admin_account_type_options: ISelectOption[] = [
  {
    label: "Public",
    value: "PUBLIC",
  },
  {
    label: "Private",
    value: "PRIVATE",
  },
];

export const dev_super_admin_user_role_options: ISelectOption[] = [
  {
    label: "Dev Super Admin",
    value: "DEV_SUPER_ADMIN",
  },
  {
    label: "Super Admin",
    value: "SUPER_ADMIN",
  },
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Employee",
    value: "EMPLOYEE",
  },
  {
    label: "Client",
    value: "CLIENT",
  },
];

export const super_admin_user_role_options: ISelectOption[] = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Employee",
    value: "EMPLOYEE",
  },
  {
    label: "Client",
    value: "CLIENT",
  },
];

export const user_status_options: ISelectOption[] = [
  {
    label: "ACTIVATED",
    value: "ACTIVATED",
  },
  {
    label: "BLOCKED",
    value: "BLOCKED",
  },
];

export const multiple_page_section_types_options: ISelectOption[] = [
  {
    label: "Service",
    value: "service",
  },
  {
    label: "Product",
    value: "product",
  },
  {
    label: "Core Value",
    value: "core_value",
  },
];
