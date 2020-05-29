import {
  SOFTWARE_PIPELINE,
  SOFTWARE_HIVE,
  // SOFTWARE_PANGEA,
  // SOFTWARE_AIR2POST,
  GROUP_CRITICAL,
  GROUP_URGENT,
  GROUP_DEPLOYED,
  GROUP_DEVELOPMENT,
  GROUP_QA,
  PROJECT_SAM,
  PROJECT_PDEV,
  recentDeployments,
  criticalIssues,
  qaIssues,
  defaultIssues,
  urgentIssues,
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
  [PROJECT_SAM]: {
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
  },

  [PROJECT_PDEV]: {
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
  allIssues: (state) => (group) => {
    const merged = [
      ...state[PROJECT_SAM][SOFTWARE_PIPELINE][group],
      ...state[PROJECT_SAM][SOFTWARE_HIVE][group],
      ...state[PROJECT_PDEV][SOFTWARE_PIPELINE][group],
      ...state[PROJECT_PDEV][SOFTWARE_HIVE][group],
    ]

    return merged
  },

  issueGroup: (state) => (project, software, group) => {
    return state[project][software][group]
  },
}

export const mutations = {
  SET_DEPLOYMENTS(state, { project, software, issues }) {
    state[project][software][GROUP_DEPLOYED] = issues
  },

  SET_CRITICAL(state, { project, software, issues }) {
    state[project][software][GROUP_CRITICAL] = issues
  },

  SET_URGENT(state, { project, software, issues }) {
    state[project][software][GROUP_URGENT] = issues
  },

  SET_DEFAULT(state, { project, software, issues }) {
    state[project][software][GROUP_DEVELOPMENT] = issues
  },

  SET_QA(state, { project, software, issues }) {
    state[project][software][GROUP_QA] = issues
  },
}

export const actions = {
  async SET_DEPLOYMENTS({ commit }, { project, software, days }) {
    try {
      const issues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            recentDeployments(project, software, days)
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
        project,
        software,
        issues,
      })
    } catch (e) {
      console.log(e)
    }
  },

  async SET_CRITICAL({ commit }, { project, software }) {
    try {
      const issues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            criticalIssues(project, software)
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
        project,
        software,
        issues,
      })
    } catch (e) {
      console.log(e)
    }
  },

  async SET_URGENT({ commit }, { project, software }) {
    try {
      const issues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            urgentIssues(project, software)
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
        project,
        software,
        issues,
      })
    } catch (e) {
      console.log(e)
    }
  },

  async SET_DEFAULT({ commit }, { project, software }) {
    try {
      const issues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            defaultIssues(project, software)
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
        project,
        software,
        issues,
      })
    } catch (e) {
      console.log(e)
    }
  },

  async SET_QA({ commit }, { project, software }) {
    try {
      const issues = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
            qaIssues(project, software)
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
        project,
        software,
        issues,
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
