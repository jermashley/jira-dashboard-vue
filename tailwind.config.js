const defaultTheme = require(`tailwindcss/defaultTheme`)

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: `#e5476f`,
          light: `#f8c3d1`,
          dark: `#4d393e`,
          accent: `#8ae5cf`,
        },
      },

      fontFamily: {
        sans: [`Jost`, ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
