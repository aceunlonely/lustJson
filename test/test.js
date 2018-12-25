var lustjsonJs = require('../index')

var sexyGirl = require('./sexyGirlDemo')

var lustjson ={
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
        "hobbies": ["sing","???"],
        "sister":{
            "name":"???",
            "age" : 28,
            "isMan": false
        },
        "???" : ""
    },
    "???": null
}


// test serial
lustjsonJs.get(lustjson,sexyGirl,{serial:true}).then(finalJson=>{
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(finalJson)
})


// test parallel
lustjsonJs.get(lustjson,sexyGirl,{serial:false}).then(finalJson=>{
    console.log("================================================")
    console.log(finalJson)
})
