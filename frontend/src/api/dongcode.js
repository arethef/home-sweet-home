import http from '@/common/http-common'

const sidoList = async () => {
  let sidoList = [];
  await http
    .get(`/dongcode/sido`)
    .then((res) => {
      sidoList = res.data.sidos
      console.log('api dongcode.js sidoList res: ', res);
    })
    .catch((err) => {
      console.error('api dongcode.js sidoList err: ', err);
    })
  return sidoList
}

const gugunList = async (sidoName) => {
  let gugunList = [];
  await http
    .get(`/dongcode/gugun/${encodeURIComponent(sidoName)}`)
    .then((res) => {
      gugunList = res.data.guguns
      console.log('api dongcode.js gugunList res: ', res);
    })
    .catch((err) => {
      console.error('api dongcode.js gugunList err: ', err);
    })
  return gugunList
}

const dongList = async (gugunName, sidoName) => {
  let dongList = [];
  await http
    .get(`/dongcode/dong/${encodeURIComponent(gugunName)}/${encodeURIComponent(sidoName)}`)
    .then((res) => {
      dongList = res.data.dongs
      console.log('api dongcode.js gugunList res: ', res);
    })
    .catch((err) => {
      console.error('api dongcode.js gugunList err: ', err);
    })
  return dongList
}

const dongInfo = async (dongName, gugunName, sidoName) => {
  console.log('api dongcode.js dongInfo called');
  let dongInfo = [];
  await http
    .get(`/dongcode/${encodeURIComponent(dongName)}/${encodeURIComponent(gugunName)}/${encodeURIComponent(sidoName)}`)
    .then((res) => {
      dongInfo = res.data.dongInfo
      console.log('api dongcode.js dongInfo res: ', res);
    })
    .catch((err) => {
      console.error('api dongcode.js dongInfo err: ', err);
    })
  return dongInfo;
}

export {
  sidoList,
  gugunList,
  dongList,
  dongInfo
}