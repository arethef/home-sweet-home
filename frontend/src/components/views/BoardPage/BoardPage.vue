<template>
  <div>
    <p>BoardPage.vue</p>
    <w-button @click="onClickBoardCreateBtn">글쓰기</w-button>
    <w-table
      :headers="table.headers"
      :items="boardList"
      :selectable-rows="table.selectableRows"
      :force-selection="table.forceSelection"
      @row-select="onClickBoardItem($event)"
    ></w-table>
    <w-overlay
      v-model="showOverlayBoardDetail"
      :persistent="persistent"
      :persistent-no-animation="persistentNoAnimation"
      :opacity="opacity"
    >
      <w-card tile bg-color="white" lg class="ml8 mr8">
        <template #title v-if="!this.onEdit">
          <w-toolbar>
            <div class="title3">{{ currBoardItemTitle }}</div>
            <div class="spacer"></div>
            <span class="ml2">
              <w-icon class="mr2" @click="showOverlayBoardDetail = false"
                >wi-cross</w-icon
              >
            </span>
          </w-toolbar>
        </template>
        <div id="board-content">
          <div v-if="!this.onEdit">
            <w-flex>
              <div class="title4 mb2 pal xs4">내용</div>
              <div class="title4 mb2 pal xs8">{{ currBoardItemContent }}</div>
            </w-flex>
            <w-flex>
              <div class="title4 mb2 pal xs4">작성자</div>
              <div class="title4 mb2 pal xs8">{{ currBoardItemWriter }}</div>
            </w-flex>
            <w-flex>
              <div class="title4 mt4 mb2 pal xs4">작성일</div>
              <div class="title4 mt4 mb2 pal xs8">
                {{ currBoardItemCreatedAt }}
              </div>
            </w-flex>
            <w-flex
              v-if="this.currBoardItemCreatedAt !== this.currBoardItemUpdatedAt"
            >
              <div class="title4 mt4 mb2 pal xs4">수정일</div>
              <div class="title4 mt4 mb2 pal xs8">
                {{ currBoardItemUpdatedAt }}
              </div>
            </w-flex>
          </div>
          <div v-if="this.onEdit">
            <w-textarea v-model="currBoardItemTitle" outline>제목</w-textarea>
            <w-textarea v-model="currBoardItemContent" outline>내용</w-textarea>
          </div>
        </div>
        <div>
          <div v-if="!this.onEdit">
            <w-button @click="onClickUpdateBtn">수정</w-button>
            <w-button @click="onClickDeleteBtn">삭제</w-button>
          </div>
          <div v-if="this.onEdit">
            <w-button @click="onClickCancelBtn">취소</w-button>
            <w-button @click="onClickDoneUpdateBtn">완료</w-button>
          </div>
        </div>
      </w-card>
    </w-overlay>
    <w-overlay
      v-model="showOverlayBoardCreate"
      :persistent="persistent"
      :persistent-no-animation="persistentNoAnimation"
      :opacity="opacity"
    >
      <w-card tile bg-color="white" lg class="ml8 mr8">
        <template #title>
          <w-toolbar>
            <div>새 글 작성</div>
            <div class="spacer"></div>
            <span class="ml2">
              <w-icon class="mr2" @click="showOverlayBoardCreate = false"
                >wi-cross</w-icon
              >
            </span>
          </w-toolbar>
        </template>
        <div id="board-content">
          <w-textarea v-model="newBoardTitle" outline> 제목 </w-textarea>
          <w-textarea v-model="newBoardContent" outline> 내용 </w-textarea>
        </div>
        <div>
          <w-button @click="onClickDoneCreateBtn">완료</w-button>
        </div>
      </w-card>
    </w-overlay>
  </div>
</template>

<script>
import { userStore } from "@/store/store.js";
import {
  boardList,
  createBoard,
  updateBoard,
  deleteBoard,
} from "@/api/board.js";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      newBoardTitle: null,
      newBoardContent: null,
      onEdit: false,
      currBoardItemId: null,
      currBoardItemTitle: null,
      currBoardItemContent: null,
      currBoardItemWriter: null,
      currBoardItemCreatedAt: null,
      currBoardItemUpdatedAt: null,
      table: {
        headers: [
          { label: "No", key: "no" },
          { label: "제목", key: "title" },
          { label: "작성자", key: "writer" },
          { label: "작성일", key: "createdAt" },
        ],
        selectableRows: 1,
        forceSelection: false,
      },
      boardList: [],
      showOverlayBoardDetail: false,
      showOverlayBoardCreate: false,
      opacity: 0.3,
      persistent: false,
      persistentNoAnimation: false,
    };
  },
  mounted() {
    this.getBoardList();
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapGetters(userStore, ["getUserInfo"]),
  },
  methods: {
    onClickUpdateBtn() {
      console.log("BoardPage.vue methods onClickUpdateBtn() called");
      this.onEdit = true;
    },
    async onClickDeleteBtn() {
      console.log("BoardPage.vue methods onClickDeleteBtn() called");
      console.log(
        "BoardPage.vue methods onClickDeleteBtn() this.currBoardItemId: ",
        this.currBoardItemId
      );
      const boardInfo = {
        id: this.currBoardItemId,
      };
      await deleteBoard(boardInfo).then((res) => {
        console.log(
          "BoardPage.vue methods onClickDeleteBtn deleteBoard res: ",
          res
        );
      });
      this.showOverlayBoardDetail = false;
    },
    onClickCancelBtn() {
      console.log("BoardPage.vue methods onClickCancelBtn() called");
      this.onEdit = false;
    },
    async onClickDoneUpdateBtn() {
      console.log("BoardPage.vue methods onClickDoneUpdateBtn() called");
      const boardInfo = {
        id: this.currBoardItemId,
        title: this.currBoardItemTitle,
        content: this.currBoardItemContent,
      };
      await updateBoard(boardInfo).then((res) => {
        console.log(
          "BoardPage.vue methods onClickDoneUpdateBtn updateBoard res: ",
          res
        );
      });
      this.onEdit = false;
    },
    async onClickDoneCreateBtn() {
      console.log("BoardPage.vue methods onClickDoneCreateBtn() called");
      console.log(
        "BoardPage.vue methods onClickDoneCreateBtn() newBoardTitle: ",
        this.newBoardTitle
      );
      console.log(
        "BoardPage.vue methods onClickDoneCreateBtn() newBoardContent: ",
        this.newBoardContent
      );
      console.log(
        "BoardPage.vue methods onClickDoneCreateBtn() userInfo: ",
        this.userInfo
      );
      const boardInfo = {
        title: this.newBoardTitle,
        content: this.newBoardContent,
        writer: this.userInfo.id,
      };
      await createBoard(boardInfo).then((res) => {
        console.log(
          "BoardPage.vue methods onClickDoneCreateBtn createBoard res: ",
          res
        );
      });
      // await this.getBoardList();
      this.showOverlayBoardCreate = false;
    },
    onClickBoardCreateBtn() {
      console.log("BoardPage.vue methods onClickBoardCreateBtn clicked");
      this.showOverlayBoardCreate = true;
    },
    onClickBoardItem(event) {
      console.log("BoardPage.vue methods onClickBoardItem event: ", event);
      this.currBoardItemId = event.item.id;
      this.currBoardItemTitle = event.item.title;
      this.currBoardItemContent = event.item.content;
      this.currBoardItemWriter = event.item.writer;
      this.currBoardItemCreatedAt = event.item.createdAt;
      this.currBoardItemUpdatedAt = event.item.updatedAt;
      this.showOverlayBoardDetail = true;
    },
    async getBoardList() {
      this.boardList = [];
      await boardList().then((res) => {
        console.log("BoardPage.vue methods getBoardList res: ", res);
        let index = 0;
        res.forEach((raw) => {
          this.boardList.push({
            no: ++index,
            id: raw.id,
            title: raw.title,
            content: raw.content,
            writer: raw.writer,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
          });
        });
      });
      console.log(
        "BoardPage.vue methods getBoardList this.boardList: ",
        this.boardList
      );
    },
  },
};
</script>

<style scoped>
#board-content {
  overflow-y: auto;
}
</style>
