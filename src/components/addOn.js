import { useEffect, useState } from "react";
import images from "../assets/images";

function AddOn(props) {
  const { title, subTitle, price, selectAddOns, selectedAddOns, yearlyPlan } =
    props;
  const names = selectedAddOns.map((addOn) => addOn.name);
  const [checked, setChecked] = useState(() => {
    if (names.includes(title)) {
      return true;
    }
    return false;
  });
  function toggle() {
    setChecked((checked) => !checked);
  }
  useEffect(() => {
    if (checked) {
      if (names.includes(title)) {
        return;
      }
      selectAddOns((addOns) => [...addOns, { name: title, price: price }]);
    } else {
      selectAddOns((addOns) => {
        return addOns.filter((addOn) => addOn.name !== title);
      });
    }
  }, [checked, names, selectAddOns, title, price]);
  return (
    <div
      className={`flex items-center gap-6 p-6 border border-cool-gray rounded-md cursor-pointer hover:border-purplish-blue ${
        checked && "bg-alabaster"
      }`}
    >
      <div
        className={`p-1 border border-cool-gray rounded-md ${
          checked && "bg-purplish-blue"
        }`}
        onClick={toggle}
      >
        <img className="w-4 h-4" src={images.checkmark} alt="checkmark" />
      </div>
      <div>
        <h2 className="text-lg text-marine-blue font-ubuntu-medium">{title}</h2>
        <p className="text-cool-gray">{subTitle}</p>
      </div>
      <div className="ml-auto text-purplish-blue">
        +${price}
        {yearlyPlan ? "/yr" : "/mo"}
      </div>
    </div>
  );
}

export default AddOn;
