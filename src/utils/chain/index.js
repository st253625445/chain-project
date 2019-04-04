/*
 * 产业链 主逻辑
 * @Author: shaotao
 * @Date: 2018-10-11 11:19:56
 * @Last Modified by: shaotao
 * @Last Modified time: 2018-12-07 17:09:38
 */
import { GraphItem } from "./graphItem";
import { StartItem } from "./startItem";
import { Coordinate } from "./coordinate";
import { IsPointInPath } from "./unit";

function ChainChart(dom) {
  this.dom = dom;
  this.opt = {};
  this.defaultItem = {};
  this.bgColor = "transparent";
  this.id = "";
  this.width = 0;
  this.height = 0;
  this.canvas = null;
  this.ctx = null;
  this.coordinateReturn = {};
  this.scale = 1;
  this.ratio = 1;
}
ChainChart.prototype.init = function(opt, defaultItem) {
  if (typeof opt !== "object") return false;
  this.opt = opt;
  this.defaultItem = defaultItem;
  if (opt.bgColor) {
    this.bgColor = opt.bgColor;
  }
  // 生成唯一ID
  this.id = Number(
    Math.random()
      .toString()
      .substr(3, length) + Date.now()
  ).toString(36);
  let _Dom = this.dom;
  // 清空dom
  while (_Dom.firstChild) {
    _Dom.removeChild(_Dom.firstChild);
  }

  let getPixelRatio = function(context) {
    let backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  // 添加dom
  _Dom.appendChild(document.createElement("canvas"));
  _Dom.firstChild.setAttribute("id", this.id);
  this.canvas = document.getElementById(this.id);
  this.ctx = this.canvas.getContext("2d");
  this.ratio = getPixelRatio(this.ctx);
  this.scale = this.scale * this.ratio;
  // 计算坐标
  this.coordinate();
  // 设置dom 样式
  this.setStyle();
  // rander
  this.drawChain();
  this.onmouseFun();
};
ChainChart.prototype.coordinate = function() {
  let _Coordinate = new Coordinate(this.opt, this.scale);
  this.coordinateReturn = _Coordinate.init();
  _Coordinate = null;
};
ChainChart.prototype.setStyle = function(opt) {
  // 设置dom 样式
  this.width = this.coordinateReturn.width;
  this.height = this.coordinateReturn.height;
  this.dom.firstChild.setAttribute("width", this.width);
  this.dom.firstChild.setAttribute("height", this.height);
  this.dom.firstChild.style["transform"] = `scale(${1 / this.ratio}, ${1 /
    this.ratio})`;
  if (opt) {
    // 画布根据缩放坐标定位
    let _left = parseFloat(this.canvas.style.left);
    let _top = parseFloat(this.canvas.style.top);
    this.canvas.style.left = `${_left +
      (opt.enlarge ? -0.1 * opt.x : (1 / 11) * opt.x)}px`;
    this.canvas.style.top = `${_top +
      (opt.enlarge ? -0.1 * opt.y : (1 / 11) * opt.y)}px`;
  } else {
    // 画布居中
    this.canvas.style.left = `${(this.dom.offsetWidth - this.width) / 2}px`;
    this.canvas.style.top = `${(this.dom.offsetHeight - this.height) / 2}px`;
  }
};

ChainChart.prototype.drawChain = function() {
  let data = this.coordinateReturn;
  // 清空画布
  this.ctx.clearRect(0, 0, this.width, this.height);
  // 背景渲染
  if (this.bgColor !== "") {
    this.ctx.save();
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  // 记录点击状态
  if (this.defaultItem && this.defaultItem.type) {
    let _type = this.defaultItem.type;
    let _data = this.coordinateReturn[_type].data;
    for (let i = 0; i < _data.length; i++) {
      if (this.defaultItem.id === _data[i].id) {
        _data[i].isClick = this.defaultItem.isClick;
      }
    }
  }

  let _itemArray = data.up.data.concat(
    data.down.data,
    data.left.data,
    data.right.data
  );
  this.ctx.save();
  // 渲染start元素
  let _start = new StartItem(data, this.scale);
  _start.draw(this.ctx);
  _start = null;
  // 循环渲染各元素
  _itemArray.forEach(item => {
    item["w"] = 24 * this.scale;
    item["h"] = 120 * this.scale;
    let _item = new GraphItem(item, this.scale);
    _item.draw(this.ctx);
    _item = null;
  });
  this.ctx.restore();
};
// 局部重绘
ChainChart.prototype.drawResize = function(data, allData) {
  let _x = data.x;
  let _y = data.y;
  let _w = data.type === "left" || data.type === "right" ? data.h : data.w;
  let _h = data.type === "left" || data.type === "right" ? data.w : data.h;
  // 清除局部
  // this.ctx.beginPath()
  // this.ctx.fillStyle = this.bgColor
  // this.ctx.fillRect(_x - 1, _y - 1, _w + 2, _h + 2)
  // this.ctx.closePath()
  this.ctx.clearRect(_x - 1, _y - 1, _w + 2, _h + 2);
  // 重绘
  if (data.type === "center") {
    let _start = new StartItem(allData, this.scale);
    _start.drawItem(this.ctx, data);
    _start = null;
  } else {
    let _item = new GraphItem(data, this.scale);
    _item.drawItem(this.ctx);
    _item = null;
  }
};

ChainChart.prototype.onmouseFun = function() {
  let data = this.coordinateReturn;
  let fun = this.opt.clickItemBack;
  // 鼠标相关事件
  let that = this;
  let Interval;
  let changeData = null;
  that.dom.style.cursor = "move";
  // 鼠标悬浮在节点上
  let mouseOverMove = function(ev) {
    let e = ev || event;
    let x = e.offsetX;
    let y = e.offsetY;
    // 鼠标悬浮 于节点上
    let _onmouseItem = IsPointInPath(data, x, y);
    if (_onmouseItem) {
      let _data = JSON.parse(JSON.stringify(_onmouseItem));
      if (JSON.stringify(_data) !== JSON.stringify(changeData)) {
        // 先将原先的还原
        if (changeData) {
          that.drawResize(changeData, data);
          changeData = null;
        }
        // 再新增样式
        let _type = _data.type;
        let _canProbe = _data.canProbe;
        // 可探查的节点添加hover
        if (_type !== "center" && _canProbe) {
          _data.isHover = true;
          changeData = _onmouseItem;
          that.dom.style.cursor = "pointer";
          // 重绘
          that.drawResize(_data);
        }
        // 内容文字长度>8时 文字滚动
        if (_onmouseItem.text.length > 8 && !Interval) {
          changeData = _onmouseItem;
          let allText = _onmouseItem.text;
          let _sub = 0;
          let _len = allText.length;
          Interval = setInterval(() => {
            let showText = allText.substring(_sub, _sub + 8);
            if (_sub > _len - 8) {
              for (let j = 0; j < _sub + 8 - _len; j++) {
                showText += "　";
              }
            }
            let _data = JSON.parse(JSON.stringify(_onmouseItem));
            _data.text = showText;
            _data.isHover = true;
            _sub === _len ? (_sub = 0) : _sub++;
            // 重绘
            that.drawResize(_data, data);
          }, 300);
        }
      }
    } else {
      if (Interval) {
        clearInterval(Interval);
        Interval = null;
      }
      if (changeData) {
        that.drawResize(changeData, data);
        changeData = null;
        that.dom.style.cursor = "move";
      }
    }
  };
  // 节点数组
  that.canvas.onmousedown = function(ev) {
    let e = ev || event;
    let x = e.offsetX;
    let y = e.offsetY;
    let disX = e.clientX - this.offsetLeft;
    let disY = e.clientY - this.offsetTop;
    // 鼠标选中 于节点上
    let _onmouseItem = IsPointInPath(data, x, y);
    if (_onmouseItem && _onmouseItem.canProbe) {
      // 清除之前点击的效果
      for (let key in data) {
        if (["up", "down", "left", "right"].indexOf(key) >= 0) {
          let _data = data[key].data;
          for (let i = 0; i < _data.length; i++) {
            if (_data[i].isClick) {
              _data[i].isClick = false;
              // 重绘
              that.drawResize(_data[i]);
            }
          }
        }
      }
      // 点击重绘
      _onmouseItem.isClick = true;
      that.defaultItem = _onmouseItem;
      that.drawResize(_onmouseItem);
      fun(_onmouseItem);
    }
    if (_onmouseItem && _onmouseItem.type === "center") {
      // 清除之前点击的效果
      for (let key in data) {
        if (["up", "down", "left", "right"].indexOf(key) >= 0) {
          let _data = data[key].data;
          for (let i = 0; i < _data.length; i++) {
            if (_data[i].isClick) {
              _data[i].isClick = false;
              // 重绘
              that.drawResize(_data[i]);
            }
          }
        }
      }
      fun(_onmouseItem, "center");
    }
    // 路径正确，鼠标移动事件
    that.canvas.onmousemove = function(ev) {
      // 全局拖拽
      if (!(_onmouseItem && _onmouseItem.canProbe) && e.button === 0) {
        let e = ev || event;
        that.canvas.style.left = e.clientX - disX + "px";
        that.canvas.style.top = e.clientY - disY + "px";
      }
    };
    // 鼠标松开事件
    that.canvas.onmouseup = function() {
      that.canvas.onmousemove = mouseOverMove;
      that.canvas.onmouseup = null;
    };
  };
  // 鼠标移出盒子
  that.canvas.onmouseout = function() {
    if (Interval) {
      clearInterval(Interval);
      Interval = null;
    }
    if (changeData) {
      that.drawResize(changeData, data);
      changeData = null;
    }
    that.dom.style.cursor = "move";
  };
  that.canvas.onmousemove = mouseOverMove;
};
ChainChart.prototype.zoom = function(num) {
  this.scale = num * this.ratio;
  // 计算坐标
  this.coordinate();
  // 设置dom 样式
  this.setStyle();
  // rander
  this.drawChain();
  this.onmouseFun();
};

ChainChart.prototype.resize = function() {
  this.canvas.style.left = `${(this.dom.offsetWidth - this.width) / 2}px`;
  this.canvas.style.top = `${(this.dom.offsetHeight - this.height) / 2}px`;
};
export { ChainChart };
