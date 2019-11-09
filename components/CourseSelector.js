import React, { useState } from 'react';
import { getCourseById } from '../utils/dbUtils';

export const CourseSelector = ({ coursesId, handleClick }) => {
  const [show, setShow] = useState(false);
  const courses = coursesId.map(id => getCourseById(id));
  return (
    <div>
      <button
        className="bg-green-600 text-white p-2 rounded-lg"
        onClick={() => setShow(true)}
      >
        Añadir Curso
      </button>
      {show && courses.length !== 0 && (
        <ul className="container w-full m-2 shadow-lg py-1 relative">
          {courses.map(course => (
            <li
              className="flex flex-no-wrap my-2"
              key={course.id}
              onClick={() => handleClick(course)}
            >
              <img
                className="w-12 h-12 mx-2"
                src={course.asset}
                alt={course.short}
              />
              <span className="my-auto">{course.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
