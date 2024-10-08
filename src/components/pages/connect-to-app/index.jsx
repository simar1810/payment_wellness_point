import { useState } from "react";
import ConnectAppStep1 from "./Step1";
import ConnectAppStep2 from "./Step2";
import ConnectAppStep3 from "./Step3";

const ConnectToApp = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    mobileOrEmail: "",
    otp: "",
  });

  const ConnectAppSteps = {
    1: ConnectAppStep1,
    2: ConnectAppStep2,
    3: ConnectAppStep3,
  };

  console.log(data);

  const StepComponent = ConnectAppSteps[step];

  return (
    <StepComponent
      data={data}
      loading={loading}
      setData={setData}
      setLoading={setLoading}
      setStep={setStep}
    />
  );
};

export default ConnectToApp;
