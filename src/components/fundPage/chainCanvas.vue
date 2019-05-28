<template>
  <div class="chain-project" :class="{ poverBox: isPover }">
    <div
      class="chain-box"
      ref="chainItemBox"
      v-loading="chainLoading"
      v-if="!isNoData"
      :element-loading-text="chainLoadingInfo"
    ></div>
    <div class="chainSlider" v-if="!isNoData && !chainLoading">
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
      <div
        class="chainIcon popButton"
        :class="{ active: isPover }"
        @click="popCanvas"
      ></div>
      <div class="chainIcon saveButton" @click="saveCanvas"></div>
    </div>
    <div class="popClose" v-if="isPover" @click="popCanvas">X</div>
    <div class="noData" v-if="!chainLoading && isNoData">
      <span>暂无该公司投资谱系</span>
    </div>
  </div>
</template>
<script>
// import ClipboardJS from 'clipboard'
import { ChainChart } from "@/utils/chainDialog";
export default {
  props: ["chainData", "chainLoading"],
  data() {
    return {
      centerId: "",
      isNoData: false, // 是否有产业数据
      chainLoadingInfo: "数据加载中", // 数据加载中提示信息
      inLoading: false, // 数据状态
      isEmpty: true,
      chainOption: {},
      canvasBoxId: "",
      centerName: "",
      chainTitle: "",
      sliderNum: 0, // 缩放
      myChainItem: null, // 实例
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
    chainData: {
      handler(val) {
        this.splitData(val);
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  mounted() {
    this.centerName = this.$route.query.companyName;
    this.centerId = this.$route.query.companyId;
  },
  methods: {
    splitData(data) {
      if (data && data.length) {
        let topData = data.filter(item => {
          return item.type === 1;
        });
        let downData = data.filter(item => {
          return item.type === 2;
        });
        this.chainOption = {
          center: {
            name: this.centerName,
            typeName: {
              up: "被投资",
              down: "投资"
            }
          },
          up: {
            data: this.investDataChange(topData),
            style: {
              background: "#656ff3"
            }
          },
          down: {
            data: this.investDataChange(downData),
            style: {
              background: "#41478d"
            }
          },
          style: {
            width: 192,
            height: 100
          }
        };
        this.isNoData = false;
      } else {
        this.isNoData = true;
      }
    },
    init() {
      this.myChainItem = new ChainChart(this.$refs.chainItemBox);
      this.myChainItem.init(this.chainOption);
      this.canvasBoxId = this.myChainItem.id;
    },
    // 投资数据处理
    investDataChange(data) {
      if (!data || !data.length) return [];
      return data.map(item => {
        return {
          name: item.companyName,
          subName1: `认缴金额:${(item.amount - 0).toFixed(2)}万`,
          subName2: `持股比例:${(item.percent * 100).toFixed(2)}%`
        };
      });
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
    // 放大产业链
    popCanvas() {
      this.isPover = !this.isPover;
    },
    // 保存下载产业链图片
    saveCanvas() {
      let that = this;
      let cans = document.getElementById(that.canvasBoxId);
      cans.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        let title = that.centerName + ".png";
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
