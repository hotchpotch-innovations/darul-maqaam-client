type TGenderOptions = {
  value: string;
  label: string;
};

export const gender_options: TGenderOptions[] = [
  { value: "", label: "ALL" },
  { value: "MALE", label: "MALE" },
  { value: "FEMALE", label: "FEMALE" },
  { value: "OTHERS", label: "OTHERS" },
];

export const account_types_options: TGenderOptions[] = [
  { value: "individual", label: "Individul" },
  { value: "company", label: "Company" },
];

export interface AccountTypeOption {
  label: string;
  value: string;
}

// Define the account type options array with the correct type
export const account_type_options: AccountTypeOption[] = [
  {
    label: "All",
    value: "",
  },
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

export const dev_super_admin_user_role_options: AccountTypeOption[] = [
  {
    label: "All",
    value: "",
  },
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

export const user_status_options: AccountTypeOption[] = [
  {
    label: "ALL",
    value: "",
  },
  {
    label: "Activated",
    value: "ACTIVATED",
  },
  {
    label: "Blocked",
    value: "BLOCKED",
  },
];
