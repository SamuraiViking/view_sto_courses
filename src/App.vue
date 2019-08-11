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

.table-font {
  font-size: 12px;
  font-color: #eee;
}

.custom-table-head {
  font-size: 12px;
}

.course-show-more {
  width: 30px;
  height: 30px;
}

.course-show-more img{
  width: 100%;
  height: 100%;
}

.couse-show-more:hover {
  background: blue;
}

.custom-col {
  font-size: 12px;
  width: 100%;
}

.course-buttons {
  display: flex;
}
</style>
