export enum tagTypes {
  client_type = "client-type",
  department = "department",
  designation = "designation",
  user = "user",
  profile = "profile",
  country = "country",
  division = "division",
  district = "district",
  admin = "admin",
  employee = "employee",
  client = "client",
}

// Defining the content, category, and authority as constant objects
export const contentTags = {
  menu: "menu",
  submenu: "submenu",
  webpage: "webpage",
  multiple_section: "multiple_section",
  single_section: "single_section",
  article: "article",
  team: "team",
  faq: "faq",
  forms: "forms_&_templates",
  common_category: "common_category",
  common_authority: "common_authority",
};

export const organizationTags = {
  organization: "organization",
  branch: "branch",
};

export const tagTypesList = [
  tagTypes?.client_type,
  tagTypes?.user,
  tagTypes?.department,
  tagTypes?.designation,
  tagTypes?.country,
  tagTypes?.division,
  tagTypes?.district,
  tagTypes?.profile,
  tagTypes?.admin,
  tagTypes?.employee,
  tagTypes?.client,

  // contents
  contentTags?.menu,
  contentTags?.submenu,
  contentTags?.webpage,
  contentTags?.multiple_section,
  contentTags?.single_section,
  contentTags?.article,
  contentTags?.team,
  contentTags?.faq,
  contentTags?.forms,
  contentTags?.common_category,
  contentTags?.common_authority,

  // organizations
  organizationTags?.organization,
  organizationTags?.branch,
];
