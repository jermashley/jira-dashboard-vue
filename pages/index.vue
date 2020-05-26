<template>
  <div>
    <issueCard :title="titles.qa" :issues="issuesHiveQa" />
    <issueCard :title="titles.development" :issues="issuesHiveDevelopment" />
  </div>
</template>

<script>
import issueCard from '@/components/issueCard'
import { mapGetters } from 'vuex'
import {
  PROJECT_PM,
  PROJECT_SAM,
  SOFTWARE_PIPELINE,
  SOFTWARE_HIVE,
  GROUP_CRITICAL,
  GROUP_URGENT,
  GROUP_DEPLOYED,
  GROUP_DEVELOPMENT,
  GROUP_QA,
} from '@/constants'

export default {
  components: {
    issueCard,
  },

  fetch() {
    const projects = [PROJECT_PM, PROJECT_SAM]
    const softwares = [SOFTWARE_PIPELINE, SOFTWARE_HIVE]

    projects.forEach((project) => {
      softwares.forEach((software) => {
        this.$store.dispatch(`issues/SET_ISSUES`, {
          project,
          software,
          days: 15,
        })
      })
    })
  },

  data() {
    return {
      titles: {
        critical: GROUP_CRITICAL,
        urgent: GROUP_URGENT,
        deployed: GROUP_DEPLOYED,
        development: GROUP_DEVELOPMENT,
        qa: GROUP_QA,
      },
    }
  },

  computed: {
    ...mapGetters({
      issuesHiveQa: `issues/${SOFTWARE_HIVE}-${GROUP_QA}`,
      issuesHiveDevelopment: `issues/${SOFTWARE_HIVE}-${GROUP_DEVELOPMENT}`,
    }),
  },
}
</script>

<style lang="scss">
/*  */
</style>
