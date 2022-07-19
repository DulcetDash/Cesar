module.exports = {
  apps: [
    {
      name: "Cesar",
      script: "npm run build && serve -s build -l 8000",
      autorestart: true,
      watch: false,
      max_memory_restart: "2G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
