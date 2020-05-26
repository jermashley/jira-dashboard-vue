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
} from '~/constants'

export const state = () => ({
  project: {
    pm: PROJECT_PM,
    pdev: PROJECT_PDEV,
    sam: PROJECT_SAM,
  },

  software: {
    pipeline: SOFTWARE_PIPELINE,
    hive: SOFTWARE_HIVE,
    air2post: SOFTWARE_AIR2POST,
    pangea: SOFTWARE_PANGEA,
  },

  group: {
    critical: GROUP_CRITICAL,
    urgent: GROUP_URGENT,
    deployed: GROUP_DEPLOYED,
    development: GROUP_DEVELOPMENT,
    qa: GROUP_QA,
  },
})
