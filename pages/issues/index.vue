<template>
  <section>
    <div>
      <issueCard
        :title="groups.critical"
        :issues="allIssues(groups.critical)"
      />
      <issueCard :title="groups.urgent" :issues="allIssues(groups.urgent)" />
      <issueCard
        :title="groups.deployed"
        :issues="allIssues(groups.deployed)"
      />
    </div>

    <div>
      <issueCard
        :title="groups.development"
        :issues="allIssues(groups.development)"
      />
      <issueCard :title="groups.qa" :issues="allIssues(groups.qa)" />
    </div>
  </section>
</template>

<script>
import issueCard from '@/components/issueCard'
import { mapGetters } from 'vuex'
import {
  PROJECT_PDEV,
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

  fetch({ store }) {
    const projects = [PROJECT_PDEV, PROJECT_SAM]
    const softwares = [SOFTWARE_PIPELINE, SOFTWARE_HIVE]

    projects.forEach((project) => {
      softwares.forEach((software) => {
        store.dispatch(`issues/SET_ISSUES`, {
          project,
          software,
          days: 15,
        })
      })
    })

    store.dispatch(`SET_STAGING_TESTING_SERVERS`).then(() => {
      store.dispatch(`SET_STAGING_TESTING_SERVERS_ISSUES`)
    })
  },

  data() {
    return {
      groups: {
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
      allIssues: `issues/allIssues`,
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
