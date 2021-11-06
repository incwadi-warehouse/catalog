module.exports = {
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'incwadi',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    components: {
      title: 'incwadi',
      needsAuth: true,
    },
    i18n: {
      locale: 'en-US',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: undefined,
    },
  },
}
