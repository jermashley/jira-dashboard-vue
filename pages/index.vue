<template>
  <div>Jira Template</div>
</template>

<script>
import { PROJECT_SAM, SOFTWARE_PIPELINE } from '../constants'

export default {
  mounted() {
    this.$store.dispatch(`issues/SET_DEPLOYMENTS`, {
      project: PROJECT_SAM,
      software: SOFTWARE_PIPELINE,
      days: 15,
    })

    this.$store.dispatch(`issues/SET_CRITICAL`, {
      project: PROJECT_SAM,
      software: SOFTWARE_PIPELINE,
    })

    this.$store.dispatch(`issues/SET_URGENT`, {
      project: PROJECT_SAM,
      software: SOFTWARE_PIPELINE,
    })

    this.$store.dispatch(`issues/SET_DEFAULT`, {
      project: PROJECT_SAM,
      software: SOFTWARE_PIPELINE,
    })

    this.$store.dispatch(`issues/SET_QA`, {
      project: PROJECT_SAM,
      software: SOFTWARE_PIPELINE,
    })
  },
}
</script>

<style lang="scss">
/*  */
</style>
