<template>
  <div class="login-app">
    <div class="login-container">
      <a-row :gutter="[24,24]" class="width-100">
        <a-col :span="24">
          <div class="login-logo">
            <img height="60" width="60" :src="require('@/assets/img/login.svg')">
          </div>
          <a-card class="login-main" :bordered="false">
            <div class="login-title">
              {{ title }}
            </div>
            <div v-if="activeType === ACTIVE_TYPE.Login" class="px-2 py-3">
              <a-row :gutter="[0 ,16]">
                <a-form-model ref="loginForm" :model="loginData" :rules="loginRules">
                  <a-col :span="24">
                    <a-form-model-item prop="account">
                      <a-input
                        v-model="loginData.account"
                        autocomplete="off"
                        tabindex="1"
                        placeholder="账号"
                      >
                        <template slot="prefix">
                          <i class="cs cs-user primary" />
                        </template>
                      </a-input>
                    </a-form-model-item>
                  </a-col>

                  <a-col :span="24">
                    <a-form-model-item prop="password">
                      <a-input
                        v-model="loginData.password"
                        autocomplete="off"
                        tabindex="2"
                        :type="see?'text':'password'"
                        placeholder="密码"
                      >
                        <template slot="prefix">
                          <i class="cs cs-password primary" />
                        </template>
                        <template slot="suffix">
                          <a-tooltip bottom color="#000" :title="see?'密码可见':'密码不可见'">
                            <i :class="see?'cs-see':'cs-nosee'" class="cs is-see primary" @click="isSee" />
                          </a-tooltip>
                        </template>
                      </a-input>
                    </a-form-model-item>
                  </a-col>
                </a-form-model>
              </a-row>
              <a-row :gutter="[0 ,16]">
                <a-col
                  span="24"
                >
                  <a-button :loading="loading" :disabled="disabled" tabindex="3" block x-large class="login-btn" @click="login">
                    登录
                  </a-button>
                </a-col>
              </a-row>
              <a-row :gutter="[0,24]">
                <a-col
                  :span="12" class="text-left login-font"
                >
                  <a class="a" @click.prevent="activeType = ACTIVE_TYPE.Register">注册账号</a>
                </a-col>
                <a-col
                  :span="12" class="text-right"
                >
                  <a class="a" @click.prevent="activeType = ACTIVE_TYPE.Forget">忘记密码</a>
                </a-col>
              </a-row>
              <a-row :gutter="[0,16]">
                <div class="login-font text-center pb-2">
                  第三方登录
                </div>
              </a-row>
              <a-row>
                <a-col :span="12" class="text-center">
                  <a-tooltip title="Github">
                    <a-button shape="circle" type="link" @click="OauthLogin('github')">
                      <svg class="cs-svg" aria-hidden="true">
                        <use xlink:href="#cs-github" />
                      </svg>
                    </a-button>
                  </a-tooltip>
                </a-col>
                <a-col :span="12" class="text-center">
                  <a-tooltip title="Gitee">
                    <a-button shape="circle" type="link" @click="OauthLogin('gitee')">
                      <svg class="cs-svg" aria-hidden="true">
                        <use xlink:href="#cs-gitee" />
                      </svg>
                    </a-button>
                  </a-tooltip>
                </a-col>
              </a-row>
            </div>
            <div v-if="activeType === ACTIVE_TYPE.Register" class="px-6 py-4 ">
              <a-row>
                <a-col
                  cols="12"
                >
                  <a-input
                    v-model="registerData.account"
                    autocomplete="off"
                    tabindex="1"
                    label="账号"
                    :rules="[ v => !!v || '账号不能为空']"
                    background-color="#44a0b30f"
                    color="#07d0e8"
                    required
                    outlined
                  >
                    <template slot="prepend-inner">
                      <i class="cs cs-user" />
                    </template>
                  </a-input>
                </a-col>

                <a-col
                  cols="12"
                >
                  <a-input
                    v-model="registerData.email"
                    autocomplete="off"
                    tabindex="2"
                    label="邮箱"
                    :rules="[ v => !!v || '邮箱不能为空',
                              v => $tool.chkEmail(v) || '邮箱格式不正确']"
                    background-color="#44a0b30f"
                    color="#07d0e8"
                    required
                    outlined
                  >
                    <template slot="prepend-inner">
                      <i class="cs cs-email" />
                    </template>
                  </a-input>
                </a-col>
                <a-col
                  cols="12"
                >
                  <a-input
                    v-model="registerData.password"
                    autocomplete="off"
                    tabindex="3"
                    :type="see?'text':'password'"
                    label="密码"
                    :rules="[ v => !!v || '密码不能为空']"
                    background-color="#44a0b30f"
                    color="#07d0e8"
                    required
                    outlined
                  >
                    <template slot="prepend-inner">
                      <i class="cs cs-password" />
                    </template>
                    <template slot="append">
                      <a-tooltip bottom color="#000">
                        <template v-slot:activator="{ on, attrs }">
                          <i v-bind="attrs" :class="see?'cs-see':'cs-nosee'" class="cs is-see" v-on="on" @click="isSee" />
                        </template>
                        <span>{{ see?'密码可见':'密码不可见' }}</span>
                      </a-tooltip>
                    </template>
                  </a-input>
                </a-col>
              </a-row>
              <a-row>
                <a-col
                  class="pb-4"
                  cols="12"
                >
                  <a-button :loading="loading" :disabled="disabled" tabindex="4" block x-large class="login-btn" @click="register">
                    注册
                  </a-button>
                </a-col>
              </a-row>
              <div class="login-font text-center pt-2 pb-4">
                已有账号?点击 <a class="a" @click.prevent="activeType = ACTIVE_TYPE.Login">登陆</a>
              </div>
            </div>
            <div v-if="activeType === ACTIVE_TYPE.Forget" class="px-6 py-4 ">
              <a-row>
                <a-col
                  cols="12"
                >
                  <a-input
                    v-model="forgetData.account"
                    autocomplete="off"
                    tabindex="1"
                    label="账号"
                    :rules="[ v => !!v || '账号不能为空']"
                    background-color="#44a0b30f"
                    color="#07d0e8"
                    required
                    outlined
                  >
                    <template slot="prepend-inner">
                      <i class="cs cs-user" />
                    </template>
                  </a-input>
                </a-col>

                <a-col
                  cols="12"
                >
                  <a-input
                    v-model="forgetData.email"
                    autocomplete="off"
                    tabindex="2"
                    label="邮箱"
                    :rules="[ v => !!v || '邮箱不能为空',
                              v => $tool.chkEmail(v) || '邮箱格式不正确']"
                    background-color="#44a0b30f"
                    color="#07d0e8"
                    required
                    outlined
                  >
                    <template slot="prepend-inner">
                      <i class="cs cs-email" />
                    </template>
                  </a-input>
                </a-col>
              </a-row>
              <a-row>
                <a-col
                  class="pb-4"
                  cols="12"
                >
                  <a-button :loading="loading" :disabled="disabled" tabindex="4" block x-large class="login-btn" @click="forget">
                    重置密码
                  </a-button>
                </a-col>
              </a-row>
              <div class="login-font text-center pt-2 pb-4">
                已有账号?点击 <a class="a" @click.prevent="activeType = ACTIVE_TYPE.Login">登陆</a>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import Oauth from '@/api/login/oauth'

const ACTIVE_TYPE = {
  Login: 'login',
  Register: 'register',
  Forget: 'forget'
}
export default {

  data: () => {
    const account = [
      { required: true, message: '账号不能为空', trigger: 'blur' }
    ]
    const password = [
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
    const email = [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
    return {
      ACTIVE_TYPE,
      valid: true,
      see: false,
      title: '欢迎来到Jiopeel，请登录！',
      activeType: ACTIVE_TYPE.Login,
      loading: false,
      disabled: false,
      loginData: {
        account: '',
        password: ''
      },
      loginRules: {
        account,
        password
      },
      registerData: {
        account: '',
        password: '',
        email: ''
      },
      registerRules: {
        account,
        password,
        email
      },
      forgetData: {
        account: '',
        email: ''
      },
      forgetRules: {
        account,
        email
      }
    }
  },
  watch: {
    // loginData: {
    //   handler: function(val, oldval) {
    //     console.log('watch :' + JSON.stringify(this.loginData))
    //   },
    //   deep: true// 对象内部的属性监听，也叫深度监听
    // }
    activeType(val, oldval) {
      switch (val) {
        default:
        case ACTIVE_TYPE.Login:
          this.title = '欢迎来到Jiopeel，请登录！'
          break
        case ACTIVE_TYPE.Register:
          this.title = '注册账号！'
          break
        case ACTIVE_TYPE.Forget:
          this.title = '忘记密码'
          break
      }
      return this.$refs[`${oldval}Form`].resetFields()
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
        return Oauth.login({ ...auth, ...this.loginData })
      }).then(res => {
        console.log(res.data)
        return Oauth.authRedirect(grantType, res.data.code)
      }).then(res => {
        console.log('认证成功：' + JSON.stringify(res))
        const access_token = res.data.access_token
        console.log('access_token==> ' + JSON.stringify(access_token))
        this.$lockr.set('access_token', access_token)
        this.$toast.suc('登录成功')
        setTimeout(() => {
          this.$router.push({ name: 'main' })
        }, 800)
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
        this.activeType = ACTIVE_TYPE.Login
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
     * 重置密码 重置为123456
     */
    forget() {
      if (!this.check()) {
        return
      }
      this.loading = true
      this.disabled = true
      const account = this.forgetData.account
      Oauth.resetPassword(this.forgetData).then(res => {
        this.$toast.suc(res.message || '密码重置为<B>123456</B>')
        this.activeType = ACTIVE_TYPE.Login
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
