<template>
  <div class="chain-project" :class="{ poverBox: isPover }">
    <div
      class="chain-box"
      ref="chainItemBox"
      v-loading="inChainLoading"
      v-if="!isNoData"
      :element-loading-text="chainLoadingInfo"
      element-loading-background="rgba(255, 255, 255, 0.3)"
    ></div>
    <div class="probeListBox" v-if="parbeDataShow">
      <div class="probeListBoxTitle">节点探查</div>
      <div class="probeList">
        <div
          :class="
            chainParbeActiveItem === index
              ? 'probeListItem active'
              : 'probeListItem'
          "
          v-for="(item, index) in parbeData"
          :key="index"
        >
          <span class="probeItem" @click="parBeItemClick(item)">{{
            item.chainName
          }}</span>
          <transition>
            <div class="probeComeList">
              <div class="probeComeListUl">
                <ul>
                  <li
                    class="probeComeItem"
                    v-for="(_item, _index) in item.nodes"
                    :key="_index"
                  >
                    {{ _item }}
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="chainSlider" v-if="!isNoData">
      <el-slider
        v-model="sliderNum"
        vertical
        height="200px"
        :min="-80"
        :max="100"
        :step="10"
        :format-tooltip="formatSliderTooltip"
        @change="sliderChange"
      ></el-slider>
      <!-- <div
        :class="
          collectionType === 1
            ? 'chainIcon collectionButton active'
            : 'chainIcon collectionButton '
        "
        @click="collectionCanvas"
      ></div> -->
      <div
        class="chainIcon popButton"
        :class="{ active: isPover }"
        @click="popCanvas"
      ></div>
      <div class="chainIcon saveButton" @click="saveCanvas"></div>
    </div>
    <div class="popClose" v-if="isPover" @click="popCanvas">X</div>
    <div class="noData" v-if="!inChainLoading && isNoData">
      <span>暂无该园区产业集群</span>
    </div>
  </div>
</template>
<script>
// import ClipboardJS from 'clipboard'
import { ChainChart } from "@/utils/chain";
import {
  getExplorableIcList,
  getNodeCollectionsAdd,
  getNodeCollectionsDelete,
  getParkChainList
} from "@/api/getData";
export default {
  data() {
    return {
      chainId: "",
      chainData: {},
      inChainLoading: true, // 数据加载中状态
      isNoData: false, // 是否有产业数据
      chainLoadingInfo: "数据加载中", // 数据加载中提示信息
      inLoading: false, // 数据状态
      isEmpty: true,
      canvasBoxId: "",
      centerName: "",
      chainTitle: "",
      chainParbeActiveItem: null,
      parbeData: [],
      parbeDataShow: false,
      probeComeList: [],
      isPabeOver: false, // 探查是否上限,
      sliderNum: 0, // 缩放
      myChainItem: null, // 实例
      collectionType: 0, // 收藏类型
      isPover: false // 放大
    };
  },
  computed: {
    sliderNumShow: function() {
      let zoom = 100;
      let val = this.sliderNum;
      zoom = 100 + val;
      return `${parseInt(zoom)}%`;
    }
  },
  watch: {
    $route: {
      handler() {
        console.log(this.$route);
        let id = this.$route.query.parkId;
        let _name = this.$route.query.parkName;
        if (id) {
          this.isNoData = false;
          this.parbeDataShow = false;
          this.randerChain(id, _name);
        } else {
          this.parbeDataShow = false;
          this.inChainLoading = false;
          this.isNoData = true;
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    async randerChain(id, name) {
      this.inChainLoading = true;
      if (!id) {
        this.inChainLoading = false;
        this.isNoData = true;
        return false;
      }
      this.chainId = id;
      this.sliderNum = 0;
      this.$nextTick(async () => {
        let _itemData = (this.chainData = await this.searchChainItem(
          this.chainId
        ));
        if (!_itemData) {
          this.inChainLoading = false;
          this.isNoData = true;
          return false;
        }
        // 判断是否为初次渲染
        this.chainTitle = this.centerName = name;
        this.collectionType = _itemData.userFlag || 0;
        this.inChainLoading = false;
        let _nodeList = () => {
          return _itemData.map(item => {
            return {
              explorable: 0,
              name: item,
              nextNodeList: [],
              nodeId: "",
              region: "down",
              type: "downstream",
              typeDesc: "产业集群"
            };
          });
        };
        let chainOption = {
          data: {
            downRegion: {
              name: "产业集群",
              nodeList: _nodeList()
            },
            leftRegion: { name: "", nodeList: [] },
            name: name,
            nodeId: id,
            region: "center",
            rightRegion: { name: "", nodeList: [] },
            type: "center",
            typeDesc: "中心节点",
            upRegion: { name: "", nodeList: [] }
          },
          id: this.chainId,
          clickItemBack: this.returnProbeItem,
          bgColor: "#fff"
        };

        console.log(chainOption);
        this.myChainItem = new ChainChart(this.$refs.chainItemBox);
        this.myChainItem.init(chainOption);
        this.canvasBoxId = this.myChainItem.id;
        // resizeChart
        setTimeout(() => {
          window.addEventListener("resize", function() {
            // this.myChainItem.resize();
          });
        }, 200);
      });
    },
    // 请求产业链
    async searchChainItem(id) {
      let res = await getParkChainList({ id: id });
      return res.data;
    },
    // 返回id 探查节点
    returnProbeItem(item) {
      // 返回节点ID 请求相关公司信息
      console.log(item);
      // 获取节点探查列表
      // let _opt = {
      //   name: item.text,
      //   page: 1
      // };
      // this.getProbeUuid(_opt);
    },
    // 请求节点数据
    async getProbeUuid(_opt) {
      let parbeData = await getExplorableIcList(_opt);
      if (parbeData.code === 200) {
        this.parbeDataShow = true;
        this.parbeData = parbeData.data;
        this.chainParbeActiveItem = null;
      }
    },
    // 产业链缩放
    formatSliderTooltip(val) {
      let zoom = 100;
      zoom = 100 + val;
      return `${parseInt(zoom)}%`;
    },
    sliderChange(val) {
      let zoom = 1;
      zoom = 1 + val / 100;
      this.myChainItem.zoom(zoom);
    },
    // 探查节点点击
    parBeItemClick(item) {
      console.log(item);
      let _query = {
        chainId: item.chainId,
        nodeName: item.chainName
      };
      let routeData = this.$router.resolve({
        path: "/index",
        query: _query
      });
      window.open(routeData.href, "_blank");
    },
    // 放大产业链
    popCanvas() {
      this.isPover = !this.isPover;
    },
    // 收藏产业链
    collectionCanvas() {
      let id = this.chainId;
      if (id && this.collectionType !== 1) {
        getNodeCollectionsAdd(id)
          .then(res => {
            if (res.code === 200) {
              this.collectionType = 1;
              this.$message({
                message: "收藏成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "收藏失败",
                type: "err"
              });
            }
          })
          .catch(rej => {
            console.log(rej);
            this.$message({
              message: "收藏失败",
              type: "err"
            });
          });
      } else if (id && this.collectionType === 1) {
        getNodeCollectionsDelete(id)
          .then(res => {
            if (res.code === 200) {
              this.collectionType = 0;
              this.$message({
                message: "取消收藏成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "取消收藏失败",
                type: "err"
              });
            }
          })
          .catch(rej => {
            console.log(rej);
            this.$message({
              message: "取消收藏失败",
              type: "err"
            });
          });
      }
    },
    // 保存下载产业链图片
    saveCanvas() {
      let that = this;
      let cans = document.getElementById(that.canvasBoxId);
      cans.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        let title = that.chainTitle + ".png";
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      });
    }
  }
};
</script>
<style lang="less">
canvas {
  position: absolute;
}
.chain-project {
  width: 100%;
  height: 600px;
  background: #fff;
  position: relative;
  .noData {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    span {
      color: #999999;
      font-size: 16px;
    }
  }
  .probeListBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 600px;
    background-color: rgb(80, 99, 223);
    opacity: 0.98;
    box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
  }
  .probeListBoxTitle {
    width: 100%;
    height: 50px;
    background: #6576e3;
    font-size: 16px;
    line-height: 50px;
    color: rgb(255, 255, 255);
    text-indent: 20px;
  }
  .probeList {
    height: 550px;
    overflow: auto;
    background: #5366e0;
  }
  .probeItem {
    display: block;
    width: 100%;
    font-size: 14px;
    color: rgb(255, 255, 255);
    line-height: 40px;
    text-indent: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .probeListItem {
    &:hover {
      .probeItem {
        color: rgb(80, 99, 223);
        background: #fff;
      }
      .probeComeList {
        display: block;
      }
    }
    &.active {
      .probeItem {
        color: rgb(80, 99, 223);
        background: #fff;
      }
    }
  }
  .probeComeList {
    display: none;
    position: absolute;
    width: 210px;
    height: 600px;
    left: 190px;
    padding-left: 10px;
    top: 0;
    opacity: 0.98;
    box-shadow: 2px 0px 2px 1px rgba(0, 0, 0, 0.1);
    ::-webkit-scrollbar-thumb,
    .scrollbar::-webkit-scrollbar-thumb {
      background: rgba(51, 51, 51, 0.2);
    }
    .probeComeListUl {
      width: 100%;
      height: 100%;
      padding: 20px 0;
      background: #fff;
    }
    ul {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    li {
      position: relative;
      width: 100%;
      padding: 0 20px 0 35px;
      font-size: 12px;
      line-height: 35px;
      text-align: left;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
      &::before {
        position: absolute;
        content: "·";
        left: 20px;
      }
      &:hover {
        color: #5366e0;
      }
    }
  }
  ::-webkit-scrollbar,
  .scrollbar::-webkit-scrollbar {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb,
  .scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
  &.poverBox {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2000;
  }
}
.chain-box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #fff;
}
.enlargeIcon {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
.chainSlider {
  position: absolute;
  top: 50%;
  margin-top: -180px;
  right: 50px;
  z-index: 2;
  .el-slider {
    padding: 20px 0;
    background-image: linear-gradient(
      -180deg,
      rgb(252, 252, 252) 0%,
      rgb(252, 252, 252) 10%,
      rgb(255, 255, 255) 80%,
      rgb(255, 255, 255) 100%
    );
    box-shadow: 1.414px 1.414px 2px 0px rgba(0, 0, 0, 0.1);
  }
  .el-slider__bar {
    background-color: #e9ebf4;
  }
  .el-slider__button {
    width: 20px;
    height: 20px;
    border: 4px solid #5063df;
  }
  .is-vertical .el-slider__runway {
    margin: 0 12px;
    background-color: #e9ebf4;
  }
  .sliberNumBox {
    display: inline-block;
    width: 100%;
    text-align: center;
    color: #409eff;
  }
  .copyButton {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    background-image: url("../../assets/img/canvasIcon.png");
    background-repeat: no-repeat;
    box-shadow: 1.414px 1.414px 2px 0px rgba(0, 0, 0, 0.1);
    background-position: 0 -40px;
    &:hover {
      background-position: -36px -40px;
    }
  }
  .chainIcon {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    background-image: url("../../assets/img/canvasIcon.png");
    background-repeat: no-repeat;
    box-shadow: 1.414px 1.414px 2px 0px rgba(0, 0, 0, 0.1);
  }
  .collectionButton {
    background-position: 0 0;
    &.active {
      background-position: -32px 0;
    }
  }
  .popButton {
    background-position: 0 -40px;
    &:hover,
    &.active {
      background-position: -32px -40px;
    }
  }
  .saveButton {
    background-position: 0 -80px;
    &:hover {
      background-position: -32px -80px;
    }
  }
}
.popClose {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 40px;
  height: 40px;
  font-size: 40px;
  text-align: center;
  line-height: 40px;
  color: #7a7a7a;
  cursor: pointer;
}
.chainPrabeErr {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -100px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
  color: #fff;
  line-height: 1.7;
  text-align: center;
  z-index: 999;
}
</style>
