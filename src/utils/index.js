/*
 * @Author: shaotao
 * @Date: 2018-10-31 17:01:20
 * @Last Modified by: shaotao
 * @Last Modified time: 2018-12-10 14:41:13
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}
// 数字转千分位
export function formatNumberRgx(num) {
  if (isNaN(num)) {
    return false;
  }
  num = (num - 0).toFixed(2);
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
/**
 * 获取设备信息
 * @name    browser
 * @return  {obj}  返回设备信息
 */
export const browser = (() => {
  const ua = navigator.userAgent;
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua),
    iOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    Android: ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1,
    iPhone: ua.indexOf("iPhone") > -1,
    iPad: ua.indexOf("iPad") > -1,
    WeChat: !!ua.match(/MicroMessenger/i),
    weibo: !!ua.match(/WeiBo/i),
    Qzone: ua.indexOf("Qzone/") !== -1,
    QQ: ua.match(/\sQQ/i)
  };
})();
/**
 * 获取localStorage和设置localStorage  持久化的本地存储
 * @name    localStorage
 * @param   {String}  名字
 * @param   {String}  值
 * @return  {String}  当只有名字时返回名字对应值
 */
export const localStorage = (name, value) => {
  if (!name) return;
  if (typeof value !== "undefined") {
    // set
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
    return;
  }
  return window.localStorage.getItem(name);
};
/**
 * 删除localStorage的快捷方法
 * @name    removeLocalStorage
 * @param   {String}  名字
 */
export const removeLocalStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
/**
 * 获取sessionStorage和设置sessionStorage
 * @name    sessionStorage
 * @param   {String}  名字
 * @param   {String}  值
 * @return  {String}  当只有名字时返回名字对应值
 */
export const sessionStorage = (name, value) => {
  if (!name) return;
  if (typeof value !== "undefined") {
    // set
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    window.sessionStorage.setItem(name, value);
    return;
  } // get
  return window.sessionStorage.getItem(name);
};
/**
 * 删除sessionStorage的快捷方法
 * @name    removeSessionStorage
 * @param   {String}  名字
 */
export const removeSessionStorage = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * 去掉空格
 * @param {string} 要去掉空格的字符串
 * @param   {Boolean} 是否去掉字符串中间的空格
 * @return  {String}  处理过的字符串
 */
export const trim = (str, isGlobal) => {
  if (!str) return;
  // return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  // var result = str.replace(/(^\s+)|(\s+$)/g, "");
  var result = str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
  if (isGlobal) result = result.replace(/\s/g, "");
  return result;
};

/**
 * 判断是不是中文
 * @param {string} 要判断的字符串
 * @return  {String}  是否中文
 */
export const isCN = str => {
  if (!str) return;
  var regexCh = /[u00-uff]/;
  return !regexCh.test(str);
};

/**
 * 获取字符串长度
 * @param {string} 要判断的字符串
 * @return  {String} 字符串长度
 */
export const getStrLenght = (str, max) => {
  if (!str) return;
  let strlenght = 0; // 初始定义长度为0
  let txtval = trim(str);
  let tmpStr = "";
  for (var i = 0; i < txtval.length; i++) {
    if (isCN(txtval.charAt(i)) === true) {
      strlenght = strlenght + 2; // 中文为2个字符
    } else {
      strlenght = strlenght + 1; // 英文一个字符
    }
    if (max && strlenght <= max) {
      tmpStr += txtval.charAt(i);
    }
  }
  if (max) {
    return strlenght > max ? tmpStr + "..." : tmpStr;
  }
  return strlenght * 1;
};

/**
 * 数组去重
 * @param {arr} 要去重的数组
 * @return  {String}  处理过的字符串
 */
export const arrayUnique = arr => {
  if (!arr) return;
  return Array.from(new Set(arr));
};

/**
 * 获取父亲节点
 * @param {elem} 指定元素dom节点
 * @param   {String} 要获取父亲元素的类名
 * @param   {String} 要获取父亲元素的类型
 * @return  {array}  父节点集合
 */
export const getParentNode = (elem, name, type, inVal) => {
  if (!elem) {
    return;
  }
  let matched = [];
  let nodeType = type || "class";
  while ((elem = elem["parentNode"]) && elem.nodeType !== 9) {
    if (
      nodeType === "class" &&
      elem.nodeType === 1 &&
      elem.classList.contains(name)
    ) {
      matched.push(elem);
    }
    if (nodeType === "id" && elem.nodeType === 1 && elem.id === name) {
      matched.push(elem);
    }
    if (
      nodeType === "attribute" &&
      elem.nodeType === 1 &&
      elem.getAttribute(name)
    ) {
      if (inVal) {
        matched.push(elem.getAttribute(name));
      } else {
        matched.push(elem);
      }
    }
  }
  return matched;
};

/**
 * 获取当前元素节点
 * @param {elem} 指定元素dom节点
 * @param   {String} 要获取父亲元素的类名
 * @param   {String} 要获取父亲元素的类型
 * @param   {Boolean} 当类型3type为 attribute 时 返回对应的值 而非节点
 * @return  {array}  父节点集合
 */
export const getNode = (elem, name, type, inVal) => {
  if (!elem || elem.nodeType === 9) return;
  let matched = [];
  let nodeType = type || "class";
  if (
    nodeType === "class" &&
    elem.nodeType === 1 &&
    elem.classList.contains(name)
  ) {
    matched.push(elem);
  }
  if (nodeType === "id" && elem.nodeType === 1 && elem.id === name) {
    matched.push(elem);
  }
  if (
    nodeType === "attribute" &&
    elem.nodeType === 1 &&
    elem.getAttribute(name)
  ) {
    if (inVal) {
      matched.push(elem.getAttribute(name));
    } else {
      matched.push(elem);
    }
  }
  if (!matched.length) {
    return getParentNode(elem, name, type, inVal);
  }
  return matched;
};

/**
 * 获取子元素节点
 * @param {elem} 指定元素dom节点
 * @param   {String} 要获取父亲元素的类名
 * @param   {String} 要获取父亲元素的类型
 * @param   {Boolean} 当类型3type为 attribute 时 返回对应的值 而非节点
 * @return  {array}  父节点集合
 */
export const getChildNodes = (elem, name, type, inVal) => {
  if (!elem) return;
  let matched = [];
  let nodeType = type || "class";
  let elems = elem["childNodes"];
  for (let i = 0; i < elems.length; i++) {
    let elemItem = elems[i];
    if (elemItem.nodeType === 9) {
      return;
    }
    if (
      nodeType === "class" &&
      elemItem.nodeType === 1 &&
      elemItem.classList.contains(name)
    ) {
      matched.push(elemItem);
    }
    if (nodeType === "id" && elemItem.nodeType === 1 && elemItem.id === name) {
      matched.push(elemItem);
    }
    if (
      nodeType === "attribute" &&
      elemItem.nodeType === 1 &&
      elemItem.getAttribute(name)
    ) {
      if (inVal) {
        matched.push(elemItem.getAttribute(name));
      } else {
        matched.push(elemItem);
      }
    }
  }
  return matched;
};

/**
 * 将Json数据转为String
 * @name    jsonToString
 * @param   {Object}  要转化的json对象
 * @param   {Boolean} 是否要进行转码以备URL传输
 * @return  {String}  转化后的字符串
 */
export const jsonToString = (json, isEncode) => {
  var strTemp = "";
  for (var key in json) {
    strTemp +=
      key + "=" + (isEncode ? encodeURIComponent(json[key]) : json[key]) + "&";
  }
  return strTemp.slice(0, -1);
};

/**
 * 获取cookie和设置cookie
 * @name    cookie
 * @param   {String}  名字
 * @param   {String}  值
 * @param   {Object}  配置选项
 * @return  {String}  当只有名字时返回名字对应值
 */
export const cookie = (name, value, options) => {
  if (typeof value !== "undefined") {
    options = options || {};
    if (value === null) {
      value = "";
      options = { ...{}, ...options };
      options.expires = -1;
    }
    var expires = "";
    if (
      options.expires &&
      (typeof options.expires === "number" || options.expires.toUTCString)
    ) {
      var date;
      if (typeof options.expires === "number") {
        date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      } else {
        date = options.expires;
      }
      expires = "; expires=" + date.toUTCString();
    }
    var path = options.path ? "; path=" + options.path : ";path=/";
    var domain = options.domain ? "; domain=" + options.domain : "";
    var secure = options.secure ? "; secure" : "";
    document.cookie = [
      name,
      "=",
      encodeURIComponent(value),
      expires,
      path,
      domain,
      secure
    ].join("");
  } else {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

/**
 * 删除cookie的快捷方法
 * @name    removeCookie
 * @param   {String}  名字
 */
export const removeCookie = function(key) {
  cookie(key, "", { expires: -1 });
};

/*
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 调用 new Date().format("yyyy-MM-dd");  年-月-日
 *      new Date().format("yyyy-MM-dd hh:mm:ss");   年-月-日 时:分:秒
 *      new Date().format("yyyy-MM-dd hh:mm:ss:S");     年-月-日 时:分:秒:毫秒
 */
export const dateFormat = function(str, fmt) {
  if (!fmt) {
    let tmpData = str ? new Date(str) : new Date();
    return Date.parse(tmpData);
  }
  if (!str) return "";
  var date = new Date(str);
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

export const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 管道节流，用于mouseover等调用频繁的优化处理
 * @name    throttle
 * @param   {Function}  真正用于执行的方法
 * @param   {Integer}   延时
 * @return  {Function}  节流方法
 */
export const throttle = (fn, timeout) => {
  var timer;
  return function() {
    var _this = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(_this, args);
    }, timeout);
  };
};

/**
 * 千分位格式化
 * 最大处理12位（带小数点） 保留两位小数，小数点后第三位舍弃
 * @param {num}   Number 要格式化的数值
 * @param {floor} Boolean 是否取整
 * @return  {String}  处理过的千分位
 */
export const formatCurrency = function(num, floor) {
  if (num === undefined) {
    num = "0";
  }
  var isPositive = "";
  if (num && num * 1 < 0) {
    // return num
    num = num * -1;
    isPositive = "-";
  }
  num = num
    .toString()
    .replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    .replace(/\s/g, ""); // trim
  num = num.replace(/^(\/-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 保留两位小数 三位之后舍弃
  if (isNaN(num) || num === "" || num.length > 12) {
    return num;
  }
  var cents = num.replace(/^\w*/gi, "");
  if (cents.length === 0 || cents.length === 1) {
    cents = ".00";
  }
  if (cents.length === 2) {
    cents = cents + "0";
  }
  num = parseInt(num).toString();
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      "," +
      num.substring(num.length - (4 * i + 3));
  }
  if (cents === ".00" && floor === "trunc") {
    cents = "";
  }
  if ((floor && floor !== "trunc") || cents === ".00") {
    // return num
    return isPositive + num;
  } else {
    // return num + cents
    return isPositive + num + cents;
  }
};

// Element.prototype.trigger = function (type, data) {
//   // var event = document.createEvent('HTMLEvents')
//   // event.initEvent(type, true, true)
//   // event.data = data || {}
//   // event.eventName = type
//   // event.target = this
//   var event = new Event(type)
//   return this.dispatchEvent(event)
//   // return this
// }
/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = "int") => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === "scrollTop") {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode === "float" ? parseFloat(target) : parseInt(target);
};

export const setAutoFixed = (fixedBox, contentBox, holder) => {
  var d = document.documentElement;
  var b = document.body;
  var winTopRecord = 0;
  var fixTopRecord = 0;
  function adjustfixedstyle() {
    var winTop = window.pageYOffset || d.scrollTop || b.scrollTop || 0;
    var winHeight = window.innerHeight;
    var contentBoxTop = 60 || contentBox.offsetTop;
    var contentBoxHeight = contentBox.clientHeight;
    var fixedBoxHeight = fixedBox.offsetHeight;
    var holderTop = 60 || holder.offsetTop;
    // console.log('winTop:' + winTop,
    //   'winHeight:' + winHeight,
    //   'contentBoxTop:' + contentBoxTop,
    //   'contentBoxHeight:' + contentBoxHeight,
    //   'fixedBoxHeight:' + fixedBoxHeight,
    //   'holderTop:' + holderTop)
    // console.log(fixedBoxHeight)
    if (
      fixedBoxHeight + holderTop > contentBoxHeight + contentBoxTop ||
      winTop < holderTop
    ) {
      winTopRecord = winTop;
      fixTopRecord = 0;
      fixedBox.style.position = "static";
      return;
    }
    // 可显示区域
    var viewPartHeight =
      window.document.body.offsetHeight - holderTop ||
      Math.min(contentBoxHeight + contentBoxTop - winTop, winHeight);
    var minTop = holderTop;
    var maxTop = minTop;
    if (winTop > winTopRecord) {
      // 向下滚动
      maxTop = Math.max(winTop + viewPartHeight - fixedBoxHeight, minTop);
      fixTopRecord = fixTopRecord + 1 * (winTop - winTopRecord);
    } else {
      // // 向上滚动
      maxTop = Math.max(winTop, minTop);
    }
    fixTopRecord = Math.min(maxTop, Math.max(fixTopRecord, minTop));
    winTopRecord = winTop;
    fixedBox.style.position = "fixed";
    fixedBox.style.top = fixTopRecord - winTopRecord + 60 + "px";
  }
  adjustfixedstyle();
  document.addEventListener(
    "scroll",
    () => {
      adjustfixedstyle();
    },
    false
  );
  document.addEventListener(
    "resize",
    () => {
      adjustfixedstyle();
    },
    false
  );
  document.addEventListener(
    "touchstart",
    () => {
      adjustfixedstyle();
    },
    { passive: true }
  );
  document.addEventListener(
    "touchmove",
    () => {
      adjustfixedstyle();
    },
    { passive: true }
  );
  document.addEventListener(
    "touchend",
    () => {
      adjustfixedstyle();
    },
    { passive: true }
  );
};
