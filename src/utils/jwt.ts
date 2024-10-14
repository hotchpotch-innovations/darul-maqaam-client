import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};

const data = {
  name: "sohag",
  district: "gazipur",
  divisititon: "dhaka",
  social_links: {
    facebook: "https://www.facebook.com/momen.info",
    instagram: null,
    linkedIn: null,
    twitter: null,
  },
  web_mail: null,
};
