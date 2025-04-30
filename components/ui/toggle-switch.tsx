interface ToggleSwitchProp {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}
const ToggleSwitch: React.FC<ToggleSwitchProp> = ({ isOn, setIsOn }) => {
  return (
    <div
      className={`w-10 h-[28px] flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition duration-300 ${
        isOn ? "bg-[#000000] " : "bg-gray-300"
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`bg-white w-4 h-5 rounded-full shadow-md transform transition duration-300 ${
          isOn ? "translate-x-4" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
