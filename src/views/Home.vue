<template>
  <div class="home container">
    <h1><strong>My name is Martijn de Ruiter</strong></h1>
    <h3><strong>I'm a Front-end developer based in the Netherlands</strong></h3>
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>


<style lang="scss">
  .home {
    padding: 25vh 20px 20px 20px;
    h1,h3  {
      font-size: 3.5vw;
      letter-spacing: -1px;
      line-height: 1.2em;
      margin: 0;
    }

    h1 {
      color: #616161;
      margin-bottom: 15px;
    }
  }
</style>