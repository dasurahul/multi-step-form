import { useState, useEffect } from "react";

import images from "./assets/images";

import Input from "./components/input";
import Plan from "./components/plan";
import AddOn from "./components/addOn";

const { sidebarDesktop, arcade, advanced, pro, thankYou } = images;

const steps = [
  {
    id: 1,
    stepNumber: 1,
    stepName: "YOUR INFO",
  },
  {
    id: 2,
    stepNumber: 2,
    stepName: "SELECT PLAN",
  },
  {
    id: 3,
    stepNumber: 3,
    stepName: "ADD-ONS",
  },
  {
    id: 4,
    stepNumber: 4,
    stepName: "SUMMARY",
  },
];

const plans = [
  {
    id: 1,
    planImg: arcade,
    planName: "Arcade",
    monthlyPlanPrice: 9,
    yearlyPlanPrice: 90,
  },
  {
    id: 2,
    planImg: advanced,
    planName: "Advanced",
    monthlyPlanPrice: 12,
    yearlyPlanPrice: 120,
  },
  {
    id: 3,
    planImg: pro,
    planName: "Pro",
    monthlyPlanPrice: 15,
    yearlyPlanPrice: 150,
  },
];

const addOns = [
  {
    id: 1,
    title: "Online service",
    subTitle: "Access to multiplayer games",
    monthlyAddOnPrice: 1,
    yearlyAddOnPrice: 10,
  },
  {
    id: 2,
    title: "Larger Storage",
    subTitle: "Extra 1TB of cloud save",
    monthlyAddOnPrice: 2,
    yearlyAddOnPrice: 20,
  },
  {
    id: 3,
    title: "Customizable profile",
    subTitle: "Custom theme on your profile",
    monthlyAddOnPrice: 2,
    yearlyAddOnPrice: 20,
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(steps[0]["id"]);
  const [input, setInput] = useState({ name: "", email: "", phonenumber: "" });
  const { name, email, phonenumber } = input;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");
  const [yearlyPlan, setYearlyPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    name: plans[0]["planName"],
    price: yearlyPlan
      ? plans[0]["yearlyPlanPrice"]
      : plans[0]["monthlyPlanPrice"],
  });
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [confirm, setConfirm] = useState(false);
  function personalInfoHandler() {
    if (name.trim().length === 0) {
      setNameError("This field is required");
    } else if (email.trim().length === 0 || !email.includes("@")) {
      setEmailError("This field is required");
    } else if (
      phonenumber.trim().length === 0 ||
      phonenumber.trim().length < 10 ||
      phonenumber.trim().length > 10
    ) {
      setPhonenumberError("This field is required");
    } else {
      setCurrentStep((step) => step + 1);
    }
  }
  function inputHandler(event) {
    setInput((input) => ({
      ...input,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "name") {
      setNameError("");
    } else if (event.target.name === "email") {
      setEmailError("");
    } else {
      setPhonenumberError("");
    }
  }
  function goBack() {
    setCurrentStep((currentStep) => currentStep - 1);
  }
  function planHandler() {
    if (!selectedPlan.name) {
      return;
    }
    setCurrentStep((currentStep) => currentStep + 1);
  }
  function addOnsHandler() {
    setCurrentStep((currentStep) => currentStep + 1);
  }
  function confirmHandler() {
    setConfirm(true);
  }
  useEffect(() => {
    setSelectedPlan((selectedPlan) => {
      const planPrice = yearlyPlan
        ? plans.find((plan) => plan.planName === selectedPlan.name)
            ?.yearlyPlanPrice
        : plans.find((plan) => plan.planName === selectedPlan.name)
            ?.monthlyPlanPrice;
      return { ...selectedPlan, price: planPrice };
    });
    setSelectedAddOns((selectedAddOns) => {
      return selectedAddOns.map((selectedAddOn) => {
        const addOnPrice = yearlyPlan
          ? addOns.find((addOn) => addOn.title === selectedAddOn.name)
              .yearlyAddOnPrice
          : addOns.find((addOn) => addOn.title === selectedAddOn.name)
              .monthlyAddOnPrice;
        return { ...selectedAddOn, price: addOnPrice };
      });
    });
  }, [yearlyPlan]);
  const totalPrice =
    selectedPlan.price +
    selectedAddOns.reduce((total, addOn) => {
      return total + addOn.price;
    }, 0);
  return (
    <div className="min-h-screen flex justify-center items-center bg-magnolia font-ubuntu-regular">
      <div className="w-3/4 flex bg-white p-4 rounded-md">
        <div className="w-[274px] h-[568px] py-10 px-8 flex flex-col gap-4 relative">
          <img
            className="absolute inset-0"
            src={sidebarDesktop}
            alt="sidebar"
          />
          {steps.map((step) => {
            return (
              <div key={step.id} className="flex gap-4 items-center z-10">
                <div
                  className={`${
                    step.stepNumber === currentStep
                      ? "bg-light-blue"
                      : "text-white border border-white"
                  } w-8 h-8 flex justify-center items-center rounded-full`}
                >
                  {step.stepNumber}
                </div>
                <div>
                  <div className="text-cool-gray text-sm">
                    STEP {step.stepNumber}
                  </div>
                  <p className="text-white">{step.stepName}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          <div className="w-3/4 mx-auto h-full flex flex-col justify-between">
            {currentStep === 1 && !confirm && (
              <>
                <div>
                  <h1 className="text-3xl text-marine-blue font-ubuntu-bold mt-8 mb-4">
                    Personal info
                  </h1>
                  <p className="text-cool-gray">
                    Please provide your name, email address, and phone number.
                  </p>
                  <div className="flex flex-col gap-4 mt-8">
                    <Input
                      labelName="Name"
                      errorName={nameError}
                      inputName="name"
                      inputType="text"
                      inputPlaceholder="e.g. Stephen King"
                      inputValue={name}
                      inputHandler={inputHandler}
                    />
                    <Input
                      labelName="Email Address"
                      errorName={emailError}
                      inputName="email"
                      inputType="email"
                      inputPlaceholder="e.g. stephenking@lorem.com"
                      inputValue={email}
                      inputHandler={inputHandler}
                    />
                    <Input
                      labelName="Phone Number"
                      errorName={phonenumberError}
                      inputName="phonenumber"
                      inputType="text"
                      inputPlaceholder="e.g. 1234567890"
                      inputValue={phonenumber}
                      inputHandler={inputHandler}
                    />
                  </div>
                </div>
                <button
                  className="self-end bg-marine-blue text-white font-ubuntu-medium py-3 px-6 rounded-md hover:brightness-150 mb-4"
                  onClick={personalInfoHandler}
                >
                  Next Step
                </button>
              </>
            )}
            {currentStep === 2 && !confirm && (
              <>
                <div>
                  <h1 className="text-3xl text-marine-blue font-ubuntu-bold mt-8 mb-4">
                    Select your plan
                  </h1>
                  <p className="text-cool-gray">
                    You have the option of monthly or yearly billing.
                  </p>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="grid grid-cols-3 gap-4">
                      {plans.map((plan) => {
                        const {
                          planImg,
                          planName,
                          monthlyPlanPrice,
                          yearlyPlanPrice,
                        } = plan;
                        return (
                          <Plan
                            key={plan.id}
                            planImg={planImg}
                            planName={planName}
                            planPrice={
                              yearlyPlan ? yearlyPlanPrice : monthlyPlanPrice
                            }
                            selectPlan={setSelectedPlan}
                            selectedPlan={selectedPlan.name}
                            offer={yearlyPlan && "2 months free"}
                            yearlyPlan={yearlyPlan}
                          />
                        );
                      })}
                    </div>
                    <div className="bg-alabaster flex justify-center items-center gap-4 p-4 my-4 rounded-md">
                      <div
                        className={`${
                          yearlyPlan ? "text-cool-gray" : "text-marine-blue"
                        } font-ubuntu-medium`}
                      >
                        Monthly
                      </div>
                      <div>
                        <label className="relative inline-block w-[50px] h-[25px]">
                          <input
                            className="opacity-0 w-0 h-0"
                            type="checkbox"
                            checked={yearlyPlan}
                            onChange={() =>
                              setYearlyPlan((yearlyPlan) => !yearlyPlan)
                            }
                          />
                          <span
                            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-marine-blue transition-all before:content-[''] before:absolute before:h-[15px] before:w-[15px] before:left-[5px] before:bottom-[5px] before:bg-white before:transition-all ${
                              yearlyPlan && "before:translate-x-[25px]"
                            } rounded-[25px] before:rounded-[50%]`}
                          ></span>
                        </label>
                      </div>
                      <div
                        className={`${
                          yearlyPlan ? "text-marine-blue" : "text-cool-gray"
                        } font-ubuntu-medium`}
                      >
                        Yearly
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <button
                    className="text-cool-gray font-ubuntu-medium hover:text-marine-blue"
                    onClick={goBack}
                  >
                    Go Back
                  </button>
                  <button
                    className="self-end bg-marine-blue text-white font-ubuntu-medium py-3 px-6 rounded-md hover:brightness-150"
                    onClick={planHandler}
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}
            {currentStep === 3 && !confirm && (
              <>
                <div>
                  <h1 className="text-3xl text-marine-blue font-ubuntu-bold mt-8 mb-4">
                    Pick add-ons
                  </h1>
                  <p className="text-cool-gray">
                    Add-ons help enhance your gaming experience.
                  </p>
                  <div className="flex flex-col gap-4 mt-8">
                    {addOns.map((addOn) => {
                      return (
                        <AddOn
                          key={addOn.id}
                          title={addOn.title}
                          subTitle={addOn.subTitle}
                          price={
                            yearlyPlan
                              ? addOn.yearlyAddOnPrice
                              : addOn.monthlyAddOnPrice
                          }
                          selectAddOns={setSelectedAddOns}
                          selectedAddOns={selectedAddOns}
                          yearlyPlan={yearlyPlan}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <button
                    className="text-cool-gray font-ubuntu-medium hover:text-marine-blue"
                    onClick={goBack}
                  >
                    Go Back
                  </button>
                  <button
                    className="self-end bg-marine-blue text-white font-ubuntu-medium py-3 px-6 rounded-md hover:brightness-150"
                    onClick={addOnsHandler}
                  >
                    Next Step
                  </button>
                </div>
              </>
            )}
            {currentStep === 4 && !confirm && (
              <>
                <div>
                  <h1 className="text-3xl text-marine-blue font-ubuntu-bold mt-8 mb-4">
                    Finishing up
                  </h1>
                  <p className="text-cool-gray">
                    Double-check everything looks OK before confirming.
                  </p>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="bg-alabaster p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-lg text-marine-blue font-ubuntu-medium">
                            {selectedPlan.name}{" "}
                            {yearlyPlan ? "(Yearly)" : "(Monthly)"}
                          </span>
                          <span
                            className="text-cool-gray hover:text-purplish-blue underline cursor-pointer"
                            onClick={() => setCurrentStep(2)}
                          >
                            Change
                          </span>
                        </div>
                        <div>
                          <span className="text-lg text-marine-blue font-ubuntu-medium">
                            ${selectedPlan.price}
                            {yearlyPlan ? "/yr" : "/mo"}
                          </span>
                        </div>
                      </div>
                      {selectedAddOns.length > 0 && (
                        <div className="bg-light-gray h-[1px] my-6"></div>
                      )}
                      <div className="flex flex-col gap-4">
                        {selectedAddOns.map((addOn) => {
                          return (
                            <div
                              key={addOn.name}
                              className="flex justify-between"
                            >
                              <span className="text-cool-gray">
                                {addOn.name}
                              </span>
                              <span className="text-marine-blue">
                                +${addOn.price}
                                {yearlyPlan ? "/yr" : "/mo"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <span className="text-cool-gray">
                        Toal {yearlyPlan ? "(per year)" : "(per month)"}
                      </span>
                      <span className="text-xl text-purplish-blue font-ubuntu-bold">
                        +${totalPrice}
                        {yearlyPlan ? "/yr" : "/mo"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <button
                    className="text-cool-gray font-ubuntu-medium hover:text-marine-blue"
                    onClick={goBack}
                  >
                    Go Back
                  </button>
                  <button
                    className="self-end bg-purplish-blue text-white font-ubuntu-medium py-3 px-6 rounded-md hover:brightness-150"
                    onClick={confirmHandler}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
            {confirm && (
              <div className="h-full w-3/4 mx-auto flex flex-col justify-center items-center">
                <img className="mb-8" src={thankYou} alt="thank you" />
                <h1 className="text-3xl text-marine-blue font-ubuntu-bold mb-4">
                  Thank you!
                </h1>
                <p className="text-cool-gray text-center">
                  Thanks for confirming your subscription! We hope you have fun
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
