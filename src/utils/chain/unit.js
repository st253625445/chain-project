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
 * @param {String} color 填充颜色
 * @param {String} color2 描边颜色
 * @param {String} type 填充类型 all 为既描边也填充
 */
function DrawRoundRect (ctx, x, y, w, h, r, type, color1, color2) {
  ctx.beginPath()
  ctx.setLineDash([])
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.lineWidth = 1
  if (type === 'all' && color2) {
    ctx.fillStyle = color1
    ctx.strokeStyle = color2
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  } else {
    ctx[type + 'Style'] = color1
    ctx[type]()
    ctx.closePath()
  }
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
 * @param {Boolean} isVertical 横排/竖排
 */
function DrawTextInRect (ctx, x, y, text, color = '#fff', font = '22px PingFangSC', isVertical) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.font = parseInt(font) + 'px PingFangSC'
  // ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let _text = text.length > 8 ? text.substring(0, 7) + '...' : text
  // 判断是否为竖排
  if (isVertical) {
    let arrText = _text.split('')
    let arrWidth = arrText.map(function (letter) {
      return ctx.measureText(letter).width
    })
    // 设置y 来垂直居中调整
    let widthSum = ctx.measureText(_text).width
    y = y + arrWidth[0] / 2 - widthSum / 2
    // 开始逐字绘制
    arrText.forEach(function (letter, index) {
      let letterWidth = arrWidth[index]
      // 是否需要旋转判断
      let code = letter.charCodeAt(0)
      if (code <= 256 && code !== 40 && code !== 41) {
        ctx.translate(x, y)
        // 英文字符，旋转90°
        ctx.rotate(90 * Math.PI / 180)
        ctx.translate(-x, -y)
      } else if (index > 0 && _text.charCodeAt(index - 1) < 256) {
        // y修正
        y = y + arrWidth[index - 1] / 2
      }
      ctx.fillText(letter, x, y)
      // 旋转坐标系还原成初始态
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      // 确定下一个字符的纵坐标位置
      y = y + letterWidth
    })
  } else {
    ctx.fillText(_text, x, y)
  }
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
      if (_value[i].type === 'left' || _value[i].type === 'right') {
        _w = _value[i].h
        _h = _value[i].w
      }
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
