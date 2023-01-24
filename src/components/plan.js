function Plan(props) {
  const {
    planImg,
    planName,
    planPrice,
    selectPlan,
    selectedPlan,
    offer,
    yearlyPlan,
  } = props;
  return (
    <div
      className={`px-4 pt-6 pb-4 border border-light-gray rounded-md cursor-pointer hover:border-purplish-blue ${
        selectedPlan === planName && "bg-alabaster border-purplish-blue"
      }`}
      onClick={() => selectPlan({ name: planName, price: planPrice })}
    >
      <img className="mb-10" src={planImg} alt={planName} />
      <h2 className="text-lg text-marine-blue font-ubuntu-bold">{planName}</h2>
      <p className="text-cool-gray">
        ${planPrice}
        {yearlyPlan ? "/yr" : "/mo"}
      </p>
      {offer && <p className="text-marine-blue text-sm">{offer}</p>}
    </div>
  );
}

export default Plan;
