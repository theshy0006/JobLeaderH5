<template>
	<view style="background-color: #FFFFFF;">
		<view class="top">
			<text style="text-align: center; font-size: 28rpx; color:#333333;">你可以将需要的服务添加到首页</text>
            <view class="cu-list grid" :class="['col-' + currentCol,gridBorder?'':'no-border']">
            	<view class="cu-item bigItem" v-for="(item,index) in currentItems" :key="index">
            		<view class='addItem'>
                        <image style="width:64rpx; height: 64rpx;":src=item.imageUrl></image>
                        <image class="rightCorner":src=cancelUrl></image>
            		</view>
            		<text>{{item.name}}</text>
            	</view>
            </view>
            <view class="topBottom">
                <view style="background-color: #ECECEC; width: 124rpx; height: 2rpx;"></view>
                <view style="padding-left: 20rpx;padding-right: 20rpx; font-size: 20rpx; color: #999999;">以上服务展示在首页(最多三项)</view>
                <view style="background-color: #ECECEC; width: 124rpx; height: 2rpx;"></view>
            </view>
         
		</view>
        
        <view class="job">
            <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
            	<view class="cu-item bigItem" v-for="(item,index) in jobItems" :key="index">
            		<view class='addItem'>
                        <image style="width:64rpx; height: 64rpx;":src=item.imageUrl></image>
                        <image class="rightCorner":src=addUrl></image>
            		</view>
            		<text>{{item.name}}</text>
            	</view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                addUrl: '../../static/icon_service_add.png',
                cancelUrl: '../../static/icon_service_delete.png',
				currentItems:[
                    {
						imageUrl: '../../static/icon_shortcut_positon.png',
						name: '职位广场'
					},
                    {
                    	imageUrl: '../../static/icon_job_resumeeditor.png',
                    	name: '简历中心'
                    },
                    {
                    	imageUrl: '../../static/icon_job_data.png',
                    	name: '求职意向'
                    },
                ],
                jobItems:[
                    {
                		imageUrl: '../../static/icon_job_data.png',
                		name: '校招'
                	},
                    {
                    	imageUrl: '../../static/icon_shezhao.png',
                    	name: '社招'
                    },
                    {
                    	imageUrl: '../../static/icon_shixi.png',
                    	name: '实习'
                    },
                    {
                    	imageUrl: '../../static/icon_toudi.png',
                    	name: '投递记录'
                    },
                    {
                    	imageUrl: '../../static/icon_gongsiku.png',
                    	name: '公司库'
                    },
                    {
                    	imageUrl: '../../static/icon_shoucang.png',
                    	name: '收藏中心'
                    },
                    {
                    	imageUrl: '../../static/icon_mubanku.png',
                    	name: '模板库'
                    },
                    {
                    	imageUrl: '../../static/icon_paihangbang.png',
                    	name: '排行榜'
                    },
                    {
                    	imageUrl: '../../static/icon_rencaiguangchang.png',
                    	name: '人才广场'
                    },
                    {
                    	imageUrl: '../../static/icon_zhiweiguanli.png',
                    	name: '职位管理'
                    },
                    {
                    	imageUrl: '../../static/icon_jianliku.png',
                    	name: '简历库'
                    },
                    {
                    	imageUrl: '../../static/icon_jianlichuli.png',
                    	name: '简历处理'
                    },
                    {
                    	imageUrl: '../../static/icon_gszhuye.png',
                    	name: '公司主页'
                    },
                    {
                    	imageUrl: '../../static/icon_rencaishoucang.png',
                    	name: '人才收藏'
                    },
                    {
                    	imageUrl: '../../static/icon_yaoqingtongshi.png',
                    	name: '邀请同事'
                    },
                    {
                    	imageUrl: '../../static/icon_zhaopingshuju.png',
                    	name: '招聘数据'
                    },
                    {
                    	imageUrl: '../../static/icon_pingguyixiang.png',
                    	name: '评估意向'
                    },
                    {
                    	imageUrl: '../../static/icon_pinggutiku.png',
                    	name: '评估题库'
                    },
                    {
                    	imageUrl: '../../static/icon_pinggujilu.png',
                    	name: '评估记录'
                    },
                    {
                    	imageUrl: '../../static/icon_pinggushuju.png',
                    	name: '评估数据'
                    },
                    {
                    	imageUrl: '../../static/icon_yaotuijian.png',
                    	name: '我要推荐'
                    },
                    {
                    	imageUrl: '../../static/icon_tuijianjilu.png',
                    	name: '推荐记录'
                    },
                    {
                    	imageUrl: '../../static/icon_mine_helper.png',
                    	name: '推荐数据'
                    }
                ],
                currentCol:3,
                gridCol: 4,
                gridBorder: false,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.top {
    width: 750rpx;
    height: 332rpx;
    display: flex;
    display: -webkit-flex; /* Safari */
    padding-top: 40rpx;
    flex-direction: column;
}

.topBottom {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: row;
    align-items: center;
    justify-content:center;
}

.job {
    padding-top: 20rpx;
}

.invite {
    padding-top: 20rpx;
}

.assess {
    padding-top: 20rpx;
}

.recommend {
    padding-top: 20rpx;
}

.itemImage {
    width:64rpx;
    height:64rpx;
}

.addItem {
    display: flex;
    flex-direction: column;
    width: 64rpx;
    height: 64rpx;
}


.rightCorner {
    width: 32rpx;
    height: 32rpx;
    margin-top: -80rpx;
    margin-left: 45rpx;
}
.bigItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


</style>
