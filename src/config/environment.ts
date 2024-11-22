export type Environment = 'development' | 'production';

interface Config {
  apiUrl: string;
  apiTimeout: number;
}

const configs: Record<Environment, Config> = {
  development: {
    apiUrl: 'http://localhost:8001/weights',
    apiTimeout: 10000
  },
  production: {
    apiUrl: 'https://crossfit-backend-v2.fly.dev/weights',
    apiTimeout: 15000
  }
};

export function getConfig(): Config {
  const mode = import.meta.env.MODE as Environment;
  console.log('🌍 Environment Config:', {
    mode,
    baseUrl: configs[mode].apiUrl,
    timeout: configs[mode].apiTimeout
  });
  return configs[mode] || configs.production;
}

export function getCurrentEnvironment(): Environment {
  return import.meta.env.MODE as Environment || 'development';
}