/*
 * @Author: shaotao
 * @Date: 2018-10-11 16:57:05
 * @Last Modified by: shaotao
 * @Last Modified time: 2018-12-03 11:38:18
 */

/**
 * 绘制圆角矩形
 *
 * @param {*} ctx canvasDom
 * @param {Number} x 左上角坐标
 * @param {Number} y 左上角坐标
 * @param {Number} w 宽
 * @param {Number} h 高
 * @param {Number} r 圆角半径
 * @param {String} color 填充/描边颜色
 * @param {String} type 填充类型
 */
function DrawRoundRect (ctx, x, y, w, h, r, color, type) {
  ctx.beginPath()
  ctx.setLineDash([])
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx[type + 'Style'] = color
  ctx[type]()
  ctx.closePath()
}
/**
 * 绘制内容文字
 *
 * @param {*} ctx canvasDom
 * @param {Number} x 左上角坐标
 * @param {Number} y 左上角坐标
 * @param {String} text 内容
 * @param {String} color 填充/描边颜色
 * @param {String} font 文字大小/字体
 * @param {String} algin 文字对其方式
 * @param {Number} textnum 文字大于多长显示省略号
 */
function DrawTextInRect (ctx, x, y, text, color = '#fff', font = '22px PingFangSC', algin = 'center', textnum = 8) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.font = font
  ctx.textAlign = algin
  ctx.textBaseline = 'middle'
  let _text = text.length > textnum ? text.substring(0, textnum - 1) + '...' : text

  ctx.fillText(_text, x, y)
  ctx.closePath()
}
/**
 * 绘制可探索直角三角标识
 *
 * @param {*} ctx
 * @param {*} x 直角x坐标
 * @param {*} y 直角y坐标
 * @param {*} w
 * @param {*} h
 * @param {*} color
 * @param {*} type
 */
function DrawProbeIcon (ctx, x, y, w, h, r, color, type) {
  ctx.beginPath()
  ctx.moveTo(x, y - h)
  ctx.arcTo(x, y, x - w, y, r)
  ctx.lineTo(x - w, y)
  ctx.lineTo(x, y - h)
  ctx[type + 'Style'] = color
  ctx.closePath()
  ctx[type]()
}

/**
 * 鼠标点击判断是否在图形上
 *
 * @param {*} data 数据坐标数组
 * @param {*} x 鼠标点击坐标
 * @param {*} y 鼠标点击坐标
 */
function IsPointInPath (data, x, y) {
  let _return = false
  let _data = {
    center: [data.center],
    up: data.up.data,
    down: data.down.data,
    left: data.left.data,
    right: data.right.data
  }
  for (let key in _data) {
    let _value = _data[key]
    for (let i = 0; i < _value.length; i++) {
      let _w = _value[i].w
      let _h = _value[i].h
      if (x > _value[i].x && x < _value[i].x + _w && y > _value[i].y && y < _value[i].y + _h) {
        _return = _value[i]
        break
      }
    }
  }
  return _return
}
export {
  DrawRoundRect,
  DrawTextInRect,
  DrawProbeIcon,
  IsPointInPath
}
