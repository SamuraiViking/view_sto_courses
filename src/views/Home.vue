<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      {{ term.year }}
      {{ term.semester }}
      <!-- {{ termCourses }} -->
      <div v-for="course in termCourses">
        {{ course.name }} {{ course.days }} {{ course.times }} 
      </div>
      <div>
        <button v-on:click="changeSemester(-1)">Prev Semester</button>
        <button v-on:click="changeSemester(1)">Next Semester</button>
      </div>
      <div>
        <button v-if="year > 2015" v-on:click="changeYear(-1)">Prev Year</button>
        <button v-on:click="changeYear(1)">Next Year</button>
      </div>
      <div>
        <button v-on:click="changeDraft(-1)">Prev Draft</button>
        <button v-on:click="changeDraft(-1)">Next Draft</button>
      </div>
    </div>
    <div>
      <div v-if="coursesAvaiable" v-for="course in courses">
        <hr>
        <p>
          {{ course.name }} {{ course.days }} {{ course.times }} 
          <button v-on:click="addCourse(course)">Add Course</button>
        </p>
      </div>
      <div v-if="!coursesAvaiable">
        <p>Not yet available</p>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      year: 2019,
      semester: 1,
      courses: '',
      termCourses: 'term courses',
      term: '',
      coursesAvaiable: true
    };
  },
  created: function() {
    axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
      this.term = response.data;
      this.term = this.term[0];
      console.log(this.term.id);
      axios.get(`api/terms/${this.term.id}/courses`).then(response => {
        this.termCourses = response.data;
        this.termCourses = this.termCourses;
      });
    });
    axios.get('api/courses?type=class').then(response => {
      this.courses = response.data.courses;
    });
  },
  methods: {
    changeSemester: function(change) {
      if (this.semester + change > 5 && this.year < 2022) {
        this.year += 1;
        this.semester = 1;
      } else if (this.semester + change < 1 && this.year > 2015) {
        this.year -= 1;
        this.semester = 5;
      } else if (this.semester + change <= 5 && this.semester + change >= 1) {
        this.semester += change;
      }
      this.getTerm();
    },
    changeYear: function(change) {
      if (this.year + change <= 2022 && this.year + change >= 2015) {
        this.year += change;
        this.getTerm();
      }
    },
    getTerm: function() {
      axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
        this.term = response.data;
        this.term = this.term[0];
      });
      this.getCourses();
      this.getTermCourses(this.term.id);
    },
    getTermCourses: function() {
      axios.get(`api/terms/${this.term.id}/courses`).then(response => {
        this.termCourses = response.data; 
      });
    },
    getCourses: function() {
      axios.get(`api/courses?term=${this.year}${this.semester}&type=class`).then(response => {
        this.coursesAvaiable = true;
        this.courses = response.data.courses;
        if (this.courses.length === 0) {
          this.coursesAvaiable = false;
        }
      });
    },
    addCourse: function(theCourse) {
      axios.post(`api/course_terms?course_id=${theCourse.id}&term_id=${this.term.id}`).then(response => {
        this.getTermCourses();
      });
    },
  }
};
</script>
