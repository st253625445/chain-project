// 时间截取10位
export const timeSub10 = function(data) {
  return data.substring(0, 10);
};
// 省份简写
export const nameToShort = function(data) {
  let _name = "";
  let _lists = [
    {
      name: "北京",
      short: "bj"
    },
    {
      name: "天津",
      short: "tj"
    },
    {
      name: "上海",
      short: "sh"
    },
    {
      name: "重庆",
      short: "cq"
    },
    {
      name: "河北",
      short: "hb"
    },
    {
      name: "河南",
      short: "hen"
    },
    {
      name: "云南",
      short: "yn"
    },
    {
      name: "辽宁",
      short: "ln"
    },
    {
      name: "黑龙江",
      short: "hlj"
    },
    {
      name: "湖南",
      short: "hun"
    },
    {
      name: "安徽",
      short: "ah"
    },
    {
      name: "山东",
      short: "sd"
    },
    {
      name: "新疆",
      short: "xj"
    },
    {
      name: "江苏",
      short: "js"
    },
    {
      name: "浙江",
      short: "zj"
    },
    {
      name: "江西",
      short: "jx"
    },
    {
      name: "湖北",
      short: "hub"
    },
    {
      name: "广西",
      short: "gx"
    },
    {
      name: "甘肃",
      short: "gs"
    },
    {
      name: "山西",
      short: "sx"
    },
    {
      name: "内蒙古",
      short: "nmg"
    },
    {
      name: "陕西",
      short: "snx"
    },
    {
      name: "吉林",
      short: "jl"
    },
    {
      name: "福建",
      short: "fj"
    },
    {
      name: "贵州",
      short: "gz"
    },
    {
      name: "广东",
      short: "gd"
    },
    {
      name: "青海",
      short: "qh"
    },
    {
      name: "西藏",
      short: "xz"
    },
    {
      name: "四川",
      short: "sc"
    },
    {
      name: "宁夏",
      short: "nx"
    },
    {
      name: "海南",
      short: "han"
    },
    {
      name: "台湾",
      short: "tw"
    },
    {
      name: "香港",
      short: "xg"
    },
    {
      name: "澳门",
      short: "am"
    }
  ];
  for (let i = 0; i < _lists.length; i++) {
    if (data === _lists[i].short) {
      _name = _lists[i].name;
      break;
    }
  }
  return _name;
};
