#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')
const pkg = require("./package.json")
program
    .version(pkg.version)
program
    .command('add <task...>')           //子命令clone
    .description('add a task')                  //描述
    .action((args) => {                         //作用
               console.log(args.join(' '))
        api.add(args).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
    });
program
    .command('clear')                  //子命令clone
    .description('clear all task')             //描述
    .action(() => {
        api.clear().then(()=>{console.log('清除成功')},()=>{console.log('清除失败')})
                           //作用
    });

program.parse(process.argv);                   //有问题
console.log(process.argv)                 //argv 用户传的参数用户

if(process.argv.length === 2){
    api.showAll()
}