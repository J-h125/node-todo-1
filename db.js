const homedir = require('os').homedir();          //home 目录
const home = process.env.HOME || homedir;                     //home 变量
const p = require('path')               //拼路径，相当于 /
const fs = require('fs')
const dbPath = p.join(home,'.todo')


const db = {
    read(path=dbPath){                   //path = dbpath
        return new Promise((resolve,reject)=> {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) {
                   return reject(error)
                }
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list,path=dbPath){
        return new Promise((resolve,reject)=>{
            const  string = JSON.stringify(list)
            console.log(string)
            fs.writeFile(path,string,(error)=>{
                if(error){
                  return  reject(error)
                }
                    resolve()

            })
        })

    }
}
module.exports = db