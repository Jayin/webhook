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
PORT=3000  ./bin/www
#or 
make production
```

- 使用[pm2](https://github.com/Unitech/pm2)
```
$ PORT=3001 pm2 start ./bin/www
```


