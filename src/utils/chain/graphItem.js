/*
 * 产业链-块-构造函数
 * @Author: shaotao
 * @Date: 2018-10-11 09:53:04
 * @Last Modified by: shaotao
 * @Last Modified time: 2018-12-06 11:39:40
 */

import { Arrow } from "./arrow";
import { DrawRoundRect, DrawTextInRect, DrawProbeIcon } from "./unit";

/**
 *
 * GraphItem
 * @param {*} x x坐标
 * @param {*} y y坐标
 * @param {*} w 宽度
 * @param {*} h 高度
 * @param {*} type 类型
 * @param {*} text 内容
 * @param {*} parentX 父级坐标X
 * @param {*} parentY 父级坐标Y
 */
function GraphItem(data, scale) {
  this.x = data.x;
  this.y = data.y;
  this.type = data.type;
  this.text = data.text;
  this.parentX = data.parentX;
  this.parentY = data.parentY;
  this.isHover = data.isHover;
  this.isClick = data.isClick;
  this.canProbe = data.canProbe;
  this.scale = scale;
  this.font = `${12 * scale}px PingFangSC`;
  switch (data.type) {
    case "up":
      this.w = data.w;
      this.h = data.h;
      break;
    case "left":
      this.w = data.h;
      this.h = data.w;
      break;
    case "right":
      this.w = data.h;
      this.h = data.w;
      break;
    case "down":
      this.w = data.w;
      this.h = data.h;
      break;
    default:
      this.w = data.w;
      this.h = data.h;
      break;
  }
}

// 计算虚线起始点的坐标
GraphItem.prototype.getLineStartXY = function() {
  switch (this.type) {
    case "up":
      return {
        x: this.x + this.w / 2,
        y: this.y + this.h
      };
    case "left":
      return {
        x: this.x + this.w,
        y: this.y + this.h / 2
      };
    case "right":
      return {
        x: this.x,
        y: this.y + this.h / 2
      };
    case "down":
      return {
        x: this.x + this.w / 2,
        y: this.y
      };
  }
};
// 绘制可探索标识
GraphItem.prototype.DrawProbeIcon = function(ctx) {
  let _w = 6 * this.scale;
  let _h = 6 * this.scale;
  let _x = this.x + this.w;
  let _y = this.y + this.h;
  let _color = this.isClick ? "#fff" : "#5063df";
  DrawProbeIcon(ctx, _x, _y, _w, _h, 2.4 * this.scale, _color, "fill");
};
GraphItem.prototype.drawItem = function(ctx) {
  let _bgColor = this.isClick ? "#5063df" : "#fff";
  let _borderColor = this.isClick || this.isHover ? "#5063df" : "#c2c2c2";
  let _fontColor = this.isClick ? "#fff" : this.isHover ? "#5063df" : "#000";
  // 绘制圆角矩形
  DrawRoundRect(
    ctx,
    this.x,
    this.y,
    this.w,
    this.h,
    2.4 * this.scale,
    "all",
    _bgColor,
    _borderColor
  );
  // 绘制探索放大器图片
  this.canProbe && this.DrawProbeIcon(ctx);
  // 文字
  if (this.type === "up" || this.type === "down") {
    // 绘制矩形中文字 竖排
    DrawTextInRect(
      ctx,
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.text,
      _fontColor,
      this.font,
      true
    );
  } else {
    // 绘制矩形中文字 横排
    DrawTextInRect(
      ctx,
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.text,
      _fontColor,
      this.font,
      false
    );
  }
};

GraphItem.prototype.draw = function(ctx) {
  this.drawItem(ctx);
  // 绘制虚线
  let _arrowStart = this.getLineStartXY();
  let _arrow = new Arrow(
    _arrowStart.x,
    _arrowStart.y,
    this.parentX,
    this.parentY
  );
  if (this.type === "up" || this.type === "down") {
    _arrow.drawBottomToTop(ctx);
  } else {
    _arrow.drawLeftToRight(ctx);
  }
};

export { GraphItem };
