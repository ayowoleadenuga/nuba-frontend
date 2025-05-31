import { useDispatch } from "react-redux";
import { resetSettingsForm } from "@/redux/features/settings-slice";
import {
  changePasswordSettingsSchema,
  updateUserProfileSchema,
} from "@/utils/validator";
import { nubaApis } from "@/services/api-services";
import { SettingsErrorState } from "@/types";
import { useChangePasswordMutation, useUpdateUserProfileMutation } from "@/redux/features/userApiSlice";

type BaseProps = {
  setErrors: React.Dispatch<React.SetStateAction<SettingsErrorState>>;
};

type SettingsSubmitProps =
  | (BaseProps & {
      currentTab: "Security";
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    })
  | (BaseProps & {
      currentTab: "Details";
      firstName: string;
      lastName: string;
      phoneNumber: string;
    });

export const useSettingsSubmit = (props: SettingsSubmitProps) => {
  const dispatch = useDispatch();
  const [changePasswordMutation] = useChangePasswordMutation();
  const [updateUserProfileMutation] = useUpdateUserProfileMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (props.currentTab === "Security") {
      const { oldPassword, newPassword, confirmPassword, setErrors } = props;

      const result = changePasswordSettingsSchema.safeParse({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      if (!result.success) {
        const errorMessages: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          errorMessages[err.path[0] as string] = err.message;
        });
        setErrors(errorMessages);
        return;
      }

      setErrors({});
      await nubaApis.changePassword.handleChangePassword(
        {
          current_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        changePasswordMutation
      );
      dispatch(resetSettingsForm());
    }

    if (props.currentTab === "Details") {
      const { firstName, lastName, phoneNumber, setErrors } = props;

      const result = updateUserProfileSchema.safeParse({
        firstName,
        lastName,
        phoneNumber,
      });

      if (!result.success) {
        const errorMessages: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          errorMessages[err.path[0] as string] = err.message;
        });
        setErrors(errorMessages);
        return;
      }

      setErrors?.({});
      await nubaApis.updateUserProfile.handleUpdateUserProfile(
        {
          firstName,
          lastName,
          phone: phoneNumber,
        },
        updateUserProfileMutation
      );
    }
  };

  return { handleSubmit };
};
