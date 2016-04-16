## Usage

- dev
```shell
$ make development
```

- production
```shell
$ make production
```

## test

```shell
$ make test
```

## Deploy

- 最直接的部署
```shell
$ PORT=3000  ./bin/www
#or 
$ make production
```

- 使用[pm2](https://github.com/Unitech/pm2)
```
$ PORT=3001 pm2 start ./bin/www
```

## Usage

1. 在`webhooks/`下新建一json文件来描述需要对指定的项目进行操作(不懂？直接上例子)

- 新建一个以`{project_name}.{platform}.json`为格式的配置webhook文件(这是推荐操作)
- 输入一下内容(例子):
```json
{
   "platform": "coding",
   "https_url": "https://git.coding.net/EManual/docs.git",
   "branch": "master",
   "script": "cd ~/dev/my/webhook/test/fixtures && make"
}
```

解析：
- platform 代码托管平台，目前支持coding/github（详细请看`libs/platform`）
- https_url 源码仓库地址
- branch 监听处理的分支，若为*则匹配所有分支
- script 对hook的触发时执行的命令
