<template>
  <section>
    <div>
      <issueCard
        :title="groups.critical"
        :issues="issueGroup(project, software, groups.critical)"
      />
      <issueCard
        :title="groups.urgent"
        :issues="issueGroup(project, software, groups.urgent)"
      />
      <issueCard
        :title="groups.deployed"
        :issues="issueGroup(project, software, groups.deployed)"
      />
    </div>

    <div>
      <issueCard
        :title="groups.development"
        :issues="issueGroup(project, software, groups.development)"
      />
      <issueCard
        :title="groups.qa"
        :issues="issueGroup(project, software, groups.qa)"
      />
    </div>
  </section>
</template>

<script>
import issueCard from '@/components/issueCard'
import { mapGetters } from 'vuex'
import {
  PROJECT_SAM,
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
    store.dispatch(`issues/SET_ISSUES`, {
      project: PROJECT_SAM,
      software: SOFTWARE_HIVE,
      days: 8,
    })
  },

  data() {
    return {
      project: PROJECT_SAM,
      software: SOFTWARE_HIVE,
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
      issueGroup: `issues/issueGroup`,
    }),
  },
}
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: minmax(32rem, 2fr) minmax(32rem, 3fr);
  grid-gap: 1.5rem;

  max-width: 72rem;
  width: 100%;
  margin: 0 auto;

  @media screen and (max-width: 84rem) {
    grid-template-columns: 1fr;
  }
}
</style>
