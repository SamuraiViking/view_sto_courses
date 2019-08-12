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
  margin: 0px;
  padding: 0px;
  list-style-type: none;
}

#hideOptions {
  line-height: 0px;
  margin: 0px;
  padding: 0px;
}

.col-seats {
  min-width: 80px;
}
.col-gereqs {
  /*background: blue;*/
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

.flex {
  display: flex;
}

</style>
