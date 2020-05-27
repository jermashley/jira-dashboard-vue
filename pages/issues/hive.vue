<template>
  <section>
    <div>
      <issueCard :title="titles.critical" :issues="hiveCritical" />
      <issueCard :title="titles.urgent" :issues="hiveUrgent" />
      <issueCard :title="titles.deployed" :issues="hiveDeployed" />
    </div>

    <div>
      <issueCard :title="titles.development" :issues="hiveDevelopment" />
      <issueCard :title="titles.qa" :issues="hiveQa" />
    </div>
  </section>
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
      hiveCritical: `issues/${SOFTWARE_HIVE}-${GROUP_CRITICAL}`,
      hiveUrgent: `issues/${SOFTWARE_HIVE}-${GROUP_URGENT}`,
      hiveDeployed: `issues/${SOFTWARE_HIVE}-${GROUP_DEPLOYED}`,
      hiveDevelopment: `issues/${SOFTWARE_HIVE}-${GROUP_DEVELOPMENT}`,
      hiveQa: `issues/${SOFTWARE_HIVE}-${GROUP_QA}`,
    }),
  },
}
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: minmax(32rem, 2fr) minmax(32rem, 3fr);
  grid-gap: 1.5rem;

  @media screen and (max-width: 84rem) {
    grid-template-columns: 1fr;
  }
}
</style>
