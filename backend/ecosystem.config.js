module.exports = {
  apps: [{
    name:        'legit-odds-api',
    script:      'server.js',
    cwd:         '/var/www/legit-odds/backend',
    instances:   1,
    exec_mode:   'fork',
    watch:       false,
    env: {
      NODE_ENV: 'production',
      PORT:     5007,
    },
    error_file:  '/var/log/pm2/legit-odds-error.log',
    out_file:    '/var/log/pm2/legit-odds-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
};
