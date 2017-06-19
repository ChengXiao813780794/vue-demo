## Build
### develop env
    1. npm/cnpm install
    2. npm test 
    3. npm run build 
    server on port 8181

### production env
    1. npm/cnpm install
    2. npm start 
    3. npm run build
    server on port 7575


# 开发规范
  前端开发目录 src  

### 命名规范
    1. 所有文件夹采用小写命名，多单词的文件夹用下划线连接（ 如： page_user ）
    2. 所有.vue文件采用大写开头
    3. 所有业务js文件采用驼峰命名（service 文件采用首字母大写命名）
    4. 所有less, css文件采用驼峰命名

### 静态文件资源库
    1. ／static／* 目录下是静态文件目录，所有文件通过 ／static/访问，为绝对路径
    2. ／assets/ * 目录下的文件的图片会进行base64编码，通常放小图片

### Env.js文件配置
    将Env.js放在项目根目录下，将rsa_public_key.pem，rsa_private_key.pem，alipay_rsa_public_key.pem三个文件放在项目外的任意目录下，并在Env.js里配置你所放置这三个文件的目录    


