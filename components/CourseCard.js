import React from 'react';

export const CourseCard = ({ title, logo, link, short }) => {
  return (
    <div className="bg-white flex inline-flex w-full m-4 rounded-lg shadow-md hover:shadow-lg p-4 max-w-4xl h-24">
      <img src={logo} alt={short} className="h-16 w-16 mx-2 my-2 self-start" />
      <h2 className="font-bold font-sans text-base sm:text-lg mx-2 sm:mx-6 md:mx-10 my-auto ">
        {title}
      </h2>
    </div>
  );
};
