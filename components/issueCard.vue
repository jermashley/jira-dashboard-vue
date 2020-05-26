<template>
  <article>
    <header>
      <div class="icon" :class="`bg-${iconColor}`">
        A
      </div>

      <h2>{{ title }}</h2>

      <div class="group"></div>
    </header>

    <section>
      <table v-if="issues.length >= 1">
        <thead>
          <tr>
            <th>Key</th>
            <th>Priority</th>
            <th>Summary</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="issue in issues" :key="issue.key">
            <td>
              <a
                :href="`https://prologuetech.atlassian.net/browse/${issue.key}`"
                class="key"
              >
                {{ issue.key }}
              </a>
            </td>
            <td>
              <img
                :src="issue.fields.priority.iconUrl"
                :alt="`${issue.fields.priority.name} icon`"
                style="width: 0.75rem; height: 0.75rem;"
              />
            </td>
            <td>
              <p class="summary">
                {{ issue.fields.summary }}
              </p>
            </td>
            <td>
              <p class="status">
                <span class="status-badge">{{ issue.fields.status.name }}</span>
              </p>
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

  computed: {
    iconColor() {
      switch (this.title) {
        case GROUP_CRITICAL:
          return `red-500`

        case GROUP_URGENT:
          return `yellow-300`

        case GROUP_DEPLOYED:
          return `green-500`

        case GROUP_DEVELOPMENT:
          return `blue-600`

        case GROUP_QA:
          return `indigo-500`

        default:
          return `gray-300`
      }
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

  .icon {
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
  max-height: 24rem;

  @apply w-full overflow-y-auto;
}

table {
  @apply w-full relative;

  thead {
    font-size: 0.625rem;

    @apply font-bold text-gray-600 uppercase;

    th {
      @apply pt-4 pb-2 bg-white sticky top-0 text-left;

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
      &:nth-child(odd) {
        @apply bg-gray-100;
      }

      &:nth-child(even) {
        @apply bg-gray-200;
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

  &:hover {
    @apply text-blue-600;
  }
}

.summary {
  @apply text-sm text-gray-700 font-normal;
}

.status {
  max-width: 10rem;

  @apply text-right w-full;
}

.status-badge {
  @apply text-right text-gray-700 text-xs font-medium px-4 px-2 border border-solid border-gray-700 rounded whitespace-no-wrap;
}
</style>
