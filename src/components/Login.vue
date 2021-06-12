<template>
    <div class="container">
        <h1> Referral Portal </h1>
        <label ><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" required>&nbsp;&nbsp;&nbsp;&nbsp;
        <label ><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" id="password" required>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" class="registerbtn" @click="login">Login</button>
      
    </div>
</template>
<script> 
import axios from 'axios';
import swal from 'sweetalert';
export default{
    name:'Login',
    data(){
        return{

        }
    },
    methods:{
        login(){
            var email = document.getElementById('email').value;
            var pass = document.getElementById('password').value;
            console.log(email+'.........email');
            axios.post('/api/login',{email:email,password:pass}).then((response)=>{
                console.log(response);
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                 if(response.data.message == 'Valid User'){
                    swal({
                    title: 'Successfully LogedIn',
                    icon: 'success',
                });
                this.$router.push('/userdetail?id='+response.data.id).catch(()=>{});
                }
                else{
                    swal({
                        title: "Invalid User",
                        icon: 'error',
                    })
                }
         
            }).catch((err)=>{console.log(err)});
        }
    }
}

</script>
<style >

</style>