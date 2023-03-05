//获取富文本内的图片url地址
export function getImgSrc(richtext,num=3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		  imgList.push(capture);
	});
	imgList=imgList.slice(0,num)
	return imgList;
}
export function getProvince() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://restapi.amap.com/v3/ip?key=1e4c4960ff4e574cd39128750c5834ed',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

}