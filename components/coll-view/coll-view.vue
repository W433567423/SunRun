<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title='小可耐们' title-border="none" :border="false" :open="true">
				<view class="content">
					<uni-list v-for="(item,i) in list" :key="i">
						<uni-list-item :title="item.username"
							:rightText="'有效期:'+timeToDur(Number(item.time)+ 86400000 * 7)" link
							:to="'/pages/person/person?username='+item.username"
							v-if="!timeToDur(Number(item.time)+ 86400000 * 7).includes('-')">
						</uni-list-item>
		
						<uni-list-item :title="item.username" :disabled="true" rightText="有效期:已失效" v-else>
						</uni-list-item>
					</uni-list>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		name:"coll-view",
		data() {
			return {
				
			};
		},
		props:["list"],
		computed: {
			// 时间转换计算属性
			timeToDur() {
				return (etime, stime = (new Date()).getTime(), sec = false) => {
					//总毫秒数
					let usedTime = etime - stime
					let days = Math.floor(usedTime / (24 * 3600 * 1000))
					//总毫秒数（时级）
					let leave1 = usedTime % (24 * 3600 * 1000)
					let hours = Math.floor(leave1 / (3600 * 1000))
					//总毫秒数
					let leave2 = leave1 % (3600 * 1000)
					let minutes = Math.floor(leave2 / (60 * 1000))
					let time = days + "天" + hours + "时" + minutes + "分"
					if (!sec)
						return time
					else {
						let leave3 = leave2 % (60 * 1000)
						let seconds = Math.floor(leave3 / (1000))
						return time + seconds + "秒"
					}
				}
			}
		},
	}
</script>

<style lang="scss">

</style>