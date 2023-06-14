import React, { useState } from "react";
import { addData } from "../../firebase/firestore";
import { flagType } from "../../types";

export default function Addcard() {

  const [cardType, setCardType] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardHint, setCardHint] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function onchangeCardType(e: React.ChangeEvent<HTMLSelectElement>){
    setCardType(e.target.value);
  };
  function onchangeCardDescription(e: React.ChangeEvent<HTMLInputElement>){
    setCardDescription(e.target.value);
  }
  function onchangeCardHint(e: React.ChangeEvent<HTMLInputElement>){
    setCardHint(e.target.value);
  }

  async function handleAddCard(e: React.MouseEvent){
    e.preventDefault();
    setButtonDisabled(true);
    console.log("cardType", cardType);
    console.log("cardDescription", cardDescription);
    console.log("cardHint", cardHint);
    await addData(cardType ? flagType.redFlags : flagType.whiteFlags, cardDescription, cardHint);
    setButtonDisabled(false);
  }

  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="card-type"
          >
            Card Type
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="card-type"
              required={true}
              onChange={onchangeCardType}
              value={cardType}
            >
              <option value={1}>Red flag</option>
              <option value={0}>White flag</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="card-description"
          >
            Card Description
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="card-description"
            type="text"
            placeholder=""
            required={true}
            value={cardDescription}
            onChange={onchangeCardDescription}
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="card-hint"
          >
            Card hint
          </label>
          <input
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="card-hint"
            type="text"
            placeholder=""
            value={cardHint}
            onChange={onchangeCardHint}
          />
          <p className="text-gray-600 text-xs italic">
            Card hint will be displayed on the card for specific use cases &
            guidelines
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <button className="bg-purple-500 border rounded px-6 py-2" onClick={handleAddCard} disabled={buttonDisabled}>Add</button>
      </div>
    </form>
  );
}
