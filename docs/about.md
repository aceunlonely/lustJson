# what is lustjson
1. you may need a json, just like :
```js
{
    "name" : "LiSA",
    "age" : "32",
    "isMan" : false,
    "hobbies": ["basketball","sing","dance"],
    "lover" : {
        "name" : "mayn",
        "age" : 28,
        "hobbies": ["sing","football"],
        "sister":{
            "name":"luna",
            "age" : 25,
            "isMan": false
        },
        "height" : 150
    },
    "height": 165
}
```

2. but , some value ( or key )of json ,you dont know, like:  
     .age     we dont know her age  
     .isMan   we dont know her gender  
     .hobbies[1]   .hobbies[2]   we dont konw her other hobbies  but basketball  
     .lover.name we dont know her lover's name  
     .lover.age  we dont konw her lover's age  
     .lover.hobbies    we dont know her lover's hobbies but sing  
     .lover.sister.name   we dont know her lover's sister's name  
     .lover.height   we dont know her lover's height  is konwn actually  
     .height    we even dont know her height is konwn actually, and need be filled up  
 
3. you can describe by a json like:  
```js
 {
    "name" : "LiSA",
    "age" : "???",
    "isMan" : "???is a boy",
    "hobbies": ["basketball","???"],
    "lover" : {
        "name" : "???",
        "age" : 28,
        "hobbies": ["sing","???(string)"],
        "sister":{
            "name":"???(string)[luna] what's sis name?",
            "age" : 28,
            "isMan": false
        },
        "???" : ""
    },
    "???": null
}
```

4. you can also describe it by a json like:
```js
{
    "name" : "LiSA",
    "age" : {
                "isLust" : true,
                "remark" : "here is LiSA's age",
                 "type" : "number",
                "default" : 31
             },
    "isMan" : {
                "isLust" : true,
                "remark" : "here is LiSA's gender",
                 "type" : "bool",
                 "default" : false
                  },
    "hobbies": ["basketball",{
                "isLust" : true,
                "remark" : "here is LiSA's hobby",
                 "type" : "string"
                    }],
    "lover" : {
        "name" : {
                "isLust" : true,
                "remark" : "here is LiSA's lover's hobby",
                 "type" : "string"
              },
        "age" : 28,
        "hobbies": ["sing","???(string)"],
        "sister":{
            "name":"???(string)[luna] what's sis name?",
            "age" : 28,
            "isMan": false
        },
        "???" : ""
    },
    "???": null
}

```

5. so   
    they are lustjsons , we call the nodes  
    ( like "???"  "???(string)"  "???" : ""  {"isLust" : true,"remark" : "here is LiSA's lover's hobby", "type" : "string"}  )  
    the lust.  and the struct of lust , is defined by you own,  
    you need implement a SexyGril for your lust struct  

6. so it works like:  
[![avatar](https://raw.githubusercontent.com/aceunlonely/lustJson/master/docs/lustjson-sexygirl.jpg "link to html")](https://aceunlonely.github.io/lustJson/docs/lustjson-sexygirl.html)  
    sexyGirl is implement for your lust rule  
    lustjson.js is an engine to traverse all the nodes of lustjson,  
    find a lust using unimplement methods which will impelement in sexyGirl  
    and then satisfy the lust using unimplement mehtods which will implement in sexyGirl  
    and then lustjson will replace the lust with real value  
    recurse ... util all lust is satisfied  
    then you will get the final json  
      
    lustjson.js is only an engine , and unchanged any all,  
    then lustjson is your need json,defined by your rule  
    the sexygirl is the implement for you rule, and changes after your rule changes  

7. then how it works:
    //todo


8. lust type  
    lust can be one type of kv , string , an object  
```js
{
    "name" : "LiSA",
    "age" : {
                "isLust" : true,
                "remark" : "here is LiSA's age",
                 "type" : "number",
                "default" : 31
             },
    "isMan" : "???",
    "hobbies": ["basketball",{
                "isLust" : true,
                "remark" : "here is LiSA's hobby",
                 "type" : "string"
                    }],
    "lover" : {
        "name" : {
                "isLust" : true,
                "remark" : "here is LiSA's lover's hobby",
                 "type" : "string"
              },
        "age" : 28,
        "hobbies": ["sing","???(string)"],
        "sister":{
            "name":"???(string)[luna] what's sis name?",
            "age" : 28,
            "isMan": false
        },
        "???" : ""
    },
    "???": null
}
```   
in this lustjson: 
object lust is   
```js
"age" : {  
            "isLust" : true,  
            "remark" : "here is LiSA's age",  
            "type" : "number",  
            "default" : 31  
        }  
```
string lust is
```js
"hobbies": ["sing","???(string)"]
```
or
```js
"isMan" : "???",
```
kv lust is
```js
"???": null
```