import { TDefaultMetaInfo } from "@/types";

export const create_social_link_default_values = {
  facebook: "",
  twitter: "",
  linkedIn: "",
  instagram: "",
};

export const create_address_default_values = {
  countryId: "",
  // divisionId: "",
  // districtId: "",
  state: "",
  city: "",
  address_line: "",
};

export const create_private_user_default_values = {
  departmentId: "",
  web_mail: "",
  phone: "",
  designationId: "",
  name: "",
  email: "",
  gender: "",
};

export const create_admin_default_values = {
  password: "",
  admin: create_private_user_default_values,
  present_address: create_address_default_values,
  permanent_address: create_address_default_values,
  social_links: create_social_link_default_values,
};

export const create_employee_default_values = {
  password: "",
  employee: create_private_user_default_values,
  present_address: create_address_default_values,
  permanent_address: create_address_default_values,
  social_links: create_social_link_default_values,
};

export const create_team_member_default_values = {
  name: "",
  departmentId: "",
  designationId: "",
  description: "",
  socialLink: create_social_link_default_values,
};

export const default_meta_info: TDefaultMetaInfo = {
  og_author: "Hotchpotch Innovations Ltd",
  meta_title: "Hotchpotch Innovations Ltd",
  meta_description:
    "Hotchpotch Innovations is a leading IT, design, and software development company based in Bangladesh. Established in 2016, we deliver high-quality software and services guided by the principles of consultancy, brainstorming, continuous innovation, and precise execution. Our service models include hiring individual specialists, assembling complete teams, and managing projects. Our company is known for its technological expertise and collaborative approach to project management, specializing in creating bespoke technology solutions and innovative digital experiences for clients worldwide.",
  meta_keywords:
    "Hotchpotch Innovations Ltd, IT Firm, Software, Web Application, Mobile App, eCommerce, UI & UX Design, Design, Events, Content, Digital Marketing, Architecture, IT Firm in uttara, IT Firm in Dhaka",
};

export const formsAndTemplateTypeValue = "forms_&_template";
