<template>
   <div>
       <h1 >User Detail</h1>
      <table class="customtable">
          <tr>
              <td>Email</td>
              <td>{{userInfo.email}}</td>
          </tr>
          <tr>
              <td>Referral Code</td>
              <td>{{userInfo.ref_id}}</td>
          </tr>
          <tr>
              <td>Total Referral</td>
              <td>{{userInfo.total_ref}}</td>
          </tr>
          <tr>
              <td> Next MileStone </td>
              <td> {{nextMileStone}}</td>
          </tr>
          <tr>
              <td>Referred Email</td>
              <td>{{userInfo.ref_email}}</td>
          </tr>
          <tr>
              <td>Grofer Cash</td>
              <td>{{userInfo.grofer_cash}}</td>
          </tr>
      </table><br>
      <button @click="removeUser">Remove User</button>
   </div>
</template>
<script> 
import axios from 'axios';
 import swal from 'sweetalert';

export default{
    name:'Login',
    data(){
        return{
            userInfo:{},
            userId:this.$route.query.id,
            nextMileStone:5,
        }
    },
    methods:{
        fetchUserInfo(){
            axios.get('/api/user_detail?id='+this.userId).then((response)=>{ this.userInfo=response.data.user; this.getNextMileStone()}).catch((err)=>{console.log(err)});
        },
        removeUser(){
            swal({
                title: 'Are You Sure?',
                text: 'You can not access your account again',
                icon: 'warning',
                dangerMode: 'true'
            }).then((willDelete)=>{
                if(willDelete){
                     axios.post('/api/remove',{email:this.userInfo.email,password:this.userInfo.password}).then((response)=>{console.log(response);this.$router.push('/').catch(()=>{});});
                }
            });
            
        },
        getNextMileStone(){
            let total_ref = this.userInfo.total_ref;
            if(total_ref % 5 ==0){
                this.nextMileStone = total_ref + 5;
            }
            else{
                this.nextMileStone = Math.ceil(total_ref/5)*5;
            }
        }
    },
    mounted(){
        this.fetchUserInfo();
    }
}

</script>
<style >
table, th, td {
  border: 1px solid black;
}
.customtable {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    height: 300px;
}
</style>