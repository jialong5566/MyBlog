var fs = require("fs");
var globalConfig = {}
var conf = fs.readFileSync("./server.conf")
var configArr =  conf.toString().split("\n")
configArr.forEach(item=>{
    globalConfig[item.split("=")[0].trim()]=item.split("=")[1].trim()
})
console.log(globalConfig)
module.exports = globalConfig;