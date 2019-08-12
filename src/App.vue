<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/courses">Courses</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style>
.col-multi-line {
  min-width: 50px;
  word-break: keep-all;
  margin: 0px;
  padding: 0px;
  list-style-type: none;
}

.col-seats {
  /*background: blue;*/
  min-width: 80px;
}
.col-gereqs {
  min-width: 50px;
}

.col-times {
  min-width: 100px;
}

.green {
  color: green;
}

.red {
  color: red;
}

.grey {
  background-color: #fff;
  /*border-color: red;*/
}

.flex {
  display: flex;
}

</style>
