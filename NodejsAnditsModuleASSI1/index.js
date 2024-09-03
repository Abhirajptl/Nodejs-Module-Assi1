const fs = require('fs')
const path = require('path')

const operation = process.argv[2]
const file = process.argv[3]

switch(operation){
    case 'read':
    fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
            console.error(`Error reading file : ${err}`)
            return;
        }
        console.log(data);
    });
    break;

    case 'delete':
    fs.unlink(file,(err)=>{
        if(err){
            console.error(`Error deleting file/directory ${file}`);
            return;
        }
        console.log(`File ${file} deleted`);
    });
    break;

    case 'create':
    fs.writeFile(file,'',(err)=>{
        if(err){
            console.error(`Error creating file ${file} `);
            return;
        }
        console.log(`File ${file} created`);
    });
    break;

    case 'append':
    const content = process.argv.slice(4).join(" ") || ''
    fs.appendFile(file,`\n${content}`,'utf-8',(err)=>{
        if(err){
            console.error(`Error appeding to file : ${err}`);
            return;
        }
        console.log(`Content appended to the file ${file}`);
    })
    break;

    case 'rename':
    const reName = process.argv[4]
    fs.rename(file,reName,(err)=>{
        if(err){
            console.error(`Error renaming file/directory: ${err}`);
            return;
        }
        console.log(`File ${file} renamed to ${reName}`)
    });   
    break;

    case 'list':
    const directory = file || '.';
    fs.readdir(directory,(err,files)=>{
        if(err){
            console.error(`Error listing files/directories: ${err}`)
            return;
        }
        console.log(`Files & directories in ${directory} : `);
        files.forEach((file)=>{
            console.log(file);
        });
    })
    break;

    default:
        console.log(`Invalid operation ${operation}`);
}