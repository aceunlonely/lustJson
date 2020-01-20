<div align=center><img src="https://raw.githubusercontent.com/aceunlonely/lustJson/master/docs/lustjson.jpg"/></div>

# lustJson
from apijson  xget and uijson

# phil(哲学)
[phil](./phil.md)

#  what is lustjson
details at [about.md](https://github.com/aceunlonely/lustJson/blob/master/docs/about.md "about")

# how to use
1. install
```shell
npm i --save lustjson.js
```
2. implement a sexyGirl
like ./sexyGirl

3. code
```js
const lustjson = require('lustjson.js')
const sxg = require('./sexyGirl')

var options ={serial:false}
lustjson.get(json,sxg,options).then(data=>{
    console.log(data)
})

```
4. more in test  
5. more complex use in   
[xget](https://github.com/aceunlonely/xget.git "xget"). 
[uicli.js](https://github.com/aceunlonely/uicli.js "uicli")

6. here is unimplement sexyGril for [ilink.js](https://github.com/apporoad/ilink)
[./sexGirl/unimplement.js]