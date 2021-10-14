<template>
    <div class="home page-component">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 2" :key="item">
          <img src="~assets/images/web-banner1.png" alt="">
        </el-carousel-item>
      </el-carousel>

      <!-- 搜索 -->
      <div class="search-container">
        <div class="search-wrapper">
          <div class="hospital-search">
            <div>
              <el-select
                v-model="code.provinceCode"
                style="width: 120px;"
                placeholder="请选择省"
                @change="provinceChanged">
                <el-option
                  v-for="item in provinceList"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaCode"/>
              </el-select>
              <el-select
                v-model="code.cityCode"
                style="width: 120px;"
                placeholder="请选择市"
                @change="cityChanged">
                <el-option
                  v-for="item in cityList"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaCode"/>
              </el-select>
              <el-select v-model="code.areaName" style="width: 120px;" placeholder="请选择县">
                <el-option
                  v-for="item in areaList"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaName"/>
              </el-select>
              <el-input v-model="tableDataName" placeholder="请输入店铺名" style="width:300px"/>
              <el-button type="primary" icon="el-icon-search" @click="querySearch">搜索</el-button>
            </div>
            <div class="SearchView" v-if="searchObj.length>0">
              <li class="SearchViewLi" v-for="item in searchObj" :key="item.id" @click="searchToShop(item)">
                  <el-image class="SearchImg" :src="'/api/files/view/'+ item.logo"></el-image>
                  <div style="margin-top: 40px;">
                    <span style="margin-right: 30px">
                    </span>
                    <span class="SearchName">{{item.shopName}}</span>
                  </div>
                <div style="text-align: right;">
                  <i class="el-icon-s-order"></i>
                  <span class="address">服务宣言：{{item.declaration}}</span>
                  <span style="margin-left: 30px">
                    </span>
                </div>
                  <div style="text-align: right;margin-top: 10px;">
                    <i class="el-icon-location"></i>
                    <span class="address">地址：{{item.address}}</span>
                    <span style="margin-left: 30px">
                    </span>
                  </div>
              </li>
              <!-- 分页 -->
              <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center;"
                layout="total, prev, pager, next, jumper"
                @current-change="querySearch"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import areaApi from "~/api/user/area";
import shopApi from "~/api/user/shop";
import Cookies from "js-cookie";
export default {

  data() {
    return {
      searchObj: [],
      page: 1,
      limit: 10,
      total:'',
      tableDataName:'',
      provinceList: [],
      cityList: [],
      areaList: [],
      code: {
        provinceCode: '',
        cityCode: '',
        provinceName: '',
        cityName: '',
        areaName: ''
      },
    }
  },

  created() {
    const token = Cookies.get('token')
    if (!token) {
      this.$router.push('/')
    }else{
      this.getProvinceList()
    }

  },
  methods: {
    // 获取各省的数据
    getProvinceList() {
      areaApi.getAreaChild(100000)
        .then(response => {
          this.provinceList = response.data
          this.provinceList.unshift('')
        })
    },
    // 获取各市的数据
    provinceChanged() {
      if (this.code.provinceCode !== '') {
        this.cityList = []
        this.areaList = []
        this.code.cityCode = ''
        this.code.areaCode = ''
        areaApi.getAreaChild(this.code.provinceCode)
          .then(response => {
            this.cityList = response.data
            this.cityList.unshift('')
          })
      }
    },
    // 获取各县的数据
    cityChanged() {
      if (this.code.cityCode !== '') {
        this.areaList = []
        this.code.areaCode = ''
        areaApi.getAreaChild(this.code.cityCode)
          .then(response => {
            this.areaList = response.data
            this.areaList.unshift('')
          })
      }
    },
    querySearch() {
      this.code.provinceName = ''
      this.code.cityName = ''
      for (const items of this.provinceList) {
        if (items.areaCode === this.code.provinceCode) {
          this.code.provinceName = items.areaName
          break
        }
      }
      for (const items of this.cityList) {
        if (items.areaCode === this.code.cityCode) {
          this.code.cityName = items.areaName
          break
        }
      }
      const search = {
          'current': this.page,
          'size': this.limit,
          'provinceName': this.code.provinceName,
          'cityName': this.code.cityName,
          'areaName': this.code.areaName,
          'search': this.tableDataName
      }
      shopApi.querySearch(search)
        .then(response => {
          console.log(search)
          console.log(response.data)
          this.searchObj = response.data.records
          // 总记录数
          this.total = response.data.total
        })
    },
    // 点击查询后的商店跳转到商店信息
    searchToShop(shopId){
      console.log(shopId)
    }


  }
}
</script>

<style>
.SearchView{
  width: 100%;
  margin-top: 15px;
  border:3px solid #f1dab1;
  padding : 10px;
  border-radius: 10px;
}
.SearchViewLi{
  width: 100%;
  height: 120px;
  list-style: none;
  border: 1px solid #f1dab1;
  border-radius: 5px;
}
.SearchViewLi:hover{
  border:1px solid  #89c4ed;
}
.SearchImg{
  height: 100px;
  width: 100px;
  float: left;
  margin: 10px;
  border-radius: 5px;
}
.SearchName{
  font-size: 25px;
  font-style: oblique;
  color: #ffaa51;
  font-family: "微软雅黑";
}
.address{
  font-size: 14px;
  font-family: "宋体";
}
</style>
