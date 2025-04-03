import { JSX } from "react";

export type RevolutioniseListType = {
  type: string;
  price: string;
  button: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  height: string;
  bgUrl: string;
  color: string;
};

export interface ContactState {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
  selectedFile: File | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
