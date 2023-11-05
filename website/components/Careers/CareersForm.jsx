import React from "react";

const CareersForm = ({ context }) => {
  const [firstName, setFirstName] = React.useState("");

  return (
    <div className="mb-20 mt-14 flex text-[18px] gap-10">
      <div className="w-1/2 flex flex-col items-left">
        <div className="text-[5rem] font-semibold mb-6">
          {context.title1} <br /> {context.title2}
        </div>
        <img src="/team.jpeg" className="h-[50%] object-cover rounded-3xl" />
      </div>

      <div className="w-[50%]">
        <div className="flex justify-between gap-10">
          <div className="w-full">
            <div className="text-sm mb-1">{context.one}</div>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="bg-white w-full border-2 border-primary-blue py-2 px-5 rounded-lg"
            />
          </div>

          <div className="w-full">
            <div className="text-sm mb-1">{context.two}</div>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Doe"
              className="bg-white w-full border-2 border-primary-blue py-2 px-5 rounded-lg"
            />
          </div>
        </div>

        <div className="w-full mt-3">
          <div className="text-sm mb-1">{context.three}</div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="johndoe@gmail.com"
            className="bg-white w-full border-2 border-primary-blue py-2 px-5 rounded-lg"
          />
        </div>

        <div className="w-full mt-3">
          <div className="text-sm mb-1">{context.four}</div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="080-1234-5678"
            className="bg-white w-full border-2 border-primary-blue py-2 px-5 rounded-lg"
          />
        </div>

        <div className="w-full mt-3">
          <div className="text-sm mb-1">{context.five}</div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="150-2345 Tokyo-to, Shibuya-ku, Hommachi 2 choume, 4-7, Sunny Mansion 203."
            className="bg-white w-full border-2 border-primary-blue py-2 px-5 rounded-lg"
          />
        </div>

        <div className="w-full mt-3">
          <div className="text-sm mb-1">{context.six}</div>
          <textarea
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={context.sixSub}
            className="bg-white w-full border-2 border-primary-blue py-2 px-5 rounded-lg"
          />
        </div>

        <button className="mt-3 bg-primary-blue rounded-md w-full flex items-center justify-center text-white py-3">
          {context.seven}
        </button>
      </div>
    </div>
  );
};

export default CareersForm;
