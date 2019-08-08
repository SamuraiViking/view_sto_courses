<template>
  <div class="home">

    <!-- Planner -->
    <div id="planner">
      <!-- Display Term -->
      <div id="show-term">
        {{ term.year }} {{ term.semester }}
      </div>
      <!-- Change Term -->
      <div id="change-term">
        <div id="change-semester">
          Semester
          <button v-on:click="changeSemester(-1)"> < </button>
          <button v-on:click="changeSemester(1)"> > </button>
        </div>
        <div id="change-year">
          Year:
          <button v-if="year > 2015" v-on:click="changeYear(-1)"> < </button>
          <button v-on:click="changeYear(1)"> > </button>
        </div>
    <hr>
      </div>
      <!-- User Term Courses -->
      <div v-for="course in termCourses">
        {{ course.name }} {{ course.days }} {{ course.times }}
        <button v-on:click="removeCourse(course)"> Remove Course </button>
      </div>
    </div>

    <hr>


    <!-- Selectors -->
    <div>
      <!-- Department Selector -->
      <form>
        <select v-model="departmentParam">
          <option v-for="department in departments" v-bind:value="department.value">
            {{ department.text }}
          </option>
        </select>
      </form>
      <!-- Types Selector -->
      <form>
        <select v-model="typeParam">
          <option v-for="type in types" v-bind:value="type.value">
            {{ type.text }}
          </option>
        </select>
      </form>
      <!-- Days Selector -->
      <form>
        <select v-model="daysParam">
          <option v-for="day in days" v-bind:value="day.value">
            {{ day.text }}
          </option>
        </select>
      </form>
      <!-- Level Selector -->
      <form>
        <select v-model="levelParam">
          <option v-for="level in levels" v-bind:value="level.value">
            {{ level.text }}
          </option>
        </select>
      </form>
      <!-- Search Button -->
      <button v-on:click="selectedCourses()">Search</button>
    </div>

    <!-- Display Courses -->
    <div id="availableCourses">
      <div v-if="coursesAvaiable" v-for="course in courses">
        <hr>
        <!-- Display Course -->
        <div id="availableCourse">
            <div id="names"> {{ course.name }} </div>
            <div>{{ course.department }} </div>
            <div> {{ course.days }} </div>
            <div id="times"> {{ course.times }} </div> 
            <div>{{ course.status }} </div>
            <div><button v-on:click="addCourse(course)">Add Course</button></div>
            <div><button v-on:click="addCourse(course)">more info</button></div>
            <!-- More info -->
            <div v-if="moreInfo">
              <div>{{ course.description }}</div>
            </div>
        </div>
      </div>
      <!-- No courses found message -->
      <div v-if="noCourses()">
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
      moreInfo: false,
      year: 2019,
      semester: 1,
      courses: [],
      termCourses: '',
      term: '',
      coursesAvaiable: true,

      // Params
      departmentParam: '',
      typeParam: '',
      daysParam: '',
      levelParam: '',

      // Select Options
      levels: [
        {text: 'all levels', value: ''},
        {text: '100', value: '100'},
        {text: '200', value: '200'},
        {text: '300', value: '300'}
      ],
      days: [
        {text: 'all days', value: ''},
        {text: 'MWF', value: 'MWF'},
        {text: 'TTh', value: 'TTh'},
        {text: 'M-F', value: 'M-F'},
      ],
      types: [
        {text: 'all types', value: ''},
        {text: 'class', value: 'class'},
        {text: 'lab', value: 'lab'},
        {text: 'Independent Study', value: 'IS'},
        {text: 'Independent Research', value: 'IR'},
        {text: 'Academic Internship', value: 'AI'},
      ],
      departments: [
        {text: "all departments", value: ''},
        {text: "africa and the americas", value: "AFAM"},
        // {text: "alternate language study option", value: "ALSO"},
        {text: "american con", value: "AMCON"},
        {text: "american conversation", value: "AMCON"},
        // {text: "american racial and multicultural studies", value: "ARMS"},
        {text: "american studies", value: "AMST"},
        {text: "art and art history", value: "ART"},
        {text: "asian studies", value: "ASIAN"},
        {text: "biology", value: "BIO"},
        {text: "biomedical studies", value: "BMED"},
        {text: "biomolecular science", value: "BMOLS"},
        {text: "chemistry", value: "CHEM"},
        {text: "chinese", value: "CHIN"},
        {text: "classics", value: "CLASS"},
        {text: "computer science", value: "CSCI"},
        {text: "dance", value: "DANCE"},
        {text: "economics", value: "ECON"},
        {text: "education", value: "EDUC"},
        {text: "english", value: "ENGL"},
        {text: "environmental studies", value: "ENVST"},
        {text: "exercise science activity", value: "ESAC"},
        {text: "exercise science theory", value: "ESTH"},
        {text: "family studies", value: "FAMST"},
        {text: "film studies", value: "FILM"},
        {text: "french", value: "FREN"},
        {text: "gender studies", value: "WMGST"},
        {text: "german", value: "GERM"},
        {text: "great con", value: "GCON"},
        {text: "greek", value: "GREEK"},
        {text: "hispanic studies", value: "HSPST"},
        {text: "history", value: "HIST"},
        {text: "integrative studies", value: "IS"},
        {text: "interdepartmental", value: "INTD"},
        {text: "interdisciplinary fine arts", value: "IDFA"},
        {text: "interdisciplinary", value: "ID"},
        {text: "japanese", value: "JAPAN"},
        {text: "latin", value: "LATIN"},
        {text: "linguistics", value: "LNGST"},
        {text: "management studies", value: "MGMT"},
        {text: "math/stat/csci", value: "MSCS"},
        {text: "mathematics", value: "MATH"},
        {text: "media studies", value: "MEDIA"},
        {text: "medieval studies", value: "MEDVL"},
        {text: "music performance", value: "MUSPF"},
        {text: "music", value: "MUSIC"},
        {text: "neuroscience", value: "NEURO"},
        {text: "norwegian", value: "NORW"},
        {text: "nursing", value: "NURS"},
        {text: "philosphy", value: "PHIL"},
        {text: "physics", value: "PHYS"},
        {text: "political science", value: "PSCI"},
        {text: "psychology", value: "PSYCH"},
        {text: "religion", value: "REL"},
        {text: "russian studies", value: "RUSSN"},
        {text: "science conversation", value: "SCICN"},
        {text: "social work", value: "SWRK"},
        {text: "sociology and anthropology", value: "SOAN"},
        {text: "spanish", value: "SPAN"},
        {text: "statistics", value: "STAT"},
        {text: "theater", value: "THEAT"},
        {text: "womens and gender studies", value: "WMGST"},
        {text: "writing", value: "WRIT"}
      ]
    };
  },
  created: function() {
    axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
      this.term = response.data[0];
      this.termCourses = this.term.courses;
    });
    axios.get('api/courses?term=20191&type=class').then(response => {
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
      this.selectedCourses();
    },
    changeYear: function(change) {
      if (this.year + change <= 2022 && this.year + change >= 2015) {
        this.year += change;
        this.getTerm();
        this.selectedCourses();
      }
    },
    getTerm: function() {
      axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
        this.term = response.data[0];
        this.termCourses = this.term.courses;
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
        this.getTerm();
      });
    },
    removeCourse: function(theCourse) {
      axios.delete(`api/course_terms/${this.term.id}/${theCourse.id}`).then(response => {
        this.getTerm();
      });
    },
    selectedCourses: function() {

      var url = "api/courses?";

      var test = {
        term: `${this.year}${this.semester}`,
        type: this.typeParam,
        department: this.departmentParam,
        days: this.daysParam,
        level: this.levelParam
      };

      Object.keys(test).forEach(function(key) {
        var value = test[key];
        if (value) {
          url += (`${key}=${value}&`);
        }
      });

      url = url.slice(0, -1);

      console.log(url);

      axios.get(url).then(response => {
        this.courses = response.data.courses;
      });
    },
    noCourses: function() {
      console.log(`Length: ${this.courses.length}`);
      return this.courses.length === 0;
    }
  }
};
</script>
