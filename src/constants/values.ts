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

export const create_branch_default_values = {
  name: "",
  email: "",
  web_mail: "",
  primary_phone: "",
  secondary_phone: "",
  primary_tel: "",
  secondary_tel: "",
  summary: "",
  branch_location: create_address_default_values,
};

export const create_single_wp_section_default_values = {
  webpageId: "",
  menubarId: "",
  submenuId: "",
  section_name: "",
  yt_video_url: "",
  section_slug: "",
  section_title: "",
  section_summary: "",
};

export const create_multiple_wp_section_default_values = {
  type: "",
  categoryId: "",
  title: "",
  summary: "",
};

export const create_article_default_values = {
  type: "",
  categoryId: "",
  title: "",
  summary: "",
};

export const default_meta_info: TDefaultMetaInfo = {
  og_author: "Md. Arman",
  meta_title: "Darul Maqaam Foundation",
  meta_description:
    "Darul Maqaam Foundation is a non-profit, non-political, and entirely charitable organization dedicated to human welfare. Following the ideals and footsteps of the teacher of humanity, liberator of mankind, and role model of generosity Prophet Muhammad (Saw), this organization is engaged in social reform, inculcation of great morality, establishing employment, poverty alleviation, low cost or free health care, expansion of Islamic teachings and culture, conducting multidisciplinary education projects, continuous program in building a clean mindset, above all using oral, written and modern media to make people obey Allah and abide by His Messenger (Saw).",
  meta_keywords: "Darul Maqaam Foundation, Foundation Organization, Donate",
};

export const formsAndTemplateTypeValue = "forms_&_template";
