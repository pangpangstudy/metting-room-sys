# tip

redis连接不需要用户名，
redis的docker compose的设置，需要执行命令才能设置上密码
`command: ['redis-server', '--requirepass', '${REDIS_PASSWORD}']`

# Todo

用户；
注册：完成
登录:完成
鉴权:完成
添加返回格式拦截器：完成
添加接口访问记录拦截器：完成
更改信息(name|password):完成
验证码问题-验证码使用后应直接删除redis数据：待做
用户列表：待做
分页：待做
