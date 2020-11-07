<template>
  <v-app id class="login-app">
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
                {{ isRegister?'注册账号':'欢迎来到Jiopeel，请登录！' }}
              </v-card-title>
              <v-form ref="form" v-model="valid">
                <v-container v-if="!isRegister" class="px-6 py-4">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="loginData.account"
                        autocomplete="off"
                        tabindex="1"
                        label="账号"
                        :rules="[ v => !!v || '账号不能为空']"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        outlined
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
                        v-model="loginData.password"
                        autocomplete="off"
                        tabindex="2"
                        :type="see?'text':'password'"
                        label="密码"
                        :rules="[ v => !!v || '密码不能为空']"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        outlined
                      >
                        <template slot="prepend-inner">
                          <i class="cs cs-password" />
                        </template>
                        <template slot="append">
                          <v-tooltip bottom color="#000">
                            <template v-slot:activator="{ on, attrs }">
                              <i v-bind="attrs" :class="see?'cs-see':'cs-nosee'" class="cs is-see" v-on="on" @click="isSee" />
                            </template>
                            <span>{{ see?'密码可见':'密码不可见' }}</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      class="pb-4"
                      cols="12"
                    >
                      <v-btn :loading="loading" :disabled="disabled" tabindex="3" block x-large color="var(--color-primary)" class="login-btn" @click="login">
                        登录
                      </v-btn>
                    </v-col>
                    <v-card-actions style="width:100%">
                      <v-col
                        cols="6" class="text-left login-font"
                      >
                        <a class="a" @click.prevent="isRegister = true">注册账号</a>
                      </v-col>
                      <v-col
                        cols="6" class="text-right"
                      >
                        <a class="a">忘记密码</a>
                      </v-col>
                    </v-card-actions>
                  </v-row>
                  <div class="login-font text-center">
                    第三方登录
                  </div>
                  <v-row>
                    <v-card-actions style="width:100%">
                      <v-col cols="6" class="text-center">
                        <v-tooltip bottom color="#000">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" large icon @click="OauthLogin('github')" v-on="on">
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
                            <v-btn v-bind="attrs" large icon @click="OauthLogin('gitee')" v-on="on">
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
                <v-container v-else class="px-6 py-4 ">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="registerData.account"
                        autocomplete="off"
                        tabindex="1"
                        label="账号"
                        :rules="[ v => !!v || '账号不能为空']"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        outlined
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
                        v-model="registerData.email"
                        autocomplete="off"
                        tabindex="2"
                        label="邮箱"
                        :rules="[ v => !!v || '邮箱不能为空',
                                  v => $tool.chkEmail(v) || '邮箱格式不正确']"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        outlined
                      >
                        <template slot="prepend-inner">
                          <i class="cs cs-email" />
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="registerData.password"
                        autocomplete="off"
                        tabindex="3"
                        :type="see?'text':'password'"
                        label="密码"
                        :rules="[ v => !!v || '密码不能为空']"
                        background-color="var(--color-grey)"
                        color="var(--color-semidark)"
                        required
                        outlined
                      >
                        <template slot="prepend-inner">
                          <i class="cs cs-password" />
                        </template>
                        <template slot="append">
                          <v-tooltip bottom color="#000">
                            <template v-slot:activator="{ on, attrs }">
                              <i v-bind="attrs" :class="see?'cs-see':'cs-nosee'" class="cs is-see" v-on="on" @click="isSee" />
                            </template>
                            <span>{{ see?'密码可见':'密码不可见' }}</span>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      class="pb-4"
                      cols="12"
                    >
                      <v-btn :loading="loading" :disabled="disabled" tabindex="4" block x-large color="var(--color-primary)" class="login-btn" @click="register">
                        注册
                      </v-btn>
                    </v-col>
                  </v-row>
                  <div class="login-font text-center pt-2 pb-4">
                    已有账号?点击 <a class="a" @click.prevent="isRegister=false">登陆</a>
                  </div>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Oauth from '@/api/login/oauth'

export default {
  data: () => ({
    valid: true,
    see: false,
    isRegister: false,
    loading: false,
    disabled: false,
    loginData: {
      account: '',
      password: ''
    },
    registerData: {
      account: '',
      password: '',
      email: ''
    }
  }),
  watch: {
    // loginData: {
    //   handler: function(val, oldval) {
    //     console.log('watch :' + JSON.stringify(this.loginData))
    //   },
    //   deep: true// 对象内部的属性监听，也叫深度监听
    // }
    isRegister(val, oldval) {
      return this.$refs.form.reset()
    }
  },
  created: () => {
    console.log('login')
  },
  methods: {
    isSee() {
      this.see = !this.see
    },
    check() {
      return this.$refs.form.validate()
    },
    /**
     * 登录
     */
    login() {
      if (!this.check()) {
        return
      }
      this.loading = true
      this.disabled = true
      // 开始登录操作
      let grantType = ''
      Oauth.getAuthUrl().then(res => {
        const auth = res.data
        console.log(auth)
        console.log('login :' + JSON.stringify(this.loginData))
        grantType = auth.grantType || 'local'
        return Oauth.login(this.loginData, auth)
      }).then(res => {
        console.log(res.data)
        return Oauth.authRedirect(grantType, res.data.code)
      }).then(res => {
        console.log('认证成功：' + JSON.stringify(res))
        const access_token = res.data.access_token
        console.log('access_token==> ' + JSON.stringify(access_token))
        this.$lockr.set('access_token', access_token)
        this.$toast.suc('登录成功')
      }).done().finally(() => {
        setTimeout(() => {
          this.loading = false
          this.disabled = false
        }, 800)
      })
    },
    /**
     * 注册
     */
    register() {
      if (!this.check()) {
        return
      }
      this.loading = true
      this.disabled = true
      const account = this.registerData.account
      Oauth.register(this.registerData).then(res => {
        this.$toast.suc('注册成功')
        this.isRegister = false
        this.$nextTick(() => {
          this.loginData.account = account
        })
      }).done().finally(() => {
        setTimeout(() => {
          this.loading = false
          this.disabled = false
        }, 800)
      })
    },
    /**
     * 授权登录
     */
    OauthLogin(grantType) {
      Oauth.getAuthUrl(grantType).then(res => {
        const auth = res.data
        console.log(auth)
        window.location.href = auth.url
      })
    }
  }
}
</script>
<style lang="scss">
 @import "@/scss/login/login.scss";
</style>
