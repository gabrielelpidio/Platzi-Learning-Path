import React, { useState } from 'react';
import { getCourseById } from '../utils/dbUtils';
import { MdAdd } from 'react-icons/md/';
import { useSpring, a, useTransition } from 'react-spring';

const AnimatedMdAdd = a(MdAdd);

export const CourseSelector = ({ coursesId, handleClick }) => {
  const [show, setShow] = useState(false);
  const rotateAnimation = useSpring({
    transform: show ? `rotate(${45}deg)` : `rotate(${0}deg)`,
    config: {
      friction: 10,
      clamp: true
    }
  });
  const showListTransition = useTransition(show, null, {
    from: {
      transform: `translate3d(0, ${-20}px , 0)`,
      transformOrigin: '0 0',
      opacity: 0
    },
    enter: {
      transform: `translate3d(0, ${0} ,0)`,
      opacity: 1
    },
    leave: {
      transform: `translate3d(0, ${-20}px ,0)`,
      opacity: 0
    }
  });
  const courses = coursesId.map(id => getCourseById(id));

  return (
    <div className="max-w-md w-full h-12 relative">
      <div className="container absolute z-10">
        <button
          className="bg-green-600 h-12 w-12 shadow-md text-white p-2 rounded-full font-san flex justify-center text-2xl focus:outline-none"
          onClick={() => setShow(!show)}
        >
          <AnimatedMdAdd style={rotateAnimation} />
        </button>
        {showListTransition.map(
          ({ item, key, props }) =>
            item && (
              <a.ul
                className="container w-full m-2 shadow-lg py-1 rounded-lg bg-white"
                style={props}
                key={key}
              >
                {courses.length === 0 ? (
                  <li className="flex flex-no-wrap my-2 w-full h-12 text-center justify-center align-middle">
                    No hay mas cursos en mi base de datos :(
                  </li>
                ) : (
                  courses.map(course => (
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
                  ))
                )}
              </a.ul>
            )
        )}
      </div>
    </div>
  );
};
