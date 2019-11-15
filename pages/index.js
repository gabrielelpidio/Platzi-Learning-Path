import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

import Head from 'next/head';
import '../styles/main.css';
import { CourseCard } from '../components/CourseCard';
import { data, initialCourses } from '../db/db.json';
import userMockup from '../db/userMock.json';
import { CourseSelector } from '../components/CourseSelector';

const AnimatedCourseCard = animated(CourseCard);

const Home = () => {
  const [user, setUser] = useState({
    ...userMockup
  });
  const [courses, setCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const showCardTransition = useTransition(courses, courses => courses.id, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  const handleSelectorClick = course => {
    setCourses([...courses, course]);
    console.log(courses);
    setRecommended(
      filterRecommended(
        course.recommended,
        courses.map(course => course.id)
      )
    );
  };

  const filterRecommended = (recommendedList, coursesIdList) =>
    recommendedList.filter(
      recommendedId => coursesIdList.indexOf(recommendedId) === -1
    );

  return (
    <div className="">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full h-64">
        <div className="bg-platzi w-full h-56 shadow-md flex justify-center font-header border-b-8 border-green-500">
          <h1 className="text-2xl text-white my-auto text-center">
            {`Crea tu propia ruta de aprendizaje ${user.name}`}
          </h1>
        </div>
        <div className="rounded-full">
          <img
            src={user.image}
            alt=""
            className="rounded-full h-24 mx-auto -my-12 shadow-lg"
          />
        </div>
      </header>

      <article className="sm:block">
        <div className="m-5 sm:w-full">
          <CourseSelector
            coursesId={
              recommended.length === 0 && courses.length === 0
                ? initialCourses
                : recommended
            }
            handleClick={handleSelectorClick}
          />
        </div>

        <animated.div className="container flex flex-wrap mx-auto justify-center sm:w-full  ">
          {showCardTransition.map(({ item, key, props }) => {
            return (
              <animated.div key={key} style={props}>
                <AnimatedCourseCard
                  key={key}
                  title={item.name}
                  logo={`/${item.asset}`}
                  style={props}
                  short=" "
                />
              </animated.div>
            );
          })}
          <CourseCard title={data[4].name} logo={data[4].asset} />
        </animated.div>
      </article>
    </div>
  );
};

export default Home;
