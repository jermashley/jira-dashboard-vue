import {
  PROJECT_PM,
  PROJECT_PDEV,
  PROJECT_SAM,
  SOFTWARE_PIPELINE,
  SOFTWARE_HIVE,
  SOFTWARE_AIR2POST,
  SOFTWARE_PANGEA,
  GROUP_CRITICAL,
  GROUP_URGENT,
  GROUP_DEPLOYED,
  GROUP_DEVELOPMENT,
  GROUP_QA,
  statingTestingServer,
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
  projects: {
    pm: PROJECT_PM,
    pdev: PROJECT_PDEV,
    sam: PROJECT_SAM,
  },

  softwares: {
    pipeline: SOFTWARE_PIPELINE,
    hive: SOFTWARE_HIVE,
    air2post: SOFTWARE_AIR2POST,
    pangea: SOFTWARE_PANGEA,
  },

  groups: {
    critical: GROUP_CRITICAL,
    urgent: GROUP_URGENT,
    deployed: GROUP_DEPLOYED,
    development: GROUP_DEVELOPMENT,
    qa: GROUP_QA,
  },

  stagingTestingServers: null,

  stagingTestingServersIssues: {},
})

export const getters = {
  stagingTestingServers: (state) => {
    return state.stagingTestingServers
  },
}

export const mutations = {
  SET_STAGING_TESTING_SERVERS(state, { servers }) {
    state.stagingTestingServers = servers
  },

  SET_STAGING_TESTING_SERVERS_ISSUES(state, { server, issues }) {
    state.stagingTestingServersIssues[server] = issues
  },
}

export const actions = {
  /* eslint-disable */
  async nuxtServerInit({ dispatch }) {
    dispatch(`SET_ISSUES`)
  },
  /* eslint-enable */

  SET_ISSUES({ dispatch }) {
    const projects = [PROJECT_PDEV, PROJECT_SAM]
    const softwares = [SOFTWARE_PIPELINE, SOFTWARE_HIVE]

    projects.forEach((project) => {
      softwares.forEach((software) => {
        dispatch(
          `issues/SET_ISSUES`,
          {
            project,
            software,
            days: 15,
          },
          { root: true }
        )
      })
    })

    dispatch(`SET_STAGING_TESTING_SERVERS`, null, { root: true }).then(() => {
      dispatch(`SET_STAGING_TESTING_SERVERS_ISSUES`, null, { root: true })
    })
  },

  async SET_STAGING_TESTING_SERVERS({ commit }) {
    try {
      const servers = await this.$axios
        .$get(
          `https://prologuetech.atlassian.net/rest/api/3/customField/11624/option`,
          {
            headers: {
              Authorization: token(),
              Accept: `application/json`,
            },
          }
        )
        .then((res) => res.values)

      commit(`SET_STAGING_TESTING_SERVERS`, { servers })
    } catch (e) {
      console.error(e)
    }
  },

  SET_STAGING_TESTING_SERVERS_ISSUES({ commit, dispatch, state }) {
    if (state.stagingTestingServers) {
      state.stagingTestingServers.forEach(async (server) => {
        try {
          await this.$axios
            .$get(
              `https://prologuetech.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
                statingTestingServer(server.value)
              )}`,
              {
                headers: {
                  Authorization: token(),
                  Accept: `application/json`,
                },
              }
            )
            .then((res) => {
              commit(`SET_STAGING_TESTING_SERVERS_ISSUES`, {
                server: server.value,
                issues: res.issues,
              })
            })
        } catch (e) {
          console.error(e)
        }
      })
    } else {
      dispatch(`SET_STAGING_TESTING_SERVERS`).then(() => {
        dispatch(`SET_STAGING_TESTING_SERVERS_ISSUES`)
      })
    }
  },
}
