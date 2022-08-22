### 一、项目介绍

项目核心信息：低代码设计平台，通过拖拽组件生成静态页面，支持修改组件属性、样式，支持页面保存与查看。

项目地址：http://43.140.248.221:9000

Github 地址：https://github.com/niuhuiming/lowcode



### 二、项目实现

#### 2.1技术选型与相关开发文档

##### 2.1.1需求分析

- 提供文本、图片、按钮、视频、链接等组件
- 通过拖拽组件库中的组件摆放到画布中，实现页面布局
- 修改组件的属性，如：尺寸、颜色、组件内容
- 支持页面保存、发布
- 查看历史页面

##### 2.1.2详细设计及技术选型

**项目实现思路：**前端维护一个对象列表用于保存当前页面组件的布局与属性，调用渲染函数实现页面的加载。发布页面时将页面转为对应的`JSON`存入数据库。查看页面时依据`JSON`信息渲染页面。

**前端技术选型：**`Vue3` + `TypeScript` ，使用`Vite`进行项目搭建，使用`Vue Router`实现路由管理，使用`mitt`实现全局状态管理

**后端技术选型：**后端框架使用`Express`，数据库使用`MongoDB`

#### 2.2架构设计 

![](https://github.com/niuhuiming/ImgREADME/blob/f4311fe4ed3b9fd268fa4e7580738a3432a0ae17/lowcode/1.PNG)

#### 2.3项目代码介绍

```
│  .gitignore
│  index.html
│  package.json
│  README.md
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts
│  yarn.lock
│  
├─.vscode
│      extensions.json
│      
├─public
│      vite.svg
│      
└─src
    │  App.vue
    │  main.ts
    │  style.css
    │  vite-env.d.ts
    │  
    ├─assets	// 部分静态资源
    │      demo.mp4
    │      fj01.png
    │      fj02.png
    │      logo.png
    │      
    ├─components	// 组件库
    │      index.ts
    │      LinkComp.vue
    │      PicComp.vue
    │      TabList.vue
    │      TextComp.vue
    │      VideoComp.vue
    │      
    ├─router	// 路由
    │      index.ts
    │      
    ├─templates	// 组件处理器
    │      index.ts
    │      LinkComp.ts
    │      PicComp.ts
    │      TabList.ts
    │      TextComp.ts
    │      VideoComp.ts
    │      
    ├─utils	// 工具类
    │      emitter.ts	// 全局事件总线
    │      index.ts	// 工具
    │      
    └─views	// 页面
        │  EditPage.vue
        │  PageList.vue
        │  ShowPage.vue
        │  
        └─comps	// 页面组件
                CenterView.vue
                HeadTab.vue
                HeadView.vue
                LeftView.vue
                menuList.ts
                RightView.vue
```



### 三、测试结果

#### 3.1功能测试

- 组件拖拽摆放功能正常
- 通过属性面板改变组件样式正常
- 通过属性面板改变组件属性正常（🐞文本组件）
- 暂存页面功能正常
- 发布页面功能正常
- 查看页面功能正常

#### 3.2性能测试

##### 3.2.1性能分析报告

![](https://github.com/niuhuiming/ImgREADME/blob/be638f152126f6a9232b254ae2841bec85e79fe4/lowcode/2.png)

##### 3.2.2可优化点

- 使用HTTPS
- 添加`meta description`



### 四、项目总结与反思

#### 4.1目前存在的问题

- 修改文本时响应式仍存在问题，未能有效保存
- 编辑页面下按钮组件的点击和移动组件时时点击还未作区分

#### 4.2已识别出的优化项

- 暂存页面的数据应保存到数据库而不是浏览器缓存，并且最好能做到自动保存而不是用户手动保存
- 保存页面信息的`JSON`存在优化空间

#### 4.3架构演进的可能性

- 目前的`JSON`格式是一个对象数组，每个对象对应一个组件的信息，这种保存形式信息熵高，包含了很多的冗余信息，并且组件序列比较混乱。更好的做法是页面的`JSON`是一个整体，各组件之间为并列或嵌套关系。后者在保存页面信息上面更高效，在页面增删组件时也更有效率。

#### 4.4项目的总结与反思

在项目开始前对项目的整体架构做了足够的规划，了解了现有的一些低代码平台的实现思路，最终决定完成一个能拖拽组件实现静态页面、支持修改组件属性，支持页面的保存与查看的低代码平台。在技术选型时选择了之前没有使用过的`Vue3`和`TypeScript`，虽说不熟悉语法遇到了许多问题，但通过此项目的收获还是很大的。

项目暂时告一段落了，目前项目还存在一些问题，也有优化的空间，期待未来重构。
