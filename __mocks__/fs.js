const fs = jest.createMockFromModule('fs');   //假的fs
const _fs = jest.requireActual('fs')     //实际的fs

Object.assign(fs,_fs)
let readMocks ={}
fs.setReadFileMock=(path,error,data)=>{
   readMocks[path] = [error,data]
}
fs.readFile = (path,options,callback)=>{
    if(callback === undefined){callback = options}         //用户没有传options   fs.readFile('xxx',fn)
    if(path in readMocks){
        callback(...readMocks[path])    // readMocks[path][0],readMocks[path][1]
    }else{
        _fs.readFile(path,options,callback)
    }
}

let writeMocks = {}
fs.setWriteFileMock = (path,fn)=>{
    writeMocks[path] = fn
}

fs.writeFile = (path,data,options,callback) => {

    if(path in writeMocks){
        writeMocks[path](path,data,options,callback)
    }else{
        _fs.writeFile(path,data,options,callback)
    }
}
fs.clearMocks =()=>{
    readMocks ={}
    writeMocks = {}
}
module.exports= fs