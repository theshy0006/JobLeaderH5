<template>
	<view>
        <scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'100vh'}]"
         :scroll-with-animation="true" :enable-back-to-top="true">
         
            <view style="padding-left: 20rpx;" class="bg-white">定位城市</view>
            <view class="locationCity">
                <button class="cu-btn locationButton">{{currentCity}}</button>
            </view>
         
        	<block v-for="(value,key,index) in cityData" :key="index">
        		<view :class="'indexItem-' + key" :id="'indexes-' + key" :data-index="key">
        			<view style="padding-left: 30rpx;" class="bg-white">{{key}}</view>
        			<view class="cu-list grid col-4 no-border">
        				<view class="cu-item bigItem" v-for="(item, sub) in value" :key="sub">
                                <button id="item.name" class="cu-btn cityButton lable-infolable-info" @click="buttonPressed(item.name)">{{item.name}}</button>
        				</view>
        			</view>
        		</view>
        	</block>
        </scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
                gridBorder: false,
                cityData: {
                    "A":[
                        {
                            "id":542500,
                            "version":0,
                            "name":"阿里地区",
                            "code":542500,
                            "initial":"A",
                            "pinyin":"aldq,alidiqu",
                            "areaCode":"0897",
                                
                            "provinceId":540000,
                             
                        },
                        {
                            "id":340800,
                            "version":29,
                            "name":"安庆",
                            "code":340800,
                            "initial":"A",
                            "pinyin":"aq,anqing",
                            "areaCode":"0556",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":152900,
                            "version":0,
                            "name":"阿拉善盟",
                            "code":152900,
                            "initial":"A",
                            "pinyin":"alsm,alashanmeng",
                            "areaCode":"0483",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":610900,
                            "version":54,
                            "name":"安康",
                            "code":610900,
                            "initial":"A",
                            "pinyin":"ak,ankang",
                            "areaCode":"0915",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":652900,
                            "version":0,
                            "name":"阿克苏地区",
                            "code":652900,
                            "initial":"A",
                            "pinyin":"aksdq,akesudiqu",
                            "areaCode":"0997",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":210300,
                            "version":0,
                            "name":"鞍山",
                            "code":210300,
                            "initial":"A",
                            "pinyin":"as,anshan",
                            "areaCode":"0412",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":410500,
                            "version":2,
                            "name":"安阳",
                            "code":410500,
                            "initial":"A",
                            "pinyin":"ay,anyang",
                            "areaCode":"0372",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":820100,
                            "version":0,
                            "name":"澳门半岛",
                            "code":820100,
                            "initial":"A",
                            "pinyin":"ambd,aomenbandao",
                            "areaCode":"853",
                                
                            "provinceId":820000,
                             
                        },
                        {
                            "id":513200,
                            "version":0,
                            "name":"阿坝藏族羌族自治州",
                            "code":513200,
                            "initial":"A",
                            "pinyin":"abczqzzzz,abacangzuqiangzuzizhizhou",
                            "areaCode":"0837",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":520400,
                            "version":31,
                            "name":"安顺",
                            "code":520400,
                            "initial":"A",
                            "pinyin":"as,anshun",
                            "areaCode":"0853",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":654300,
                            "version":0,
                            "name":"阿勒泰地区",
                            "code":654300,
                            "initial":"A",
                            "pinyin":"altdq,aletaidiqu",
                            "areaCode":"0906",
                                
                            "provinceId":650000,
                             
                        }
                    ],
                    "B":[
                        {
                            "id":652800,
                            "version":0,
                            "name":"巴音郭楞蒙古自治州",
                            "code":652800,
                            "initial":"B",
                            "pinyin":"byglmgzzz,bayinguolengmengguzizhizhou",
                            "areaCode":"0996",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":150800,
                            "version":0,
                            "name":"巴彦淖尔",
                            "code":150800,
                            "initial":"B",
                            "pinyin":"byne,bayannaoer",
                            "areaCode":"0478",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":110100,
                            "version":1698,
                            "name":"北京",
                            "code":110100,
                            "initial":"B",
                            "pinyin":"bj,beijing",
                            "areaCode":"010",
                                
                            "provinceId":110000,
                             
                        },
                        {
                            "id":130600,
                            "version":60,
                            "name":"保定",
                            "code":130600,
                            "initial":"B",
                            "pinyin":"bd,baoding",
                            "areaCode":"0312",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":530500,
                            "version":6,
                            "name":"保山",
                            "code":530500,
                            "initial":"B",
                            "pinyin":"bs,baoshan",
                            "areaCode":"0875",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":210500,
                            "version":0,
                            "name":"本溪",
                            "code":210500,
                            "initial":"B",
                            "pinyin":"bx,benxi",
                            "areaCode":"0414",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":340300,
                            "version":77,
                            "name":"蚌埠",
                            "code":340300,
                            "initial":"B",
                            "pinyin":"bb,bangbu",
                            "areaCode":"0552",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":620400,
                            "version":1,
                            "name":"白银",
                            "code":620400,
                            "initial":"B",
                            "pinyin":"by,baiyin",
                            "areaCode":"0943",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":220800,
                            "version":0,
                            "name":"白城",
                            "code":220800,
                            "initial":"B",
                            "pinyin":"bc,baicheng",
                            "areaCode":"0436",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":371600,
                            "version":8,
                            "name":"滨州",
                            "code":371600,
                            "initial":"B",
                            "pinyin":"bz,binzhou",
                            "areaCode":"0543",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":511900,
                            "version":4,
                            "name":"巴中",
                            "code":511900,
                            "initial":"B",
                            "pinyin":"bz,bazhong",
                            "areaCode":"0827",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":652700,
                            "version":0,
                            "name":"博尔塔拉蒙古自治州",
                            "code":652700,
                            "initial":"B",
                            "pinyin":"betlmgzzz,boertalamengguzizhizhou",
                            "areaCode":"0909",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":522400,
                            "version":5,
                            "name":"毕节地区",
                            "code":522400,
                            "initial":"B",
                            "pinyin":"bjdq,bijiediqu",
                            "areaCode":"0857",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":150200,
                            "version":0,
                            "name":"包头",
                            "code":150200,
                            "initial":"B",
                            "pinyin":"bt,baotou",
                            "areaCode":"0472",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":220600,
                            "version":0,
                            "name":"白山",
                            "code":220600,
                            "initial":"B",
                            "pinyin":"bs,baishan",
                            "areaCode":"0439",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":451000,
                            "version":126,
                            "name":"百色",
                            "code":451000,
                            "initial":"B",
                            "pinyin":"bs,baise",
                            "areaCode":"0776",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":450500,
                            "version":157,
                            "name":"北海",
                            "code":450500,
                            "initial":"B",
                            "pinyin":"bh,beihai",
                            "areaCode":"0779",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":610300,
                            "version":26,
                            "name":"宝鸡",
                            "code":610300,
                            "initial":"B",
                            "pinyin":"bj,baoji",
                            "areaCode":"0917",
                                
                            "provinceId":610000,
                             
                        }
                    ],
                    "C":[
                        {
                            "id":652300,
                            "version":0,
                            "name":"昌吉回族自治州",
                            "code":652300,
                            "initial":"C",
                            "pinyin":"cjhzzzz,changjihuizuzizhizhou",
                            "areaCode":"0994",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":430100,
                            "version":603,
                            "name":"长沙",
                            "code":430100,
                            "initial":"C",
                            "pinyin":"cs,changsha",
                            "areaCode":"0731",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":451400,
                            "version":41,
                            "name":"崇左",
                            "code":451400,
                            "initial":"C",
                            "pinyin":"cz,chongzuo",
                            "areaCode":"0771",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":532300,
                            "version":5,
                            "name":"楚雄彝族自治州",
                            "code":532300,
                            "initial":"C",
                            "pinyin":"cxyzzzz,chuxiongyizuzizhizhou",
                            "areaCode":"0878",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":130900,
                            "version":17,
                            "name":"沧州",
                            "code":130900,
                            "initial":"C",
                            "pinyin":"cz,cangzhou",
                            "areaCode":"0317",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":211300,
                            "version":0,
                            "name":"朝阳",
                            "code":211300,
                            "initial":"C",
                            "pinyin":"cy,chaoyang",
                            "areaCode":"0421",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":341100,
                            "version":55,
                            "name":"滁州",
                            "code":341100,
                            "initial":"C",
                            "pinyin":"cz,chuzhou",
                            "areaCode":"0550",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":430700,
                            "version":224,
                            "name":"常德",
                            "code":430700,
                            "initial":"C",
                            "pinyin":"cd,changde",
                            "areaCode":"0736",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":140400,
                            "version":27,
                            "name":"长治",
                            "code":140400,
                            "initial":"C",
                            "pinyin":"cz,changzhi",
                            "areaCode":"0355",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":150400,
                            "version":0,
                            "name":"赤峰",
                            "code":150400,
                            "initial":"C",
                            "pinyin":"cf,chifeng",
                            "areaCode":"0476",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":500100,
                            "version":986,
                            "name":"重庆",
                            "code":500100,
                            "initial":"C",
                            "pinyin":"cq,chongqing",
                            "areaCode":"023",
                                
                            "provinceId":500000,
                             
                        },
                        {
                            "id":320400,
                            "version":1,
                            "name":"常州",
                            "code":320400,
                            "initial":"C",
                            "pinyin":"cz,changzhou",
                            "areaCode":"0519",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":542100,
                            "version":0,
                            "name":"昌都",
                            "code":542100,
                            "initial":"C",
                            "pinyin":"cd,changdu",
                            "areaCode":"0895",
                                
                            "provinceId":540000,
                             
                        },
                        {
                            "id":510100,
                            "version":485,
                            "name":"成都",
                            "code":510100,
                            "initial":"C",
                            "pinyin":"cd,chengdu",
                            "areaCode":"028",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":341400,
                            "version":72,
                            "name":"巢湖",
                            "code":341400,
                            "initial":"C",
                            "pinyin":"ch,chaohu",
                            "areaCode":"0565",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":431000,
                            "version":28,
                            "name":"郴州",
                            "code":431000,
                            "initial":"C",
                            "pinyin":"cz,chenzhou",
                            "areaCode":"0735",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":445100,
                            "version":1,
                            "name":"潮州",
                            "code":445100,
                            "initial":"C",
                            "pinyin":"cz,chaozhou",
                            "areaCode":"0768",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":341700,
                            "version":49,
                            "name":"池州",
                            "code":341700,
                            "initial":"C",
                            "pinyin":"cz,chizhou",
                            "areaCode":"0566",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":220100,
                            "version":195,
                            "name":"长春",
                            "code":220100,
                            "initial":"C",
                            "pinyin":"cc,changchun",
                            "areaCode":"0431",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":130800,
                            "version":4,
                            "name":"承德",
                            "code":130800,
                            "initial":"C",
                            "pinyin":"cd,chengde",
                            "areaCode":"0314",
                                
                            "provinceId":130000,
                             
                        }
                    ],
                    "D":[
                        {
                            "id":210200,
                            "version":4,
                            "name":"大连",
                            "code":210200,
                            "initial":"D",
                            "pinyin":"dl,dalian",
                            "areaCode":"0411",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":621100,
                            "version":0,
                            "name":"定西",
                            "code":621100,
                            "initial":"D",
                            "pinyin":"dx,dingxi",
                            "areaCode":"0932",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":441900,
                            "version":7,
                            "name":"东莞",
                            "code":441900,
                            "initial":"D",
                            "pinyin":"dz,dongzuo",
                            "areaCode":"0769",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":370500,
                            "version":9,
                            "name":"东营",
                            "code":370500,
                            "initial":"D",
                            "pinyin":"dy,dongying",
                            "areaCode":"0546",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":533100,
                            "version":0,
                            "name":"德宏傣族景颇族自治州",
                            "code":533100,
                            "initial":"D",
                            "pinyin":"dhdzjpzzzz,dehongdaizujingpozuzizhizhou",
                            "areaCode":"0692",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":510600,
                            "version":18,
                            "name":"德阳",
                            "code":510600,
                            "initial":"D",
                            "pinyin":"dy,deyang",
                            "areaCode":"0838",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":533400,
                            "version":0,
                            "name":"迪庆藏族自治州",
                            "code":533400,
                            "initial":"D",
                            "pinyin":"dqczzzz,diqingcangzuzizhizhou",
                            "areaCode":"0887",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":532900,
                            "version":30,
                            "name":"大理白族自治州",
                            "code":532900,
                            "initial":"D",
                            "pinyin":"dlbzzzz,dalibaizuzizhizhou",
                            "areaCode":"0872",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":140200,
                            "version":0,
                            "name":"大同",
                            "code":140200,
                            "initial":"D",
                            "pinyin":"dt,datong",
                            "areaCode":"0352",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":210600,
                            "version":0,
                            "name":"丹东",
                            "code":210600,
                            "initial":"D",
                            "pinyin":"dd,dandong",
                            "areaCode":"0415",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":230600,
                            "version":0,
                            "name":"大庆",
                            "code":230600,
                            "initial":"D",
                            "pinyin":"dq,daqing",
                            "areaCode":"0459",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":371400,
                            "version":2,
                            "name":"德州",
                            "code":371400,
                            "initial":"D",
                            "pinyin":"dz,dezhou",
                            "areaCode":"0534",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":511700,
                            "version":16,
                            "name":"达州",
                            "code":511700,
                            "initial":"D",
                            "pinyin":"dz,dazhou",
                            "areaCode":"0818",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":232700,
                            "version":0,
                            "name":"大兴安岭地区",
                            "code":232700,
                            "initial":"D",
                            "pinyin":"dxaldq,daxinganlingdiqu",
                            "areaCode":"0457",
                                
                            "provinceId":230000,
                             
                        }
                    ],
                    "E":[
                        {
                            "id":150600,
                            "version":0,
                            "name":"鄂尔多斯",
                            "code":150600,
                            "initial":"E",
                            "pinyin":"eeds,eerduosi",
                            "areaCode":"0477",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":420700,
                            "version":1,
                            "name":"鄂州",
                            "code":420700,
                            "initial":"E",
                            "pinyin":"ez,ezhou",
                            "areaCode":"0711",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":422800,
                            "version":1,
                            "name":"恩施土家族苗族自治州",
                            "code":422800,
                            "initial":"E",
                            "pinyin":"estjzmzzzz,enshitujiazumiaozuzizhizhou",
                            "areaCode":"0718",
                                
                            "provinceId":420000,
                             
                        }
                    ],
                    "F":[
                        {
                            "id":440600,
                            "version":12,
                            "name":"佛山",
                            "code":440600,
                            "initial":"F",
                            "pinyin":"fs,foshan",
                            "areaCode":"0757",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":361000,
                            "version":95,
                            "name":"抚州",
                            "code":361000,
                            "initial":"F",
                            "pinyin":"fz,fuzhou",
                            "areaCode":"0794",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":450600,
                            "version":100,
                            "name":"防城港",
                            "code":450600,
                            "initial":"F",
                            "pinyin":"fcg,fangchenggang",
                            "areaCode":"0770",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":350100,
                            "version":71,
                            "name":"福州",
                            "code":350100,
                            "initial":"F",
                            "pinyin":"fz,fuzhou",
                            "areaCode":"0591",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":341200,
                            "version":45,
                            "name":"阜阳",
                            "code":341200,
                            "initial":"F",
                            "pinyin":"fy,fuyang",
                            "areaCode":"0558",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":210900,
                            "version":0,
                            "name":"阜新",
                            "code":210900,
                            "initial":"F",
                            "pinyin":"fx,fuxin",
                            "areaCode":"0418",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":210400,
                            "version":1,
                            "name":"抚顺",
                            "code":210400,
                            "initial":"F",
                            "pinyin":"fs,fushun",
                            "areaCode":"0413",
                                
                            "provinceId":210000,
                             
                        }
                    ],
                    "G":[
                        {
                            "id":513300,
                            "version":0,
                            "name":"甘孜藏族自治州",
                            "code":513300,
                            "initial":"G",
                            "pinyin":"gzczzzz,ganzicangzuzizhizhou",
                            "areaCode":"0836",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":632600,
                            "version":0,
                            "name":"果洛藏族自治州",
                            "code":632600,
                            "initial":"G",
                            "pinyin":"glczzzz,guoluocangzuzizhizhou",
                            "areaCode":"0975",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":440100,
                            "version":26,
                            "name":"广州",
                            "code":440100,
                            "initial":"G",
                            "pinyin":"gz,guangzhou",
                            "areaCode":"020",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":710200,
                            "version":0,
                            "name":"高雄",
                            "code":710200,
                            "initial":"G",
                            "pinyin":"gx,gaoxiong",
                            "areaCode":"8867",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":510800,
                            "version":0,
                            "name":"广元",
                            "code":510800,
                            "initial":"G",
                            "pinyin":"gy,guangyuan",
                            "areaCode":"0839",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":511600,
                            "version":0,
                            "name":"广安",
                            "code":511600,
                            "initial":"G",
                            "pinyin":"ga,guangan",
                            "areaCode":"0826",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":640400,
                            "version":0,
                            "name":"固原",
                            "code":640400,
                            "initial":"G",
                            "pinyin":"gy,guyuan",
                            "areaCode":"0954",
                                
                            "provinceId":640000,
                             
                        },
                        {
                            "id":623000,
                            "version":0,
                            "name":"甘南藏族自治州",
                            "code":623000,
                            "initial":"G",
                            "pinyin":"gnczzzz,gannancangzuzizhizhou",
                            "areaCode":"0941",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":520100,
                            "version":322,
                            "name":"贵阳",
                            "code":520100,
                            "initial":"G",
                            "pinyin":"gy,guiyang",
                            "areaCode":"0851",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":450800,
                            "version":182,
                            "name":"贵港",
                            "code":450800,
                            "initial":"G",
                            "pinyin":"gg,guigang",
                            "areaCode":"0775",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":360700,
                            "version":68,
                            "name":"赣州",
                            "code":360700,
                            "initial":"G",
                            "pinyin":"gz,ganzhou",
                            "areaCode":"0797",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":450300,
                            "version":139,
                            "name":"桂林",
                            "code":450300,
                            "initial":"G",
                            "pinyin":"gl,guilin",
                            "areaCode":"0773",
                                
                            "provinceId":450000,
                             
                        }
                    ],
                    "H":[
                        {
                            "id":230400,
                            "version":0,
                            "name":"鹤岗",
                            "code":230400,
                            "initial":"H",
                            "pinyin":"hg,hegang",
                            "areaCode":"0468",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":441600,
                            "version":0,
                            "name":"河源",
                            "code":441600,
                            "initial":"H",
                            "pinyin":"hy,heyuan",
                            "areaCode":"0762",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":330500,
                            "version":5,
                            "name":"湖州",
                            "code":330500,
                            "initial":"H",
                            "pinyin":"hz,huzhou",
                            "areaCode":"0572",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":341000,
                            "version":33,
                            "name":"黄山",
                            "code":341000,
                            "initial":"H",
                            "pinyin":"hs,huangshan",
                            "areaCode":"0559",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":532500,
                            "version":118,
                            "name":"红河哈尼族彝族自治州",
                            "code":532500,
                            "initial":"H",
                            "pinyin":"hhhnzyzzzz,honghehanizuyizuzizhizhou",
                            "areaCode":"0873",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":131100,
                            "version":35,
                            "name":"衡水",
                            "code":131100,
                            "initial":"H",
                            "pinyin":"hs,hengshui",
                            "areaCode":"0318",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":451100,
                            "version":15,
                            "name":"贺州",
                            "code":451100,
                            "initial":"H",
                            "pinyin":"hz,hezhou",
                            "areaCode":"0774",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":320800,
                            "version":44,
                            "name":"淮安",
                            "code":320800,
                            "initial":"H",
                            "pinyin":"ha,huaian",
                            "areaCode":"0517",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":632100,
                            "version":0,
                            "name":"海东地区",
                            "code":632100,
                            "initial":"H",
                            "pinyin":"hddq,haidongdiqu",
                            "areaCode":"0972",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":430400,
                            "version":155,
                            "name":"衡阳",
                            "code":430400,
                            "initial":"H",
                            "pinyin":"hy,hengyang",
                            "areaCode":"0734",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":460100,
                            "version":361,
                            "name":"海口",
                            "code":460100,
                            "initial":"H",
                            "pinyin":"hk,haikou",
                            "areaCode":"0898",
                                
                            "provinceId":460000,
                             
                        },
                        {
                            "id":150100,
                            "version":7,
                            "name":"呼和浩特",
                            "code":150100,
                            "initial":"H",
                            "pinyin":"hhht,huhehaote",
                            "areaCode":"0471",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":431200,
                            "version":88,
                            "name":"怀化",
                            "code":431200,
                            "initial":"H",
                            "pinyin":"hh,huaihua",
                            "areaCode":"0745",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":130400,
                            "version":40,
                            "name":"邯郸",
                            "code":130400,
                            "initial":"H",
                            "pinyin":"hd,handan",
                            "areaCode":"0310",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":420200,
                            "version":0,
                            "name":"黄石",
                            "code":420200,
                            "initial":"H",
                            "pinyin":"hs,huangshi",
                            "areaCode":"0714",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":330100,
                            "version":380,
                            "name":"杭州",
                            "code":330100,
                            "initial":"H",
                            "pinyin":"hz,hangzhou",
                            "areaCode":"0571",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":340600,
                            "version":57,
                            "name":"淮北",
                            "code":340600,
                            "initial":"H",
                            "pinyin":"hb,huaibei",
                            "areaCode":"0561",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":451200,
                            "version":15,
                            "name":"河池",
                            "code":451200,
                            "initial":"H",
                            "pinyin":"hc,hechi",
                            "areaCode":"0778",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":340100,
                            "version":554,
                            "name":"合肥",
                            "code":340100,
                            "initial":"H",
                            "pinyin":"hf,hefei",
                            "areaCode":"0551",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":632200,
                            "version":0,
                            "name":"海北藏族自治州",
                            "code":632200,
                            "initial":"H",
                            "pinyin":"hbczzzz,haibeicangzuzizhizhou",
                            "areaCode":"0970",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":610700,
                            "version":36,
                            "name":"汉中",
                            "code":610700,
                            "initial":"H",
                            "pinyin":"hz,hanzhong",
                            "areaCode":"0916",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":653200,
                            "version":0,
                            "name":"和田地区",
                            "code":653200,
                            "initial":"H",
                            "pinyin":"htdq,hetiandiqu",
                            "areaCode":"0903",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":652200,
                            "version":0,
                            "name":"哈密地区",
                            "code":652200,
                            "initial":"H",
                            "pinyin":"hmdq,hamidiqu",
                            "areaCode":"0902",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":150700,
                            "version":0,
                            "name":"呼伦贝尔",
                            "code":150700,
                            "initial":"H",
                            "pinyin":"hlbe,hulunbeier",
                            "areaCode":"0470",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":340400,
                            "version":105,
                            "name":"淮南",
                            "code":340400,
                            "initial":"H",
                            "pinyin":"hn,huainan",
                            "areaCode":"0554",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":632500,
                            "version":0,
                            "name":"海南藏族自治州",
                            "code":632500,
                            "initial":"H",
                            "pinyin":"hnczzzz,hainancangzuzizhizhou",
                            "areaCode":"0974",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":231100,
                            "version":0,
                            "name":"黑河",
                            "code":231100,
                            "initial":"H",
                            "pinyin":"hh,heihe",
                            "areaCode":"0456",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":211400,
                            "version":0,
                            "name":"葫芦岛",
                            "code":211400,
                            "initial":"H",
                            "pinyin":"hld,huludao",
                            "areaCode":"0429",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":230100,
                            "version":11,
                            "name":"哈尔滨",
                            "code":230100,
                            "initial":"H",
                            "pinyin":"heb,haerbin",
                            "areaCode":"0451",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":441300,
                            "version":0,
                            "name":"惠州",
                            "code":441300,
                            "initial":"H",
                            "pinyin":"hz,huizhou",
                            "areaCode":"0752",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":632800,
                            "version":0,
                            "name":"海西蒙古族藏族自治州",
                            "code":632800,
                            "initial":"H",
                            "pinyin":"hxmgzczzzz,haiximengguzucangzuzizhizhou",
                            "areaCode":"0977",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":410600,
                            "version":228,
                            "name":"鹤壁",
                            "code":410600,
                            "initial":"H",
                            "pinyin":"hb,hebi",
                            "areaCode":"0392",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":421100,
                            "version":1,
                            "name":"黄冈",
                            "code":421100,
                            "initial":"H",
                            "pinyin":"hg,huanggang",
                            "areaCode":"0713",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":632300,
                            "version":0,
                            "name":"黄南藏族自治州",
                            "code":632300,
                            "initial":"H",
                            "pinyin":"hnczzzz,huangnancangzuzizhizhou",
                            "areaCode":"0973",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":371700,
                            "version":9,
                            "name":"菏泽",
                            "code":371700,
                            "initial":"H",
                            "pinyin":"hz,heze",
                            "areaCode":"0530",
                                
                            "provinceId":370000,
                             
                        }
                    ],
                    "J":[
                        {
                            "id":360200,
                            "version":46,
                            "name":"景德镇",
                            "code":360200,
                            "initial":"J",
                            "pinyin":"jdz,jingdezhen",
                            "areaCode":"0798",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":210700,
                            "version":0,
                            "name":"锦州",
                            "code":210700,
                            "initial":"J",
                            "pinyin":"jz,jinzhou",
                            "areaCode":"0416",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":620300,
                            "version":4,
                            "name":"金昌",
                            "code":620300,
                            "initial":"J",
                            "pinyin":"jc,jinchang",
                            "areaCode":"0935",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":445200,
                            "version":2,
                            "name":"揭阳",
                            "code":445200,
                            "initial":"J",
                            "pinyin":"jy,jieyang",
                            "areaCode":"0663",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":220200,
                            "version":0,
                            "name":"吉林",
                            "code":220200,
                            "initial":"J",
                            "pinyin":"jl,jilin",
                            "areaCode":"0432",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":710700,
                            "version":0,
                            "name":"基隆",
                            "code":710700,
                            "initial":"J",
                            "pinyin":"jl,jilong",
                            "areaCode":"8862",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":360800,
                            "version":69,
                            "name":"吉安",
                            "code":360800,
                            "initial":"J",
                            "pinyin":"ja,jian",
                            "areaCode":"0796",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":620900,
                            "version":1,
                            "name":"酒泉",
                            "code":620900,
                            "initial":"J",
                            "pinyin":"jq,jiuquan",
                            "areaCode":"0937",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":710500,
                            "version":0,
                            "name":"金门县",
                            "code":710500,
                            "initial":"J",
                            "pinyin":"jmx,jinmenxian",
                            "areaCode":"8868",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":370800,
                            "version":15,
                            "name":"济宁",
                            "code":370800,
                            "initial":"J",
                            "pinyin":"jn,jining",
                            "areaCode":"0537",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":440700,
                            "version":6,
                            "name":"江门",
                            "code":440700,
                            "initial":"J",
                            "pinyin":"jm,jiangmen",
                            "areaCode":"0750",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":421000,
                            "version":0,
                            "name":"荆州",
                            "code":421000,
                            "initial":"J",
                            "pinyin":"jz,jingzhou",
                            "areaCode":"0716",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":230800,
                            "version":0,
                            "name":"佳木斯",
                            "code":230800,
                            "initial":"J",
                            "pinyin":"jms,jiamusi",
                            "areaCode":"0454",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":140700,
                            "version":0,
                            "name":"晋中",
                            "code":140700,
                            "initial":"J",
                            "pinyin":"jz,jinzhong",
                            "areaCode":"0354",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":230300,
                            "version":0,
                            "name":"鸡西",
                            "code":230300,
                            "initial":"J",
                            "pinyin":"jx,jixi",
                            "areaCode":"0467",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":330400,
                            "version":3,
                            "name":"嘉兴",
                            "code":330400,
                            "initial":"J",
                            "pinyin":"jx,jiaxing",
                            "areaCode":"0573",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":620200,
                            "version":0,
                            "name":"嘉峪关",
                            "code":620200,
                            "initial":"J",
                            "pinyin":"jyg,jiayuguan",
                            "areaCode":"0937",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":410800,
                            "version":46,
                            "name":"焦作",
                            "code":410800,
                            "initial":"J",
                            "pinyin":"jz,jiaozuo",
                            "areaCode":"0391",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":370100,
                            "version":593,
                            "name":"济南",
                            "code":370100,
                            "initial":"J",
                            "pinyin":"jn,jinan",
                            "areaCode":"0531",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":419001,
                            "version":39,
                            "name":"济源",
                            "code":419001,
                            "initial":"J",
                            "pinyin":"jy,jiyuan",
                            "areaCode":"0391",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":420800,
                            "version":0,
                            "name":"荆门",
                            "code":420800,
                            "initial":"J",
                            "pinyin":"jm,jingmen",
                            "areaCode":"0724",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":330700,
                            "version":2,
                            "name":"金华",
                            "code":330700,
                            "initial":"J",
                            "pinyin":"jh,jinhua",
                            "areaCode":"0579",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":360400,
                            "version":87,
                            "name":"九江",
                            "code":360400,
                            "initial":"J",
                            "pinyin":"jj,jiujiang",
                            "areaCode":"0792",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":140500,
                            "version":0,
                            "name":"晋城",
                            "code":140500,
                            "initial":"J",
                            "pinyin":"jc,jincheng",
                            "areaCode":"0356",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":810200,
                            "version":0,
                            "name":"九龙",
                            "code":810200,
                            "initial":"J",
                            "pinyin":"jl,jiulong",
                            "areaCode":"0852",
                                
                            "provinceId":810000,
                             
                        },
                        {
                            "id":710900,
                            "version":0,
                            "name":"嘉义",
                            "code":710900,
                            "initial":"J",
                            "pinyin":"jy,jiayi",
                            "areaCode":"8865",
                                
                            "provinceId":710000,
                             
                        }
                    ],
                    "K":[
                        {
                            "id":653100,
                            "version":0,
                            "name":"喀什地区",
                            "code":653100,
                            "initial":"K",
                            "pinyin":"ksdq,kashidiqu",
                            "areaCode":"0998",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":410200,
                            "version":6,
                            "name":"开封",
                            "code":410200,
                            "initial":"K",
                            "pinyin":"kf,kaifeng",
                            "areaCode":"0378",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":530100,
                            "version":1214,
                            "name":"昆明",
                            "code":530100,
                            "initial":"K",
                            "pinyin":"km,kunming",
                            "areaCode":"0871",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":653000,
                            "version":0,
                            "name":"克孜勒苏柯尔克孜自治州",
                            "code":653000,
                            "initial":"K",
                            "pinyin":"kzlskekzzzz,kezilesukeerkezizizhizhou",
                            "areaCode":"0908",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":650200,
                            "version":0,
                            "name":"克拉玛依",
                            "code":650200,
                            "initial":"K",
                            "pinyin":"klmy,kelamayi",
                            "areaCode":"0990",
                                
                            "provinceId":650000,
                             
                        }
                    ],
                    "L":[
                        {
                            "id":371200,
                            "version":6,
                            "name":"莱芜",
                            "code":371200,
                            "initial":"L",
                            "pinyin":"lw,laiwu",
                            "areaCode":"0634",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":520200,
                            "version":0,
                            "name":"六盘水",
                            "code":520200,
                            "initial":"L",
                            "pinyin":"lps,liupanshui",
                            "areaCode":"0858",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":530700,
                            "version":12,
                            "name":"丽江",
                            "code":530700,
                            "initial":"L",
                            "pinyin":"lj,lijiang",
                            "areaCode":"0888",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":141100,
                            "version":1,
                            "name":"吕梁",
                            "code":141100,
                            "initial":"L",
                            "pinyin":"ll,lvliang",
                            "areaCode":"0358",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":371500,
                            "version":27,
                            "name":"聊城",
                            "code":371500,
                            "initial":"L",
                            "pinyin":"lc,liaocheng",
                            "areaCode":"0635",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":622900,
                            "version":0,
                            "name":"临夏回族自治州",
                            "code":622900,
                            "initial":"L",
                            "pinyin":"lxhzzzz,linxiahuizuzizhizhou",
                            "areaCode":"0930",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":211000,
                            "version":1,
                            "name":"辽阳",
                            "code":211000,
                            "initial":"L",
                            "pinyin":"ly,liaoyang",
                            "areaCode":"0419",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":620100,
                            "version":136,
                            "name":"兰州",
                            "code":620100,
                            "initial":"L",
                            "pinyin":"lz,lanzhou",
                            "areaCode":"0931",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":350800,
                            "version":0,
                            "name":"龙岩",
                            "code":350800,
                            "initial":"L",
                            "pinyin":"ly,longyan",
                            "areaCode":"0597",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":331100,
                            "version":0,
                            "name":"丽水",
                            "code":331100,
                            "initial":"L",
                            "pinyin":"ls,lishui",
                            "areaCode":"0578",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":371300,
                            "version":24,
                            "name":"临沂",
                            "code":371300,
                            "initial":"L",
                            "pinyin":"ly,linyi",
                            "areaCode":"0539",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":513400,
                            "version":0,
                            "name":"凉山彝族自治州",
                            "code":513400,
                            "initial":"L",
                            "pinyin":"lsyzzzz,liangshanyizuzizhizhou",
                            "areaCode":"0834",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":511100,
                            "version":6,
                            "name":"乐山",
                            "code":511100,
                            "initial":"L",
                            "pinyin":"ls,leshan",
                            "areaCode":"0833",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":542600,
                            "version":0,
                            "name":"林芝",
                            "code":542600,
                            "initial":"L",
                            "pinyin":"lz,linzhi",
                            "areaCode":"0894",
                                
                            "provinceId":540000,
                             
                        },
                        {
                            "id":621200,
                            "version":1,
                            "name":"陇南",
                            "code":621200,
                            "initial":"L",
                            "pinyin":"ln,longnan",
                            "areaCode":"0939",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":450200,
                            "version":376,
                            "name":"柳州",
                            "code":450200,
                            "initial":"L",
                            "pinyin":"lz,liuzhou",
                            "areaCode":"0772",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":131000,
                            "version":138,
                            "name":"廊坊",
                            "code":131000,
                            "initial":"L",
                            "pinyin":"lf,langfang",
                            "areaCode":"0316",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":410300,
                            "version":8,
                            "name":"洛阳",
                            "code":410300,
                            "initial":"L",
                            "pinyin":"ly,luoyang",
                            "areaCode":"0379",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":320700,
                            "version":0,
                            "name":"连云港",
                            "code":320700,
                            "initial":"L",
                            "pinyin":"lyg,lianyungang",
                            "areaCode":"0518",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":540100,
                            "version":0,
                            "name":"拉萨",
                            "code":540100,
                            "initial":"L",
                            "pinyin":"ls,lasa",
                            "areaCode":"0891",
                                
                            "provinceId":540000,
                             
                        },
                        {
                            "id":431300,
                            "version":44,
                            "name":"娄底",
                            "code":431300,
                            "initial":"L",
                            "pinyin":"ld,loudi",
                            "areaCode":"0738",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":141000,
                            "version":0,
                            "name":"临汾",
                            "code":141000,
                            "initial":"L",
                            "pinyin":"lf,linfen",
                            "areaCode":"0357",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":530900,
                            "version":24,
                            "name":"临沧",
                            "code":530900,
                            "initial":"L",
                            "pinyin":"lc,lincang",
                            "areaCode":"0883",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":451300,
                            "version":92,
                            "name":"来宾",
                            "code":451300,
                            "initial":"L",
                            "pinyin":"lb,laibin",
                            "areaCode":"0772",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":820200,
                            "version":0,
                            "name":"离岛",
                            "code":820200,
                            "initial":"L",
                            "pinyin":"ld,lidao",
                            "areaCode":"0852",
                                
                            "provinceId":820000,
                             
                        },
                        {
                            "id":220400,
                            "version":0,
                            "name":"辽源",
                            "code":220400,
                            "initial":"L",
                            "pinyin":"ly,liaoyuan",
                            "areaCode":"0437",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":341500,
                            "version":150,
                            "name":"六安",
                            "code":341500,
                            "initial":"L",
                            "pinyin":"la,liuan",
                            "areaCode":"0564",
                                
                            "provinceId":340000,
                             
                        }
                    ],
                    "M":[
                        {
                            "id":340500,
                            "version":67,
                            "name":"马鞍山",
                            "code":340500,
                            "initial":"M",
                            "pinyin":"mas,maanshan",
                            "areaCode":"0555",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":441400,
                            "version":0,
                            "name":"梅州",
                            "code":441400,
                            "initial":"M",
                            "pinyin":"mz,meizhou",
                            "areaCode":"0753",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":440900,
                            "version":0,
                            "name":"茂名",
                            "code":440900,
                            "initial":"M",
                            "pinyin":"mm,maoming",
                            "areaCode":"0668",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":231000,
                            "version":0,
                            "name":"牡丹江",
                            "code":231000,
                            "initial":"M",
                            "pinyin":"mdj,mudanjiang",
                            "areaCode":"0453",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":511400,
                            "version":0,
                            "name":"眉山",
                            "code":511400,
                            "initial":"M",
                            "pinyin":"ms,meishan",
                            "areaCode":"0833",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":510700,
                            "version":23,
                            "name":"绵阳",
                            "code":510700,
                            "initial":"M",
                            "pinyin":"my,mianyang",
                            "areaCode":"0816",
                                
                            "provinceId":510000,
                             
                        }
                    ],
                    "N":[
                        {
                            "id":511000,
                            "version":3,
                            "name":"内江",
                            "code":511000,
                            "initial":"N",
                            "pinyin":"nj,neijiang",
                            "areaCode":"0832",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":533300,
                            "version":0,
                            "name":"怒江傈僳族自治州",
                            "code":533300,
                            "initial":"N",
                            "pinyin":"njlszzzz,nujianglisuzuzizhizhou",
                            "areaCode":"0886",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":450100,
                            "version":685,
                            "name":"南宁",
                            "code":450100,
                            "initial":"N",
                            "pinyin":"nn,nanning",
                            "areaCode":"0771",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":511300,
                            "version":16,
                            "name":"南充",
                            "code":511300,
                            "initial":"N",
                            "pinyin":"nc,nanchong",
                            "areaCode":"0817",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":320600,
                            "version":2,
                            "name":"南通",
                            "code":320600,
                            "initial":"N",
                            "pinyin":"nt,nantong",
                            "areaCode":"0513",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":320100,
                            "version":536,
                            "name":"南京",
                            "code":320100,
                            "initial":"N",
                            "pinyin":"nj,nanjing",
                            "areaCode":"025",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":411300,
                            "version":12,
                            "name":"南阳",
                            "code":411300,
                            "initial":"N",
                            "pinyin":"ny,nanyang",
                            "areaCode":"0377",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":360100,
                            "version":477,
                            "name":"南昌",
                            "code":360100,
                            "initial":"N",
                            "pinyin":"nc,nanchang",
                            "areaCode":"0791",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":350900,
                            "version":8,
                            "name":"宁德",
                            "code":350900,
                            "initial":"N",
                            "pinyin":"nd,ningde",
                            "areaCode":"0593",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":542400,
                            "version":0,
                            "name":"那曲",
                            "code":542400,
                            "initial":"N",
                            "pinyin":"nq,naqu",
                            "areaCode":"0896",
                                
                            "provinceId":540000,
                             
                        },
                        {
                            "id":710600,
                            "version":0,
                            "name":"南投县",
                            "code":710600,
                            "initial":"N",
                            "pinyin":"ntx,nantouxian",
                            "areaCode":"8864",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":330200,
                            "version":183,
                            "name":"宁波",
                            "code":330200,
                            "initial":"N",
                            "pinyin":"nb,ningbo",
                            "areaCode":"0574",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":350700,
                            "version":57,
                            "name":"南平",
                            "code":350700,
                            "initial":"N",
                            "pinyin":"np,nanping",
                            "areaCode":"0599",
                                
                            "provinceId":350000,
                             
                        }
                    ],
                    "P":[
                        {
                            "id":620800,
                            "version":1,
                            "name":"平凉",
                            "code":620800,
                            "initial":"P",
                            "pinyin":"pl,pingliang",
                            "areaCode":"0933",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":410400,
                            "version":10,
                            "name":"平顶山",
                            "code":410400,
                            "initial":"P",
                            "pinyin":"pds,pingdingshan",
                            "areaCode":"0375",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":350300,
                            "version":0,
                            "name":"莆田",
                            "code":350300,
                            "initial":"P",
                            "pinyin":"pt,putian",
                            "areaCode":"0594",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":360300,
                            "version":83,
                            "name":"萍乡",
                            "code":360300,
                            "initial":"P",
                            "pinyin":"px,pingxiang",
                            "areaCode":"0799",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":530800,
                            "version":63,
                            "name":"普洱",
                            "code":530800,
                            "initial":"P",
                            "pinyin":"pe,puer",
                            "areaCode":"0879",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":211100,
                            "version":0,
                            "name":"盘锦",
                            "code":211100,
                            "initial":"P",
                            "pinyin":"pj,panjin",
                            "areaCode":"0427",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":510400,
                            "version":0,
                            "name":"攀枝花",
                            "code":510400,
                            "initial":"P",
                            "pinyin":"pzh,panzhihua",
                            "areaCode":"0812",
                                
                            "provinceId":510000,
                             
                        }
                    ],
                    "Q":[
                        {
                            "id":370200,
                            "version":105,
                            "name":"青岛",
                            "code":370200,
                            "initial":"Q",
                            "pinyin":"qd,qingdao",
                            "areaCode":"0532",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":350500,
                            "version":34,
                            "name":"泉州",
                            "code":350500,
                            "initial":"Q",
                            "pinyin":"qz,quanzhou",
                            "areaCode":"0595",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":230200,
                            "version":0,
                            "name":"齐齐哈尔",
                            "code":230200,
                            "initial":"Q",
                            "pinyin":"qqhe,qiqihaer",
                            "areaCode":"0452",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":522300,
                            "version":13,
                            "name":"黔西南布依族苗族自治州",
                            "code":522300,
                            "initial":"Q",
                            "pinyin":"qxnbyzmzzzz,qianxinanbuyizumiaozuzizhizhou",
                            "areaCode":"0859",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":522600,
                            "version":6,
                            "name":"黔东南苗族侗族自治州",
                            "code":522600,
                            "initial":"Q",
                            "pinyin":"qdnmzdzzzz,qiandongnanmiaozudongzuzizhizhou",
                            "areaCode":"0855",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":530300,
                            "version":24,
                            "name":"曲靖",
                            "code":530300,
                            "initial":"Q",
                            "pinyin":"qj,qujing",
                            "areaCode":"0874",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":450700,
                            "version":58,
                            "name":"钦州",
                            "code":450700,
                            "initial":"Q",
                            "pinyin":"qz,qinzhou",
                            "areaCode":"0777",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":621000,
                            "version":2,
                            "name":"庆阳",
                            "code":621000,
                            "initial":"Q",
                            "pinyin":"qy,qingyang",
                            "areaCode":"0934",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":441800,
                            "version":3,
                            "name":"清远",
                            "code":441800,
                            "initial":"Q",
                            "pinyin":"qy,qingyuan",
                            "areaCode":"0763",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":522700,
                            "version":21,
                            "name":"黔南布依族苗族自治州",
                            "code":522700,
                            "initial":"Q",
                            "pinyin":"qnbyzmzzzz,qiannanbuyizumiaozuzizhizhou",
                            "areaCode":"0854",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":230900,
                            "version":0,
                            "name":"七台河",
                            "code":230900,
                            "initial":"Q",
                            "pinyin":"qth,qitaihe",
                            "areaCode":"0464",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":130300,
                            "version":14,
                            "name":"秦皇岛",
                            "code":130300,
                            "initial":"Q",
                            "pinyin":"qhd,qinhuangdao",
                            "areaCode":"0335",
                                
                            "provinceId":130000,
                             
                        }
                    ],
                    "R":[
                        {
                            "id":542300,
                            "version":0,
                            "name":"日喀则",
                            "code":542300,
                            "initial":"R",
                            "pinyin":"rkz,rikaze",
                            "areaCode":"0892",
                                
                            "provinceId":540000,
                             
                        },
                        {
                            "id":371100,
                            "version":16,
                            "name":"日照",
                            "code":371100,
                            "initial":"R",
                            "pinyin":"rz,rizhao",
                            "areaCode":"0633",
                                
                            "provinceId":370000,
                             
                        }
                    ],
                    "S":[
                        {
                            "id":411400,
                            "version":40,
                            "name":"商丘",
                            "code":411400,
                            "initial":"S",
                            "pinyin":"sq,shangqiu",
                            "areaCode":"0370",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":321300,
                            "version":0,
                            "name":"宿迁",
                            "code":321300,
                            "initial":"S",
                            "pinyin":"sq,suqian",
                            "areaCode":"0527",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":220700,
                            "version":0,
                            "name":"松原",
                            "code":220700,
                            "initial":"S",
                            "pinyin":"sy,songyuan",
                            "areaCode":"0438",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":231200,
                            "version":0,
                            "name":"绥化",
                            "code":231200,
                            "initial":"S",
                            "pinyin":"sh,suihua",
                            "areaCode":"0455",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":341300,
                            "version":91,
                            "name":"宿州",
                            "code":341300,
                            "initial":"S",
                            "pinyin":"sz,suzhou",
                            "areaCode":"0557",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":130100,
                            "version":190,
                            "name":"石家庄",
                            "code":130100,
                            "initial":"S",
                            "pinyin":"sjz,shijiazhuang",
                            "areaCode":"0311",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":140600,
                            "version":0,
                            "name":"朔州",
                            "code":140600,
                            "initial":"S",
                            "pinyin":"sz,shuozhou",
                            "areaCode":"0349",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":411200,
                            "version":4,
                            "name":"三门峡",
                            "code":411200,
                            "initial":"S",
                            "pinyin":"smx,sanmenxia",
                            "areaCode":"0398",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":310100,
                            "version":1790,
                            "name":"上海",
                            "code":310100,
                            "initial":"S",
                            "pinyin":"sh,shanghai",
                            "areaCode":"021",
                                
                            "provinceId":310000,
                             
                        },
                        {
                            "id":230500,
                            "version":0,
                            "name":"双鸭山",
                            "code":230500,
                            "initial":"S",
                            "pinyin":"sys,shuangyashan",
                            "areaCode":"0469",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":330600,
                            "version":16,
                            "name":"绍兴",
                            "code":330600,
                            "initial":"S",
                            "pinyin":"sx,shaoxing",
                            "areaCode":"0575",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":440200,
                            "version":5,
                            "name":"韶关",
                            "code":440200,
                            "initial":"S",
                            "pinyin":"sg,shaoguan",
                            "areaCode":"0751",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":220300,
                            "version":0,
                            "name":"四平",
                            "code":220300,
                            "initial":"S",
                            "pinyin":"sp,siping",
                            "areaCode":"0434",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":361100,
                            "version":175,
                            "name":"上饶",
                            "code":361100,
                            "initial":"S",
                            "pinyin":"sr,shangrao",
                            "areaCode":"0793",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":441500,
                            "version":0,
                            "name":"汕尾",
                            "code":441500,
                            "initial":"S",
                            "pinyin":"sw,shanwei",
                            "areaCode":"0660",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":430500,
                            "version":70,
                            "name":"邵阳",
                            "code":430500,
                            "initial":"S",
                            "pinyin":"sy,shaoyang",
                            "areaCode":"0739",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":460200,
                            "version":0,
                            "name":"三亚",
                            "code":460200,
                            "initial":"S",
                            "pinyin":"sy,sanya",
                            "areaCode":"0898",
                                
                            "provinceId":460000,
                             
                        },
                        {
                            "id":210100,
                            "version":612,
                            "name":"沈阳",
                            "code":210100,
                            "initial":"S",
                            "pinyin":"sy,shenyang",
                            "areaCode":"024",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":421300,
                            "version":0,
                            "name":"随州",
                            "code":421300,
                            "initial":"S",
                            "pinyin":"sz,suizhou",
                            "areaCode":"0722",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":440500,
                            "version":1,
                            "name":"汕头",
                            "code":440500,
                            "initial":"S",
                            "pinyin":"st,shantou",
                            "areaCode":"0754",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":510900,
                            "version":2,
                            "name":"遂宁",
                            "code":510900,
                            "initial":"S",
                            "pinyin":"sn,suining",
                            "areaCode":"0825",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":611000,
                            "version":10,
                            "name":"商洛",
                            "code":611000,
                            "initial":"S",
                            "pinyin":"sl,shangluo",
                            "areaCode":"0914",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":350400,
                            "version":1,
                            "name":"三明",
                            "code":350400,
                            "initial":"S",
                            "pinyin":"sm,sanming",
                            "areaCode":"0598",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":640200,
                            "version":0,
                            "name":"石嘴山",
                            "code":640200,
                            "initial":"S",
                            "pinyin":"szs,shizuishan",
                            "areaCode":"0952",
                                
                            "provinceId":640000,
                             
                        },
                        {
                            "id":420300,
                            "version":0,
                            "name":"十堰",
                            "code":420300,
                            "initial":"S",
                            "pinyin":"sy,shiyan",
                            "areaCode":"0719",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":440300,
                            "version":8,
                            "name":"深圳",
                            "code":440300,
                            "initial":"S",
                            "pinyin":"sz,shenzuo",
                            "areaCode":"0755",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":320500,
                            "version":2,
                            "name":"苏州",
                            "code":320500,
                            "initial":"S",
                            "pinyin":"sz,suzhou",
                            "areaCode":"0512",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":542200,
                            "version":0,
                            "name":"山南",
                            "code":542200,
                            "initial":"S",
                            "pinyin":"sn,shannan",
                            "areaCode":"0893",
                                
                            "provinceId":540000,
                             
                        }
                    ],
                    "T":[
                        {
                            "id":211200,
                            "version":0,
                            "name":"铁岭",
                            "code":211200,
                            "initial":"T",
                            "pinyin":"tl,tieling",
                            "areaCode":"0410",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":710400,
                            "version":0,
                            "name":"台中",
                            "code":710400,
                            "initial":"T",
                            "pinyin":"tz,taizhong",
                            "areaCode":"8864",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":120100,
                            "version":810,
                            "name":"天津",
                            "code":120100,
                            "initial":"T",
                            "pinyin":"tj,tianjin",
                            "areaCode":"022",
                                
                            "provinceId":120000,
                             
                        },
                        {
                            "id":140100,
                            "version":216,
                            "name":"太原",
                            "code":140100,
                            "initial":"T",
                            "pinyin":"ty,taiyuan",
                            "areaCode":"0351",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":652100,
                            "version":0,
                            "name":"吐鲁番地区",
                            "code":652100,
                            "initial":"T",
                            "pinyin":"tlfdq,tulufandiqu",
                            "areaCode":"0995",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":220500,
                            "version":0,
                            "name":"通化",
                            "code":220500,
                            "initial":"T",
                            "pinyin":"th,tonghua",
                            "areaCode":"0435",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":654200,
                            "version":0,
                            "name":"塔城地区",
                            "code":654200,
                            "initial":"T",
                            "pinyin":"tcdq,tachengdiqu",
                            "areaCode":"0901",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":610200,
                            "version":4,
                            "name":"铜川",
                            "code":610200,
                            "initial":"T",
                            "pinyin":"tc,tongchuan",
                            "areaCode":"0919",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":520600,
                            "version":1,
                            "name":"铜仁",
                            "code":520600,
                            "initial":"T",
                            "pinyin":"tr,tongren",
                            "areaCode":"0856",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":130200,
                            "version":340,
                            "name":"唐山",
                            "code":130200,
                            "initial":"T",
                            "pinyin":"ts,tangshan",
                            "areaCode":"0315",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":710300,
                            "version":0,
                            "name":"台南",
                            "code":710300,
                            "initial":"T",
                            "pinyin":"tn,tainan",
                            "areaCode":"8866",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":321200,
                            "version":10,
                            "name":"泰州",
                            "code":321200,
                            "initial":"T",
                            "pinyin":"tz,taizhou",
                            "areaCode":"0523",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":620500,
                            "version":0,
                            "name":"天水",
                            "code":620500,
                            "initial":"T",
                            "pinyin":"ts,tianshui",
                            "areaCode":"0938",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":370900,
                            "version":14,
                            "name":"泰安",
                            "code":370900,
                            "initial":"T",
                            "pinyin":"ta,taian",
                            "areaCode":"0538",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":710100,
                            "version":0,
                            "name":"台北",
                            "code":710100,
                            "initial":"T",
                            "pinyin":"tb,taibei",
                            "areaCode":"8862",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":340700,
                            "version":37,
                            "name":"铜陵",
                            "code":340700,
                            "initial":"T",
                            "pinyin":"tl,tongling",
                            "areaCode":"0562",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":150500,
                            "version":0,
                            "name":"通辽",
                            "code":150500,
                            "initial":"T",
                            "pinyin":"tl,tongliao",
                            "areaCode":"0475",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":331000,
                            "version":1,
                            "name":"台州",
                            "code":331000,
                            "initial":"T",
                            "pinyin":"tz,taizhou",
                            "areaCode":"0576",
                                
                            "provinceId":330000,
                             
                        }
                    ],
                    "W":[
                        {
                            "id":420100,
                            "version":182,
                            "name":"武汉",
                            "code":420100,
                            "initial":"W",
                            "pinyin":"wh,wuhan",
                            "areaCode":"027",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":370700,
                            "version":725,
                            "name":"潍坊",
                            "code":370700,
                            "initial":"W",
                            "pinyin":"wf,weifang",
                            "areaCode":"0536",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":150300,
                            "version":0,
                            "name":"乌海",
                            "code":150300,
                            "initial":"W",
                            "pinyin":"wh,wuhai",
                            "areaCode":"0473",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":640300,
                            "version":0,
                            "name":"吴忠",
                            "code":640300,
                            "initial":"W",
                            "pinyin":"wz,wuzhong",
                            "areaCode":"0953",
                                
                            "provinceId":640000,
                             
                        },
                        {
                            "id":620600,
                            "version":2,
                            "name":"武威",
                            "code":620600,
                            "initial":"W",
                            "pinyin":"ww,wuwei",
                            "areaCode":"0935",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":371000,
                            "version":26,
                            "name":"威海",
                            "code":371000,
                            "initial":"W",
                            "pinyin":"wh,weihai",
                            "areaCode":"0631",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":330300,
                            "version":19,
                            "name":"温州",
                            "code":330300,
                            "initial":"W",
                            "pinyin":"wz,wenzhou",
                            "areaCode":"0577",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":450400,
                            "version":123,
                            "name":"梧州",
                            "code":450400,
                            "initial":"W",
                            "pinyin":"wz,wuzhou",
                            "areaCode":"0774",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":150900,
                            "version":0,
                            "name":"乌兰察布",
                            "code":150900,
                            "initial":"W",
                            "pinyin":"wlcb,wulanchabu",
                            "areaCode":"0474",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":650100,
                            "version":0,
                            "name":"乌鲁木齐",
                            "code":650100,
                            "initial":"W",
                            "pinyin":"wlmq,wulumuqi",
                            "areaCode":"0991",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":532600,
                            "version":0,
                            "name":"文山壮族苗族自治州",
                            "code":532600,
                            "initial":"W",
                            "pinyin":"wszzmzzzz,wenshanzhuangzumiaozuzizhizhou",
                            "areaCode":"0876",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":610500,
                            "version":37,
                            "name":"渭南",
                            "code":610500,
                            "initial":"W",
                            "pinyin":"wn,weinan",
                            "areaCode":"0913",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":320200,
                            "version":96,
                            "name":"无锡",
                            "code":320200,
                            "initial":"W",
                            "pinyin":"wx,wuxi",
                            "areaCode":"0510",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":340200,
                            "version":79,
                            "name":"芜湖",
                            "code":340200,
                            "initial":"W",
                            "pinyin":"wh,wuhu",
                            "areaCode":"0553",
                                
                            "provinceId":340000,
                             
                        }
                    ],
                    "X":[
                        {
                            "id":420900,
                            "version":0,
                            "name":"孝感",
                            "code":420900,
                            "initial":"X",
                            "pinyin":"xg,xiaogan",
                            "areaCode":"0712",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":341800,
                            "version":27,
                            "name":"宣城",
                            "code":341800,
                            "initial":"X",
                            "pinyin":"xc,xuancheng",
                            "areaCode":"0563",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":320300,
                            "version":1,
                            "name":"徐州",
                            "code":320300,
                            "initial":"X",
                            "pinyin":"xz,xuzhou",
                            "areaCode":"0516",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":610100,
                            "version":873,
                            "name":"西安",
                            "code":610100,
                            "initial":"X",
                            "pinyin":"xa,xian",
                            "areaCode":"029",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":360500,
                            "version":72,
                            "name":"新余",
                            "code":360500,
                            "initial":"X",
                            "pinyin":"xy,xinyu",
                            "areaCode":"0790",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":810300,
                            "version":0,
                            "name":"新界",
                            "code":810300,
                            "initial":"X",
                            "pinyin":"xj,xinjie",
                            "areaCode":"0852",
                                
                            "provinceId":810000,
                             
                        },
                        {
                            "id":532800,
                            "version":0,
                            "name":"西双版纳傣族自治州",
                            "code":532800,
                            "initial":"X",
                            "pinyin":"xsbndzzzz,xishuangbannadaizuzizhizhou",
                            "areaCode":"0691",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":410700,
                            "version":2,
                            "name":"新乡",
                            "code":410700,
                            "initial":"X",
                            "pinyin":"xx,xinxiang",
                            "areaCode":"0373",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":421200,
                            "version":1,
                            "name":"咸宁",
                            "code":421200,
                            "initial":"X",
                            "pinyin":"xn,xianning",
                            "areaCode":"0715",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":630100,
                            "version":2,
                            "name":"西宁",
                            "code":630100,
                            "initial":"X",
                            "pinyin":"xn,xining",
                            "areaCode":"0971",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":610400,
                            "version":54,
                            "name":"咸阳",
                            "code":610400,
                            "initial":"X",
                            "pinyin":"xy,xianyang",
                            "areaCode":"029",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":140900,
                            "version":3,
                            "name":"忻州",
                            "code":140900,
                            "initial":"X",
                            "pinyin":"xz,xinzhou",
                            "areaCode":"0350",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":411500,
                            "version":12,
                            "name":"信阳",
                            "code":411500,
                            "initial":"X",
                            "pinyin":"xy,xinyang",
                            "areaCode":"0376",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":810100,
                            "version":0,
                            "name":"香港岛",
                            "code":810100,
                            "initial":"X",
                            "pinyin":"xgd,xianggangdao",
                            "areaCode":"0852",
                                
                            "provinceId":810000,
                             
                        },
                        {
                            "id":411000,
                            "version":22,
                            "name":"许昌",
                            "code":411000,
                            "initial":"X",
                            "pinyin":"xc,xuchang",
                            "areaCode":"0374",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":152200,
                            "version":1,
                            "name":"兴安盟",
                            "code":152200,
                            "initial":"X",
                            "pinyin":"xam,xinganmeng",
                            "areaCode":"0482",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":710800,
                            "version":0,
                            "name":"新竹",
                            "code":710800,
                            "initial":"X",
                            "pinyin":"xz,xinzhu",
                            "areaCode":"8863",
                                
                            "provinceId":710000,
                             
                        },
                        {
                            "id":152500,
                            "version":0,
                            "name":"锡林郭勒盟",
                            "code":152500,
                            "initial":"X",
                            "pinyin":"xlglm,xilinguolemeng",
                            "areaCode":"0479",
                                
                            "provinceId":150000,
                             
                        },
                        {
                            "id":130500,
                            "version":14,
                            "name":"邢台",
                            "code":130500,
                            "initial":"X",
                            "pinyin":"xt,xingtai",
                            "areaCode":"0319",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":433100,
                            "version":0,
                            "name":"湘西土家族苗族自治州",
                            "code":433100,
                            "initial":"X",
                            "pinyin":"xxtjzmzzzz,xiangxitujiazumiaozuzizhizhou",
                            "areaCode":"0743",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":430300,
                            "version":18,
                            "name":"湘潭",
                            "code":430300,
                            "initial":"X",
                            "pinyin":"xt,xiangtan",
                            "areaCode":"0731",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":350200,
                            "version":85,
                            "name":"厦门",
                            "code":350200,
                            "initial":"X",
                            "pinyin":"xm,xiamen",
                            "areaCode":"0592",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":420600,
                            "version":0,
                            "name":"襄阳",
                            "code":420600,
                            "initial":"X",
                            "pinyin":"xy,xiangyang",
                            "areaCode":"0710",
                                
                            "provinceId":420000,
                             
                        }
                    ],
                    "Y":[
                        {
                            "id":140800,
                            "version":1,
                            "name":"运城",
                            "code":140800,
                            "initial":"Y",
                            "pinyin":"yc,yuncheng",
                            "areaCode":"0359",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":430600,
                            "version":33,
                            "name":"岳阳",
                            "code":430600,
                            "initial":"Y",
                            "pinyin":"yy,yueyang",
                            "areaCode":"0730",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":140300,
                            "version":0,
                            "name":"阳泉",
                            "code":140300,
                            "initial":"Y",
                            "pinyin":"yq,yangquan",
                            "areaCode":"0353",
                                
                            "provinceId":140000,
                             
                        },
                        {
                            "id":511500,
                            "version":25,
                            "name":"宜宾",
                            "code":511500,
                            "initial":"Y",
                            "pinyin":"yb,yibin",
                            "areaCode":"0831",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":610600,
                            "version":6,
                            "name":"延安",
                            "code":610600,
                            "initial":"Y",
                            "pinyin":"ya,yanan",
                            "areaCode":"0911",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":230700,
                            "version":0,
                            "name":"伊春",
                            "code":230700,
                            "initial":"Y",
                            "pinyin":"yc,yichun",
                            "areaCode":"0458",
                                
                            "provinceId":230000,
                             
                        },
                        {
                            "id":430900,
                            "version":98,
                            "name":"益阳",
                            "code":430900,
                            "initial":"Y",
                            "pinyin":"yy,yiyang",
                            "areaCode":"0737",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":511800,
                            "version":0,
                            "name":"雅安",
                            "code":511800,
                            "initial":"Y",
                            "pinyin":"ya,yaan",
                            "areaCode":"0835",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":450900,
                            "version":149,
                            "name":"玉林",
                            "code":450900,
                            "initial":"Y",
                            "pinyin":"yl,yulin",
                            "areaCode":"0775",
                                
                            "provinceId":450000,
                             
                        },
                        {
                            "id":441700,
                            "version":0,
                            "name":"阳江",
                            "code":441700,
                            "initial":"Y",
                            "pinyin":"yj,yangjiang",
                            "areaCode":"0662",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":640100,
                            "version":0,
                            "name":"银川",
                            "code":640100,
                            "initial":"Y",
                            "pinyin":"yc,yinchuan",
                            "areaCode":"0951",
                                
                            "provinceId":640000,
                             
                        },
                        {
                            "id":210800,
                            "version":0,
                            "name":"营口",
                            "code":210800,
                            "initial":"Y",
                            "pinyin":"yk,yingkou",
                            "areaCode":"0417",
                                
                            "provinceId":210000,
                             
                        },
                        {
                            "id":445300,
                            "version":0,
                            "name":"云浮",
                            "code":445300,
                            "initial":"Y",
                            "pinyin":"yf,yunfu",
                            "areaCode":"0766",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":632700,
                            "version":0,
                            "name":"玉树藏族自治州",
                            "code":632700,
                            "initial":"Y",
                            "pinyin":"ysczzzz,yushucangzuzizhizhou",
                            "areaCode":"0976",
                                
                            "provinceId":630000,
                             
                        },
                        {
                            "id":320900,
                            "version":0,
                            "name":"盐城",
                            "code":320900,
                            "initial":"Y",
                            "pinyin":"yc,yancheng",
                            "areaCode":"0515",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":420500,
                            "version":1,
                            "name":"宜昌",
                            "code":420500,
                            "initial":"Y",
                            "pinyin":"yc,yichang",
                            "areaCode":"0717",
                                
                            "provinceId":420000,
                             
                        },
                        {
                            "id":360600,
                            "version":60,
                            "name":"鹰潭",
                            "code":360600,
                            "initial":"Y",
                            "pinyin":"yt,yingtan",
                            "areaCode":"0701",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":370600,
                            "version":26,
                            "name":"烟台",
                            "code":370600,
                            "initial":"Y",
                            "pinyin":"yt,yantai",
                            "areaCode":"0535",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":654000,
                            "version":0,
                            "name":"伊犁哈萨克自治州",
                            "code":654000,
                            "initial":"Y",
                            "pinyin":"ylhskzzz,yilihasakezizhizhou",
                            "areaCode":"0999",
                                
                            "provinceId":650000,
                             
                        },
                        {
                            "id":222400,
                            "version":0,
                            "name":"延边朝鲜族自治州",
                            "code":222400,
                            "initial":"Y",
                            "pinyin":"ybcxzzzz,yanbianchaoxianzuzizhizhou",
                            "areaCode":"0433",
                                
                            "provinceId":220000,
                             
                        },
                        {
                            "id":360900,
                            "version":200,
                            "name":"宜春",
                            "code":360900,
                            "initial":"Y",
                            "pinyin":"yc,yichun",
                            "areaCode":"0795",
                                
                            "provinceId":360000,
                             
                        },
                        {
                            "id":530400,
                            "version":2,
                            "name":"玉溪",
                            "code":530400,
                            "initial":"Y",
                            "pinyin":"yx,yuxi",
                            "areaCode":"0877",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":321000,
                            "version":0,
                            "name":"扬州",
                            "code":321000,
                            "initial":"Y",
                            "pinyin":"yz,yangzhou",
                            "areaCode":"0514",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":610800,
                            "version":30,
                            "name":"榆林",
                            "code":610800,
                            "initial":"Y",
                            "pinyin":"yl,yulin",
                            "areaCode":"0912",
                                
                            "provinceId":610000,
                             
                        },
                        {
                            "id":431100,
                            "version":44,
                            "name":"永州",
                            "code":431100,
                            "initial":"Y",
                            "pinyin":"yz,yongzhou",
                            "areaCode":"0746",
                                
                            "provinceId":430000,
                             
                        }
                    ],
                    "Z":[
                        {
                            "id":512000,
                            "version":15,
                            "name":"资阳",
                            "code":512000,
                            "initial":"Z",
                            "pinyin":"zy,ziyang",
                            "areaCode":"0832",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":410900,
                            "version":6,
                            "name":"濮阳",
                            "code":410900,
                            "initial":"Z",
                            "pinyin":"zy,zuoyang",
                            "areaCode":"0393",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":510500,
                            "version":18,
                            "name":"泸州",
                            "code":510500,
                            "initial":"Z",
                            "pinyin":"zz,zuozhou",
                            "areaCode":"0830",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":330800,
                            "version":1,
                            "name":"衢州",
                            "code":330800,
                            "initial":"Z",
                            "pinyin":"zz,zuozhou",
                            "areaCode":"0570",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":411700,
                            "version":1,
                            "name":"驻马店",
                            "code":411700,
                            "initial":"Z",
                            "pinyin":"zmd,zhumadian",
                            "areaCode":"0396",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":321100,
                            "version":1,
                            "name":"镇江",
                            "code":321100,
                            "initial":"Z",
                            "pinyin":"zj,zhenjiang",
                            "areaCode":"0511",
                                
                            "provinceId":320000,
                             
                        },
                        {
                            "id":440400,
                            "version":9,
                            "name":"珠海",
                            "code":440400,
                            "initial":"Z",
                            "pinyin":"zh,zhuhai",
                            "areaCode":"0756",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":510300,
                            "version":0,
                            "name":"自贡",
                            "code":510300,
                            "initial":"Z",
                            "pinyin":"zg,zigong",
                            "areaCode":"0813",
                                
                            "provinceId":510000,
                             
                        },
                        {
                            "id":341600,
                            "version":22,
                            "name":"亳州",
                            "code":341600,
                            "initial":"Z",
                            "pinyin":"zz,zuozhou",
                            "areaCode":"0558",
                                
                            "provinceId":340000,
                             
                        },
                        {
                            "id":520300,
                            "version":5,
                            "name":"遵义",
                            "code":520300,
                            "initial":"Z",
                            "pinyin":"zy,zunyi",
                            "areaCode":"0852",
                                
                            "provinceId":520000,
                             
                        },
                        {
                            "id":441200,
                            "version":1,
                            "name":"肇庆",
                            "code":441200,
                            "initial":"Z",
                            "pinyin":"zq,zhaoqing",
                            "areaCode":"0758",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":430200,
                            "version":209,
                            "name":"株洲",
                            "code":430200,
                            "initial":"Z",
                            "pinyin":"zz,zhuzhou",
                            "areaCode":"0731",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":370300,
                            "version":8,
                            "name":"淄博",
                            "code":370300,
                            "initial":"Z",
                            "pinyin":"zb,zibo",
                            "areaCode":"0533",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":350600,
                            "version":17,
                            "name":"漳州",
                            "code":350600,
                            "initial":"Z",
                            "pinyin":"zz,zhangzhou",
                            "areaCode":"0596",
                                
                            "provinceId":350000,
                             
                        },
                        {
                            "id":130700,
                            "version":24,
                            "name":"张家口",
                            "code":130700,
                            "initial":"Z",
                            "pinyin":"zjk,zhangjiakou",
                            "areaCode":"0313",
                                
                            "provinceId":130000,
                             
                        },
                        {
                            "id":442000,
                            "version":1,
                            "name":"中山",
                            "code":442000,
                            "initial":"Z",
                            "pinyin":"zs,zhongshan",
                            "areaCode":"0760",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":330900,
                            "version":0,
                            "name":"舟山",
                            "code":330900,
                            "initial":"Z",
                            "pinyin":"zs,zhoushan",
                            "areaCode":"0580",
                                
                            "provinceId":330000,
                             
                        },
                        {
                            "id":620700,
                            "version":28,
                            "name":"张掖",
                            "code":620700,
                            "initial":"Z",
                            "pinyin":"zy,zhangye",
                            "areaCode":"0936",
                                
                            "provinceId":620000,
                             
                        },
                        {
                            "id":530600,
                            "version":5,
                            "name":"昭通",
                            "code":530600,
                            "initial":"Z",
                            "pinyin":"zt,zhaotong",
                            "areaCode":"0870",
                                
                            "provinceId":530000,
                             
                        },
                        {
                            "id":411600,
                            "version":1,
                            "name":"周口",
                            "code":411600,
                            "initial":"Z",
                            "pinyin":"zk,zhoukou",
                            "areaCode":"0394",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":430800,
                            "version":23,
                            "name":"张家界",
                            "code":430800,
                            "initial":"Z",
                            "pinyin":"zjj,zhangjiajie",
                            "areaCode":"0744",
                                
                            "provinceId":430000,
                             
                        },
                        {
                            "id":411100,
                            "version":47,
                            "name":"漯河",
                            "code":411100,
                            "initial":"Z",
                            "pinyin":"zh,zuohe",
                            "areaCode":"0395",
                                
                            "provinceId":410000,
                             
                        },
                        {
                            "id":370400,
                            "version":5,
                            "name":"枣庄",
                            "code":370400,
                            "initial":"Z",
                            "pinyin":"zz,zaozhuang",
                            "areaCode":"0632",
                                
                            "provinceId":370000,
                             
                        },
                        {
                            "id":440800,
                            "version":7,
                            "name":"湛江",
                            "code":440800,
                            "initial":"Z",
                            "pinyin":"zj,zhanjiang",
                            "areaCode":"0759",
                                
                            "provinceId":440000,
                             
                        },
                        {
                            "id":410100,
                            "version":1529,
                            "name":"郑州",
                            "code":410100,
                            "initial":"Z",
                            "pinyin":"zz,zhengzhou",
                            "areaCode":"0371",
                            "provinceId":410000,
                             
                        },
                        {
                            "id":640500,
                            "version":0,
                            "name":"中卫",
                            "code":640500,
                            "initial":"Z",
                            "pinyin":"zw,zhongwei",
                            "areaCode":"0955",
                                
                            "provinceId":640000,
                             
                        }
                    ]
                },
                currentCity:''
			}
            
		},
		methods: {
            getHashParameters() {
                var arr = (location.hash || '').split('?')[1].split('&')
                var params = {}
                for (var i = 0; i < arr.length; i++) {
                    var data = arr[i].split('=')
                    if (data.length === 2) {
                        params[data[0]] = decodeURI(data[1])
                    }
                }
                return params
            },
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id];
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},
			
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
            buttonPressed(item) {
                console.log(item);
                this.$bridge.callHandler('saveCity',item,res=>{
                    console.log(res);
                });
            },
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		},
        onLoad() {

            var params = this.getHashParameters();
            for (var key in params) {
                var item = params[key];
                this.currentCity = item;
            }

            for (var key in this.cityData) {
                this.list.push(key)
            }
        	this.listCur = list[0];
        },
        onReady() {
        	let that = this;
        	uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
        		that.boxTop = res.top
        	}).exec();
        	uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
        		that.barTop = res.top
        	}).exec()
        },
	}
</script>

<style>
	page {
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
    
    .cityButton {
        background-color: #F5F6F7;
        font-size: 24rpx;
        color: #333333;
        margin-left: 10rpx;
        margin-right: 10rpx;
        width: 160rpx;
        height: 64rpx;
        max-height: 64rpx;
        
        white-space: nowrap;
         text-overflow: ellipsis; 
         overflow: hidden;
        
    }
    .locationButton {
        background-color: #E7F3FF;
        font-size: 24rpx;
        color: #3AA7FF;
        margin-left: 10rpx;
        margin-right: 10rpx;
        width: 160rpx;
        height: 64rpx;
        max-height: 64rpx;
    }
    
    .lable-info{
    		font-size: 10pt!important;
    		overflow: hidden !important;
    		text-overflow: ellipsis !important;
    		display: -webkit-box !important;
    		-webkit-line-clamp: 1;
    		-webkit-box-orient: vertical;
            text-overflow: ellipsis
    	}
        
        .bigItem {
            display: flex;
            align-items: center;
        }
        
        .locationCity {
            padding-top: 20rpx;
            padding-left: 20rpx;
            padding-bottom: 20rpx;
            background-color: #FFFFFF;
        }
</style>
