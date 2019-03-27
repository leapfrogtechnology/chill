export default {
  app: {
    baseUrl: __INJECTED_CONFIG.dashboard.baseUrl || '/',
    title: __INJECTED_CONFIG.dashboard.title || 'Chill Dashboard',
    appLogo: {
      url: __INJECTED_CONFIG.dashboard.appLogo || require('../public/images/chill.png'),
      height: __INJECTED_CONFIG.dashboard.logoHeight || '80px'
    },
    projectLogo: {
      url: __INJECTED_CONFIG.dashboard.projectLogo || require('../public/images/chill.png'),
      height: __INJECTED_CONFIG.dashboard.logoHeight || '80px'
    }
  },
  api: {
    endpoints: {
      status: '/status',
      history: '/status/logs'
    },
    baseUrl: __INJECTED_CONFIG.dashboard.apiBaseUrl || 'http://localhost:8000/api'
  },
  websocket: {
    reconnectTimeout: 5000,
    endpoint: __INJECTED_CONFIG.dashboard.websocketBaseUrl || 'ws://localhost:8080'
  }
};
