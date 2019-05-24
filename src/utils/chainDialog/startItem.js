/*
 * 产业链-起点-构造函数
 * @Author: shaotao
 * @Date: 2018-10-11 09:53:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-24 12:39:52
 */

import { Arrow } from "./arrow";
import { DrawRoundRect, DrawTextInRect } from "./unit";

/**
 *
 * GraphItem
 * @param {*} data
 */
function StartItem(data, scale) {
  this.data = data;
  this.x = data.center.x;
  this.y = data.center.y;
  this.LRStart = data.LRStart;
  this.w = data.center.w;
  this.h = data.center.h;
  this.typeW = data.center.typeW;
  this.typeH = data.center.typeH;
  this.margin = data.center.margin;
  this.text = data.center.text;
  this.color = "#2a2931";
  this.typeColor = "#666666";
  this.scale = scale;
  this.font = `${22 * scale}px PingFangSC`;
  this.fontType = `${14 * scale}px PingFangSC`;
}

StartItem.prototype.setColor = function(color) {
  this.color = color;
};
// 绘制四个分类
StartItem.prototype.drawType = function(data, type, ctx) {
  if (data.data.length === 0) {
    return false;
  }
  let item = {};
  if (type === "up") {
    item = {
      x: this.x + (this.w - data.typeW) / 2,
      y: this.y - (this.margin + this.typeH),
      text: data.name,
      typeW: data.typeW,
      lineX1: this.x + this.w / 2,
      lineY1: data.name
        ? this.y - this.margin
        : this.y - this.margin - this.typeH,
      lineX2: this.x + this.w / 2,
      lineY2: this.y
    };
  } else if (type === "down") {
    item = {
      x: this.x + (this.w - data.typeW) / 2,
      y: this.y + (this.h + this.margin),
      text: data.name,
      typeW: data.typeW,
      lineX1: this.x + this.w / 2,
      lineY1: data.name
        ? this.y + this.h + this.margin
        : this.y + this.h + this.margin + this.typeH,
      lineX2: this.x + this.w / 2,
      lineY2: this.y + this.h
    };
  } else if (type === "left") {
    item = {
      x: this.x - (data.typeW + this.margin),
      y: this.y + (this.h - this.typeH) / 2,
      text: data.name,
      typeW: data.typeW,
      lineX1: this.x - this.margin,
      lineY1: this.y + this.h / 2,
      lineX2: this.x,
      lineY2: this.y + this.h / 2
    };
    // 绘制左虚线延长
    if (data.data.length) {
      let _leftLine = new Arrow(
        this.LRStart.left[0],
        this.LRStart.left[1],
        item.lineX1 - data.typeW,
        item.lineY1
      );
      _leftLine.draw(ctx);
      _leftLine = null;
    }
  } else if (type === "right") {
    item = {
      x: this.x + (this.w + this.margin),
      y: this.y + (this.h - this.typeH) / 2,
      text: data.name,
      typeW: data.typeW,
      lineX1: this.x + (this.w + this.margin),
      lineY1: this.y + this.h / 2,
      lineX2: this.x + this.w,
      lineY2: this.y + this.h / 2
    };
    // 绘制右虚线延长
    if (data.data.length) {
      let _rightLine = new Arrow(
        this.LRStart.right[0],
        this.LRStart.right[1],
        item.lineX1 + data.typeW,
        item.lineY1
      );
      _rightLine.draw(ctx);
      _rightLine = null;
    }
  } else {
    return false;
  }
  if (data.name) {
    DrawRoundRect(
      ctx,
      item.x,
      item.y,
      item.typeW,
      this.typeH,
      4 * this.scale,
      this.typeColor,
      "stroke"
    );
    DrawTextInRect(
      ctx,
      item.x + item.typeW / 2,
      item.y + this.typeH / 2,
      item.text,
      "#666666",
      this.fontType
    );
  }
  let _arrow = new Arrow(item.lineX1, item.lineY1, item.lineX2, item.lineY2);
  _arrow.draw(ctx);
  _arrow = null;
};
StartItem.prototype.drawItem = function(ctx, data) {
  // 绘制圆角矩形
  DrawRoundRect(
    ctx,
    this.x,
    this.y,
    this.w,
    this.h,
    4 * this.scale,
    this.color,
    "fill"
  );
  // 绘制矩形中文字
  DrawTextInRect(
    ctx,
    this.x + this.w / 2,
    this.y + this.h / 2,
    data.text,
    "#fff",
    this.font
  );
};
StartItem.prototype.draw = function(ctx) {
  // 绘制圆角矩形
  DrawRoundRect(
    ctx,
    this.x,
    this.y,
    this.w,
    this.h,
    4 * this.scale,
    this.color,
    "fill"
  );
  // 绘制矩形中文字
  DrawTextInRect(
    ctx,
    this.x + this.w / 2,
    this.y + this.h / 2,
    this.text,
    "#fff",
    this.font
  );
  // 绘制4个分类
  this.drawType(this.data.up, "up", ctx);
  this.drawType(this.data.down, "down", ctx);
  this.drawType(this.data.left, "left", ctx);
  this.drawType(this.data.right, "right", ctx);
};

export { StartItem };
