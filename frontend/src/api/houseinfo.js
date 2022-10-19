import http from '@/common/http-common'

const addressHouseList = async (dongCode) => {
	let addressHouseList = [];
	await http
		.get(`/houseinfo/address/${encodeURIComponent(dongCode)}`)
		.then((res) => {
			addressHouseList = res.data.addressHouses;
			console.log('api houseinfo.js addressHouseList res: ', res);
		})
		.catch((err) => {
			console.error('api houseinfo.js addressHouseList err: ', err);
		})
	return addressHouseList
}

export {
	addressHouseList
}