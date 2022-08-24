export interface REX {
  title: string;
  rule: string;
  examples: (string | number)[];
  counterExamples?: string[];
}

//  Source:
//    source => https://github.com/any86/any-rule/blob/master/packages/www/src/RULES.js
//
//  Build:
//    source.reduce((all, e) => (all[e.title] = { ...e, rule: { source: e.rule.source, flags: e.rule.flags } }, all), {})
//
const COMMONS_REGULAR_EXPRESSIONS = {
  火车车次: {
    title: '火车车次',
    rule: {
      source: '^[GCDZTSPKXLY1-9]\\d{1,4}$',
      flags: '',
    },
    examples: ['G1868', 'D102', 'D9', 'Z5', 'Z24', 'Z17'],
  },
  '手机机身码(IMEI)': {
    title: '手机机身码(IMEI)',
    rule: {
      source: '^\\d{15,17}$',
      flags: '',
    },
    examples: ['123456789012345', '1234567890123456', '12345678901234567'],
  },
  '必须带端口号的网址(或ip)': {
    title: '必须带端口号的网址(或ip)',
    rule: {
      source: '^((ht|f)tps?:\\/\\/)?[\\w-]+(\\.[\\w-]+)+:\\d{1,5}\\/?$',
      flags: '',
    },
    examples: [
      'https://www.qq.com:8080',
      '127.0.0.1:5050',
      'baidu.com:8001',
      'http://192.168.1.1:9090',
    ],
    counterExamples: ['192.168.1.1', 'https://www.jd.com'],
  },
  '网址(url,支持端口和"?+参数"和"#+参数)': {
    title: '网址(url,支持端口和"?+参数"和"#+参数)',
    rule: {
      source:
        '^(((ht|f)tps?):\\/\\/)?[\\w-]+(\\.[\\w-]+)+([\\w.,@?^=%&:/~+#-\\(\\)]*[\\w@?^=%&/~+#-\\(\\)])?$',
      flags: '',
    },
    examples: [
      'www.qq.com',
      'https://baidu.com',
      'http://baidu.com',
      'https://www.amap.com/search?id=BV10060895&city=420111&geoobj=113.207951%7C29.992557%7C115.785782%7C31.204369&query_type=IDQ&query=%E5%85%89%E8%B0%B7%E5%B9%BF%E5%9C%BA(%E5%9C%B0%E9%93%81%E7%AB%99)&zoom=10.15',
      '360.com:8080/vue/#/a=1&b=2',
    ],
    counterExamples: ['....'],
  },
  统一社会信用代码: {
    title: '统一社会信用代码',
    rule: {
      source: '^[0-9A-HJ-NPQRTUWXY]{2}\\d{6}[0-9A-HJ-NPQRTUWXY]{10}$',
      flags: '',
    },
    examples: ['91230184MA1BUFLT44', '92371000MA3MXH0E3W'],
  },
  '统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)': {
    title: '统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)',
    rule: {
      source: '^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$',
      flags: '',
    },
    examples: ['91110108772551611J', '911101085923662400'],
  },
  迅雷链接: {
    title: '迅雷链接',
    rule: {
      source: '^thunderx?:\\/\\/[a-zA-Z\\d]+=$',
      flags: '',
    },
    examples: [
      'thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo=',
    ],
  },
  'ed2k链接(宽松匹配)': {
    title: 'ed2k链接(宽松匹配)',
    rule: {
      source: '^ed2k:\\/\\/\\|file\\|.+\\|\\/$',
      flags: '',
    },
    examples: [
      'ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/',
    ],
  },
  '磁力链接(宽松匹配)': {
    title: '磁力链接(宽松匹配)',
    rule: {
      source: '^magnet:\\?xt=urn:btih:[0-9a-fA-F]{40,}.*$',
      flags: '',
    },
    examples: [
      'magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC',
    ],
  },
  子网掩码: {
    title: '子网掩码',
    rule: {
      source:
        '^(?:\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])(?:\\.(?:\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])){3}$',
      flags: '',
    },
    examples: ['255.255.255.0', '255.224.0.0'],
  },
  'linux"隐藏文件"路径': {
    title: 'linux"隐藏文件"路径',
    rule: {
      source: '^\\/(?:[^/]+\\/)*\\.[^/]*',
      flags: '',
    },
    examples: ['/usr/ad/.dd', '/root/.gitignore', '/.gitignore'],
  },
  linux文件夹路径: {
    title: 'linux文件夹路径',
    rule: {
      source: '^\\/(?:[^/]+\\/)*$',
      flags: '',
    },
    examples: ['/usr/ad/dd/', '/', '/root/'],
  },
  linux文件路径: {
    title: 'linux文件路径',
    rule: {
      source: '^\\/(?:[^/]+\\/)*[^/]+$',
      flags: '',
    },
    examples: ['/root/b.ts', '/root/abc'],
  },
  'window"文件夹"路径': {
    title: 'window"文件夹"路径',
    rule: {
      source: '^[a-zA-Z]:\\\\(?:\\w+\\\\?)*$',
      flags: '',
    },
    examples: ['C:\\Users\\Administrator\\Desktop', 'e:\\m\\'],
  },
  'window下"文件"路径': {
    title: 'window下"文件"路径',
    rule: {
      source: '^[a-zA-Z]:\\\\(?:\\w+\\\\)*\\w+\\.\\w+$',
      flags: '',
    },
    examples: [
      'C:\\Users\\Administrator\\Desktop\\qq.link',
      'e:\\m\\vscode.exe',
    ],
  },
  '股票代码(A股)': {
    title: '股票代码(A股)',
    rule: {
      source:
        '^(s[hz]|S[HZ])(000[\\d]{3}|002[\\d]{3}|300[\\d]{3}|600[\\d]{3}|60[\\d]{4})$',
      flags: '',
    },
    examples: ['sz000858', 'SZ002136', 'sz300675', 'SH600600', 'sh601155'],
  },
  '大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数': {
    title:
      '大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数',
    rule: {
      source: '^150$|^(?:\\d|[1-9]\\d|1[0-4]\\d)(?:\\.5)?$',
      flags: '',
    },
    examples: [150, 100.5],
  },
  html注释: {
    title: 'html注释',
    rule: {
      source: '<!--[\\s\\S]*?-->',
      flags: 'g',
    },
    examples: [
      '<!--<div class="_bubble"></div>--><div>chenguzhen87</div><div class="_bubble"></div>-->',
    ],
  },
  'md5格式(32位)': {
    title: 'md5格式(32位)',
    rule: {
      source: '^([a-f\\d]{32}|[A-F\\d]{32})$',
      flags: '',
    },
    examples: ['21fe181c5bfc16306a6828c1f7b762e8'],
  },
  'GUID/UUID': {
    title: 'GUID/UUID',
    rule: {
      source: '^[a-f\\d]{4}(?:[a-f\\d]{4}-){4}[a-f\\d]{12}$',
      flags: 'i',
    },
    examples: [
      'e155518c-ca1b-443c-9be9-fe90fdab7345',
      '41E3DAF5-6E37-4BCC-9F8E-0D9521E2AA8D',
      '00000000-0000-0000-0000-000000000000',
    ],
  },
  '版本号(version)格式必须为X.Y.Z': {
    title: '版本号(version)格式必须为X.Y.Z',
    rule: {
      source: '^\\d+(?:\\.\\d+){2}$',
      flags: '',
    },
    examples: ['16.3.10'],
  },
  '视频(video)链接地址（视频格式可按需增删）': {
    title: '视频(video)链接地址（视频格式可按需增删）',
    rule: {
      source:
        '^https?:\\/\\/(.+\\/)+.+(\\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$',
      flags: 'i',
    },
    examples: ['http://www.abc.com/video/wc.avi'],
  },
  '图片(image)链接地址（图片格式可按需增删）': {
    title: '图片(image)链接地址（图片格式可按需增删）',
    rule: {
      source:
        '^https?:\\/\\/(.+\\/)+.+(\\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$',
      flags: 'i',
    },
    examples: ['https://www.abc.com/logo.png', 'http://www.abc.com/logo.png'],
  },
  '24小时制时间（HH:mm:ss）': {
    title: '24小时制时间（HH:mm:ss）',
    rule: {
      source: '^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$',
      flags: '',
    },
    examples: ['23:34:55'],
  },
  '12小时制时间（hh:mm:ss）': {
    title: '12小时制时间（hh:mm:ss）',
    rule: {
      source: '^(?:1[0-2]|0?[1-9]):[0-5]\\d:[0-5]\\d$',
      flags: '',
    },
    examples: ['11:34:55'],
    counterExamples: ['23:34:55'],
  },
  base64格式: {
    title: 'base64格式',
    rule: {
      source:
        "^\\s*data:(?:[a-z]+\\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\\-._~:@/?%\\s]*?)\\s*$",
      flags: 'i',
    },
    examples: ['data:image/gif;base64,xxxx=='],
  },
  '数字/货币金额（支持负数、千分位分隔符）': {
    title: '数字/货币金额（支持负数、千分位分隔符）',
    rule: {
      source: '^-?\\d+(,\\d{3})*(\\.\\d{1,2})?$',
      flags: '',
    },
    examples: [100, -0.99, 3, 234.32, -1, 900, 235.09, '12,345,678.90'],
  },
  '数字/货币金额 (只支持正数、不支持校验千分位分隔符)': {
    title: '数字/货币金额 (只支持正数、不支持校验千分位分隔符)',
    rule: {
      source:
        '(?:^[1-9]([0-9]+)?(?:\\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\\.[0-9](?:[0-9])?$)',
      flags: '',
    },
    examples: [0.99, 8.99, 666],
  },
  '银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）': {
    title:
      '银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）',
    rule: {
      source: '^[1-9]\\d{9,29}$',
      flags: '',
    },
    examples: [6234567890, 6222026006705354000],
  },
  中文姓名: {
    title: '中文姓名',
    rule: {
      source: '^(?:[\\u4e00-\\u9fa5·]{2,16})$',
      flags: '',
    },
    examples: ['葛二蛋', '凯文·杜兰特', '德克·维尔纳·诺维茨基'],
  },
  英文姓名: {
    title: '英文姓名',
    rule: {
      source: '(^[a-zA-Z][a-zA-Z\\s]{0,20}[a-zA-Z]$)',
      flags: '',
    },
    examples: ['James', 'Kevin Wayne Durant', 'Dirk Nowitzki'],
  },
  '车牌号(新能源)': {
    title: '车牌号(新能源)',
    rule: {
      source:
        '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$',
      flags: '',
    },
    examples: ['京AD92035', '甘G23459F', '京AA92035'],
  },
  '车牌号(非新能源)': {
    title: '车牌号(非新能源)',
    rule: {
      source:
        '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$',
      flags: '',
    },
    examples: ['京A00599', '黑D23908'],
  },
  '车牌号(新能源+非新能源)': {
    title: '车牌号(新能源+非新能源)',
    rule: {
      source:
        '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$',
      flags: '',
    },
    examples: [
      '京A12345D',
      '京A00599',
      '京AD92035',
      '甘G23459F',
      '京AA92035',
    ],
    counterExamples: ['宁AD1234555555', '浙苏H6F681'],
  },
  '手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段': {
    title:
      '手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段',
    rule: {
      source:
        '^(?:(?:\\+|00)86)?1(?:(?:3[\\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\\d])|(?:9[189]))\\d{8}$',
      flags: '',
    },
    examples: ['008618311006933', '+8617888829981', '19119255642'],
  },
  '手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可': {
    title:
      '手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可',
    rule: {
      source: '^(?:(?:\\+|00)86)?1[3-9]\\d{9}$',
      flags: '',
    },
    examples: ['008618311006933', '+8617888829981', '19119255642'],
  },
  '手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条': {
    title:
      '手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条',
    rule: {
      source: '^(?:(?:\\+|00)86)?1\\d{10}$',
      flags: '',
    },
    examples: ['008618311006933', '+8617888829981', '19119255642'],
  },
  'date(日期)': {
    title: 'date(日期)',
    rule: {
      source: '^\\d{1,4}(-)(1[0-2]|0?[1-9])\\1(0?[1-9]|[1-2]\\d|30|31)$',
      flags: '',
    },
    examples: ['1990-12-12', '1-1-1', '0000-1-1'],
    counterExamples: ['2020-00-01'],
  },
  'email(邮箱)': {
    title: 'email(邮箱)',
    rule: {
      source:
        '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      flags: '',
    },
    examples: ['90203918@qq.com', 'nbilly@126.com', '汉字@qq.com'],
  },
  '座机(tel phone)电话(国内),如: 0341-86091234': {
    title: '座机(tel phone)电话(国内),如: 0341-86091234',
    rule: {
      source: '^(?:(?:\\d{3}-)?\\d{8}|^(?:\\d{4}-)?\\d{7,8})(?:-\\d+)?$',
      flags: '',
    },
    examples: ['0936-4211235', '89076543', '010-12345678-1234'],
  },
  '身份证号(1代,15位数字)': {
    title: '身份证号(1代,15位数字)',
    rule: {
      source:
        '^[1-9]\\d{7}(?:0\\d|10|11|12)(?:0[1-9]|[1-2][\\d]|30|31)\\d{3}$',
      flags: '',
    },
    examples: ['123456991010193'],
  },
  '身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X': {
    title: '身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X',
    rule: {
      source:
        '^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\\d|30|31)\\d{3}[\\dXx]$',
      flags: '',
    },
    examples: ['12345619991205131x'],
  },
  '身份证号, 支持1/2代(15位/18位数字)': {
    title: '身份证号, 支持1/2代(15位/18位数字)',
    rule: {
      source:
        '^\\d{6}((((((19|20)\\d{2})(0[13-9]|1[012])(0[1-9]|[12]\\d|30))|(((19|20)\\d{2})(0[13578]|1[02])31)|((19|20)\\d{2})02(0[1-9]|1\\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\\d{3})|((((\\d{2})(0[13-9]|1[012])(0[1-9]|[12]\\d|30))|((\\d{2})(0[13578]|1[02])31)|((\\d{2})02(0[1-9]|1\\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\\d{2}))(\\d|X|x)$',
      flags: '',
    },
    examples: ['622223199912051311', '12345619991205131x', '123456991010193'],
  },
  '护照（包含香港、澳门）': {
    title: '护照（包含香港、澳门）',
    rule: {
      source:
        '(^[EeKkGgDdSsPpHh]\\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\\d{7}$)',
      flags: '',
    },
    examples: [
      's28233515',
      '141234567',
      '159203084',
      'MA1234567',
      'K25345719',
    ],
  },
  '帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合': {
    title: '帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合',
    rule: {
      source: '^[a-zA-Z]\\w{4,15}$',
      flags: '',
    },
    examples: ['justin', 'justin1989', 'justin_666'],
  },
  '中文/汉字': {
    title: '中文/汉字',
    rule: {
      source:
        '^(?:[\\u3400-\\u4DB5\\u4E00-\\u9FEA\\uFA0E\\uFA0F\\uFA11\\uFA13\\uFA14\\uFA1F\\uFA21\\uFA23\\uFA24\\uFA27-\\uFA29]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0])+$',
      flags: '',
    },
    examples: ['正则', '前端'],
  },
  小数: {
    title: '小数',
    rule: {
      source: '^\\d+\\.\\d+$',
      flags: '',
    },
    examples: ['0.0', '0.09'],
  },
  数字: {
    title: '数字',
    rule: {
      source: '^\\d{1,}$',
      flags: '',
    },
    examples: [12345678],
  },
  'html标签(宽松匹配)': {
    title: 'html标签(宽松匹配)',
    rule: {
      source: '<(\\w+)[^>]*>(.*?<\\/\\1>)?',
      flags: '',
    },
    examples: ['<div id="app"> 2333 </div>', '<input type="text">', '<br>'],
  },
  qq号格式正确: {
    title: 'qq号格式正确',
    rule: {
      source: '^[1-9][0-9]{4,10}$',
      flags: '',
    },
    examples: [903013545, 9020304],
  },
  数字和字母组成: {
    title: '数字和字母组成',
    rule: {
      source: '^[A-Za-z0-9]+$',
      flags: '',
    },
    examples: ['james666', 'haha233hi'],
  },
  英文字母: {
    title: '英文字母',
    rule: {
      source: '^[a-zA-Z]+$',
      flags: '',
    },
    examples: ['Russel'],
  },
  小写英文字母组成: {
    title: '小写英文字母组成',
    rule: {
      source: '^[a-z]+$',
      flags: '',
    },
    examples: ['russel'],
  },
  大写英文字母: {
    title: '大写英文字母',
    rule: {
      source: '^[A-Z]+$',
      flags: '',
    },
    examples: ['ABC', 'KD'],
  },
  '密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符': {
    title:
      '密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
    rule: {
      source:
        '^\\S*(?=\\S{6,})(?=\\S*\\d)(?=\\S*[A-Z])(?=\\S*[a-z])(?=\\S*[!@#$%^&*? ])\\S*$',
      flags: '',
    },
    examples: ['Kd@curry666'],
  },
  '用户名校验，4到16位（字母，数字，下划线，减号）': {
    title: '用户名校验，4到16位（字母，数字，下划线，减号）',
    rule: {
      source: '^[a-zA-Z0-9_-]{4,16}$',
      flags: '',
    },
    examples: ['xiaohua_qq'],
  },
  'ip-v4[:端口]': {
    title: 'ip-v4[:端口]',
    rule: {
      source:
        '^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$',
      flags: '',
    },
    examples: ['172.16.0.0', '172.16.0.0:8080', '127.0.0.0', '127.0.0.0:998'],
  },
  'ip-v6[:端口]': {
    title: 'ip-v6[:端口]',
    rule: {
      source:
        '^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))|\\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b)\\.){3}(\\b((25[0-5])|(1\\d{2})|(2[0-4]\\d)|(\\d{1,2}))\\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$',
      flags: 'i',
    },
    examples: [
      '2031:0000:130f:0000:0000:09c0:876a:130b',
      '[2031:0000:130f:0000:0000:09c0:876a:130b]:8080',
    ],
  },
  '16进制颜色': {
    title: '16进制颜色',
    rule: {
      source: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
      flags: '',
    },
    examples: ['#f00', '#F90', '#000', '#fe9de8'],
  },
  '微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线': {
    title: '微信号(wx)，6至20位，以字母开头，字母，数字，减号，下划线',
    rule: {
      source: '^[a-zA-Z][-_a-zA-Z0-9]{5,19}$',
      flags: '',
    },
    examples: ['github666', 'kd_-666'],
  },
  '邮政编码(中国)': {
    title: '邮政编码(中国)',
    rule: {
      source:
        '^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\\d{4}$',
      flags: '',
    },
    examples: ['734500', '100101'],
  },
  中文和数字: {
    title: '中文和数字',
    rule: {
      source:
        '^((?:[\\u3400-\\u4DB5\\u4E00-\\u9FEA\\uFA0E\\uFA0F\\uFA11\\uFA13\\uFA14\\uFA1F\\uFA21\\uFA23\\uFA24\\uFA27-\\uFA29]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0])|(\\d))+$',
      flags: '',
    },
    examples: ['哈哈哈', '你好6啊'],
  },
  不能包含字母: {
    title: '不能包含字母',
    rule: {
      source: '^[^A-Za-z]*$',
      flags: '',
    },
    examples: ['你好6啊', '@¥()！'],
  },
  java包名: {
    title: 'java包名',
    rule: {
      source: '^([a-zA-Z_]\\w*)+([.][a-zA-Z_]\\w*)+$',
      flags: '',
    },
    examples: ['com.bbb.name'],
  },
  mac地址: {
    title: 'mac地址',
    rule: {
      source: '^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$',
      flags: 'i',
    },
    examples: ['38:f9:d3:4b:f5:51', '00-0C-29-CA-E4-66'],
  },
  匹配连续重复的字符: {
    title: '匹配连续重复的字符',
    rule: {
      source: '(.)\\1+',
      flags: '',
    },
    examples: ['我我我', '112233', '11234'],
  },
  '数字和英文字母组成，并且同时含有数字和英文字母': {
    title: '数字和英文字母组成，并且同时含有数字和英文字母',
    rule: {
      source: '^(?=.*[a-zA-Z])(?=.*\\d).+$',
      flags: '',
    },
    examples: ['我a我1我', 'a对1'],
  },
  '香港身份证 ': {
    title: '香港身份证 ',
    rule: {
      source: '^[a-zA-Z]\\d{6}\\([\\dA]\\)$',
      flags: '',
    },
    examples: ['K034169(1)'],
  },
  '澳门身份证 ': {
    title: '澳门身份证 ',
    rule: {
      source: '^[1|5|7]\\d{6}[(\\d)]{3}$',
      flags: '',
    },
    examples: ['5686611(1)'],
  },
  '台湾身份证 ': {
    title: '台湾身份证 ',
    rule: {
      source: '^[a-zA-Z][0-9]{9}$',
      flags: '',
    },
    examples: ['U193683453'],
  },
  '正整数，不包含0': {
    title: '正整数，不包含0',
    rule: {
      source: '^\\+?[1-9]\\d*$',
      flags: '',
    },
    examples: [1231],
  },
  '负整数，不包含0': {
    title: '负整数，不包含0',
    rule: {
      source: '^-[1-9]\\d*$',
      flags: '',
    },
    examples: [-1231],
  },
  整数: {
    title: '整数',
    rule: {
      source: '^-?[0-9]\\d*$',
      flags: '',
    },
    examples: [-1231, 123],
  },
  浮点数: {
    title: '浮点数',
    rule: {
      source: '^(-?\\d+)(\\.\\d+)?$',
      flags: '',
    },
    examples: [1.5],
  },
  'email(支持中文邮箱)': {
    title: 'email(支持中文邮箱)',
    rule: {
      source:
        '^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
      flags: '',
    },
    examples: ['90203918@qq.com', 'nbilly@126.com', '啦啦啦@126.com'],
  },
};

export default COMMONS_REGULAR_EXPRESSIONS;
