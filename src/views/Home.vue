<template>
  <div class="home">
    <!-- Planner -->
    <div id="planner">
      <h1>{{ errors }}</h1>
      <div id="show-term">
        {{ userTerm.year }} {{ userTerm.semester }}
      </div>
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
      </div>
      <div v-for="course in userTermCourses">
        <div> {{ course.name }} </div>
        <div> {{course.instructors }} </div>
        <div> {{ course.times }} </div>
        <div> {{ course.days }} </div>
        <button v-on:click="removeCourse(course)"> Remove Course </button>
      </div>
    </div>
<!--     <label>
      Status
      <toggle-button style="width:300px;" v-model="hideStatus" 
                     :value="true"
                     :labels="{checked: 'On', unchecked: 'Off'}"/>
    </label> -->

<!--   <div>
    <form>
      <label>
        Credits
        <toggle-button v-model="hideCredits" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>
      <label>
        Times
        <toggle-button v-model="hideTimes" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>
      <label>
        Seats
        <toggle-button v-model="hideSeats" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>    
      <label>
        Prof
        <toggle-button v-model="hideProf" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>    
      <label>
        Difficulty
        <toggle-button v-model="hideDifficulty" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>    
      <label>
        Reviews
        <toggle-button v-model="hideReviews" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>    
      <label>
        Days
        <toggle-button v-model="hideDays" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>    
      <label>
        Rating
        <toggle-button v-model="hideRating" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>

    <form>
      <label>
        GE's
        <toggle-button v-model="hideGereqs" 
                       :value="true"
                       :labels="{checked: 'On', unchecked: 'Off'}"/>
      </label>
    </form>
  </div> -->

    <!-- Selectors -->
    <div id="selectors" class="flex">
      <div id="selector-labels">
        <p>Name: </p>
        <p>Department:</p>
        <p>Type</p>
        <p>Days:</p>
        <p>Level:</p>
        <p>1st GE:</p>
        <p>2nd GE:</p>
        <p>Status:</p>
      </div>

      <div id="selector-bars">
        <!-- Department Selector -->
        <form>
          <input type="text" v-model="filters.name">
        </form>
        <form>
          <select v-model="filters.department">
            <option v-for="department in departments" v-bind:value="department.value">
              {{ department.text }}
            </option>
          </select>
        </form>

        <!-- Types Selector -->
        <form>
          <select v-model="filters.type">
            <option v-for="type in types" v-bind:value="type.value">
              {{ type.text }}
            </option>
          </select>
        </form>
        <!-- Days Selector -->
        <form>
          <select v-model="filters.days">
            <option v-for="day in days" v-bind:value="day.value">
              {{ day.text }}
            </option>
          </select>
        </form>
        <!-- Level Selector -->
        <form>
          <select v-model="filters.level">
            <option v-for="level in levels" v-bind:value="level.value">
              {{ level.text }}
            </option>
          </select>
        </form>

        <!-- First Ge1 Selector -->
        <form>
          <select v-model="filters.ge1">
            <option v-for="ge in ges" v-bind:value="ge.value">
              {{ ge.text }}
            </option>
          </select>
        </form>

        <!-- First Ge2 Selector -->
        <form>
          <select v-model="filters.ge2">
            <option v-for="ge in ges" v-bind:value="ge.value">
              {{ ge.text }}
            </option>
          </select>
        </form>

        <!-- First status Selector -->
        <form>
          <select v-model="filters.status">
            <option v-for="status in statuses" v-bind:value="status.value">
              {{ status.text }}
            </option>
          </select>
        </form>
      </div>
    </div>

    <table class="table table-hover table-sm">
      <thead>
        <tr>
          <th scope="col" v-on:click="setSortAttribute('status')">     St</th>
          <th scope="col" v-on:click="setSortAttribute('credits')">    Cr</th>
          <th scope="col" v-on:click="setSortAttribute('department')"> Dept</th>
          <th scope="col" v-on:click="setSortAttribute('name')">       Name</th>
          <th scope="col" v-on:click="setSortAttribute('num_of_ges')"> GE</th>
          <th scope="col" v-on:click="setSortAttribute('days')">       D</th>
          <th scope="col" v-on:click="setSortAttribute('times')">      T</th>
          <th scope="col" v-on:click="setSortAttribute('enrolled')">   Seats</th>
          <th scope="col" v-on:click="setSortAttribute('instructors')">Prof</th>
          <th scope="col" v-on:click="setSortAttribute('rating')">Rating</th>
          <th scope="col" v-on:click="setSortAttribute('difficulty')"> Difficulty</th>
          <th scope="col" v-on:click="setSortAttribute('num_ratings')">     Reviews</th>
          <th scope="col" v-on:click="setSortAttribute('num_ratings')"></th>
          <th scope="col" v-on:click="setSortAttribute('num_ratings')"></th>
        </tr>
      </thead>
      <tbody v-for="course in filterBy(filterByParams(), filters.name, 'name')">
        <tr>
          <th scope="row"> 
            <span v-if="courseOpen(course.status)" class="green">O</span>
            <span v-if="courseClosed(course.status)" class="red">C</span>
          </th>
          <td> {{ course.credits }} </td>
          <td>
            {{ course.department }} {{ course.number }}{{ course.section }} 
          </td> 
          <td> {{ course.name }} </td>
          <td> 
            <ul class="col-multi-line col-gereqs">
              <li v-for="(ge, index) in course.gereqs">
                {{ ge }}
              </li>
            </ul>
          </td>
          <td> {{ course.days }} </td>
          <td>
            <ul class="col-multi-line col-times">
              <li v-for="(time, index) in course.times">
                {{ time }}
              </li>
            </ul> 
          </td>
          <td class="col-seats"> {{ course.seats }} </td>
          <td> 
            <ul class="col-multi-line col-times">
              <li v-for="(prof, index) in course.instructors">
                {{ prof }}
              </li>
            </ul> 
          </td>
          <td> {{ course.rating }} </td>
          <td> {{ course.difficulty }} </td>
          <td> {{ course.num_ratings }} </td>
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
      termCourses: [],
      userTermCourses: [],

      nameSearch: '',

      // Params
      filters: {
        status: '',
        department: '',
        type: '',
        days: '',
        level: '',
        ge1: '',
        ge2: '',
        sortBy: '',
        name: ''
      },

      starOnly: false,

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
      this.termCourses = response.data.courses;
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
        this.termCourses = response.data.courses; 
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
        {key: "status", value: this.filters.status },
        {key: "department",value: this.filters.department},
        {key: "course_type",value: this.filters.type},
        {key: "days",value: this.filters.days},
        {key: "level",value: this.filters.level},
        {key: "gereqs",value: this.filters.ge1},
        {key: "gereqs", value: this.filters.ge2}
      ];

      var filteredCourses = '';
      if ( this.starOnly ) {
        filteredCourses = this.userTermCourses;
      } else {
        filteredCourses = this.termCourses;
      }

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
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>



