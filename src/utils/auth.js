const TokenKey = "uID";

export function getToken() {
  var exp = 2 * 60 * 60 * 1000; // 2小时毫秒数
  if (localStorage.getItem(TokenKey)) {
    var vals = localStorage.getItem(TokenKey); // 获取本地存储的值
    var dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
    // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
    var isTimed = new Date().getTime() - dataObj.timer > exp;
    if (isTimed) {
      console.log("token已过期");
      localStorage.removeItem(TokenKey);
      return null;
    } else {
      var newValue = dataObj.val;
    }
    return newValue;
  } else {
    return null;
  }
}

export function setToken(token) {
  let curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
  let valueDate = JSON.stringify({
    val: token,
    timer: curtime
  });
  try {
    localStorage.setItem(TokenKey, valueDate);
  } catch (e) {
    console.log("Error: 保存到本地存储失败");
  }
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
