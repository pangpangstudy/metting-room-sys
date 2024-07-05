# tip

redis连接不需要用户名，
redis的docker compose的设置，需要执行命令才能设置上密码
`command: ['redis-server', '--requirepass', '${REDIS_PASSWORD}']`
