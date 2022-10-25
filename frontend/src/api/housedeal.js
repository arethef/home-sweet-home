import http from '@/common/http-common'

const houseDealList = async (aptCode) => {
	let houseDealList = [];
	await http
		.get(`/housedeal/${encodeURIComponent(aptCode)}`)
		.then((res) => {
			houseDealList = res.data.houseDealList;
			console.log('api housedeal.js houseDealList res: ', res);
		})
		.catch((err) => {
			console.error('api housedeal.js houseDealList err: ', err);
		})
	return houseDealList
}

export {
	houseDealList,
}