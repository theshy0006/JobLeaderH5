<template>
    <view>
        <form>
        	<view class="cu-form-group margin-top-xs">
        		<view class="title">反馈类型</view>
<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker ">
						{{index>-1?picker[index]:'请选择'}}
                        </view>
                        </picker>
        	</view>
            
            <view class="cu-form-group margin-top-xs">
            	<view class="title">情况说明</view>
            </view>
            <view class="cu-form-group flex-direction">
            	<textarea class="textarea" maxlength="200" v-model="reason" placeholder="请输入反馈信息"></textarea>

                
            </view>
            
            <view class="bg-white">
            	<view class="hint">
            		已输入<span>{{inputNums}}</span>/200
            	</view>
            </view>
            <view class="cu-bar bg-white margin-top-xs">
            	<view class="action">
            		图片上传（最多上传3张图片）
            	</view>
            	
            </view>
            
            <view class="cu-form-group">
            	<view class="grid col-4 grid-square flex-sub">
            		<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
            		 <image :src="imgList[index]" mode="aspectFill"></image>
            			<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            				<text class='cuIcon-close'></text>
            			</view>
            		</view>
            		<view class="solids" @tap="ChooseImage" v-if="imgList.length<3">
            			<text class='cuIcon-cameraadd'></text>
            		</view>
            	</view>
            </view>
            <view class="cu-form-group margin-top-xs">
            	<view class="title">联系方式</view>
            </view>
            <view class="cu-form-group">
            	<input placeholder="手机/邮箱/QQ (选填)" name="input" v-model="phone" style="text-align:left">
                </input>
            </view>
            <button class="bg-sys" @click="upload">提交</button>

        </form>
    </view>
</template>

<script>
    import Vue from 'vue'
    import {
    	mapState
    } from 'vuex'
    export default {
        onLoad() {
            var params = this.getHashParameters();
            this.appAccessToken = params['appAccessToken'];
            this.userToken = params['token'];
        },
        computed: {
            inputNums: function() {
                return this.reason.length;
            }
        },
    	data() {
    		return {
    			imgList: [],
                index: -1,
                picker: ['程序bug', '吐槽', '其他'],
    	        cardNo:"",
    	        reason:'',
    	        driverName:'',
    	        loadModal:false,
    	        modalName: "",
    	        urlArray: [],
    	        type: 0,
                appAccessToken:'',
                userToken:'',
                reason:'',
                phone:''
    		};
    	},
    	methods: {
            getHashParameters() {
                var arr = (location.hash || '').split('?')[1].split('&')
                var params = {}
                for (var i = 0; i < arr.length; i++) {
                    var data = arr[i].split('=')
                    if (data.length === 2) {
                        params[data[0]] = data[1]
                    }
                }
                return params
            },
            PickerChange(e) {
                this.index = e.detail.value
            },
            showModal(e) {
                this.modalName = "bottomModal"  
            },
            hideModal(e) {
            	this.modalName = null
            },
            LoadModal(e) {
            	uni.showLoading({
            		title: 'loading'
            	});
            },
            ChooseImage() {
                var that = this
            	uni.chooseImage({
            		count: 1, //默认9
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
                        that.uploadImage(res.tempFilePaths)
            		}
            	});
            },
            ViewImage(e) {
            	uni.previewImage({
            		urls: this.imgList,
            		current: e.currentTarget.dataset.url
            	});
            },
            uploadImage(array) {
                uni.uploadFile({
                    url: this.GLOBAL.UploadHeaderImage,
                    name:'file',
                    filePath:array[0],
                    formData: {
                        'file': 'file',
                        'appAccessToken':this.appAccessToken,
                    },
                    success: (uploadFileRes) => {
                        uni.hideLoading();
                        console.log(uploadFileRes.data);
                        let response = JSON.parse(uploadFileRes.data);
                        if (response.code == 0) {
                            if (this.urlArray.length < 3) {
                                this.urlArray.push(response.data)
                            }
                        } else {
                            uni.showToast({
                            	title:response.message,
                            	icon:"none"
                            }) 
                        }
                    },
                    fail: (err) => {  
                        uni.hideLoading();
                            console.log(err)  
                        },  
                        complete: (complete) => {  
                            console.log(complete)   
                        }  
                });
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
            
            upload() {
                if (this.index < 0) {
                    uni.showToast({
                        title:"请选择反馈类型",
                        icon:'none'
                    })
                    return
                }
                if( this.reason.length == 0 ) {
                    uni.showToast({
                        title:"请输入反馈信息",
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
                
                var uploadUrl = ''
                for(var i = 0; i < url.length; i++ ) {
                    if(url[i].length != 0) {
                        uploadUrl = uploadUrl + url[i].url + ','
                    }
                }
                
                
                this.LoadModal()
                uni.request({
                    url: this.GLOBAL.FeedBack_URL,
                    method: 'POST',
                    dataType: 'jsonp',
                    header: {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data: {
                        token:this.userToken,
                        appAccessToken:this.appAccessToken,
                        type: this.picker[this.index], // 页码
                        phone:this.phone,
                        content:this.reason,
                        imgs:uploadUrl,
                    }
                }).then(data => {
                    //data为一个数组，数组第一项为错误信息，第二项为返回数据
                    uni.hideLoading();
                    var [error, res]  = data;
                    console.log(res.data);
                    let response = JSON.parse(res.data);
            
                    if ( response.code == 0 ) {
                        uni.showModal({
                            title: null,
                            showCancel: false,
                        	content: '提交成功',
                        	confirmText: '知道了',
                        	success: res => {
                                
                        	}
                        })
                    } else {
                        uni.showToast({
                        	title:response.msg,
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

<style>
    
.bg-sys {
	background-color: #3AA7FF;
	color: #ffffff;
    margin-top: 34rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
}
.textarea {
    background-color: #FFFFFF;
    height: 200rpx;
}
.hint {
    background-color: #FFFFFF;
    text-align: right;
    padding-right: 30rpx;
}
span {
    color: #007AFF;
}
</style>
