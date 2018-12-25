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
[![avatar](docs/lustjson-sexygirl.jpg "link to html")](docs/lustjson-sexygirl.html)

