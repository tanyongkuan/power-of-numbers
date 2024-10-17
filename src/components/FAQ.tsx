"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What is a Life Path Number?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Your Life Path Number is calculated from your date of birth and reveals
        your life's purpose and strengths.
      </div>
    ),
  },
  {
    question: "How do I calculate my Life Path Number?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Simply enter your birthdate on our platform, and we will calculate it
        for you using numerology principles.
      </div>
    ),
  },
  {
    question: "Can I save my readings?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Yes! Once you create an account, all of your readings will be saved in
        your personal dashboard for easy access.
      </div>
    ),
  },
  {
    question: "I have another question",
    answer: (
      <div className="space-y-2 leading-relaxed">Cool, contact us by email</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="border-base-content/10 relative flex w-full items-center gap-2 border-t py-5 text-left text-base font-semibold md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`text-base-content flex-1 ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`ml-auto h-4 w-4 flex-shrink-0 fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center transform transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`origin-center rotate-90 transform transition duration-200 ease-out ${
              isOpen && "hidden rotate-180"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`overflow-hidden opacity-80 transition-all duration-300 ease-in-out`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-24 md:flex-row">
        <div className="flex basis-1/2 flex-col text-left">
          <p className="mb-4 inline-block font-semibold text-primary">FAQ</p>
          <p className="text-base-content text-3xl font-extrabold sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
