/*
 * @Author: shaotao
 * @Date: 2018-10-13 10:38:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-24 12:43:35
 */

/**
 * 计算坐标位置
 *
 * @param {*} option
 */
function Coordinate(option, scale) {
  this.chainData = option;
  this.scale = scale;
  this.style = option.style || {};
  this.center = option.center || null;
  this.left = option.left || null;
  this.right = option.right || null;
  this.up = option.up || null;
  this.down = option.down || null;
  this.w = option.style.width * scale || 192 * scale;
  this.h = option.style.height * scale || 100 * scale;
  this.alteX = 10 * scale;
  this.alteY = 40 * scale;
  this.centerW = 200 * scale;
  this.centerH = 50 * scale;
  this.typeW = 40 * scale;
  this.typeH = 20 * scale;
}

Coordinate.prototype.changeData = function(data, type) {
  if (!data || !data.data || !data.data.length) return [];
  let that = this;
  let _changeData = [];
  let level = 1;
  let _pushData = (data, level, props = {}) => {
    let _array = data.data;
    for (let i = 0; i < _array.length; i++) {
      let _data = {
        isHover: false, // 是否悬停
        text: _array[i].name,
        subName1: _array[i].subName1,
        subName2: _array[i].subName2,
        background: data.style.background,
        w: data.style.width || that.w,
        h: data.style.height || that.h,
        level: level,
        props: props,
        type: type,
        preL: that.getPreL(_changeData, props, i, level)
      };
      if (_array[i].children && _array[i].children.length) {
        _data["length"] = that.getLength(_array[i].children).length;
        _changeData.push(_data);
        let _level = level + 1;
        _pushData(_array[i].children, _level, _data);
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
  this["upL"] = this.getLength(this.up);
  this["downL"] = this.getLength(this.down);
  this["leftL"] = this.getLength(this.left);
  this["rightL"] = this.getLength(this.right);
  this["upRegion"] = {
    name: data.center.typeName.up || null,
    typeW: data.center.typeName.up
      ? (data.center.typeName.up.length * 12 + 16) * this.scale
      : 0
  };
  this["downRegion"] = {
    name: data.center.typeName.down || null,
    typeW: data.center.typeName.down
      ? (data.center.typeName.down.length * 12 + 16) * this.scale
      : 0
  };
  this["leftRegion"] = {
    name: data.center.typeName.left || null,
    typeW: data.center.typeName.left
      ? (data.center.typeName.left.length * 12 + 16) * this.scale
      : 0
  };
  this["rightRegion"] = {
    name: data.center.typeName.right || null,
    typeW: data.center.typeName.right
      ? (data.center.typeName.right.length * 12 + 16) * this.scale
      : 0
  };
  // 计算宽度
  let itemW = this.w + this.alteX; // 每一块的宽度
  let centerW =
    this.centerW +
    2 * this.alteY +
    this.leftRegion.typeW +
    this.rightRegion.typeW;
  let upW = this.upL.length * itemW;
  let downW = this.downL.length * itemW;
  let leftW = this.leftL.level * itemW;
  let rightW = this.rightL.level * itemW;
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
  let itemH = this.h + this.alteY; // 每一块的高度
  let centerH = this.centerH + 2 * this.alteY + 2 * this.typeH;
  let upH = this.upL.level * itemH;
  let downH = this.downL.level * itemH;
  let leftH = this.leftL.length * itemH;
  let rightH = this.rightL.length * itemH;
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
  this.upRegion["data"] = this.changeData(data.up, "up");
  this.downRegion["data"] = this.changeData(data.down, "down");
  this.leftRegion["data"] = this.changeData(data.left, "left");
  this.rightRegion["data"] = this.changeData(data.right, "right");
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
      y0: this.y - _h - this.alteY * 2.5 - this.centerH / 2 - this.typeH
    };
  } else if (type === "down") {
    let _w = this.w + this.alteX;
    return {
      w: this.w,
      h: this.h,
      x0: this.x - (_w * this.downL.length) / 2,
      y0: this.y + this.alteY * 2.5 + this.centerH / 2 + this.typeH
    };
  } else if (type === "left") {
    let _w = this.w;
    let _h = this.h + this.alteX;
    return {
      w: this.w,
      h: this.h,
      x0: this.leftP[0] - this.alteY * 2.5 - _w,
      y0: this.y - (this.leftL.length * _h) / 2
    };
  } else if (type === "right") {
    let _h = this.h + this.alteX;
    return {
      w: this.w,
      h: this.h,
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
  if (!data || !data.data.length) {
    return {
      length: 0,
      level: 0
    };
  }
  let _data = data.data;
  let _length = 0;
  let _level = 1;
  let _getLength = (_data, le) => {
    if (_level < le) {
      _level = le;
    }
    for (let i = 0; i < _data.length; i++) {
      if (_data[i].children && _data[i].children.length) {
        let _le = le + 1;
        _getLength(_data[i].children, _le);
      } else {
        _length += 1;
      }
    }
  };
  _getLength(_data, _level);
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
      text: this.center.name,
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
