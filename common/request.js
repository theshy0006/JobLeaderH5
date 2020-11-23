const BASE_URL = 'https://mock.yonyoucloud.com/mock/16161/'
//const BASE_URL = 'http://192.168.1.8:8077/kzxm/wechat/'
//const BASE_URL = 'https://kazhuxiaomi.4008812356.cn/test/kzxm/wechat/'
//const BASE_URL = 'https://kazhuxiaomi.4008812356.cn/v1/kzxm/wechat/'

// 手机号验证码登录
const LoginWithPhone_URL = BASE_URL + 'backend/wechat/login'
//微信验证登录	
const LoginWeChat_URL = BASE_URL + 'backend/wechat/wechatLogin'
// 发送短信验证码
const SendCode_URL = BASE_URL + 'backend/wechat/sendLoginCode'
// 上传头像
const UploadImage_URL = BASE_URL + 'backend/wechat/uploadHeadImage'
// 上报事件
const UploadEvent = BASE_URL + 'backend/wechat/uploadEvent'
// 上报整改结果
const UploadResult = BASE_URL + 'backend/wechat/uploadResult'
// 查询事件详情
const QueryEventDetail = BASE_URL + 'backend/wechat/queryEventDetail'
// 查询全部事件
const QueryAllEvents = BASE_URL + 'backend/wechat/queryAllEvents'
// 查询待处理事件
const QueryPendingEvents = BASE_URL + 'backend/wechat/queryPendingEvents'
// 登出
const LoginOut_URL = BASE_URL + 'backend/wechat/logOut'
// 获取用户信息
const GetUserInfo_URL = BASE_URL + 'backend/wechat/queryUserInfo'

export default {
    // 手机号验证码登录
    LoginWithPhone_URL,
    //微信验证登录	
    LoginWeChat_URL,
    // 发送短信验证码
    SendCode_URL,
    // 上传头像
    UploadImage_URL,
    // 上报事件
    UploadEvent,
    // 上报整改结果
    UploadResult,
    // 查询事件详情
    QueryEventDetail,
    // 查询全部事件
    QueryAllEvents,
    // 查询待处理事件
    QueryPendingEvents,
    // 登出
    LoginOut_URL,
    // 获取用户信息
    GetUserInfo_URL
}