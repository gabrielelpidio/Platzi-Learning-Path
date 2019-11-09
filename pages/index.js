import React, { useState } from 'react';
import Head from 'next/head';
import '../styles/main.css';
import { CourseCard } from '../components/CourseCard';
import { data, initialCourses } from '../db/db.json';
import { CourseSelector } from '../components/CourseSelector';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const handleSelectorClick = course => {
    setCourses([...courses, course]);
    console.log(courses);
    setRecommended(
      filterRecommended(course.recommended, courses.map(course => course.id))
    );
  };

  const filterRecommended = (recommendedList, coursesIdList) =>
    recommendedList.filter(
      recommendedId => coursesIdList.indexOf(recommendedId) === -1
    );

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <span>Platzi Learning Path</span>
      </header>

      <main className="sm:flex">
        <div className="m-5 sm:w-1/2">
          <h1 className="text-2xl">
            Crea tu propia ruta de aprendizaje con Platzi
          </h1>
          <CourseSelector
            coursesId={
              recommended.length === 0 && courses.length === 0
                ? initialCourses
                : recommended
            }
            handleClick={handleSelectorClick}
          />
        </div>
        {courses.length !== 0 && (
          <div className="container flex flex-wrap mx-auto justify-center sm:w-1/2 ">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                title={course.name}
                logo={`/${course.asset}`}
                short=" "
              />
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        header {
          background: #253a46;
          width: 100%;
          height: 52px;
          color: #fff;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
        }
        header > span {
          margin: 10px;
        }
        .formbox {
          margin: 10px;
        }
      `}</style>
      <style jsx global>{`
        body {
          font-family: 'lato';
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Home;
