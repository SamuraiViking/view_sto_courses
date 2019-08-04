<template>
  <div class="test">
    <h1>{{ message }}</h1>
    <p>{{ num_of_courses }} Search Results</p>
    <button v-on:click="getCourses('anything')">get courses</button>
    <div>
      <div v-for="course in courses">
        <hr>
        {{ course.name }}
        {{ course.id }}
        <button>Add Course</button>
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
      message: "Welcome to the courses page",
      courses: '',
      num_of_courses: '',
      type: ''
    };
  },
  created: function() {
    axios.get('api/courses').then(response => {
      this.courses = response.data.courses;
      this.num_of_courses = response.data.count;
    });
  },
  methods: {
    getCourses: function(input) {
      axios.get(`api/courses?type=${this.type}`).then(response => {
        this.courses = response.data.courses;
        this.num_of_courses = response.data.count;
      });
    }
  }
};
</script>