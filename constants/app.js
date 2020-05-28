// Projects
export const PROJECT_SAM = `Support & Maintenance`
export const PROJECT_PM = `Project Management`
export const PROJECT_PDEV = `Project Development`

// Software
export const SOFTWARE_PIPELINE = `Pipeline`
export const SOFTWARE_HIVE = `Hive`
export const SOFTWARE_AIR2POST = `Air2Post`
export const SOFTWARE_PANGEA = `Pangea`

// Filter groups
export const GROUP_CRITICAL = `Critical`
export const GROUP_URGENT = `Urgent`
export const GROUP_DEPLOYED = `Deployed`
export const GROUP_DEVELOPMENT = `Development`
export const GROUP_QA = `QA Testing`

// Statuses
export const STATUS_OPEN = `Open`
export const STATUS_BACKLOG = `Backlog`
export const STATUS_ON_HOLD = `On Hold`
export const STATUS_IN_PROGRESS = `In Progress`
export const STATUS_NEEDS_PR = `Needs PR`
export const STATUS_IN_PR = `In PR`
export const STATUS_HAS_CONFLICT = `Has Coflict`
export const STATUS_NEEDS_QA = `Needs QA`
export const STATUS_READY_FOR_QA = `Ready for QA`
export const STATUS_IN_QA = `In QA`
export const STATUS_NEEDS_DEPLOYMENT = `Needs Deployment`
export const STATUS_DEPLOYED = `Deployed`
export const STATUS_DONE = `Done`

// Status color mappings
export const STATUS_GROUP_STATIC = [STATUS_OPEN, STATUS_BACKLOG, STATUS_ON_HOLD]
export const STATUS_GROUP_DEVELOPMENT = [
  STATUS_IN_PROGRESS,
  STATUS_NEEDS_PR,
  STATUS_IN_PR,
  STATUS_HAS_CONFLICT,
]
export const STATUS_GROUP_QA = [
  STATUS_NEEDS_QA,
  STATUS_READY_FOR_QA,
  STATUS_IN_QA,
]
export const STATUS_GROUP_DEPLOYMENT = [
  STATUS_NEEDS_DEPLOYMENT,
  STATUS_DEPLOYED,
  STATUS_DONE,
]

export const statusGroupColor = (status) => {
  if (STATUS_GROUP_STATIC.includes(status)) {
    return `gray-700`
  } else if (STATUS_GROUP_DEVELOPMENT.includes(status)) {
    return `blue-600`
  } else if (STATUS_GROUP_QA.includes(status)) {
    return `indigo-500`
  } else if (STATUS_GROUP_DEPLOYMENT.includes(status)) {
    return `green-500`
  } else {
    return `gray-400`
  }
}
