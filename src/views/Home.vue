<template>
  <div class="home">
    <h1>{{ message }}</h1>
    {{ term.year }}
    {{ term.semester }}
    <div>
      <button v-on:click="changeSemester(-1)">Prev Semester</button>
      <button v-on:click="changeSemester(1)">Next Semester</button>
    </div>
    <div>
      <button v-on:click="changeYear(-1)">Prev Year</button>
      <button v-on:click="changeYear(1)">Next Year</button>
    </div>
    <div>
      <button v-on:click="changeDraft(-1)">Prev Draft</button>
      <button v-on:click="changeDraft(-1)">Next Draft</button>
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
      year: 2018,
      semester: 1,
      term_courses: '',
      term: '',
    };
  },
  created: function() {
    axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
      this.term = response.data;
      this.term = this.term[0];
    });
  },
  methods: {
    getTerm: function() {
      axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
        this.term = response.data;
        this.term = this.term[0];
      });
    },
    getTerm: function() {
      
    }
    changeSemester: function(change) {
      if (this.semester + change <= 4 && this.semester + change >= 1) {
        this.semester += change;
        this.getTerm();
      }
    },
    changeYear: function(change) {
      if (this.year + change <= 2021 && this.year + change >= 2018) {
        this.year += change;
        this.getTerm();
      }
    },
  }
};
</script>
