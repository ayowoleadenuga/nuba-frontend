import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must be digits only"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(1, "Message is required"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password is required"),
});

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.date(),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must be digits only"),
    email: z.string().email("Please provide a valid email address"),
    homeAddress: z.string().min(1, "Home address is required"),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(1, "Post code is required"),
    password: z
      .string()
      .min(8, "Password is required with a minimum of 8 characters"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const tenancyDetailsSchema = z
  .object({
    country: z.string().min(1, "Country is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    rentFrequency: z.string().min(1, "Rent frequency is required"),
    monthlyRentAmt: z.string().min(1, "Monthly rent amount is required"),
  })
  .refine(
    data => data.endDate >= data.startDate,
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"], // this will show the error under endDate
    }
    // checkAgreement: z.boolean().refine(val => val === true, {
    //   message: "You must agree to the terms and conditions",
    // }),
  );

export const agentDetailsSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  sortCode: z.string().min(1, "Sort code is required"),
});

export const newPaymentSchema = z
  .object({
    cardInfo: z.string().min(1, "Card information is required"),
    monthYear: z.string().min(1, "Month/Year of expiry is required"),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    newAccountNumber: z.string().min(1, "Account number is required"),
    newCountry: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal or zipcode is required"),
    address1: z.string().optional(),
    address2: z.string().optional(),
    newCity: z.string().min(1, "City is required"),
    state: z.string().min(1, "State or Province or Region is required"),
  })
  .refine(data => data.address1?.trim() || data.address2?.trim(), {
    message: "At least one address is required",
    path: ["address1"],
  });

export const supportClientFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please provide a valid email address"),
  issue: z.string().min(1, "Please describe your issue"),
});

export const changePasswordSettingsSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Password is required with a minimum of 8 characters"),
    newPassword: z.string(),
  })
  .refine(data => data.oldPassword === data.newPassword, {
    path: ["newPassword"],
    message: "Passwords do not match",
  });
