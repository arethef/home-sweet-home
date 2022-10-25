import http from '@/common/http-common'

const addressHouseInfoList = async (dongCode) => {
	let addressHouseInfoList = [];
	await http
		.get(`/houseinfo/address/${encodeURIComponent(dongCode)}`)
		.then((res) => {
			addressHouseInfoList = res.data.addressHouses;
			console.log('api houseinfo.js addressHouseInfoList res: ', res);
		})
		.catch((err) => {
			console.error('api houseinfo.js addressHouseInfoList err: ', err);
		})
	return addressHouseInfoList
}

const nameHouseInfoList = async (houseName) => {
	console.log('api houseinfo.js nameHouseInfoList called');
	let nameHouseInfoList = [];
	await http
		.get(`/houseinfo/name/${encodeURIComponent(houseName)}`)
		.then((res) => {
			nameHouseInfoList = res.data.nameHouses;
			console.log('api houseinfo.js nameHouseInfoList res: ', res);
		})
		.catch((err) => {
			console.error('api houseinfo.js nameHouseInfoList err: ', err);
		})
	return nameHouseInfoList
}

export {
	addressHouseInfoList,
	nameHouseInfoList
}