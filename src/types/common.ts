import { USER_ROLE } from "@/constants/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TUserRole = keyof typeof USER_ROLE;

export interface IDrawerItems {
  title: string;
  path?: string;
  is_parent?: Boolean;
  management?: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: IDrawerItems[];
  parent_Id?: string;
  state?: string;
  identifier?: string;
}

export type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TResponseSuccessType = {
  data: any;
  meta?: TMeta;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: TGenericErrorMessage;
};

export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type ResponseSuccessType = {
  data: any;
};

export type IGenericErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type TResponseDataObj = {
  data: Record<string, any>;
  message: string;
  success: boolean;
};

export type TSocialLinkPayload = {
  facebook?: string;
  twitter?: string;
  linkedIn?: string;
  instagram?: string;
};

// Props types for Address
export type TAddress = {
  countryId?: string;
  state?: string;
  city?: string;
  address_line?: string;
};

export type TDefaultMetaInfo = {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
};
