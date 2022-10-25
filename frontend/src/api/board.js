import http from '@/common/http-common'

const boardList = async () => {
	let resBoardList;
	await http
		.get(`/board/`)
		.then((res) => {
			console.log('api board.js boardList res: ', res);
			resBoardList = res.data.boards
		})
		.catch((err) => {
			console.error('api board.js boardList err: ', err);
		})
	return resBoardList
}

const createBoard = async (boardInfo) => {
	let resCreateBoard;
	await http
		.post(`/board/create`, boardInfo)
		.then((res) => {
			console.log('api board.js createBoard res: ', res);
			resCreateBoard = res.data.boardInfo;
		})
		.catch((err) => {
			console.error('api board.js createBoard err: ', err);
		})
	return resCreateBoard
}

export {
	boardList,
	createBoard,
}