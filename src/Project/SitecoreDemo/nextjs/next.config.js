const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;

// A public URL (and uses below) is required for Sitecore Experience Editor support.
// This is set to http://localhost:3000 by default. See .env for more details.
const publicUrl = process.env.PUBLIC_URL;

const nextConfig = {

  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,
  
  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'fr-CA'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },

  async rewrites() {
    return [
      {
        source: '/sitecore/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
      },
      {
        source: '/api/sitecore/:path*',
        destination: `${jssConfig.sitecoreApiHost}/api/sitecore/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
      },
      // Sitecore forms
      {
        source: '/sitecore%20modules/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore%20modules/:path*`,
      },
      {
        source: '/formbuilder',
        destination: `${jssConfig.sitecoreApiHost}/formbuilder`,
      },
      // SXA / Lighthouse endpoints
      {
        source: '//sxa/:path*/',
        destination: `${jssConfig.sitecoreApiHost}/sxa/:path*`,
      },
      {
        source: '/sxa/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sxa/:path*`,
      },
      {
        source: '/fieldtracking/:path*',
        destination: `${jssConfig.sitecoreApiHost}/fieldtracking/:path*`,
      },
      {
        source: '/api/accounts/:path*',
        destination: `${jssConfig.sitecoreApiHost}/api/accounts/:path*`,
      },
      {
        source: '/api/demo/:path*',
        destination: `${jssConfig.sitecoreApiHost}/api/demo/:path*`,
      },
      // Defer entire account section of the site to Sitecore
      {
        source: '/account/:path*',
        destination: `${jssConfig.sitecoreApiHost}/account/:path*`,
      },
      // Attempted to only rewrite POST requests. This worked, but still had some issues with redirect response...
      // {
      //   source: '/account',
      //   // No way to filter by HTTP method (POST), Content-Type seemed next best option
      //   has: [
      //     {
      //       type: 'header',
      //       key: 'Content-Type',
      //       value: 'application/x-www-form-urlencoded',
      //     }
      //   ],
      //   destination: `${jssConfig.sitecoreApiHost}/account`,
      // },
    ];
  },
  
  webpack: (config, options) => {
    applyGraphQLCodeGenerationLoaders(config, options);
  
    // Allow conditional compilation for prerender "modes" (SSG/SSR)
    // using https://www.npmjs.com/package/webpack-conditional-loader
    config.module.rules.push({
      test: /\.tsx$/,
      use: [options.defaultLoaders.babel, 'webpack-conditional-loader']
    })

    return config;
  },
}

const applyGraphQLCodeGenerationLoaders = (config, options) => {
  config.module.rules.push({
    test: /\.graphql$/,
    exclude: /node_modules/,
    use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
  })

  config.module.rules.push({
    test: /\.graphqls$/,
    exclude: /node_modules/,
    use: ['graphql-let/schema/loader'],
  })

  config.module.rules.push({
    test: /\.ya?ml$/,
    type: 'json',
    use: 'yaml-loader',
  })

  return config;
}

module.exports = nextConfig;
