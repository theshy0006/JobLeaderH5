<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
        	<block slot="backText">返回</block>
        	<block slot="content">
                <view class="topFont">上报事件</view>
                </block>
        </cu-custom>
        <view class="p eventItem bg-white flex flex-direction radius">
            <form>
                <view class="cu-form-group">
                    <view class="title">所属组织</view>
                    <input placeholder="" name="input" 
                    v-model="deptName" disabled = 'true' style="text-align:right">
                    </input>
                </view>
                <view class="cu-form-group">
                    <view class="title">事件类型</view>
                    <picker @change="PickerChange" :value="index" :range="picker">
                        <view class="picker">
                            {{index>-1?picker[index]:'请选择事件类型'}}
                        </view>
                    </picker>
                </view>
                <view class="cu-form-group align-start" style="flex-direction: column; height: 200rpx;">
                    <view class="title">事件描述</view>
                    <textarea maxlength="30" v-model="reason"
                     placeholder="请简单描述事件内容，最多30个字">
                    </textarea>
                </view>
                <view class="cu-form-group">
                    <view class="title">位置</view>
                    <input placeholder="请输入事件发生位置" 
                    name="input" style="text-align:right" v-model="location">
                    </input>
                    <text class='cuIcon-locationfill text-orange' @click="openMap"></text>
                </view>
            </form>
            
            
        </view>
        
        <view style="margin-top: 40rpx;">
        </view>
        <view class="cu-form-group" style="background-color: unset;">
            <view class="grid col-4 grid-square flex-sub">
                <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                 <image :src="imgList[index]" mode="aspectFill"></image>
                    <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                        <text class='cuIcon-close'></text>
                    </view>
                </view>
                <view class="solids bg-white addGroup" @tap="ChooseImage" v-if="imgList.length<3">
                    <text class='cuIcon-camera alertNN'></text>
                    <view class="alertPP">上传照片<br>最多3张</view>
                </view>
            </view>
        </view>
        <view class="padding flex flex-direction">
            <button class="cu-btn bg-gradual-blue lg shadow round" @click="upload">确认提交</button>
        </view>
    </view>
</template>

<script>
import Vue from 'vue'
    import {
    	mapState
    } from 'vuex'
	export default {
        computed: mapState(['token', 'id', 'type']),
        
		data() {
			return {
				imgList: [],
                cardNo:"",
                reason:'',
                driverName:'',
                loadModal:false,
                modalName: "",
                urlArray: [],
                deptName: '',
                index: -1,
                picker: ['路面问题', '垃圾桶问题', '其他问题'],
                deptId: '',
                location: '',
                phone:'',
                longitude:'',
                latitude:''
			};
		},
        onLoad: function (option) {
            console.log(option.deptName); //打印出上个页面传递的参数。
            this.deptName = option.deptName;
            this.deptId = option.deptId;
            this.phone = option.phone;
            
            this.longitude = option.longitude;
            this.latitude = option.latitude;
        },
        methods: {
            PickerChange(e) {
            	this.index = e.detail.value
            },
            
			LoadModal(e) {
				uni.showLoading({
					title: 'loading'
				});
			},
            showModal(e) {
                this.modalName = "bottomModal"  
            },
            hideModal(e) {
            	this.modalName = null
            },
            ChooseImage() {
                var that = this
            	uni.chooseImage({
            		count: 3, //默认9
            		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            		sourceType: ['album','camera'], //从相册选择
            		success: (res) => {
            			if (that.imgList.length != 0) {
                            if ((that.imgList.length + res.tempFilePaths.length) <= 3) {
                              that.imgList = that.imgList.concat(res.tempFilePaths)
                            } else {
                                uni.showToast({
                                    title:'最多只能上传3张图片',
                                    icon:'none'
                                })
                            }
            			} else {
            				that.imgList = res.tempFilePaths
            			}
                        that.urlBase64(res.tempFilePaths)
            		}
            	});
            },
            ViewImage(e) {
            	uni.previewImage({
            		urls: this.imgList,
            		current: e.currentTarget.dataset.url
            	});
            },
            urlBase64(array) {
                
                for (var i = 0; i < array.length; i++) { 
                    var toBase64Url;
                    　　uni.request({
                    　　　　url: array[i],
                    　　　　method: 'GET',
                    　　　　responseType: 'arraybuffer',
                    　　　　success: async res => {
                    　　　　　　  let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
                    　　　　　　  toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
                                if (this.urlArray.length < 3) {
                                    this.urlArray.push(toBase64Url)
                                }
                    　　　　 }
                    　　});
                }
                

            },
            
            DelImg(e) {
            	uni.showModal({
            		content: '确定要删除这张照片吗？',
            		cancelText: '取消',
            		confirmText: '确定',
            		success: res => {
            			if (res.confirm) {
            				this.imgList.splice(e.currentTarget.dataset.index, 1)
                            this.urlArray.splice(e.currentTarget.dataset.index, 1)
            			}
            		}
            	})
            },
            openMap: function () {
                // uni.navigateTo({
                //     url:("../map/map?longitude="+this.longitude
                //     + "&latitude="+this.latitude
                //     )
                // })

                uni.chooseLocation({
                    success: (res) => {
                        // this.hasLocation = true,
                        //this.location = formatLocation(res.longitude, res.latitude),
                        this.location = res.address
                    }
                }) 
            },
            upload() {
                if (this.index == -1 ) {
                    uni.showToast({
                        title:"请选择事件类型",
                        icon:'none'
                    })
                    return
                }
                
                if (this.reason.length == 0 ) {
                    uni.showToast({
                        title:"请简单描述事件内容",
                        icon:'none'
                    })
                    return
                }
                
                if (this.imgList.length == 0) {
                    uni.showToast({
                        title:"请上传图片",
                        icon:'none'
                    })
                    return
                }
                var url = [];
                url = url.concat(this.urlArray)
                while(url.length < 3) {
                    url.push('')
                }
                this.LoadModal()
                uni.request({
                    url: this.GLOBAL.UploadEvent,
                    dataType: 'jsonp',
                    method: 'POST',
                    header: {
                        access_token:this.token,
                    },
                    data: {
                        access_token:this.token,
                        eventType: this.index + 1, // 页码
                        phoneNum:this.phone,
                        uploadName:this.driverName,
                        inspectorId:this.id,
                        deptId:this.deptId,
                        location:this.location,
                        eventDescription:this.reason,
                        image1:url[0],
                        Image2:url[1],
                        Image3:url[2]
                    }
                }).then(data => {
                    //data为一个数组，数组第一项为错误信息，第二项为返回数据
                    uni.hideLoading();
                    var [error, res]  = data;
                    console.log(res.data);
                    let response = JSON.parse(res.data);

                    if ( response.code == 200 ) {
                        uni.showModal({
                            title: '提交成功',
                            showCancel: false,
                        	confirmText: '知道了',
                        	success: res => {
                                uni.navigateBack({
                                    delta: 3
                                });
                        	}
                        })
                    } else {
                        uni.showToast({
                        	title:response.message,
                        	icon:"none"
                        }) 
                    }
                }).catch(err => {
                    uni.hideLoading();
                	console.log('request fail', err);
                	uni.showModal({
                		content: err.errMsg,
                		showCancel: false
                	});
                }); 
            }
        }
	}
</script>

<style scoped>
    .eventItem {
        margin: 10rpx;
    }
    .title {
        color: #222222;
        font-size: 32rpx;
    }
    
    .cu-form-group2 {
    	background-color: #ffffff;
    	padding: 1upx 30upx;
    	display: flex;
    	align-items: center;
    	min-height: 100upx;
    	justify-content: space-between;
    }
    .addGroup {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .alertNN {
        padding-bottom: 40rpx;
    }
    .alertPP {
        margin-top: 90rpx;
        line-height:1.1;
        font-size: 24rpx;
        color: #666666;
        text-align: center;
    }
    
</style>
