<template>
  <v-app>
    <v-main>
      <v-container>
        {{ message }}
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Oauth from '@/api/login/oauth'
export default {
  props: {
    grantType: String,
    code: String
  },
  data: () => ({
    message: ' 授权认证中...'
  }),
  created() {
    console.log('grantType :' + this.grantType)
    console.log('code :' + this.code)
    Oauth.authRedirect(this.grantType, this.code).then(res => {
      console.log('认证成功：' + JSON.stringify(res))
      const access_token = res.data.access_token
      console.log('access_token==> ' + JSON.stringify(access_token))
      this.$lockr.set('access_token', access_token)
      this.message = '授权认证成功'
    }).catch(res => {
      this.message = '授权认证失败,正在返回登录界面...'
      setTimeout(() => {
        this.$router.push({ name: 'login' })
      }, 800)
    }).done()
  }
}
</script>
