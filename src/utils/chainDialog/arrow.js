/*
 * 产业链-线-构造函数
 * @Author: shaotao
 * @Date: 2018-10-11 09:53:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-24 12:31:16
 */

/**
 *
 * @param {Object} x1起始点横坐标
 * @param {Object} y1起始点纵坐标
 * @param {Object} x2结束点横坐标
 * @param {Object} y2结束点纵坐标
 */
function Arrow(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.tmpX1 = null;
  this.tmpY1 = null;
  this.tmpX2 = null;
  this.tmpY2 = null;
  this.color = "#666666";
}

Arrow.prototype.setColor = function(color) {
  this.color = color;
};

/**
 *
 * @param {Object} x1起始点横坐标
 * @param {Object} y1起始点纵坐标
 * @param {Object} x2结束点横坐标
 * @param {Object} y2结束点纵坐标
 */
Arrow.prototype.setP = function(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
};

/**
 * 第一个拐点
 */
Arrow.prototype.setP1 = function(tmpX1, tmpY1) {
  this.tmpX1 = tmpX1;
  this.tmpY1 = tmpY1;
};

/**
 * 第二个拐点
 */
Arrow.prototype.setP2 = function(tmpX2, tmpY2) {
  this.tmpX2 = tmpX2;
  this.tmpY2 = tmpY2;
};

Arrow.prototype.drawBottomToTop = function(ctx) {
  if (this.x1 !== this.x2) {
    this.setP1(this.x1, (this.y1 + this.y2) / 2);
    this.setP2(this.x2, (this.y1 + this.y2) / 2);
    this.draw(ctx);
  } else {
    this.draw(ctx);
  }
};

Arrow.prototype.drawLeftToRight = function(ctx) {
  if (this.y1 !== this.y2) {
    this.setP1((this.x1 + this.x2) / 2, this.y1);
    this.setP2((this.x1 + this.x2) / 2, this.y2);
    this.draw(ctx);
  } else {
    this.draw(ctx);
  }
};

Arrow.prototype.draw = function(ctx) {
  // arbitrary styling
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  // draw the line
  ctx.beginPath();
  ctx.setLineDash([3]); // 虚线
  ctx.moveTo(this.x1, this.y1);
  if (
    this.tmpX1 != null &&
    this.tmpY1 != null &&
    this.tmpX2 != null &&
    this.tmpY2 != null
  ) {
    ctx.bezierCurveTo(
      this.tmpX1,
      this.tmpY1,
      this.tmpX2,
      this.tmpY2,
      this.x2,
      this.y2
    );
    ctx.stroke();
  } else {
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
};

export { Arrow };
