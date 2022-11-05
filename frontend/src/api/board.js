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

const updateBoard = async (boardInfo) => {
	let resUpdateBoard;
	await http
		.post(`/board/update`, boardInfo)
		.then((res) => {
			console.log('api board.js updateBoard res: ', res);
			resUpdateBoard = res.data.boardInfo;
		})
		.catch((err) => {
			console.error('api board.js updateBoard err: ', err);
		})
	return resUpdateBoard
}

const deleteBoard = async (boardInfo) => {
	console.log('api board.js deleteBoard boardInfo: ', boardInfo);
	let resDeleteBoard;
	await http
		.delete(`/board/delete`, {
			data: boardInfo
		})
		.then((res) => {
			console.log('api board.js deleteBoard res: ', res);
			resDeleteBoard = res.data.deleteResult
		})
		.catch((err) => {
			console.error('api board.js deleteBoard err: ', err);
		})
	return resDeleteBoard
}

export {
	boardList,
	createBoard,
	updateBoard,
	deleteBoard,
}