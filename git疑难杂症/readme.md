# .gitignore

## 结论
1. 所有的.gitignore里面根路径（/）为.gitignore所在的文件夹

2. 父级git仓库会首先加载子仓库的.gitignore文件来决定对子仓库文件的管理

3. 修改子仓库文件之后，可以直接在父级git仓库add和commit，父级仓库能够记录文件修改。但是子仓库是未记录该修改的，如果需要子仓库能记录修改的话，必须cd到子仓库，再进行一次add和commit

4. 如果不想记录某些文件而去修改了.gitignore文件，需要先将.gitignore单独提交，然后才可以git add . , 即为以下步骤
    1. git reset . (如之前已经git add .了，此操作可以清空所有暂存区数据)
    2. git add .gitignore
    3. git commit -m 'change .gitignore'
    4. git add .
    5. git commit -m 'commit all'

5. 非常意外，好像父级仓库不能够管理子级仓库，只会把子仓库的commitid管理起来，意思是如果提交到github或者gitee之后，从一个新的地方clone的话，子仓库只有一个名字，里面没有任何内容。。。。

例如文件结构如下
```
|-- .git
|-- .gitignore
|-- ds
|   |-- .git
|   |-- .gitignore
|   |-- index.js
|   |-- node_modules
|   |-- package-lock.json
|   `-- package.json
|-- index.js
|-- node_modules
|   |-- async-validator
|   |-- babel-helper-vue-jsx-merge-props
|   |-- babel-runtime
|   |-- core-js
|   |-- deepmerge
|   |-- element-ui
|   |-- normalize-wheel
|   |-- regenerator-runtime
|   |-- resize-observer-polyfill
|   |-- throttle-debounce
|   `-- vue
`-- package-lock.json
```

以下的git指的是与ds目录同级的git仓库（父级git仓库）
## scenario 1
与ds目录同级的gitignore内容
```
/node_modules
index
```
ds目录里面的gitignore内容
```
# 目前为空
```
以上的结果是git会忽略ds/index.js, 而不会忽略ds/node_modules

## scenaro 2
与ds目录同级的gitignore内容
```
/node_modules
/index
```
ds目录里面的gitignore内容
```
# 目前为空
```
以上的结果是git不会忽略ds/index.js, 并且也不会忽略ds/node_modules

## scenario 3
与ds目录同级的gitignore内容
```
/node_modules
/index
```
ds目录里面的gitignore内容
```
/node_modules
index
```
以上的结果是git会忽略ds/index.js, 并且也会忽略ds/node_modules

# git submodule add
添加子模块（这个有空看一下，应该有用）