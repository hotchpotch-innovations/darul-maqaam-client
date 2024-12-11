export type ContentData = {
  title: string;
  data: string[];
};

export type AboutDataItem = {
  menu: string;
  content: ContentData[];
};

export type AboutData = AboutDataItem[];

export type TGalleray = {
  menu: string;
  images: string[];
}[];

export type TMakeChange = {
  _id: string;
  image: string;
  found: string;
  donationDetails: string;
};
export type TGalleraySection = {
  _id: string;
  image: string;
};
