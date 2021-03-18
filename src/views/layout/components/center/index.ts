import { Component, Vue, Watch } from 'vue-property-decorator'
import slideshow from '@/component/slideshow/index.vue'
import centerBottom from './centerBottom.vue'
import tableBottom from './tableBottom.vue'
import rightWork from './rightWork.vue'
import forbidInfo from './forbidInfo.vue'
import screenfull from 'screenfull'
const virsuData = require('./virsu.json')
const fullObj: any = screenfull // 全屏实例
import moment from 'moment'
import MyMap from './map'
import API from '@/api/index.ts'
import { arrGroup, refinedCal, eventDelegate } from '@/libs/util.ts'
let myMap: any = null // 地图实例

interface DataFormat {
	centerLongitude: number // 中心点
	centerLatitude: number // 中心点
	polygonGeom: string // 边界
	gisLevel?: number // 放大级别
	name: string // 区域名称
	bicycleNum: number // 车辆数
	streetNum: number // 车辆数
	activeNum: number // 活跃数
	activeRate?: number // 活跃率
	warningFlag?: number // 预警状态
	companyCode?: string // 预警状态
	[call: string]: any
}

import borderBlock from '@/component/borderBlock/index.vue'
@Component({
	components: {
		centerBottom,
		tableBottom,
		borderBlock,
		slideshow,
		rightWork,
		forbidInfo
	}
})
export default class center extends Vue {
	private settingShow: boolean = true // 设置是否打开
	private Forbidtype: number = 0 // 加载次数
	private isClass: number = 1
	private shudata: any = [
		{
			id: 1,
			name: '今日市民热线投诉工单'
		},
		{
			id: 2,
			name: '平台监管工单'
		}
	]
	private innum: number = 2
	public pageConfig: any
	// 是否显示图例
	private isShowLegend: boolean = true
	private isshowtable1: boolean = false

	private imggz: boolean = true

	// 是否显示表格
	private isShowLegendTab: boolean = false
	// 当前选中的图例
	private selectLegend: number | string = -1
	// 图例统计数据
	private legendTabHead: any[] = [
		// [
		//   {
		//     name: '自检时间',
		//     width: 30,
		//   },
		//   {
		//     name: '自检单位',
		//     width: 26,
		//   },
		//   {
		//     name: '整理数',
		//     width: 22,
		//   },
		//   {
		//     name: '清运数',
		//     width: 22,
		//   },
		// ],
		[
			{
				name: '派单时间',
				width: 33
			},
			{
				name: '派单对象',
				width: 33
			},
			{
				name: '派单部门',
				width: 33
			}
		],

		[
			{
				name: '派单时间',
				width: 25
			},
			{
				name: '派单对象',
				width: 20
			},
			{
				name: '处理时间',
				width: 25
			},
			{
				name: '整理数',
				width: 15
			},
			{
				name: '清运数',
				width: 15
			}
		],
		[
			{
				name: '派单时间',
				width: 33
			},
			{
				name: '派单对象',
				width: 33
			},
			{
				name: '已处理企业',
				width: 33
			}
		],
		[
			{
				name: '派单时间',
				width: 25
			},
			{
				name: '派单对象',
				width: 25
			},
			{
				name: '已处理企业',
				width: 25
			},
			{
				name: '超时企业',
				width: 25
			}
		]
	]
	// 定时器保存
	private timeoutObjs: any = {}
	//建交委数据假的
	private tjjwObjs: any[] = [
		{
			arrangeNum: 1,
			cleanNum: 8,
			dispatchOrgName: '花木',
			dispatchReceive: '建交委',
			dispatchPhotoURLs: [ '/bikeClean/1000000000000.png.400x400.jpg' ],
			dispatchTime: new Date().getTime() - 1000 * 60,
			handleAddr: '上海市浦东新区世纪大道2001号',
			lng: 121.544372,
			lat: 31.221423,
			sheetCode: '20200626-MODELDISPATCH-121915',
			sheetStatus: 1,
			chutype: '总量预警',
			detailsTexts: [
				// {
				//   key: '单号',
				//   val: "20200626-MODELDISPATCH-121915",
				// },
				{
					key: '时间',
					val: moment(new Date().getTime() - 1000 * 60).format('YYYY-MM-DD HH:mm:ss')
				},
				{
					key: '地点',
					val: '上海市浦东新区'
				},
				{
					key: '描述',
					val: '美团投放量为71159,超过与浦东新区建交委约定的投放额度（5万辆）10%。'
				}
			],
			voList: [],
			detailsImgs1: [],
			detailsImgs2: [],
			detailsImgs3: [],
			addIndex: 0
		}
	]
	private loadNum: number = 0 // 加载次数

	private luming: any = [
		{
			name: '康花路',
			district: [
				[ 121.547585, 31.147286 ],
				[ 121.549473, 31.147616 ],
				[ 121.55089, 31.147873 ],
				[ 121.553722, 31.148443 ],
				[ 121.556168, 31.148883 ],
				[ 121.557584, 31.149159 ],
				[ 121.561683, 31.150297 ],
				[ 121.565524, 31.151381 ]
			]
		},
		{
			name: '沪南路',
			district: [
				[ 121.566661, 31.148544 ],
				[ 121.565116, 31.153263 ],
				[ 121.564387, 31.155512 ],
				[ 121.564172, 31.15666 ],
				[ 121.563839, 31.15902 ],
				[ 121.563442, 31.162646 ],
				[ 121.562799, 31.164648 ],
				[ 121.562037, 31.166392 ],
				[ 121.554414, 31.18442 ],
				[ 121.552247, 31.189523 ],
				[ 121.54714, 31.199802 ]
			]
		},
		{
			name: '高科西路',
			district: [
				[ 121.494196, 31.190717 ],
				[ 121.503809, 31.184256 ],
				[ 121.506383, 31.184403 ],
				[ 121.513765, 31.18712 ],
				[ 121.51737, 31.18712 ],
				[ 121.523807, 31.18778 ],
				[ 121.546209, 31.187634 ],
				[ 121.571357, 31.190791 ],
				[ 121.578138, 31.192847 ]
			]
		},
		{
			name: '杨高路',
			district: [
				[ 121.543798, 31.121131 ],
				[ 121.538991, 31.134503 ],
				[ 121.528692, 31.152721 ],
				[ 121.521139, 31.165501 ],
				[ 121.518564, 31.173286 ],
				[ 121.52131, 31.181657 ],
				[ 121.528177, 31.198839 ],
				[ 121.532726, 31.210218 ],
				[ 121.538219, 31.222036 ]
			]
		},
		{
			name: '浦东南路',
			district: [
				[ 121.499445, 31.181143 ],
				[ 121.502492, 31.184686 ],
				[ 121.503844, 31.187091 ],
				[ 121.50629, 31.191588 ],
				[ 121.508414, 31.195131 ],
				[ 121.512491, 31.200472 ],
				[ 121.514508, 31.205501 ],
				[ 121.516611, 31.210126 ],
				[ 121.518757, 31.214787 ]
			]
		}
	]
	// 打开弹窗记录街镇名称
	private openTownName: string = ''
	// 单车曲线是否展示
	private isBicyTrend: boolean = false
	private loading: boolean = false
	private isshowimg: boolean = false
	private isshowtable: boolean = false
	// 十五天单车曲线数据
	private bicyActiveData: any = {}
	private cityPointData: any = {} // 市级点数据
	private areaPointData: any = {} // 区级点数据

	// 工单轮播配置
	private workOrderDisposeOptions: any = null

	// 治理轮循
	private roundRobinData: any[] = []

	// 工单数据
	private workOrderObjData: any = {}

	// 工单处理数据
	private workOrderDisposeData: any = null
	// 点覆盖添加的顺序
	private pointMarkerIndex: number = 0
	private orderVale: number = 3
	// 当前选中区域的单车区域数据
	private nowBicyTrendData: any = null
	private selectEnterpriseCode: string = 'all' // 选择的企业编码
	private selectEnterpriseName: string = '全部' // 选择的企业名称
	// 市级别 按三家企业分数据
	private cityCompanyData: any = null
	private msgconcat: string = '今日市民热线投诉工单'
	// 区级别 按三家企业分数据
	private townCompanyData: any = null
	// 不同状态的工单数据 点击图例用
	private sheetWorkOrder: any[] = []
	private sheetd: any[] = [ '未处理', '处理中', '已处理', '重新派单', '已完成' ]
	private dataTable: any[] = []
	private legendData: Array<{ icon: any; name: string }> = [
		// {
		//   icon: require(`../../../../assets/image/icon_1@3x.png`),
		//   name: '防疫重点区',
		// },
		// {
		//   icon: require(`../../../../assets/image/icon_1@3x.png`),
		//   name: '自检',
		// },
		{
			icon: require(`../../../../assets/image/icon_2@3x.png`),
			name: '已派单'
		},
		{
			icon: require(`../../../../assets/image/icon_3@3x.png`),
			name: '处理中'
		},
		{
			icon: require(`../../../../assets/image/icon_4@3x.png`),
			name: '已处理'
		}
		// {
		//   icon: require(`../../../../assets/image/icon_5@3x.png`),
		//   name: '超时未处理',
		// },
	]
	// 显示禁停区的名称 控制显示
	private ForbidName: string = ''

	// 是否显示工单详情
	private isShowWorkOrderDispose: boolean = false
	// 禁停区数据
	private ForbidData: any = {}
	// 是否显示禁停区
	private isForbid: boolean = true
	// 企业数据
	private enterpriseData: Array<{}> = [
		{
			name: '全部',
			code: 'all'
		},
		{
			name: '美团',
			code: '07mobike'
		},
		{
			name: 'ofo',
			code: '05ofo'
		},
		{
			name: '哈啰',
			code: '03hellobike'
		}
	]
	// 设置项
	private settingItemData: Array<{}> = [
		{
			state: false,
			name: '热力图'
		},
		{
			state: true,
			name: '夜间模式'
		},
		{
			state: false,
			name: '街镇信息'
		},
		{
			state: true,
			name: '禁停区域'
		},
		{
			state: true,
			name: '单车治理'
		},
		// {
		//   state: true,
		//   name: '重点区违停',
		// },
		{
			state: false,
			name: '防疫重点区'
		},
		{
			state: false,
			name: '收集区'
		},
		{
			state: false,
			name: '重要道路'
		}
	]

	@Watch('$store.state.workeObj')
	public onchanged(val: any, oldVal: any) {
		this.$store.state.isallyj = ''
		if (val) {
			this.isShowWorkOrderDispose = true
			this.disposeWorkOrderDetails(val, 1)
		}
	}

	@Watch('$store.state.sheetArr')
	public onchanged2(val: any, oldVal: any) {
		// this.$store.state.isallyj=''
		// this.settingItemData[4]['state']=false
		console.log(val)
		if (val) {
			if (val == '总量') {
				this.dataTable = this.$store.state.sheetAllD
			} else {
				this.getAreaIdAndDate()
			}
		} else {
			this.dataTable = this.$store.state.sheetAllD
			myMap.cleargroup()
		}
	}

	@Watch('$store.state.isallyj')
	public onchanged3(val: any, oldVal: any) {
		if (val) {
			if (val == 1 || val == 2 || val == 3) {
				this.isshowtable = true
				this.orderVale = 3
				console.log(this.orderVale)
			} else if (val == 4 || val == 5 || val == 6) {
				if (val == 4) {
					this.isshowtable = true
				}
				this.orderVale = 6
			}
			this.getOrderList(val, this.orderVale)
		}
	}

	// 工单列表
	public getOrderList(num: number, num1: number): void {
		console.log(num, num1)
		this.loading = true
		let type
		if (num1 == 3) {
			type = 'month'
		} else if (num1 == 6) {
			type = 'day'
		} else {
			type = 'year'
		}
		API.getIntelligent({
			type: type
		}).then((res: any) => {
			this.loading = false
			switch (num) {
				case 1:
					this.dataTable = res[0].list
					break
				case 2:
					this.dataTable = res[1].list
					break
				case 3:
					this.dataTable = res[2].list
					break
				case 4:
					this.dataTable = res[0].list
					break
				case 5:
					this.dataTable = res[1].list
					break
				case 6:
					this.dataTable = res[2].list
					break
			}
		})
	}

	public changeOrder(): void {
		this.getOrderList(this.$store.state.isallyj, this.orderVale)
	}

	public mounted() {
		myMap = new MyMap({ el: 'mapContainer' })
		// this.luming.forEach((itam:any)=>{
		//   myMap.sweeperLine(itam)
		// })
		this.getBicyClePosition()
		this.getOrderList(3, 3)
		this.getVirus()
		// this.getkeyarea()
		this.getTownBoundary()
		this.getForbid()
		this.getAreaIdAndDate()

		this.getCollectData()
		// 监听全屏事件
		fullObj.on('change', (e: any) => {
			if (e.target.className === 'center-top' && fullObj.isFullscreen) {
				window.document.documentElement.setAttribute('data-theme', 'mapFull')
			} else {
				window.document.documentElement.setAttribute('data-theme', 'default')
			}

			this.$Bus.$emit('updateScreen')
		})
	}
	// 全屏
	public fullScreen(): void {
		if (fullObj.enabled) {
			fullObj.toggle(this.$refs.fullScreenTarget)
		}
	}

	// 禁停区
	public getForbid(): void {
		const nowTime: string = moment().format('YYYY-MM-DD')
		API.getForbid({
			startTime: nowTime + ' 00:00:00',
			endTime: nowTime + ' 23:59:59'
		}).then((res: any) => {
			if (res.status === 0) {
				res.data.forEach((item: any) => {
					item.geom = this.FormatGolygon(item.polygonGeom)
					item.regionTypeName = '禁停区'
					item.sumBicycle = item.bicycleNum
					if (this.ForbidData[item.regionName]) {
						// 更新
						myMap.upDataForbid(item, 1)
					} else {
						// 添加
						myMap.addOverlayGroup('forbidGroup', myMap.createForbid(item, this.isForbid))
					}
					this.ForbidData[item.regionName] = item
				})
				myMap.forbidGroupEvent((data: any) => {
					this.ForbidName = data
				})
			}

			// 定时任务
			this.timeoutEvent('getForbid')
		})
	}

	// 收集区
	public getCollectData(): void {
		API.getCollect().then((res: any) => {
			res.data.forEach((item: any) => {
				item.geom = this.FormatGolygon(item.polygonGeom)
				if (this.ForbidData[item.regionName]) {
					// 更新
					myMap.upDataForbid(item, 3)
				} else {
					// 添加
					myMap.addOverlayGroup('collectGroup', myMap.createCollect(item, this.isForbid))
					myMap.iscollectGroup(false)
				}
				this.ForbidData[item.regionName] = item
			})
			myMap.forbidGroupEvent3((data: any) => {
				this.ForbidName = data
			})
			// 定时任务
		})
	}

	//防疫区

	public getVirus(): void {
		virsuData.forEach((item: any) => {
			item.geom = this.FormatGolygon(item.polygonGeom)
			if (this.ForbidData[item.regionName]) {
				// 更新
				myMap.upDataForbid(item, 2)
			} else {
				// 添加
				myMap.addOverlayGroup('virusGroup', myMap.createVirus(item, this.isForbid))
				myMap.isvirusGroup(false)
			}
			this.ForbidData[item.regionName] = item
		})
		myMap.forbidGroupEvent1((data: any) => {
			this.ForbidName = data
		})
	}

	private showinde(row: any): void {
		this.innum = row.id
		if (this.innum == 1) {
			this.msgconcat = '今日市民热线投诉工单'
		} else {
			this.msgconcat = '平台监管工单'
		}
	}
	// 重点区
	public getkeyarea(): void {
		API.getKeyAreas().then((res: any) => {
			res.data.forEach((item: any) => {
				item.geom = this.FormatGolygon(item.polygonGeom)
				myMap.addOverlayGroup('keyareaGroup', myMap.creatkeyarea(item, this.isForbid))
				this.ForbidData[item.regionName] = item
			})

			myMap.forbidGroupEvent2((data: any) => {
				this.ForbidName = data
			})

			// 定时任务
			// this.timeoutEvent('getForbid');
		})
	}

	/**
 * 选择设置项
 */
	private selectSetItem(data: any): void {
		data.state = !data.state

		switch (data.name) {
			case '热力图':
				myMap.isHeatMap(data.state)
				break
			case '夜间模式':
				myMap.setMapStyle(data.state ? 1 : 0)
				break
			case '街镇信息':
				myMap.isPointInfo = data.state
				this.imggz = data.state
				myMap.pointGroupControl()
				break
			case '禁停区域':
				this.ForbidName = ''
				myMap.isForbidGroup(data.state)
				break
			case '单车治理':
				this.$store.state.isallyj = ''
				this.isShowLegend = data.state
				if (this.isShowLegend == true) {
					this.$store.state.sheetArr = ''
					this.getAreaIdAndDate()
				}
				myMap.isWorkGroup(data.state)
				break
			case '防疫重点区':
				this.ForbidName = ''
				myMap.isvirusGroup(data.state)
				break
			case '重要道路':
				// this.ForbidName = '';
				// myMap.isvirusGroup(data.state);
				if (data.state) {
					this.luming.forEach((itam: any) => {
						myMap.sweeperLine(itam)
					})
				} else {
					myMap.clearCar()
				}
				break
			case '重点区违停':
				this.ForbidName = ''
				myMap.iskeyareaGroup(data.state)
				break
			case '收集区':
				this.ForbidName = ''
				myMap.iscollectGroup(data.state)
				break
			case '预警播报':
				// this.isEarlyWarning = data.state;
				break
		}
	}

	/**
   * 选择图例获取 对应状态工单
   */
	private showLegendTable(index: number | string) {
		this.$nextTick(function() {
			this.selectLegend = index
			this.isShowLegendTab = true
		})
	}

	/**
  * 分拣不同状态的工单
  */
	private sortOutWorkOrder(res: any): void {
		// 判断工单的类型
		let item: any[] = []
		const sortArr: any[] = []
		res.forEach((data: any) => {
			if (data.sheetCode.includes('-CHECK-')) {
				return
				// 自检
				// if (data.sheetStatus === 2) {
				//   // 自检只要 自检完成的
				//   if (!sortArr[0]) {
				//     sortArr[0] = [];
				//   }
				//   item = [
				//     moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
				//     data.dispatchOrgName,
				//     data.arrangeNum,
				//     data.cleanNum,
				//   ];
				//   sortArr[0].push(item);
				// }
			} else {
				// 督办
				switch (data.sheetStatus) {
					case -1:
						// 超时未处理
						if (!sortArr[4]) {
							sortArr[4] = []
						}

						const disposeCompany = data.voList.map((items: any) => {
							return items.dealCompany
						})

						item = [
							moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
							data.dispatchReceive,
							disposeCompany.join(',')
						]
						sortArr[4].push(item)
						break
					case 0:
					case 3:
						// 未处理
						// 重新派单
						if (!sortArr[1]) {
							sortArr[1] = []
						}

						item = [
							moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
							data.dispatchReceive,
							data.dispatchOrgName
						]
						sortArr[1].push(item)
						break
					case 1:
						// 处理中
						if (!sortArr[2]) {
							sortArr[2] = []
						}
						item = [
							moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
							data.dispatchReceive,
							data.voList
								.filter((items: any) => {
									return items.dealStatus === 2
								})
								.map((items: any) => {
									return items.dealCompany
								})
								.join(',')
						]
						sortArr[2].push(item)
						break
					case 2:
					case 4:
						// 已处理
						// 已完成
						if (!sortArr[3]) {
							sortArr[3] = []
						}
						item = [
							moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
							data.dispatchReceive,
							moment(data.voList[data.voList.length - 1].handleTime).format('YYYY-MM-DD HH:mm:ss'),
							data.arrangeNum,
							data.cleanNum
						]
						sortArr[3].push(item)
						break
				}
			}
		})

		this.sheetWorkOrder = sortArr.map((itemArr: any[]) => {
			return itemArr.sort((a: any, b: any) => {
				a = new Date(a[0])
				b = new Date(b[0])
				return a > b ? -1 : a < b ? 1 : 0
			})
		})
	}

	/**
  * 处理显示工单详情
  * @param {String} code 工单编码
  * @param {Number} type 返回类型 1工单详情 2治理轮循
  */
	private disposeWorkOrderDetails(code: string, type: number) {
		const data: any = this.workOrderObjData[code]

		const statusData: any = this.judgeStatus(code, data.sheetStatus, data) // 格式状态
		let dispatchs: any=data.dispatchReceive
		let codets: any=data.sheetCode
		let detailsTexts: any = [
			{
				key: '单号',
				val: data.sheetCode
			},
			{
				key: statusData.isDespatch ? '派单时间' : '自检时间',
				val: moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss')
			},
			{
				key: statusData.isDespatch ? '地点' : '自检地点',
				val: data.handleAddr
			},
			{
				key: '处置事项',
				val: data.type
			}
			// {
			//   key: statusData.isDespatch ? '处理单位' : '自检单位',
			//   val: statusData.isDespatch ? data.dispatchReceive : data.dispatchOrgName,
			// },
		]

		let detailsImgs3: any[] = []
		let detailsImgs1: any[] = []
		let detailsImgs2: any[] = []
		let roundRobinimg: any = null

		if (data.sheetStatus === -1 || data.sheetStatus === 0 || data.sheetStatus === 1 || data.sheetStatus === 3) {
			if (type === 1) {
				// 工单详情的图片数组
				detailsImgs3 = data.dispatchPhotoURLs.map((item: any) => {
					return 'http://101.132.45.201:18088/' + item
				})

				if (data.sheetStatus === -1) {
					// detailsTexts.push({
					//   key: '超时时长',
					//   val: new Date(data.voList[data.voList.length - 1].handleTime).Format('yyyy-MM-dd hh:mm:ss')
					// })
				}
			} else {
				// 治理轮循的图片单张
				roundRobinimg = 'http://101.132.45.201:18088/' + data.dispatchPhotoURLs[0]
			}
		} else if (data.sheetStatus === 2 || data.sheetStatus === 4) {
			// const addDetailsTexts = [
			// {
			//   key: '单号',
			//   val: data.sheetCode,
			// },
			// {
			//   key: '处理时间',
			//   val: moment(data.voList[data.voList.length - 1].handleTime).format(
			//     'YYYY-MM-DD HH:mm:ss',
			//   ),
			// },
			// {
			//   key: '整理数',
			//   val: data.arrangeNum,
			// },
			// {
			//   key: '清运数',
			//   val: data.cleanNum,
			// },
			// ];
			// detailsTexts = [...detailsTexts, ...addDetailsTexts];
			detailsTexts = [ ...detailsTexts ]

			if (type === 1) {
				// 工单详情的图片数组
				// let detailsImgs1 = [];
				// let detailsImgs2 = [];
				// detailsImgs = [];
				let dispatchReceive = ''
				data.voList.forEach((item: any) => {
					dispatchReceive = statusData.isDespatch ? item.dispatchReceive : item.dispatchOrgName
					item.dispatchBeforePhotoURLs.forEach((beforeItem: any) => {
						detailsImgs1.push('http://101.132.45.201:18088/' + beforeItem)
					})
					item.dispatchAfterPhotoURLs.forEach((afterItem: any) => {
						detailsImgs2.push('http://101.132.45.201:18088/' + afterItem)
					})
				})
			} else {
				// 治理轮循的图片单张
				roundRobinimg =
					'http://101.132.45.201:18088/' + data.voList[data.voList.length - 1].dispatchAfterPhotoURLs[0]
			}
		}

		if (type === 1) {
			// 工单详情格式数据
			this.workOrderDisposeData = {
				nowStatus: statusData.nowStatus, // 当前状态
				despatchStatus: statusData.despatchStatus, // 处理的状态
				classTimestamp: `container${Date.now()}`,
				detailsImgs1, // 处理照片
				detailsImgs2, // 处理照片
				detailsImgs3, // 处理照片
				detailsTexts, // 处理记录
				codets:codets,
				dispatchs,
				voList: data.voList[0],
				voList1: data.voList
			}
			this.$nextTick(function() {
				// this.workOrderDisposeOptions = {
				//   autoplay: true, // 可选选项，自动滑动
				//   simulateTouch: false,
				//   loop: detailsImgs.length > 1,
				// };
				this.isShowWorkOrderDispose = true
				console.log(this.workOrderDisposeData)
			})
		} else {
			return {
				nowStatus: statusData.nowStatus, // 当前状态
				despatchStatus: statusData.despatchStatus, // 处理的状态
				roundRobinimg, // 处理照片
				detailsTexts // 处理记录
			}
		}
	}

	/**
  * 获取指定街道/区单车治理情况
  */
	private getAreaIdAndDate(): void {
		// const shearr: string = shearr;
		this.dataTable = []
		myMap.cleargroup()
		const startTime: string = moment().format('YYYY-MM-DD')
		let sheetList: string = ''
		if (this.$store.state.sheetArr) {
			sheetList = this.$store.state.sheetArr
		}
		// let startTime = '2019-03-18'
		API.getAreaIdAndDate(startTime, startTime, sheetList).then((res: any): void => {
			if (res.status === 0) {
				// 数据处理
				// this.dataTable = res.data
				// res.data.forEach((itam:any)=>{
				//   itam.dispatchTime1= moment(itam.dispatchTime).format('YYYY-MM-DD HH:mm:ss')
				//   this.dataTable.push(itam)
				// })
				this.refreshPointData(res.data)
				// 分拣不同状态工单
				this.sortOutWorkOrder(res.data)

				// 重置事件
				myMap.workGroupEvent((code: string) => {
					this.isShowWorkOrderDispose = false
					this.disposeWorkOrderDetails(code, 1)
				})

				// 定时刷新
				this.timeoutEvent('getAreaIdAndDate')
			}
		})
	}

	private dateFormat(fmt: any, date: any) {
		let ret
		const opt = {
			'Y+': date.getFullYear().toString(), // 年
			'm+': (date.getMonth() + 1).toString(), // 月
			'd+': date.getDate().toString(), // 日
			'H+': date.getHours().toString(), // 时
			'M+': date.getMinutes().toString(), // 分
			'S+': date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		}
		for (let k in opt) {
			ret = new RegExp('(' + k + ')').exec(fmt)
			if (ret) {
				fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
			}
		}
		return fmt
	}
	/**
 * 判断工单状态
 * @param {String} code 工单编号
 * @param {Number} status 工单状态
 * @return {Object} 对应工单的状态
 */
	private judgeStatus(code: string, status: number, data: any): any {
		let icon: any = null
		let nowStatus: string = ''
		let despatchStatus: string = ''
		let isDespatch: boolean = false
		// 自检
		if (code.includes('-CHECK-')) {
			isDespatch = false
			switch (status) {
				case 1:
					// 处理中
					nowStatus = '自检-处理中'
					despatchStatus = '企业处理中'
					icon = this.legendData[0].icon
					break
				case 2:
					// 已处理
					nowStatus = '自检完成'
					despatchStatus = '企业自检完毕'
					icon = this.legendData[0].icon
					break
			}
		} else {
			// 督办
			// if (code.includes('-DISPATCH-'))
			isDespatch = true
			switch (status) {
				case -1:
					// 超时
					nowStatus = '超时未处理'
					// if (code.includes('-MODELDISPATCH-')){
					//   despatchStatus = '已推送企业';
					// }else{
					//   despatchStatus = '已推送街镇城运分中心,企业';
					// }
					despatchStatus = '已推送企业'

					// icon = this.legendData[4].icon;
					break
				case 0:
					// 未处理
					nowStatus = '已派单'
					// if (code.includes('-MODELDISPATCH-')){
					//   despatchStatus = '已推送企业';
					// }else{
					//   despatchStatus = '已推送街镇城运分中心,企业';
					// }
					despatchStatus = '已推送企业'
					icon = this.legendData[0].icon
					break
				case 1:
					// 处理中
					nowStatus = '处理中'
					if (code.includes('-JJWCYZX-') && data.dispatchReceive == '区城运中心') {
						despatchStatus = '企业一小时内未处理，已推送至城运中心'
					} else {
						despatchStatus = '企业处理中'
					}
					icon = this.legendData[1].icon
					break
				case 2:
					// 已处理
					nowStatus = '已处理'
					despatchStatus = '处理完毕'
					icon = this.legendData[2].icon
					break
				case 3:
					// 重新派单
					nowStatus = '已派单'
					// if (code.includes('-MODELDISPATCH-')){
					//   despatchStatus = '已推送企业';
					// }else{
					//   despatchStatus = '已推送街镇城运分中心,企业';
					// }
					despatchStatus = '已推送企业'
					icon = this.legendData[0].icon
					break
				case 4:
					// 已完成
					nowStatus = '已处理'
					despatchStatus = '企业处理完毕'
					// icon = this.legendData[3].icon;
					break
			}
		}

		return { icon, nowStatus, despatchStatus, isDespatch }
	}

	/**
   * 无闪动刷新点
   */
	private refreshPointData(data: any): void {
		let workOrderObjItem: any = {}
		let icon: any = null
		data.forEach((item: any, index: number) => {
			workOrderObjItem = this.workOrderObjData[item.sheetCode]
			// if (workOrderObjItem) {
			//   // 工单存在 判断状态
			//   if (item.sheetStatus !== workOrderObjItem.sheetStatus) {
			//     // 状态改变了重新赋值
			//     for (const key of Object.keys(item)) {
			//       this.workOrderObjData[item.sheetCode][key] = item[key];
			//     }
			//     // 改变图标
			//     icon = this.judgeStatus(item.sheetCode, item.sheetStatus).icon;
			//     myMap.updateWorkPoint(workOrderObjItem.addIndex, icon);

			//     // 治理轮循 修改数据
			//     this.roundRobinData[
			//       workOrderObjItem.addIndex
			//     ] = this.disposeWorkOrderDetails(item.sheetCode, 2);
			//   }
			// } else {
			// 工单不存在
			item.addIndex = this.pointMarkerIndex // 记录添加顺序

			this.workOrderObjData[item.sheetCode] = item
			icon = this.judgeStatus(item.sheetCode, item.sheetStatus, item).icon
			if (item.lng && item.lat) {
				myMap.addOverlayGroup('workOrderGroup', myMap.createWorkPoint(item, icon)) // 直接添加
				myMap.isWorkGroup(this.isShowLegend)
				myMap.map.setFitView(myMap.workOrderGroup)
			}

			// 治理轮循 添加数据
			this.roundRobinData.push(this.disposeWorkOrderDetails(item.sheetCode, 2))

			this.pointMarkerIndex++
			// }
		})
	}

	// 定时刷新任务
	public timeoutEvent(call: any, time: number = 600000): void {
		// 先清除之前的请求
		// 先清除之前的请求

		if (this.timeoutObjs[call]) {
			clearTimeout(this.timeoutObjs[call])
			this.timeoutObjs[call] = null
		}

		this.timeoutObjs[call] = setTimeout(() => {
			this[call]()
		}, time)
	}
	/**
  * 单车位置 热力图
  * @param {String} companyCode 单车企业编码
  */
	private getBicyClePosition(companyCode?: string): void {
		API.getBicyClePosition(companyCode === 'all' ? '' : companyCode).then((res: any): void => {
			if (res.status === 0) {
				myMap.setHeatMapData(res.hotGraph)
			}
		})
	}

	/**
  * 获取中心点 边界
  */
	private getTownBoundary(): void {
		Promise.all([ API.getDistrictBoundary(), API.getAreaBoundary() ]).then((res: any) => {
			const AllCityData: DataFormat = res[0].boundary // 市级数据
			const DivideCityData: DataFormat[] = res[0].comanyBikeNums // 分企业的市级数据
			const DivideAreaData: DataFormat[] = res[1].dataCompany // 分企业的区级数据
			// 总的区级数据
			const AllAreaData: DataFormat[] = res[1].data.map((item: any): any => {
				item.companyCode = 'all'
				return item
			})
			// 边界只绘制一次
			if (this.loadNum === 0) {
				this.disCityBorder(AllCityData)
				this.disAreaBorder(AllAreaData)
				this.loadNum++
			}

			// 合并所有的区域数据
			const overallArea: DataFormat[] = [ ...AllAreaData, ...DivideAreaData ]
			// 合并所有的市级数据
			AllCityData.companyCode = 'all'
			const overallCity: DataFormat[] = [ AllCityData, ...DivideCityData ]
			// const overallCity: Array<DataFormat> = []

			// 分类数据
			const disTypeData = this.disCompanyData(overallCity, overallArea)

			this.townCompanyData = disTypeData[1]
			this.cityCompanyData = disTypeData[0]

			this.disCityData(this.selectEnterpriseCode)
			this.disAreaData(this.selectEnterpriseCode)

			// 定时刷新
			this.timeoutEvent('getTownBoundary')
		})
	}

	// 处理数据 按企业分
	private disCompanyData(city: DataFormat[], town: DataFormat[]): any[] {
		const cityData: any = {}
		const townData: any = {}

		// 数据类型
		const typeData: any[] = this.enterpriseData

		typeData.forEach((item: any): void => {
			townData[item.code] = []
			cityData[item.code] = {}

			city.forEach((subItem: DataFormat): void => {
				if (subItem.companyCode === item.code) {
					cityData[item.code] = {
						lng: subItem.centerLongitude,
						lat: subItem.centerLatitude,
						name: subItem.name,
						bicycleNum: subItem.bicycleNum,
						streetNum: subItem.streetNum,
						activeNum: refinedCal(`${subItem.activeRate}*100`, 2) + '%'
					}
				}
			})
			town.forEach((subItem: DataFormat): void => {
				if (subItem.companyCode === item.code) {
					townData[item.code].push({
						lng: subItem.centerLongitude,
						lat: subItem.centerLatitude,
						name: subItem.name,
						bicycleNum: subItem.bicycleNum,
						streetNum: subItem.streetNum,
						activeNum: refinedCal(`${subItem.activeRate}*100`, 2) + '%',
						state: subItem.warningFlag
					})
				}
			})
		})

		return [ cityData, townData ]
	}

	// 处理市的数据
	private disCityData(key: string): void {
		const CityData: DataFormat = this.cityCompanyData[key]

		// 有修改 没有就添加
		if (this.cityPointData.name === CityData.name) {
			myMap.upDateCityPoint(CityData)
		} else {
			this.cityPointData = CityData
			myMap.addOverlayGroup('cityPointGroup', myMap.createCityPoint(CityData)).hide()
		}
		// myMap.CityPointEvent();
	}

	// 处理市级边界
	private disCityBorder(cityData: any): void {
		// 地图 中心点
		const center: number[] = [ cityData.centerLongitude, cityData.centerLatitude ]
		// 边界 遮罩
		const border: Array<[]> = this.FormatGolygon(cityData.polygonGeom)

		myMap.setZoomAndCenter(14, center)
		myMap.initShade(border)
	}

	// 处理区级边界
	private disAreaBorder(AreaData: DataFormat[]): void {
		let border: Array<[]> = [] // 边界
		const overlays: Array<{}> = [] // 覆盖物集合
		AreaData.forEach((item: DataFormat, index: number): void => {
			if (item.polygonGeom !== undefined) {
				border = this.FormatGolygon(item.polygonGeom)
				overlays.push(myMap.createAreaBorder(border, item.name))
			}
		})
		myMap.addOverlayGroup('areaBorderGroup', overlays).hide()
	}

	// 处理区级点
	private disAreaData(key: string): void {
		const data: any[] = this.townCompanyData[key]
		data.forEach((item: any) => {
			if (this.areaPointData[item.name]) {
				myMap.upDateAreaPoint(item.name, item)
			} else {
				this.areaPointData[item.name] = item
				myMap.addOverlayGroup('areaPointGroup', myMap.createAreaPoint(item)).hide()
			}
		})

		myMap.AreaPointEvent(this.openFifteenWin)
	}

	// 打开街镇 十五天趋势弹窗
	private openFifteenWin(name: string): void {
		const fifteenData: any = (this as any).bicyActiveData[name]
		this.openTownName = fifteenData.name = name

		this.isBicyTrend = true

		this.nowBicyTrendData = fifteenData
	}

	// 格式边界数据
	private FormatGolygon(polygon: string): Array<[]> {
		const polygonGeom: Array<number | string> = polygon.slice(9, -2).split(/\,|\s/)

		return arrGroup(polygonGeom, 2)
	}
}
