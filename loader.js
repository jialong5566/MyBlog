var fs = require("fs");
var globalConfig =  require("./config")
var controllerSet = []
var pathMap = new Map();
var files = fs.readdirSync(globalConfig['web_path'])
files.forEach(fileItem=>{
    let temp = require(`./${globalConfig["web_path"]}/${fileItem}`)

    if(temp.path){
        for(let [key,val] of temp.path){
            if(pathMap.get(key)==null){
                pathMap.set(key,val)
            }else {
                throw new Error(`${pathMap.get(key)}is already exsit`)
            }
        }
        controllerSet.push(temp)
    }
})
module.exports = pathMap