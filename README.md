# lustJson
from apijson  xget and uijson

# todos

//is Serial 
1. now it is default  serial , aim is not
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
const lustjson = require('lustjson')
const sxg = require('./sexyGirl')
var options ={}
lustjson.get(json,sxg,options).then(data=>{
    console.log(data)
})

```
4. more use in [xget](https://github.com/aceunlonely/xget.git "xget"). 