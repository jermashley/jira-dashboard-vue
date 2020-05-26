<template>
  <div id="mainContainer">
    <navigation />

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import navigation from '@/components/navigation'

export default {
  components: {
    navigation,
  },
}
</script>

<style lang="scss">
#mainContainer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  margin: 0;
  padding: 0;
}

main {
  flex-grow: 1;

  width: 100%;

  padding: 1.5rem;
}
</style>
