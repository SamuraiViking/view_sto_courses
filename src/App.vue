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

span {
  margin: 0px;
  padding: 0px;
}

.table-font {
  font-size: 12px;
}

.flex {
  padding: 0px;
  line-height: 1px;
  border: 10px hidden;
  display: flex;
  margin: 0px;
  /*padding: 0px;*/
}
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  overflow: scroll;
  margin: 0px auto;
  width: 100%;
  display:flex;
  justify-content: space-between;
}

#availableCourse div {
  width: 100%;
  font-size: 15px;
}

#column-names {
  display: flex;
}

#column-names div {
  width: 100%;
}  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*/

</style>
