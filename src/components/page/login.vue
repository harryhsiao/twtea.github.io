<template>
  <div class="">
    <navbar/>
    <div class="text-center mt-5">
      <form class="form-signin" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weight-normal">登入</h1>
        <label for="inputEmail" class="sr-only">電子郵件</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="user.username"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">密碼</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <div class="checkbox mb-3 text-right">
          <label>
            <input type="checkbox" value="remember-me" /> 記住我
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          登入
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 僅供練習用,無商業服務</p>
      </form>
    </div>
  </div>
</template>

<script>
import navbar from '../navbar'

export default {
  name: 'login',
  data() {
    return {
      user: {

      username: "",
      password: "",

    },
    }
  },
  methods: {
    login(){
      let api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      vm.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/dashboard/products');
        }
        });
        }
  },
  
  components: {
    navbar
    
    },
  
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
</style>