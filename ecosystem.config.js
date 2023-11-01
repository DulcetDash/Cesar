module.exports = {
  apps: [
    {
      name: "Cesar",
      script: "npm run build && serve -s build -l 10301",
      autorestart: true,
      watch: false,
      // max_memory_restart: "2G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
