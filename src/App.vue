<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/playground">Playground</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

@font-face {
font-family: 'Neue Haas Grotesk Text Pro Roman';
font-style: normal;
font-weight: normal;
src: local('Neue Haas Grotesk Text Pro Roman'), url('./assets/fonts/neue-haas/regular.woff') format('woff');
}


@font-face {
font-family: 'Neue Haas Grotesk Text Pro Italic';
font-style: normal;
font-weight: normal;
src: local('Neue Haas Grotesk Text Pro Italic'), url('./assets/fonts/neue-haas/regular-italic.woff') format('woff');
}


@font-face {
font-family: 'Neue Haas Grotesk Text Pro Bold';
font-style: normal;
font-weight: normal;
src: local('Neue Haas Grotesk Text Pro Bold'), url('./assets/fonts/neue-haas/bold.woff') format('woff');
}


@font-face {
font-family: 'Neue Haas Grotesk Text Pro Bold Italic';
font-style: normal; 
font-weight: normal;
src: local('Neue Haas Grotesk Text Pro Bold Italic'), url('./assets/fonts/neue-haas/bold-italic.woff') format('woff');
}

html,body {
  margin: 0;
  font-family: 'Neue Haas Grotesk Text Pro Roman';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #0a0a0a;
  color: #FFF;
}

i {
  font-family: 'Neue Haas Grotesk Text Pro Italic';
}

strong {
  font-family: 'Neue Haas Grotesk Text Pro Bold';

  i {
    font-family: 'Neue Haas Grotesk Text Pro Bold Italic';
  }
}



#nav {
  
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  width: 100%;
  a {
    padding: 15px;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}


</style>
