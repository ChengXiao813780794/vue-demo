<template>
  <div class="profile-page" >
     Profile
  </div>
</template>
<style lang="less">
  @import './profile.less';
</style>
<script type="text/babel">
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data(){
      return {}
    },
    computed: mapGetters({
      profile: 'profile'
    }),
    created (){
      let self = this;
      self.getProfile();
    },
    methods:{
       ...mapActions([
          'getProfile'
      ]),
      test(){
        
      }
    }
  }
</script>





