import {
  PROJECT_SAM,
  // PROJECT_PM,
  PROJECT_PDEV,
  SOFTWARE_PIPELINE,
  SOFTWARE_HIVE,
  SOFTWARE_AIR2POST,
  // SOFTWARE_PANGEA,
} from './app'

const DEFAULT_PROJECTS = [PROJECT_SAM, PROJECT_PDEV]
const DEFAULT_SOFTWARE = [SOFTWARE_PIPELINE, SOFTWARE_HIVE, SOFTWARE_AIR2POST]
const DEFAULT_RECENT_DAYS = 15
const QA_PROCESS_STATUSES = [
  `Needs QA`,
  `Ready for QA`,
  `In QA`,
  `Needs Deployment`,
]

/**
 * Clean up arrays and return joined string with each array item wrapped in double-quotes.
 *
 * @param {array|string} data
 */
const sanitizeData = (data) => {
  // Check if input data is array.
  if (Array.isArray(data)) {
    // If array, map over values and wrap each in double-quotes.
    if (data.length >= 2) {
      const sanitized = data.map((value) => {
        return `"${value}"`
      })

      // Join array items and separate by comma
      return sanitized.join()
    } else {
      // If single array item, wrap in double-quotes and return item as string.
      const sanitized = `"${data[0]}"`

      return sanitized
    }
  } else if (typeof data === `string`) {
    // If input data is string, wrap in double-quotes and return.
    return `"${data}"`
  }
}

/**
 * Return a list of all issues transitioned from "Needs Deployment" to "Deployed" within the last X days.
 *
 * @param {array} project
 * @param {array} software
 * @param {number} days
 */
export const RECENT_DEPLOYMENTS = (
  project = DEFAULT_PROJECTS,
  software = DEFAULT_SOFTWARE,
  days = DEFAULT_RECENT_DAYS
) => {
  return `project in (${sanitizeData(project)}) AND software in (${sanitizeData(
    software
  )}) AND status CHANGED FROM "Needs Deployment" to "Deployed" AFTER -${days}d ORDER BY createdDate`
}

/**
 * Return all issues with a Critical priority.
 *
 * @param {array} project
 * @param {array} software
 */
export const CRITICAL_ISSUES = (
  project = DEFAULT_PROJECTS,
  software = DEFAULT_SOFTWARE
) => {
  return `project in (${sanitizeData(project)}) AND software in (${sanitizeData(
    software
  )}) AND status not in ("Deployed", "Done") AND priority = "Critical" ORDER BY createdDate`
}

/**
 * Return all issues marked as "Urgent".
 *
 * @param {array} project
 * @param {array} software
 */
export const URGENT_ISSUES = (
  project = DEFAULT_PROJECTS,
  software = DEFAULT_SOFTWARE
) => {
  return `project in (${sanitizeData(project)}) AND software in (${sanitizeData(
    software
  )}) AND status not in ("Deployed", "Done") AND "Is Urgent" = "Urgent" ORDER BY createdDate`
}

/**
 * Return all issues currently in the QA process.
 *
 * @param {array} project
 * @param {array} software
 */
export const QA_ISSUES = (
  project = DEFAULT_PROJECTS,
  software = DEFAULT_SOFTWARE
) => {
  return `project in (${sanitizeData(project)}) AND software in (${sanitizeData(
    software
  )}) AND status in (${sanitizeData(QA_PROCESS_STATUSES)}) ORDER BY createdDate`
}

/**
 * Return all issues currently in the development process.
 *
 * @param {array} project
 * @param {array} software
 */
export const DEFAULT_ISSUES = (
  project = DEFAULT_PROJECTS,
  software = DEFAULT_SOFTWARE
) => {
  return `project in (${sanitizeData(project)}) AND software in (${sanitizeData(
    software
  )}) AND status not in ("Backlog", ${sanitizeData(
    QA_PROCESS_STATUSES
  )}, "Deployed", "Done") AND "Is Urgent" is EMPTY AND priority != Critical ORDER BY createdDate DESC`
}
