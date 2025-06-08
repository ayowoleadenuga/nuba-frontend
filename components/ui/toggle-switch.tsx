interface ToggleSwitchProp {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  discount: number | undefined;
}
const ToggleSwitch: React.FC<ToggleSwitchProp> = ({
  isOn,
  setIsOn,
  discount,
}) => {
  return (
    <button
      disabled={discount !== undefined && discount < 1}
      className={`w-10 h-[28px] flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
        isOn ? "bg-[#000000] " : "bg-gray-300"
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`bg-white w-4 h-5 rounded-full shadow-md transform transition duration-300 ${
          isOn ? "translate-x-4" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default ToggleSwitch;
