/*
 * @Author: shaotao
 * @Date: 2018-10-13 10:38:04
 * @Last Modified by: shaotao
 * @Last Modified time: 2018-12-06 11:38:37
 */

/**
 * 计算坐标位置
 *
 * @param {*} option
 */
function Coordinate(option, scale) {
  this.chainData = option.data || {};
  this.scale = scale;
  this.w = 24 * scale;
  this.h = 120 * scale;
  this.alteX = 12 * scale;
  this.alteY = 24 * scale;
  this.centerW = 120 * scale;
  this.centerH = 30 * scale;
  this.typeW = 24 * scale;
  this.typeH = 12 * scale;
  this.leftP = [this.x - 108, this.y]; // 左侧默认虚线起始点
  this.rightP = [this.x + 108, this.y]; // 右侧默认虚线起始点
  this.x = option.x; // 默认中心点
  this.y = option.y; // 默认中心点
}

Coordinate.prototype.changeData = function(data) {
  if (!data || !data.length) return [];
  let that = this;
  let _changeData = [];
  let level = 1;

  let _pushData = (data, level, props = {}) => {
    for (let i = 0; i < data.length; i++) {
      let _data = {
        id: data[i].uuid,
        canProbe: data[i].explorable === 1 || false, // 是否能探查
        isHover: false, // 是否悬停
        isClick: false, // 是否点击
        text: data[i].name,
        level: level,
        props: props,
        preL: that.getPreL(_changeData, props, i, level)
      };
      switch (data[i].region) {
        case "up":
        case "upstream": {
          _data["type"] = "up";
          break;
        }
        case "down":
        case "downstream": {
          _data["type"] = "down";
          break;
        }
        case "left":
        case "leftstream": {
          _data["type"] = "left";
          break;
        }
        case "right":
        case "rightstream": {
          _data["type"] = "right";
          break;
        }
        default: {
          throw new Error("数据region错误");
        }
      }

      if (data[i].nextNodeList.length) {
        _data["length"] = that.getLength(data[i].nextNodeList).length;
        _changeData.push(_data);
        let _level = level + 1;
        _pushData(data[i].nextNodeList, _level, _data);
      } else {
        _data["length"] = 1;
        _changeData.push(_data);
      }
    }
  };
  // 执行递归
  _pushData(data, level);
  // 计算坐标
  _changeData.map(item => {
    let _item = this.getItemXY(item);
    item["x"] = _item.x;
    item["y"] = _item.y;
    item["parentX"] = _item.parentX;
    item["parentY"] = _item.parentY;
  });

  return _changeData;
};
// 计算宽高及中心点
Coordinate.prototype.getWH = function(data) {
  // 计算各方向布局长度及层级
  this["upL"] = this.getLength(data.upRegion.nodeList);
  this["downL"] = this.getLength(data.downRegion.nodeList);
  this["leftL"] = this.getLength(data.leftRegion.nodeList);
  this["rightL"] = this.getLength(data.rightRegion.nodeList);
  this["upRegion"] = {
    name: data.upRegion.name || "",
    typeW: (data.upRegion.name.length * 7 + 9) * this.scale
  };
  this["downRegion"] = {
    name: data.downRegion.name || "",
    typeW: (data.downRegion.name.length * 7 + 9) * this.scale
  };
  this["leftRegion"] = {
    name: data.leftRegion.name || "",
    typeW: (data.leftRegion.name.length * 7 + 9) * this.scale
  };
  this["rightRegion"] = {
    name: data.rightRegion.name || "",
    typeW: (data.rightRegion.name.length * 7 + 9) * this.scale
  };
  // 计算宽度
  let itemW = this.w + this.alteX; // 上下分支每一块的宽度
  let _itemw = this.h + this.alteY; // 左右分支每一块的宽度
  let centerW =
    this.centerW +
    2 * this.alteY +
    this.leftRegion.typeW +
    this.rightRegion.typeW;
  let upW = this.upL.length * itemW;
  let downW = this.downL.length * itemW;
  let leftW = this.leftL.level * _itemw;
  let rightW = this.rightL.level * _itemw;
  let maxCenter =
    centerW > upW
      ? centerW > downW
        ? centerW
        : downW
      : upW > downW
      ? upW
      : downW;
  let maxLR = rightW > leftW ? rightW : leftW;
  this["width"] = maxCenter + maxLR * 2 + 600 * this.scale;
  if (!this.x) {
    this.x = this.width / 2;
  }
  // 计算高度
  let itemH = this.h + this.alteY; // 上下分支每一块的高度
  let _itemH = this.w + this.alteX; // 左右分支每一块的高度
  let centerH = this.centerH + 2 * this.alteY + 2 * this.typeH;
  let upH = this.upL.level * itemH;
  let downH = this.downL.level * itemH;
  let leftH = this.leftL.length * _itemH;
  let rightH = this.rightL.length * _itemH;
  let maxUD = upH > downH ? upH : downH;
  let allCenter = centerH + maxUD * 2;
  let maxH =
    leftH > rightH
      ? leftH > allCenter
        ? leftH
        : allCenter
      : rightH > allCenter
      ? rightH
      : allCenter;
  this["height"] = maxH + 600 * this.scale;
  if (!this.y) {
    this["y"] = this.height / 2;
  }
};
// 计算上下左右四个象限数据
Coordinate.prototype.getRegionData = function(data) {
  this.upRegion["data"] = this.changeData(data.upRegion.nodeList);
  this.downRegion["data"] = this.changeData(data.downRegion.nodeList);
  this.leftRegion["data"] = this.changeData(data.leftRegion.nodeList);
  this.rightRegion["data"] = this.changeData(data.rightRegion.nodeList);
};
// 获取首个元素的坐标
Coordinate.prototype.getFirstXY = function(type) {
  if (type === "up") {
    let _w = this.w + this.alteX;
    let _h = this.h;
    return {
      w: this.w,
      h: this.h,
      x0: this.x - (_w * this.upL.length) / 2,
      y0: this.y - _h - this.alteY * 3.5 - this.centerH / 2 - this.typeH
    };
  } else if (type === "down") {
    let _w = this.w + this.alteX;
    return {
      w: this.w,
      h: this.h,
      x0: this.x - (_w * this.downL.length) / 2,
      y0: this.y + this.alteY * 3.5 + this.centerH / 2 + this.typeH
    };
  } else if (type === "left") {
    let _w = this.h;
    let _h = this.w + this.alteX;
    return {
      w: this.h,
      h: this.w,
      x0: this.leftP[0] - this.alteY * 2.5 - _w,
      y0: this.y - (this.leftL.length * _h) / 2
    };
  } else if (type === "right") {
    let _h = this.w + this.alteX;
    return {
      w: this.h,
      h: this.w,
      x0: this.rightP[0] + this.alteY * 2.5,
      y0: this.y - (this.rightL.length * _h) / 2
    };
  }
};
// 计算左右起始点位置
Coordinate.prototype.getStartLR = function() {
  let _w = this.w + this.alteX;
  let maxLR =
    this.leftRegion.typeW > this.rightRegion.typeW
      ? this.leftRegion.typeW
      : this.rightRegion.typeW;
  let _W0 = this.centerW + this.alteY * 2 + maxLR * 2;
  let _upW = _w * this.upL.length;
  let _downW = _w * this.downL.length;
  // 计算三个中的最大宽度
  let _maxW =
    _W0 > _upW ? (_W0 > _downW ? _W0 : _downW) : _downW > _upW ? _downW : _upW;
  // 设置 左右虚线起始点
  this.leftP = [this.x - _maxW / 2, this.y];
  this.rightP = [this.x + _maxW / 2, this.y];
};
// 计算每个元素的坐标
Coordinate.prototype.getItemXY = function(data) {
  if (data.type === "up") {
    let { w, h, x0, y0 } = this.getFirstXY("up");
    return {
      x:
        x0 +
        data.preL * (w + this.alteX) +
        (data.length * (w + this.alteX)) / 2 -
        w / 2,
      y: y0 - (data.level - 1) * (h + this.alteY),
      parentX: data.level === 1 ? this.x : data.props.x + w / 2,
      parentY:
        data.level === 1
          ? this.y - this.centerH / 2 - this.alteY - this.typeH
          : data.props.y
    };
  } else if (data.type === "down") {
    let { w, h, x0, y0 } = this.getFirstXY("down");
    return {
      x:
        x0 +
        data.preL * (w + this.alteX) +
        (data.length * (w + this.alteX)) / 2 -
        w / 2,
      y: y0 + (data.level - 1) * (h + this.alteY),
      parentX: data.level === 1 ? this.x : data.props.x + w / 2,
      parentY:
        data.level === 1
          ? this.y + this.centerH / 2 + this.alteY + this.typeH
          : data.props.y + h
    };
  } else if (data.type === "left") {
    let { w, h, x0, y0 } = this.getFirstXY("left");
    return {
      x: x0 - (data.level - 1) * (w + this.alteY),
      y:
        y0 +
        data.preL * (h + this.alteX) +
        (data.length * (h + this.alteX)) / 2 -
        h / 2,
      parentX: data.level === 1 ? this.leftP[0] : data.props.x,
      parentY: data.level === 1 ? this.y : data.props.y + h / 2
    };
  } else if (data.type === "right") {
    let { w, h, x0, y0 } = this.getFirstXY("right");
    return {
      x: x0 + (data.level - 1) * (w + this.alteY),
      y:
        y0 +
        data.preL * (h + this.alteX) +
        (data.length * (h + this.alteX)) / 2 -
        h / 2,
      parentX: data.level === 1 ? this.rightP[0] : data.props.x + w,
      parentY: data.level === 1 ? this.y : data.props.y + h / 2
    };
  } else {
    return false;
  }
};
// 每个元素之前元素的总长度
Coordinate.prototype.getPreL = function(_changeData, props, i, level) {
  let _preL = 0;
  if (level === 1 && i === 0) {
    _preL = 0;
  } else if (level !== 1 && i === 0) {
    _preL = props.preL;
  } else {
    _preL = _changeData[_changeData.length - 1].preL + 1;
  }
  return _preL;
};
// 获取每个元素所占的长度
Coordinate.prototype.getLength = function(data) {
  if (!data || !data.length) {
    return {
      length: 0,
      level: 0
    };
  }
  let _length = 0;
  let _level = 1;
  let _getLength = (data, le) => {
    if (_level < le) {
      _level = le;
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].nextNodeList.length) {
        let _le = le + 1;
        _getLength(data[i].nextNodeList, _le);
      } else {
        _length += 1;
      }
    }
  };
  _getLength(data, _level);
  return {
    length: _length,
    level: _level
  };
};
// 数据处理流程
Coordinate.prototype.init = function() {
  // 计算宽高
  this.getWH(this.chainData);
  // 计算左右虚线起始点位置
  this.getStartLR();
  this.getRegionData(this.chainData);
  // 返回坐标数组
  return {
    LRStart: {
      left: this.leftP,
      right: this.rightP
    },
    width: this.width,
    height: this.height,
    x: this.x,
    y: this.y,
    center: {
      text: this.chainData.name,
      id: this.chainData.uuid,
      w: this.centerW,
      h: this.centerH,
      typeW: this.typeW,
      typeH: this.typeH,
      margin: this.alteY,
      x: this.x - this.centerW / 2,
      y: this.y - this.centerH / 2,
      type: "center",
      region: []
    },
    up: this.upRegion,
    down: this.downRegion,
    left: this.leftRegion,
    right: this.rightRegion
  };
};

export { Coordinate };
