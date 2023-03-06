
//获取富文本内的图片url地址
export function getImgSrc(richtext, num = 3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		imgList.push(capture);
	});
	imgList = imgList.slice(0, num)
	return imgList;
}

//获取位置省份
export function getProvince() {
	return new Promise((resolve, reject) => {
		let historyProvince = uni.getStorageSync("historyProvince")
		if (historyProvince) {
			if ((Date.now() - historyProvince.time) > 1000 * 60 * 60) {
				getip().then(res => {
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			} else {

				resolve(historyProvince.province)
			}
		} else {

			getip().then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}

	})

}


//获取地址的功能函数
function getip() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://restapi.amap.com/v3/ip?key=1e4c4960ff4e574cd39128750c5834ed',
			success: (res) => {
				let str = ""
				console.log('111');
				if (typeof(res.data.province) === "string") {
					str = res.data.province
				} else {
					str = "火星"
				}
				resolve(str)
				let obj = {
					province: str,
					time: Date.now()
				}
				uni.setStorageSync("historyProvince", obj)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
