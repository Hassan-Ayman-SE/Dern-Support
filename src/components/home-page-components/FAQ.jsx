import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Seperator from "./Seperator";

const questions = [
  {
    question: "What services does TechEase provide?",
    answer:
      "TechEase offers comprehensive IT support, including on-site technical assistance, remote troubleshooting, and equipment repairs. We are dedicated to ensuring your tech systems run smoothly.",
  },
  {
    question: "How can I request tech support?",
    answer:
      "To request tech support, use our online service portal or contact our support team directly. We'll arrange for a technician to address your needs promptly.",
  },
  {
    question: "What if I need more help than initially requested?",
    answer:
      "If additional support is needed beyond your initial request, our technician will discuss further options and any associated costs with you during the service visit.",
  },
  {
    question: "Do you offer remote assistance for tech issues?",
    answer:
      "Yes, TechEase provides remote support through our TechEase Connect service. Our experts can securely access your system to resolve issues from afar.",
  },
  {
    question: "How can I manage my TechEase account?",
    answer:
      "Manage your TechEase account by logging into our customer portal. You can update your personal details, track service requests, and view your service history.",
  },
];

export default function FAQ() {
  const [openStates, setOpenStates] = useState(
    Array(questions.length).fill(false)
  );

  const handleClick = (index) => {
    const updatedOpenStates = [...openStates];
    updatedOpenStates[index] = !openStates[index];
    setOpenStates(updatedOpenStates);
  };

  return (
    <div className="container mx-auto mb-24 bg-customBlueLight p-6 rounded-lg shadow-lg">
      <div className="lg:px-32 px-4 mb-10">
        <Seperator
          heading="FAQ"
          text="Get answers to frequently asked questions about our services and how we can assist you."
        />
        {questions.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="question flex items-center justify-between p-4 bg-customWhite rounded-lg shadow-md border border-customBlueDark">
              <h4 className="font-semibold text-customBlueDark">{item.question}</h4>
              <button
                onClick={() => handleClick(i)}
                className="focus:outline-none text-customBlueLight"
              >
                {openStates[i] ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
            <div
              className={`answer ${openStates[i] ? "block" : "hidden"
                } p-4 bg-customWhite text-customDarkGray rounded-lg shadow-inner mt-2 border border-customBlueDark`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
