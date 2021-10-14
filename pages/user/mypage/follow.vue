<template>
  <div>
    <el-scrollbar style="height: 520px;width:105%;border-radius: 3px">
      <div style="background-color: #ffffff;width:95%;border-radius: 3px;">
        <div style="height: 30px">
          <el-col style="margin-top: 15px">
            <span style="font-family: 黑体;font-weight: bold;padding: 20px"> 全部关注 （91）</span>
          </el-col>
        </div>
        <el-divider></el-divider>
        <el-tabs stretch  v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="个人关注" lazy name="first">
            <div style="width: 100%">
              <li  class="follow-li" v-for="item in 6" :key="item.id">
                <div style="margin-left: 20px;">
                  <div>
                    <el-avatar style="width: 70px;height: 70px;margin-top: 15px;"
                               src="">
                    </el-avatar>
                  </div>
                  <div style="margin-top: -60px;margin-left: 80px">
                    <el-row>
                      <span>zpen</span>
                    </el-row>
                    <el-row style="padding-top: 10px;">
                  <span><i style="margin-right: 10px" class="el-icon-document"></i>
                    喜欢潮流，喜欢非主流</span>
                    </el-row>
                  </div>
                  <div style="text-align: right;margin-top: -35px;margin-right: 10px">
                    <el-button round >已关注</el-button>
                    <el-button round style="border-color: #ffaa51;color: #ffaa51">关注</el-button>
                  </div>
                </div>
              </li>
            </div>
          </el-tab-pane>
          <el-tab-pane label="店铺关注" lazy name="second">
            <div style="width: 100%">
              <li  class="follow-li" v-for="item in 6" :key="item">
                <div style="margin-left: 20px;">
                  <div>
                    <el-avatar style="width: 70px;height: 70px;margin-top: 15px;"
                               src="">
                    </el-avatar>
                  </div>
                  <div style="margin-top: -60px;margin-left: 80px">
                    <el-row>
                      <span>zpen</span>
                    </el-row>
                    <el-row style="padding-top: 10px;">
                  <span><i style="margin-right: 10px" class="el-icon-document"></i>
                    喜欢潮流，喜欢非主流</span>
                    </el-row>
                  </div>
                  <div style="text-align: right;margin-top: -35px;margin-right: 10px">
                    <el-button round >已关注</el-button>
                    <el-button round style="border-color: #ffaa51;color: #ffaa51">关注</el-button>
                  </div>
                </div>
              </li>
            </div>
          </el-tab-pane>
          <el-tab-pane label="托尼关注" lazy name="third">
            <div style="width: 100%">
              <li  class="follow-li" v-for="item in 6" :key="item">
                <div style="margin-left: 20px;">
                  <div>
                    <el-avatar style="width: 70px;height: 70px;margin-top: 15px;"
                               src="">
                    </el-avatar>
                  </div>
                  <div style="margin-top: -60px;margin-left: 80px">
                    <el-row>
                      <span>zpen</span>
                    </el-row>
                    <el-row style="padding-top: 10px;">
                  <span><i style="margin-right: 10px" class="el-icon-document"></i>
                    喜欢潮流，喜欢非主流</span>
                    </el-row>
                  </div>
                  <div style="text-align: right;margin-top: -35px;margin-right: 10px">
                    <el-button round >已关注</el-button>
                    <el-button round style="border-color: #ffaa51;color: #ffaa51">关注</el-button>
                  </div>
                </div>
              </li>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick() {
      console.log(this.activeName);
    }
  }

}
</script>

<style scoped>
.follow-li{
  height: 100px;
  list-style-type:none;
}
.follow-li:hover{
  background-color: #e3e3e3;
}
</style>
