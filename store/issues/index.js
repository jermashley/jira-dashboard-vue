import {
  SOFTWARE_PIPELINE,
  SOFTWARE_HIVE,
  // SOFTWARE_PANGEA,
  // SOFTWARE_AIR2POST,
  RECENT_DEPLOYMENTS,
  CRITICAL_ISSUES,
  QA_ISSUES,
  DEFAULT_ISSUES,
  URGENT_ISSUES,
  GROUP_CRITICAL,
  GROUP_URGENT,
  GROUP_DEPLOYED,
  GROUP_DEVELOPMENT,
  GROUP_QA,
} from '~/constants'

const token = () => {
  // Set token depending on where the call is made.
  if (process.server) {
    return `Basic ${Buffer.from(
      `${process.env.userEmail}:${process.env.token}`,
      `binary`
    ).toString(`base64`)}`
  } else if (process.client) {
    return `Basic ${btoa(`${process.env.userEmail}:${process.env.token}`)}`
  }
}

export const state = () => ({
  [SOFTWARE_PIPELINE]: {
    [GROUP_DEPLOYED]: [],
    [GROUP_CRITICAL]: [],
    [GROUP_URGENT]: [],
    [GROUP_DEVELOPMENT]: [],
    [GROUP_QA]: [],
  },

  [SOFTWARE_HIVE]: {
    [GROUP_DEPLOYED]: [],
    [GROUP_CRITICAL]: [],
    [GROUP_URGENT]: [],
    [GROUP_DEVELOPMENT]: [],
    [GROUP_QA]: [],
  },

  // [SOFTWARE_PANGEA]: {
  //   [GROUP_DEPLOYED]: [],
  //   [GROUP_CRITICAL]: [],
  //   [GROUP_URGENT]: [],
  //   [GROUP_DEVELOPMENT]: [],
  //   [GROUP_QA]: [],
  // },

  // [SOFTWARE_AIR2POST]: {
  //   [GROUP_DEPLOYED]: [],
  //   [GROUP_CRITICAL]: [],
  //   [GROUP_URGENT]: [],
  //   [GROUP_DEVELOPMENT]: [],
  //   [GROUP_QA]: [],
  // },
})

export const getters = {
  [`all-${GROUP_DEPLOYED}`]: (state) => {
    const merged = state[SOFTWARE_PIPELINE][GROUP_DEPLOYED].concat(
      state[SOFTWARE_HIVE][GROUP_DEPLOYED]
    )
    return merged
  },

  [`all-${GROUP_CRITICAL}`]: (state) => {
    const merged = state[SOFTWARE_PIPELINE][GROUP_CRITICAL].concat(
      state[SOFTWARE_HIVE][GROUP_CRITICAL]
    )
    return merged
  },

  [`all-${GROUP_URGENT}`]: (state) => {
    const merged = state[SOFTWARE_PIPELINE][GROUP_URGENT].concat(
      state[SOFTWARE_HIVE][GROUP_URGENT]
    )
    return merged
  },

  [`all-${GROUP_DEVELOPMENT}`]: (state) => {
    const merged = state[SOFTWARE_PIPELINE][GROUP_DEVELOPMENT].concat(
      state[SOFTWARE_HIVE][GROUP_DEVELOPMENT]
    )
    return merged
  },

  [`all-${GROUP_QA}`]: (state) => {
    const merged = state[SOFTWARE_PIPELINE][GROUP_QA].concat(
      state[SOFTWARE_HIVE][GROUP_QA]
    )
    return merged
  },

  [`${SOFTWARE_PIPELINE}-${GROUP_DEPLOYED}`]: (state) => {
    return state[SOFTWARE_PIPELINE][GROUP_DEPLOYED]
  },

  [`${SOFTWARE_PIPELINE}-${GROUP_CRITICAL}`]: (state) => {
    return state[SOFTWARE_PIPELINE][GROUP_CRITICAL]
  },

  [`${SOFTWARE_PIPELINE}-${GROUP_URGENT}`]: (state) => {
    return state[SOFTWARE_PIPELINE][GROUP_URGENT]
  },

  [`${SOFTWARE_PIPELINE}-${GROUP_DEVELOPMENT}`]: (state) => {
    return state[SOFTWARE_PIPELINE][GROUP_DEVELOPMENT]
  },

  [`${SOFTWARE_PIPELINE}-${GROUP_QA}`]: (state) => {
    return state[SOFTWARE_PIPELINE][GROUP_QA]
  },

  [`${SOFTWARE_HIVE}-${GROUP_DEPLOYED}`]: (state) => {
    return state[SOFTWARE_HIVE][GROUP_DEPLOYED]
  },

  [`${SOFTWARE_HIVE}-${GROUP_CRITICAL}`]: (state) => {
    return state[SOFTWARE_HIVE][GROUP_CRITICAL]
  },

  [`${SOFTWARE_HIVE}-${GROUP_URGENT}`]: (state) => {
    return state[SOFTWARE_HIVE][GROUP_URGENT]
  },

  [`${SOFTWARE_HIVE}-${GROUP_DEVELOPMENT}`]: (state) => {
    return state[SOFTWARE_HIVE][GROUP_DEVELOPMENT]
  },

  [`${SOFTWARE_HIVE}-${GROUP_QA}`]: (state) => {
    return state[SOFTWARE_HIVE][GROUP_QA]
  },
}

export const mutations = {
  SET_DEPLOYMENTS(state, { software, issues }) {
    state[software][GROUP_DEPLOYED] = issues
  },

  SET_CRITICAL(state, { software, issues }) {
    state[software][GROUP_CRITICAL] = issues
  },

  SET_URGENT(state, { software, issues }) {
    state[software][GROUP_URGENT] = issues
  },

  SET_DEFAULT(state, { software, issues }) {
    state[software][GROUP_DEVELOPMENT] = issues
  },

  SET_QA(state, { software, issues }) {
    state[software][GROUP_QA] = issues
  },
}

export const actions = {
  async SET_DEPLOYMENTS({ commit }, { project, software, days }) {
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            RECENT_DEPLOYMENTS(project, software, days)
          )}`,
          {
            headers: {
              Authorization: token(),
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
  },

  async SET_CRITICAL({ commit }, { project, software }) {
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            CRITICAL_ISSUES(project, software)
          )}`,
          {
            headers: {
              Authorization: token(),
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
  },

  async SET_URGENT({ commit }, { project, software }) {
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            URGENT_ISSUES(project, software)
          )}`,
          {
            headers: {
              Authorization: token(),
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
  },

  async SET_DEFAULT({ commit }, { project, software }) {
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            DEFAULT_ISSUES(project, software)
          )}`,
          {
            headers: {
              Authorization: token(),
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
  },

  async SET_QA({ commit }, { project, software }) {
    try {
      const deploymentIssues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            QA_ISSUES(project, software)
          )}`,
          {
            headers: {
              Authorization: token(),
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
  },

  SET_ISSUES({ dispatch }, { project, software, days }) {
    dispatch(`SET_DEPLOYMENTS`, { project, software, days })
    dispatch(`SET_CRITICAL`, { project, software })
    dispatch(`SET_URGENT`, { project, software })
    dispatch(`SET_DEFAULT`, { project, software })
    dispatch(`SET_QA`, { project, software })
  },
}
