<template>
  <article>
    <header>
      <h2>{{ title }}</h2>

      <div class="group">
        <!--  -->
      </div>
    </header>

    <section>
      <table v-if="issues.length >= 1">
        <thead>
          <tr>
            <th>Server</th>
            <th>Key</th>
            <th>Summary</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="issue in issues" :key="issue.key">
            <td>
              <a
                :href="`https://prologuetech.atlassian.net/browse/${issue.key}`"
                target="_blank"
                class="key"
              >
                {{ issue.key }}
                <font-awesome-icon
                  class="external-link"
                  :icon="[`fas`, `external-link`]"
                />
              </a>
            </td>
            <td>
              <img
                v-tippy="{ arrow: true }"
                :src="issue.fields.priority.iconUrl"
                :alt="`${issue.fields.priority.name} icon`"
                style="width: 0.75rem; max-width: 0.75rem; height: 0.75rem; max-height: 0.75rem;"
                :content="`${issue.fields.priority.name}`"
              />
            </td>
            <td>
              <p class="summary">
                {{ issue.fields.summary }}
              </p>
            </td>
            <td>
              <div class="status">
                <span
                  v-if="issue.fields.status.name === onHold"
                  v-tippy="{ arrow: true }"
                  class="status-badge"
                  :class="setStatusGroupColor(issue.fields.status.name)"
                  :content="
                    displayImpediments(
                      issue.fields[customFields.impediments],
                      issue.fields.assignee
                    )
                  "
                >
                  {{ issue.fields.status.name }}
                </span>
                <span
                  v-if="issue.fields.status.name === readyForQa"
                  v-tippy="{ arrow: true, allowHTML: true, interactive: true }"
                  class="status-badge"
                  :class="setStatusGroupColor(issue.fields.status.name)"
                  :content="
                    displayTestingServer(
                      issue.fields[customFields.stagingTestingServer]
                    )
                  "
                >
                  {{ issue.fields.status.name }}
                </span>
                <span
                  v-if="
                    issue.fields.status.name !== readyForQa &&
                      issue.fields.status.name !== onHold
                  "
                  class="status-badge"
                  :class="setStatusGroupColor(issue.fields.status.name)"
                >
                  {{ issue.fields.status.name }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </article>
</template>

<script>
import {
  GROUP_CRITICAL,
  GROUP_DEPLOYED,
  GROUP_DEVELOPMENT,
  GROUP_QA,
  GROUP_URGENT,
  STATUS_ON_HOLD,
  CUSTOM_FIELD_IMPEDIMENTS,
  STATUS_READY_FOR_QA,
  CUSTOM_FIELD_STAGING_TESTING_SERVER,
  statusGroupColor,
} from '@/constants'

export default {
  name: `issueCard`,

  props: {
    title: {
      type: String,
      default: ``,
    },

    issues: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      onHold: STATUS_ON_HOLD,
      readyForQa: STATUS_READY_FOR_QA,
      customFields: {
        impediments: CUSTOM_FIELD_IMPEDIMENTS,
        stagingTestingServer: CUSTOM_FIELD_STAGING_TESTING_SERVER,
      },
    }
  },

  computed: {
    badge() {
      let badge = {
        background: `gray-300`,
        icon: `smile`,
        color: `gray-700`,
      }

      switch (this.title) {
        case GROUP_CRITICAL:
          badge = {
            background: `red-500`,
            icon: `exclamation`,
            color: `white`,
          }

          return badge

        case GROUP_URGENT:
          badge = {
            background: `yellow-300`,
            icon: `angle-double-up`,
            color: `gray-700`,
          }

          return badge

        case GROUP_DEPLOYED:
          badge = {
            background: `green-500`,
            icon: `check`,
            color: `white`,
          }

          return badge

        case GROUP_DEVELOPMENT:
          badge = {
            background: `blue-600`,
            icon: `code-branch`,
            color: `white`,
          }

          return badge

        case GROUP_QA:
          badge = {
            background: `indigo-500`,
            icon: `shield-check`,
            color: `white`,
          }

          return badge

        default:
          return badge
      }
    },
  },

  methods: {
    displayImpediments(impediments, assignee) {
      if (impediments) {
        const array = impediments.map((impediment) => {
          return impediment.value
        })

        const string = array.join(`, `)

        return string
      } else {
        return `See <strong>${assignee.displayName}</strong> to get impediments.`
      }
    },

    displayTestingServer(server) {
      if (server) {
        return `<a class="underline" href="https://${server.value}.flatworldsc.com/" target="_blank">QA test this issue</a>`
      } else {
        return `This issue has not been deployed.`
      }
    },

    setStatusGroupColor(status) {
      return `text-${statusGroupColor(status)} border-${statusGroupColor(
        status
      )}`
    },
  },
}
</script>

<style lang="scss" scoped>
article {
  box-shadow: 0px 4.72398px 3.20912px rgba(26, 32, 44, 0.00719002),
    0px 10.7333px 7.29137px rgba(26, 32, 44, 0.0104523),
    0px 18.6808px 12.6903px rgba(26, 32, 44, 0.0128732),
    0px 29.6761px 20.1597px rgba(26, 32, 44, 0.015),
    0px 45.788px 31.1049px rgba(26, 32, 44, 0.0171268),
    0px 71.4486px 48.5368px rgba(26, 32, 44, 0.0195477),
    0px 118.616px 80.5786px rgba(26, 32, 44, 0.02281),
    0px 237px 161px rgba(26, 32, 44, 0.03);

  @apply w-full rounded-lg border border-solid border-gray-300 overflow-hidden;

  &:not(:last-child) {
    @apply mb-6;
  }
}

header {
  @apply flex flex-row flex-no-wrap w-full px-4 py-2 bg-gray-200;

  .badge {
    width: 1.375rem;
    height: 1.375rem;

    @apply rounded-md flex flex-row justify-center items-center mr-2;
  }

  h2 {
    @apply text-base text-gray-700 font-medium w-full flex-grow;
  }

  .group {
    @apply flex;
  }
}

section {
  height: auto;
  max-height: 28rem;

  @apply w-full overflow-y-auto;
}

table {
  @apply w-full relative;

  thead {
    font-size: 0.625rem;

    @apply font-bold text-gray-600 uppercase;

    th {
      @apply pt-4 pb-2 bg-white sticky top-0 text-left border-b border-solid border-gray-300;

      &:not(:first-child):not(:last-child) {
        @apply px-2;
      }

      &:first-child {
        @apply pl-4 pr-2;
      }

      &:last-child {
        @apply pl-2 pr-4 text-right;
      }
    }
  }

  tbody {
    tr {
      @apply transition duration-300 ease-in-out;
      &:nth-child(odd) {
        @apply bg-gray-300 bg-opacity-50;
      }

      &:nth-child(even) {
        @apply bg-gray-300 bg-opacity-25;
      }

      &:hover {
        @apply bg-gray-300 bg-opacity-75 transition duration-300 ease-in-out;
      }
    }

    td {
      @apply py-3;

      &:not(:first-child):not(:last-child) {
        @apply px-2;
      }

      &:first-child {
        @apply pl-4 pr-2;
      }

      &:last-child {
        @apply pl-2 pr-4;
      }
    }
  }
}

.key {
  @apply text-xs text-gray-700 font-medium whitespace-no-wrap;

  .external-link {
    font-size: 0.625rem;

    @apply ml-1 align-baseline text-blue-500 opacity-0 transition duration-300 ease-in-out;
  }

  &:hover {
    @apply text-blue-600;

    .external-link {
      @apply opacity-100 transition duration-300 ease-in-out;
    }
  }
}

.summary {
  @apply text-sm text-gray-700 font-normal;
}

.status {
  @apply flex flex-row justify-end items-center m-0 p-0;
}

.status-badge {
  @apply inline text-center text-xs font-medium px-4 px-2 border border-solid rounded whitespace-no-wrap;
}
</style>
