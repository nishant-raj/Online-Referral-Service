const fs = require('fs');
const Bucket = './temp/index.json';


function get({},callback){
    fs.readFile(Bucket, 'utf8', (err,data)=>{
        if(err){
           callback({
               message: 'error',
               err
           });
           return;
        }
        console.log(data);
        callback({
            message: 'success',
            data,
        });
        return
    });
}

function insert({data},callback){
    fs.writeFile(Bucket, JSON.stringify(data),(err)=>{
        if(err){
            callback({
                message: 'error',
                err
            });
            return;
        }
        callback({
            message: 'Success'
        });
    });
}

module.exports = {
    get,
    insert,
}

