<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
		        <view class="topFont">地图</view>
		        </block>
		</cu-custom>
        <view>
            <map class="map" :scale="16" :longitude="longitude" :latitude="latitude" :markers="covers" @tap="changeLa">
            </map>
        </view>
        
	</view>
</template>

<script>
    import Vue from 'vue'
    import {
    	mapState
    } from 'vuex'
	export default {
        computed: {
            ...mapState(['token', 'id', 'type']),
            showLatitude:function() {
                return this.latitude
            },
            showLongitude:function() {
                return this.longitude
            }
        },
		data() {
			return {
                location: {},
                locationAddress: '',
				longitude:0,
                latitude:0,
                covers: [{
                    latitude: 0,
                    longitude: 0,
                    iconPath: '../../static/locationIcon.png'
                }]
			}
		},
		methods: {
			changeLa() {
                console.log(this.longitude)
                console.log(this.latitude)
            }
		},
        onLoad: function (option) {
            
            this.latitude = option.latitude
            this.longitude = option.longitude
            
            this.covers[0].latitude = this.latitude
            this.covers[0].longitude = this.longitude
        }
	}
</script>

<style>
.map {
    width: 750rpx;
    height: 100vh;
}
</style>
