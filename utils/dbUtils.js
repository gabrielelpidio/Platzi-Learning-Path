import { data } from '../db/db';

export const getCourseById = id => {
  return data.find(course => course.id === id) || undefined;
};
