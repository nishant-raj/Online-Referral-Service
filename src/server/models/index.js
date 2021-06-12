const handler = require('../lib/storagrHandler/fileStorageHandler');
const shortid = require('shortid');
let userDetail = {};

userDetail.getData = function({id}, callback){
    handler.get({},(response)=>{
        if(response.message == 'error'){
           callback({
               message: 'error',
               error: response.err
           });
           return;
        }
        let allUserList = JSON.parse(response.data);
        var user = {};
        for(var itr in allUserList){
            if(allUserList[itr].id == id){
                user = allUserList[itr];
                break;
            }
        }
        if(user.id == undefined){
            callback({
                message: 'user not present'
            });
            return;
        }
        callback({
            message: 'user present',
            user
        })
        return;
    })
};

userDetail.inserDetail = function({email, password, ref_id},callback){
    let newUserData = {
        "id": ("" + Math.random()).substring(2, 8), 
        "email": email, 
        "password": password, 
        "ref_id": shortid.generate(), 
        "total_ref": 0, 
        "ref_email": [], 
        "grofer_cash": 0
    };

    handler.get({},(response)=>{
        if(response.message == 'error'){
            callback({
                message:'Error in Database read',
                err
            });
            return;
        }
        let allUserList = JSON.parse(response.data);
        //Check duplicate Email id
        for(var itr in allUserList){
            if(allUserList[itr].email == email){
                callback({
                    message:'User Already Present'
                });
                return;
            }
        }
        allUserList.push(newUserData);
        //Add Incentive to the user and update the data
        userDetail.AddIncentives({allUserList: allUserList, email: email, ref_id: ref_id},function(updatedUserList){
            console.log(updatedUserList);
            handler.insert({data: updatedUserList.allUserList},(response)=>{
                if(response.message == 'error'){
                    callback({
                        message: 'Error in data insertion',
                        err: response.err
                    })
                    return;
                };
                callback({
                    message:'User Added'
                });
                return;
           });
        });
    });
};


userDetail.AddIncentives = function({allUserList, email, ref_id},callback){
        var validReferrer = 0;
        if(ref_id.length>0){
            for(var itr in allUserList){
                // Add incentive to new user
                if(allUserList[itr].email == email && validReferrer == 1){
                    allUserList[itr].grofer_cash = allUserList[itr].grofer_cash + 50;
                }
                // Add incentives and update detail for referring user
                if(allUserList[itr].ref_id == ref_id){
                    validReferrer = 1;
                    allUserList[itr].ref_email.push(email);
                    allUserList[itr].total_ref = allUserList[itr].total_ref + 1;
                    allUserList[itr].grofer_cash = allUserList[itr].grofer_cash + 50;
                    if(allUserList[itr].total_ref % 5 == 0){
                        allUserList[itr].grofer_cash = allUserList[itr].grofer_cash + allUserList[itr].total_ref*100;
                    }
                }
            }
        }
        callback({
            message : "Incentive Updated",
            allUserList
        });
        return;
}

userDetail.validateUser = function({email, password},callback){
    handler.get({},(response)=>{
        if(response.message == 'error'){
            callback({
                message: 'Error in data fetch'
            })
            return;
        }
        let allUserList = JSON.parse(response.data);
        for(var itr in allUserList){
            if(allUserList[itr].email == email && allUserList[itr].password == password){
                callback({
                    message: 'Valid User',
                    id: allUserList[itr].id,
                });
                return;
            }
        }
        callback({
            message: 'InValid User',
        })
        return;
    });
}

userDetail.removeUser = function({email, password},callback){
    handler.get({},(response)=>{
        if(response.message == 'error'){
            callback({
                message: 'Error in data fetch'
            })
            return;
        }
        let allUserList = JSON.parse(response.data);
        for(var itr in allUserList){
            if(allUserList[itr].email == email && allUserList[itr].password == password){
                allUserList.splice(itr,1);
                break;
            }
        }
        handler.insert({data: allUserList},(response)=>{
            if(response.message == 'error'){
                callback({
                    message: 'Error in data insertion',
                    err: response.err
                })
                return;
            };
            callback({
                message:'User Removed'
            });
            return;
       });

    })
}



module.exports = userDetail;