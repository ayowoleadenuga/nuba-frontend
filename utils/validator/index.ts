import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must be digits only"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(1, "Subject is required"),
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
    referralCode: z.string().optional(),
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
    rentAddress: z.string().min(1, "Rent address is required"),
    rentName: z.string().min(1, "Rent name is required"),
  })
  .refine(
    data => data.endDate >= data.startDate,
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
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
    // newAccountNumber: z.string().min(1, "Account number is required"),
    newCountry: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal or zipcode is required"),
    address1: z.string().optional(),
    address2: z.string().optional(),
    newCity: z.string().min(1, "City is required"),
    state: z.string().min(1, "State or Province or Region is required"),
    cardName: z.string().min(1, "Card name is required"),
  })
  .refine(data => data.address1?.trim() || data.address2?.trim(), {
    message: "At least one address is required",
    path: ["address1"],
  });

export const supportClientFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(1, "Please describe your issue"),
});

export const changePasswordSettingsSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password is required with a minimum of 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })

  .refine(data => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const paymentSchema = z.object({
  country: z.string().min(1, "Country is required"),
  postcode: z.string().min(1, "Postcode is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  address_2: z.string().optional(),
  state: z.string().min(1, "State is required"),
  cardName: z.string().min(1, "Please enter card holder name"),
  cardNumber: z.string().min(11, "Minimum of 11 digits is required"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  mmYY: z.string().min(4, "Expiry date is required"),
});

export const updateUserProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must be digits only"),
});

export const updateDueDateSchema = z.object({
  rentDueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid rent due date",
  }),
});

export const newRentSchema = z
  .object({
    country: z.string().min(1, "Country is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    rentFrequency: z.string().min(1, "Rent frequency is required"),
    monthlyPrice: z.string().min(1, "Monthly rent amount is required"),
    address: z.string().min(1, "Address is required"),
    landlordAccountName: z.string().min(1, "Account name is required"),
    landlordAccountNumber: z.string().min(1, "Account number is required"),
    landlordSortCode: z.string().min(1, "Sort code is required"),
    rentName: z.string().min(1, "Appartment name is required"),
    rentAddress: z.string().min(1, "Rent address is required"),
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
