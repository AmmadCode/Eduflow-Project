import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../Title";
import { getAllCourses } from "../../services/courseServices";
import CourseCard from "../CourseCard";

const CourseSection = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        // Sirf pehle 3 courses dikhao
        setCourses(data.courses.slice(0, 3));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container-main">
        <Title
          text1={"Top Picks"}
          text2={"Popular"}
          text3={"Courses"}
          text4={"Start with our most loved courses by thousands of students."}
          showButton={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/courses" className="btn-emerald text-sm">
            View All Courses →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
