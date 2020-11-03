<template>
  <v-app class="login-app">
    <v-main>
      <v-container class="login-container">
        <v-row>
          <div class="login-logo">
            <v-img
              contain height="60" width="60" :src="require('@/assets/img/login.svg')" />
          </div>
          <v-col cols="12">
            <v-card class="login-main">
              <v-card-title class="login-title">
                欢迎来到Jiopeel，请登录！
              </v-card-title>
              <v-form>
                <v-container class="px-6 py-4 ">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="account"
                        autocomplete="off"
                        tabindex="1"
                        label="账号"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        filled
                      >
                        <template slot="prepend-inner">
                          <i class="cs cs-user" />
                        </template>
                      </v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="password"
                        autocomplete="off"
                        tabindex="2"
                        :type="see?'text':'password'"
                        label="密码"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        filled
                      >
                        <template slot="prepend-inner">
                          <i class="cs cs-password" />
                        </template>
                        <template slot="append">
                          <v-tooltip bottom color="#000">
                            <template v-slot:activator="{ on, attrs }">
                              <a class="py-2" v-bind="attrs" v-on="on" @click="isSee">
                                <i :class="see?'cs-see':'cs-nosee'" class="cs" />
                              </a>
                            </template>
                            <span>{{ see?'密码可见':'密码不可见' }}</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col
                      class="pb-4"
                      cols="12"
                    >
                      <v-btn tabindex="3" block x-large color="var(--color-primary)" class="login-btn" @click="login">
                        登录
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-card-actions style="width:100%">
                      <v-col
                        cols="6" class="text-left"
                      >
                        <a class="a">注册账号</a>
                      </v-col>
                      <v-col
                        cols="6" class="text-right"
                      >
                        <a class="a">忘记密码</a>
                      </v-col>
                    </v-card-actions>
                  </v-row>
                  <div class="login-type text-center">
                    第三方登录
                  </div>
                  <v-row>
                    <v-card-actions style="width:100%">
                      <v-col cols="6" class="text-center">
                        <v-tooltip bottom color="#000">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" large icon v-on="on">
                              <svg class="cs-svg" aria-hidden="true">
                                <use xlink:href="#cs-github" />
                              </svg>
                            </v-btn>
                          </template>
                          <span>Github</span>
                        </v-tooltip>
                      </v-col>
                      <v-col cols="6" class="text-center">
                        <v-tooltip bottom color="#000">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" large icon v-on="on">
                              <svg class="cs-svg" aria-hidden="true">
                                <use xlink:href="#cs-gitee" />
                              </svg>
                            </v-btn>
                          </template>
                          <span>Gitee</span>
                        </v-tooltip>
                      </v-col>
                    </v-card-actions>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
          <v-snackbar
            v-model="active"
            timeout="3000"
            top
            app
          >
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="active = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    see: false,
    account: '',
    password: '',
    active: false,
    text: ''
  }),
  created: () => {
    console.log('login')
  },
  methods: {
    isSee() {
      this.see = !this.see
      this.showToast(this.see ? '密码可见' : '密码不可见')
    },
    showToast(text) {
      this.text = text
      this.active = true
    },
    login() {
      this.$toast('Default toast')
    }
  }
}
</script>
<style lang="scss">
.login-app {
  --color-primary: #006dc9;
  --color-grey: #44a0b30f;
  --color-dark: #44a0b380;
  --color-semidark: #07d0e8;
  .login-container {
    max-width: 400px;
  }
  .login-main{
    box-shadow: 0 7px 25px rgba(0, 0, 0, .08)!important;
    border-radius: .5rem;
    // &::after{
    //   content: ' ';
    //   box-shadow: 0 0 25px rgba(0, 0, 0, .1);
    //   transform: translate(0, -92.6%) scale(.88);
    //   border-radius: .5rem;
    //   position: absolute;
    //   top: 100%;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-color: #fff;
    //   z-index: 1;
    // }
  }
  // .login-main-monitor{
  //   box-shadow: 0 0 25px rgba(0, 0, 0, 0.1)!important;;
  //   transform: translate(0, -92.6%) scale(0.88)!important;;
  //   border-radius: 0.5rem;
  //   position: absolute;
  //   top: 94%;
  //   width: 39%;
  //   height: 90%;
  //   background-color: #fff;
  //   z-index: 1;
  // }
  .v-main {
    background-color: #fafbfe;
    color: var(--color-semidark);
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .v-label{
  color: var(--color-semidark);
  }
  .v-input__slot{
    border-radius: 3px!important;
  }
  .v-input__slot:before{
    border-color:transparent!important;
  }
  .v-input input{
    color :var(--color-dark);
  }
  .v-input__prepend-inner{
    padding-right: 10px!important;
  }
  .login-title {
    justify-content: center;
    padding-top: 60px;
    color: var(--color-semidark);
    font-size: 14px;
    font-weight: 700;
  }
  .login-btn{
    color: #fff;
    box-shadow: 0 2px 7px var(--color-semidark);
    font-weight: 700;
  }
  .text-center{
    text-align: center;
  }
  .text-left{
    text-align: left;
  }
  .text-right{
    text-align: right;
  }
  .a{
    color: var(--color-primary);
    text-decoration: none;
    border-bottom: 1px dashed var(--color-semidark);
    margin-top: -3px;
    padding-bottom: 2px;
    font-weight: 700;
  }
  .login-type{
    color: var(--color-semidark);
  }
  .login-logo{
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin: 0 auto -60px;
    border-radius: 50%;
    box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
    padding: 20px;
    background-color: #fff;
    z-index: 3;
    position: relative;
  }
  .cs{
    font-size: 20px;
    color: var(--color-semidark);
  }
  .is-see{
    font-size: 10px;
  }
  .cs-svg{
    width: 30px;
    height: 30px;
  }
}
.toast-content{
    word-wrap:break-word;
    max-width: 320px;
    min-width: 200px;
}
</style>
