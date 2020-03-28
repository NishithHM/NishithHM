import React, { Component } from "react";
import "./courses.css";
import { CourseCard } from "../../components";
class Courses extends Component {
  render() {
    return (
      <div className="course-container">
        <h2 className='course-header'>List of Courses</h2>
        <CourseCard {...this.props}/>
        <CourseCard/>
        <CourseCard/>
      </div>
    );
  }
}

export default Courses;
