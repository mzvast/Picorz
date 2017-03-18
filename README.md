![](http://ogscovhkh.bkt.clouddn.com/Picorz-app-icon.png--2017-03-18T13:25:09+08:00)

![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/mzvast/picorz?branch=master&retina=true)

[Download](https://github.com/mzvast/Picorz/releases/latest)

## What
This app is used to accompany with markdown writer, especially for upload pictures to, for instance, qiniu cloud storage.

## How
First up, set up your qiniu cloud account in setting menu and click save.
Then, drag and drop a picture to pink zone to upload it and you'll be welcomed by a info that the markdown formatted URL has been successfully copied to clipboard of your system.

## License
GPL

# 功能介绍
Picorz是一个七牛云图床，开发的目的是为个人写markdown博客使用。
基于electron框架，支持且只支持上传到七牛云。
所有配置数据本地存储。

# 效果图
## 主界面
![](http://ogscovhkh.bkt.clouddn.com/Picorz-clipboard--2017-03-18T22:45:16+08:00)

## 设置界面
![](http://ogscovhkh.bkt.clouddn.com/bbq-111.png-bbq-2017-03-17T23:47:08+08:00)

## 生成地址
![](http://ogscovhkh.bkt.clouddn.com/snipaste_20170317_154629.png(2017-03-17T15:49:04+08:00))

# 使用说明

- 需要注册七牛云，然后[在该界面](https://portal.qiniu.com/user/key)获取AK、SK，此外还需要bucket和domain。
- 本工具基本上可以满足个人使用，能保证在key配置正确的情况下功能正常。
- 自用为主，并没有设计引导提示，这个以后会有。
- 遇到bug或者建议请提issue，谢谢。

# 未来计划

1.0版本
- 剪贴板上传[x]
- markdown开关
- 界面风格统一
- 自定义后缀前缀规则[x]
- 多仓库

2.0版本
- 托盘上传
- 右键上传
- 悬浮窗上
- 历史记录15张图片

3.0
- 图片压缩
- 加水印
- 多尺寸

4.0
- 图床搬家
- 批量操作
