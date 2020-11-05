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
      this.$toast.suc('Default toast')
    }
  }
}
</script>
<style lang="scss">
 @import "@/style/login/login.scss";
</style>
