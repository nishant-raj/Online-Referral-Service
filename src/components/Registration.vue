<template>
    <div class="container">
        <h1> Referral Portal </h1>
        <label ><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" required> &nbsp;&nbsp;&nbsp;&nbsp;
        <label ><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" id="password" required>&nbsp;&nbsp;&nbsp;&nbsp;
        <label ><b>Referral Code</b></label>
        <input type="text" placeholder="Enter Referral code" name="Referral" id="referral" required>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" class="container registerbtn" @click="registerUser">Register</button><br>
        <div class="container signin">
    <p>Already have an account? <a class="link" @click="loginRedirect">Sign in</a>.</p>
  </div>
    </div>
</template>
<script> 
import axios from 'axios';
import swal from 'sweetalert';
export default{
    name:'Registration',
    data(){
        return{

        }
    },
    methods:{
        registerUser(){
            var email = document.getElementById('email').value;
            var pass = document.getElementById('password').value;
            var ref_id = document.getElementById('referral').value;
            console.log(email+'.........email');
            axios.post('/api/register',{email:email,password:pass,ref_id:ref_id}).then((response)=>{
                console.log(response);
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('referral').value = '';
                if(response.data.message == 'User Added'){
                    swal({
                    title: 'Successfully Registered',
                    icon: 'success',
                });
                this.$router.push('/login').catch(()=>{});
                }
                else{
                    swal({
                        title: response.data.message,
                        icon: 'error'
                    })
                }
                
            }).catch((err)=>{console.log(err)});
        },
        loginRedirect(){
            this.$router.push('/login').catch(()=>{});
        }

    }
}

</script>
<style >
* {box-sizing: border-box}
.container {
  padding: 16px;
}
input[type=text], input[type=password] {
  width: 20%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}
.registerbtn {
  background-color: #3a2676;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
.signin {
  
  text-align: center;
  
}
.link {
    color:#042eaa;
    cursor: pointer;
}
</style>