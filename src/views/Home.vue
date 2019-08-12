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

    Hide: 
    <div id="hideOptions">
    <p>Status: <input type="checkbox" id="hideStatus" v-model="hideStatus"></p>
    <p>Department: <input type="checkbox" id="hideDepartment" v-model="hideDepartment"></p>
    <p>Credits: <input type="checkbox" id="hideCredits" v-model="hideCredits"></p>
    <p>Name: <input type="checkbox" id="hideName" v-model="hideName"></p>
    <p>Times: <input type="checkbox" id="hideTimes" v-model="hideTimes"></p>
    <p>Seats: <input type="checkbox" id="hideSeats" v-model="hideSeats"></p>
    <p>Prof: <input type="checkbox" id="hideProf" v-model="hideProf"></p>
    <p>Difficulty: <input type="checkbox" id="hideDifficulty" v-model="hideDifficulty"></p>
    <p>Reviews: <input type="checkbox" id="hideReviews" v-model="hideReviews"></p>
    <p>Days: <input type="checkbox" id="hideReviews" v-model="hideDays"></p>
    <p>Rating: <input type="checkbox" id="hideReviews" v-model="hideRating"></p>
    <p>GE's: <input type="checkbox" id="hideReviews" v-model="hideGereqs"></p>

    </div>


    <!-- Selectors -->
    <div class="flex">
      <!-- Department Selector -->
      <p>Name: <input type="text" v-model="paramName"></p>
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

      <!-- First status Selector -->
      <form>
        <select v-model="statusParam">
          <option v-for="status in statuses" v-bind:value="status.value">
            {{ status.text }}
          </option>
        </select>
      </form>
    </div>

    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th scope="col" v-if="shown('status')" v-on:click="setSortAttribute('status')">     St</th>
          <th scope="col" v-if="shown('credits')" v-on:click="setSortAttribute('credits')">    Cr</th>
          <th scope="col" v-if="shown('department')" v-on:click="setSortAttribute('department')"> Dept</th>
          <th scope="col" v-if="shown('name')" v-on:click="setSortAttribute('name')">       Name</th>
          <th scope="col" v-if="shown('gereqs')" v-on:click="setSortAttribute('num_of_ges')"> GE</th>
          <th scope="col" v-if="shown('days')" v-on:click="setSortAttribute('days')">       D</th>
          <th scope="col" v-if="shown('times')" v-on:click="setSortAttribute('times')">      T</th>
          <th scope="col" v-if="shown('seats')" v-on:click="setSortAttribute('enrolled')">   Seats</th>
          <th scope="col" v-if="shown('prof')" v-on:click="setSortAttribute('instructors')">Prof</th>
          <th scope="col" v-if="shown('rating')" v-on:click="setSortAttribute('rating')">Rating</th>
          <th scope="col" v-if="shown('difficulty')" v-on:click="setSortAttribute('difficulty')"> Difficulty</th>
          <th scope="col" v-if="shown('reviews')" v-on:click="setSortAttribute('num_ratings')">     Reviews</th>
          <th scope="col" v-on:click="setSortAttribute('num_ratings')"></th>
          <th scope="col" v-on:click="setSortAttribute('num_ratings')"></th>
          <!-- <th scope="col" v-on:click="setSortAttribute('number')">Num</th> -->
          <!-- <th scope="col" v-on:click="setSortAttribute('section')">Sec</th>   -->
          <!-- <th scope="col" v-on:click="setSortAttribute('location')">Loc</th> -->
          <!-- <th style="max-width: 20px" scope="col"></th> -->
          <!-- <th style="max-width: 20px" scope="col"></th> -->
        </tr>
      </thead>
      <tbody v-for="course in filterBy(filterByParams(), paramName, 'name')">
        <tr>
          <th v-if="shown('status')" scope="row"> 
            <span v-if="courseOpen(course.status)" class="green">O</span>
            <span v-if="courseClosed(course.status)" class="red">C</span>
          </th>
          <td v-if="shown('credits')"> {{ course.credits }} </td>
          <td v-if="!hideDepartment">
            {{ course.department }} {{ course.number }}{{ course.section }} 
          </td> 
          <td v-if="shown('name')"> {{ course.name }} </td>
          <td v-if="shown('gereqs')"> 
            <ul class="col-multi-line col-gereqs">
              <li v-for="(ge, index) in course.gereqs">
                {{ ge }}
              </li>
            </ul>
          </td>
          <td v-if="shown('days')"> {{ course.days }} </td>
          <td v-if="shown('times')">
            <ul class="col-multi-line col-times">
              <li v-for="(time, index) in course.times">
                {{ time }}
              </li>
            </ul> 
          </td>
          <td v-if="shown('seats')" class="col-seats"> {{ course.seats }} </td>
          <td v-if="shown('prof')"> 
            <ul class="col-multi-line col-times">
              <li v-for="(prof, index) in course.instructors">
                {{ prof }}
              </li>
            </ul> 
          </td>
          <td v-if="shown('rating')"> {{ course.rating }} </td>
          <td v-if="shown('difficulty')"> {{ course.difficulty }} </td>
          <td v-if="shown('reviews')"> {{ course.num_ratings }} </td>
          <!-- <th> {{ course.number }}</th> -->
          <!-- <th> {{ course.section }} </th> -->
          <td>
            <div @click="addCourse(course)">Add</div>
          </td>
          <td>
            <div class="course-show-more">More Info</div>
          </td>
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
      paramName: '',
      selected: [],

      // Hide Options
      hideStatus: false,
      hideDepartment: false,
      hideCredits: false,
      hideName: false,
      hideGereqs: false,
      hideDays: false,
      hideTimes: false,
      hideSeats: false,
      hideProf: false,
      hideRating: false,
      hideDifficulty: false,
      hideReviews: false,

      // Select Options
      showOptions: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' }
      ],
      statuses: [
        {text: 'Any Status', value: ''},
        {text: 'Open', value: 'O'},
        {text: 'Closed', value: 'C'},
      ],
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
    showColumn: function(column) {
      if (column === 'department') {
        return true;
      }
    },
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
    },
    courseOpen: function(status) {
      return status === 'O';
    },
    courseClosed: function(status) {
      return status === 'C';
    },
    shown: function(column) {
      var columnShowStatus = {
        'status': this.hideStatus,
        'credits': this.hideCredits,
        'name': this.hideName,
        'department': this.hideDepartment,
        'gereqs': this.hideGereqs,
        'days': this.hideDays,
        'times': this.hideTimes,
        'seats': this.hideSeats,
        'prof': this.hideProf,
        'rating': this.hideRating,
        'difficulty': this.hideDifficulty,
        'reviews': this.hideReviews,
      };
      return !columnShowStatus[column];
    }
  }
};
</script>



