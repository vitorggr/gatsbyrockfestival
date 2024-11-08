/*
* @type {import('gatsby').GatsbyConfig}
*/
module.exports = {
  siteMetadata: {
    title: `Gatsby Rock Festival`,
    author: "Vítor Gabriel Guimarães Rodrigues",
    siteUrl: `https://gatsbyrockfestival.netlify.app`,
    ang: "pt-br",
    social: {
      github: "https://github.com/vitorggr",
    },
    keywords: ["gatsby", "react"],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `bandas`, 
        path: `${__dirname}/src/pages/bandas`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages/bandas`,
        ignore: ["**/.*"],
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
}