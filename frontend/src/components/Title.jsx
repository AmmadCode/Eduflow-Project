import React from "react";

const Title = ({ text1, text2, text3, text4 }) => {
  return (
    <div className="text-center mb-14">
      <span className="text-lg font-bold uppercase tracking-widest text-emerald-500  mb-3 block">
        {text1}
      </span>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {text2}
        <span className="text-emerald-500 italic"> {text3}</span>
      </h2>
      <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
        {text4}
      </p>
    </div>
  );
};

export default Title;
