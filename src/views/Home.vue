<template>
  <div class="home">

    <!-- Planner -->
    <div id="planner">
      <h1>{{ errors }}</h1>
      <!-- Display Term -->
      <div id="show-term">
        {{ userTerm.year }} {{ userTerm.semester }}
      </div>
      <!-- Change Term -->
      <div id="change-term">
        <div id="change-semester">
          Semester
          <button v-on:click="changeSemester(-1)"><</button>
          <button v-on:click="changeSemester(1)">></button>
        </div>
        <div id="change-year">
          Year:
          <button v-if="year > 2015" v-on:click="changeYear(-1)"> < </button>
          <button v-on:click="changeYear(1)"> > </button>
        </div>
    <hr>
      </div>
      <!-- User Term Courses -->
      <div v-for="course in userTermCourses">
        <div> {{ course.name }} </div>
        <div> {{course.instructors }} </div>
        <div> {{ course.times }} </div>
        <div> {{ course.days }} </div>
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

      <!-- First Ge1 Selector -->
      <form>
        <select v-model="ge1Param">
          <option v-for="ge in ges" v-bind:value="ge.value">
            {{ ge.text }}
          </option>
        </select>
      </form>

      <!-- First Ge2 Selector -->
      <form>
        <select v-model="ge2Param">
          <option v-for="ge in ges" v-bind:value="ge.value">
            {{ ge.text }}
          </option>
        </select>
      </form>

      <!-- First Ge2 Selector -->
      <form>
        <select v-model="statusParam">
          <option>C</option>
          <option>O</option>
        </select>
      </form>
    </div>

    <b-table striped hover :items="items" :fields="fields"></b-table>


    <!-- Search Bar -->
<!--     <div>    
      <p><input type="text" v-model="nameSearch" list="name"></p>
      <datalist id="name"><option v-for="course in filteredCourses">{{ course.name }}</option></datalist>
    </div> -->

<!--     <div>
      <button v-on:click="setSortAttribute('status')">Status</button>
      <button v-on:click="setSortAttribute('department')">Dept</button>
      <button v-on:click="setSortAttribute('number')">Num</button>
      <button v-on:click="setSortAttribute('section')">Sec</button>
      <button v-on:click="setSortAttribute('name')">Name</button>
      <button v-on:click="setSortAttribute('credits')">Cred</button>
      <button v-on:click="setSortAttribute('num_of_ges')">Ge</button>
      <button v-on:click="setSortAttribute('enrolled')">Enrolled</button>
      <button v-on:click="setSortAttribute('max')">Max</button>
      <button v-on:click="setSortAttribute('days')">Days</button>
      <button v-on:click="setSortAttribute('times')">Times</button>
      <button v-on:click="setSortAttribute('location')">Loc</button>
      <button v-on:click="setSortAttribute('instructors')">Prof</button>
      <button v-on:click="setSortAttribute('rating')">Rating</button>
      <button v-on:click="setSortAttribute('difficulty')">Difficulty</button>
      <button v-on:click="setSortAttribute('num_reviews')">Reviews</button>
    </div> -->

    <table class="table table-hover">
      <thead>
        <tr>
          <th @click="doSomething('status')" scope="col">Status</th>
          <th scope="col" v-on:click="setSortAttribute('department')">Dept</th>
          <!-- <th scope="col" v-on:click="setSortAttribute('number')">Num</th> -->
          <!-- <th scope="col" v-on:click="setSortAttribute('section')">Sec</th> -->  
          <th scope="col" v-on:click="setSortAttribute('name')">Name</th>
          <!-- <th scope="col" v-on:click="setSortAttribute('credits')">Cred</th> -->
          <th scope="col" v-on:click="setSortAttribute('num_of_ges')">Ge</th>
          <!-- <th scope="col" v-on:click="setSortAttribute('enrolled')">Enrolled</th> -->
          <!-- <th scope="col" v-on:click="setSortAttribute('max')">Max</th> -->
          <th scope="col" v-on:click="setSortAttribute('days')">Days</th>
          <th scope="col" v-on:click="setSortAttribute('times')">Times</th>
          <!-- <th scope="col" v-on:click="setSortAttribute('location')">Loc</th> -->
          <th scope="col" v-on:click="setSortAttribute('instructors')">Prof</th>
          <th scope="col" v-on:click="setSortAttribute('rating')">Rating</th>
          <th scope="col" v-on:click="setSortAttribute('difficulty')">Difficulty</th>
          <th scope="col" v-on:click="setSortAttribute('num_ratings')">Reviews</th>
        </tr>
      </thead>
      <tbody v-for="course in filterByParams()">
        <tr class="table-font">
          <th> {{ course.status }} </th>
          <th> {{ course.department }} {{ course.number }}{{ course.section }} </th> 
          <!-- <th> {{ course.number }}</th> -->
          <!-- <th> {{ course.section }} </th> -->
          <th> {{ course.name }} </th>
          <!-- <th> {{ course.credits }} </th> -->
          <th> {{ course.gereqs }} </th>
          <!-- <th> {{ course.enrolled }}</th> -->
          <!-- <th> {{ course.max }}</th> -->
          <th> {{ course.days }} </th>
          <th> {{ course.times }} </th> 
          <!-- <th> {{ course.location }}</th> -->
          <th> {{ course.instructors }} </th>
          <th> {{ course.rating }} </th>
          <th> {{ course.difficulty }} </th>
          <th> {{ course.num_ratings }} </th>
          <th><button v-on:click="addCourse(course)"> + </button></th>
          <th><button v-on:click="moreInfo(course)">more</button></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {

      fields: ['first_name', 'last_name', 'age'],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],

      errors: [],
      year: 2019,
      semester: 1,
      userTerm: '',
      statusParam: '',

      allTermCourses: [],
      userTermCourses: [],
      filteredCourses: [],

      moreInfoCourse: '',
      nameSearch: '',

      // Params
      departmentParam: '',
      typeParam: 'class',
      daysParam: '',
      levelParam: '',
      ge1Param: '',
      ge2Param: '',
      secondGeParam: '',
      sortAttribute: '',

      // Select Options
      ges: [
        {text: 'any GE', value: ''},
        {text: 'WRI', value: 'WRI'},
        {text: 'ALS-L', value: 'ALS-L'},
        {text: 'ALS-A', value: 'ALS-A'},
        {text: 'AQR', value: 'AQR'},
        {text: 'BTS-B', value: 'BTS-B'},
        {text: 'BTS-T', value:'BTS-T'},
        {text: 'EIN', value: 'EIN'},
        {text: 'FOL', value: 'FOL'},
        {text: 'FYW', value: 'FYW'},
        {text: 'HBS', value: 'HBS'},
        {text: 'HWC', value: 'HWC'},
        {text: 'IST', value: 'IST'},
        {text: 'MCD', value: 'MCD'},
        {text: 'MCG', value: 'MCG'},
        {text: 'ORC', value: 'ORC'},
        {text: 'SED', value: 'SED'},
        {text: 'SPM', value: 'SPM'},
        {text: 'WRIT', value: 'WRIT'}
      ],
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
        {text: 'class', value: 'class'},
        {text: 'lab', value: 'lab'},
        {text: 'Independent Study', value: 'IS'},
        {text: 'Independent Research', value: 'IR'},
        {text: 'Academic Internship', value: 'AI'},
      ],
      departments: [
        // {text: "alternate language study option", value: "ALSO"},
        // {text: "american racial and multicultural studies", value: "ARMS"},
        {text: "all departments", value: ''},
        {text: "africa and the americas", value: "AFAM"},
        {text: "american conversation", value: "AMCON"},
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
        {text: "great conversation", value: "GCON"},
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
      this.userTerm = response.data[0];
      this.userTermCourses = this.userTerm.courses;
    });
    axios.get("api/courses?term=20191&").then(response => {
      this.allTermCourses = response.data.courses;
    });
  },
  methods: {
    doSomething: function(word) {
      console.log(word);
    },
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
      this.getUserTermCourses();
      this.getTermCourses();
    },
    changeYear: function(change) {
      if (this.year + change <= 2022 && this.year + change >= 2015) {
        this.year += change;
        this.getUserTermCourses();
        this.getTermCourses();
      }
    },
    getUserTermCourses: function() {
      axios.get(`api/terms?order=1&term=${this.year}${this.semester}`).then(response => {
        this.userTerm = response.data[0];
        this.userTermCourses = this.userTerm.courses;
      });
    },
    getTermCourses: function() {
      axios.get(`api/courses?term=${this.year}${this.semester}`).then(response => {
        this.allTermCourses = response.data.courses; 
      });
    },
    addCourse: function(theCourse) {
      axios.post(`api/course_terms?course_id=${theCourse.id}&term_id=${this.userTerm.id}`).then(response => {
        this.getUserTermCourses();
      }).catch(error => {
        console.log(error.response);
        this.errors = "You already have that class!";
      });
    },
    removeCourse: function(theCourse) {
      axios.delete(`api/course_terms/${this.userTerm.id}/${theCourse.id}`).then(response => {
        this.getUserTermCourses();
      });
    },
    filterByParams: function() {
      var paramsList = [
        {key: "status", value: this.statusParam },
        {key: "department",value: this.departmentParam},
        {key: "course_type",value: this.typeParam},
        {key: "days",value: this.daysParam},
        {key: "level",value: this.levelParam},
        {key: "gereqs",value: this.ge1Param},
        {key: "gereqs", value: this.ge2Param}
      ];

      var filteredCourses = this.allTermCourses;
      for (var i = 0; i < paramsList.length; i++) {
        if (paramsList[i]['value']) {
          filteredCourses = this.filterBy(filteredCourses, paramsList[i]['value'], paramsList[i]['key']);
        }
      }

      // filteredCourses = this.filterBy(this.allTermCourses, this.nameSearch, 'name');
      filteredCourses = this.orderBy(filteredCourses, this.sortAttribute, -1);
      return filteredCourses;
    },
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    },
    moreInfo: function(theCourse) {
      if (this.moreInfoCourse !== theCourse) {
        this.moreInfoCourse = theCourse;
      } else {
        this.moreInfoCourse = '';
      }
    },
    moreCourseInfo: function(theCourse) {
      return this.moreInfoCourse === theCourse;
    }
  }
};
</script>



