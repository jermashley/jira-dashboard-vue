import {
  SOFTWARE_PIPELINE,
  SOFTWARE_HIVE,
  SOFTWARE_PANGEA,
  SOFTWARE_AIR2POST,
  RECENT_DEPLOYMENTS,
  CRITICAL_ISSUES,
  QA_ISSUES,
  DEFAULT_ISSUES,
  URGENT_ISSUES,
} from '~/constants'

export const state = () => ({
  [SOFTWARE_PIPELINE]: {
    deployments: [],
    critical: [],
    urgent: [],
    default: [],
    qa: [],
  },
  [SOFTWARE_HIVE]: {
    deployments: [],
    critical: [],
    urgent: [],
    default: [],
    qa: [],
  },
  [SOFTWARE_PANGEA]: {
    deployments: [],
    critical: [],
    urgent: [],
    default: [],
    qa: [],
  },
  [SOFTWARE_AIR2POST]: {
    deployments: [],
    critical: [],
    urgent: [],
    default: [],
    qa: [],
  },
})

export const getters = {
  deployments: (state) => (software) => {
    return state[software].deployments
  },

  critical: (state) => (software) => {
    return state[software].critical
  },

  urgent: (state) => (software) => {
    return state[software].urgent
  },

  default: (state) => (software) => {
    return state[software].default
  },

  qa: (state) => (software) => {
    return state[software].qa
  },
}

export const mutations = {
  SET_DEPLOYMENTS(state, { software, issues }) {
    state[software].deployments = issues
  },

  SET_CRITICAL(state, { software, issues }) {
    state[software].critical = issues
  },

  SET_URGENT(state, { software, issues }) {
    state[software].urgent = issues
  },

  SET_DEFAULT(state, { software, issues }) {
    state[software].default = issues
  },

  SET_QA(state, { software, issues }) {
    state[software].qa = issues
  },
}

export const actions = {
  async SET_DEPLOYMENTS({ commit }, { project, software, days }) {
    console.time(`Get ${software} Deployments`)
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            RECENT_DEPLOYMENTS([project], [software], days)
          )}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.userEmail}:${process.env.token}`
              )}`,
              Accept: `application/json`,
            },
          }
        )
        .then((res) => {
          return res.issues
        })
        .catch((e) => console.log(e))

      commit(`SET_DEPLOYMENTS`, {
        software,
        issues: deploymentIssues,
      })
    } catch (e) {
      console.log(e)
    }
    console.timeEnd(`Get ${software} Deployments`)
  },

  async SET_CRITICAL({ commit }, { project, software }) {
    console.time(`Get ${software} Critical`)
    console.log(CRITICAL_ISSUES([project], [software]))
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            CRITICAL_ISSUES([project], [software])
          )}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.userEmail}:${process.env.token}`
              )}`,
              Accept: `application/json`,
            },
          }
        )
        .then((res) => {
          return res.issues
        })
        .catch((e) => console.log(e))

      commit(`SET_CRITICAL`, {
        software,
        issues: deploymentIssues,
      })
    } catch (e) {
      console.log(e)
    }
    console.timeEnd(`Get ${software} Critical`)
  },

  async SET_URGENT({ commit }, { project, software }) {
    console.time(`Get ${software} Urgent`)
    console.log(URGENT_ISSUES([project], [software]))
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            URGENT_ISSUES([project], [software])
          )}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.userEmail}:${process.env.token}`
              )}`,
              Accept: `application/json`,
            },
          }
        )
        .then((res) => {
          return res.issues
        })
        .catch((e) => console.log(e))

      commit(`SET_URGENT`, {
        software,
        issues: deploymentIssues,
      })
    } catch (e) {
      console.log(e)
    }
    console.timeEnd(`Get ${software} Urgent`)
  },

  async SET_DEFAULT({ commit }, { project, software }) {
    console.time(`Get ${software} Default`)
    console.log(DEFAULT_ISSUES([project], [software]))
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            DEFAULT_ISSUES([project], [software])
          )}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.userEmail}:${process.env.token}`
              )}`,
              Accept: `application/json`,
            },
          }
        )
        .then((res) => {
          return res.issues
        })
        .catch((e) => console.log(e))

      commit(`SET_DEFAULT`, {
        software,
        issues: deploymentIssues,
      })
    } catch (e) {
      console.log(e)
    }
    console.timeEnd(`Get ${software} Default`)
  },

  async SET_QA({ commit }, { project, software }) {
    console.time(`Get ${software} QA`)
    console.log(QA_ISSUES([project], [software]))
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            QA_ISSUES([project], [software])
          )}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.userEmail}:${process.env.token}`
              )}`,
              Accept: `application/json`,
            },
          }
        )
        .then((res) => {
          return res.issues
        })
        .catch((e) => console.log(e))

      commit(`SET_QA`, {
        software,
        issues: deploymentIssues,
      })
    } catch (e) {
      console.log(e)
    }
    console.timeEnd(`Get ${software} QA`)
  },
}
