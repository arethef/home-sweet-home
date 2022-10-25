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
      v-model="showOverlay"
      :persistent="persistent"
      :persistent-no-animation="persistentNoAnimation"
      :opacity="opacity"
    >
      <w-card tile bg-color="white" lg class="ml8 mr8">
        <template #title>
          <w-toolbar>
            <div class="title3">{{ currBoardItemTitle }}</div>
            <div class="spacer"></div>
            <span class="ml2">
              <w-icon class="mr2" @click="showOverlay = false">wi-cross</w-icon>
            </span>
          </w-toolbar>
        </template>
        <div id="board-content">
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
        <div>
          <div v-if="!this.onEdit">
            <w-button @click="onClickUpdateBtn">수정</w-button>
            <w-button @click="onClickDeleteBtn">삭제</w-button>
          </div>
          <div v-if="this.onEdit">
            <w-button @click="onClickCancelBtn">취소</w-button>
            <w-button @click="onClickDoneBtn">완료</w-button>
          </div>
        </div>
      </w-card>
    </w-overlay>
  </div>
</template>

<script>
import { boardList } from "@/api/board.js";
export default {
  data() {
    return {
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
      showOverlay: false,
      opacity: 0.3,
      persistent: false,
      persistentNoAnimation: false,
    };
  },
  mounted() {
    this.getBoardList();
  },
  methods: {
    onClickUpdateBtn() {
      console.log("BoardPage.vue methods onClickUpdateBtn() called");
      this.onEdit = true;
    },
    onClickDeleteBtn() {
      console.log("BoardPage.vue methods onClickDeleteBtn() called");
    },
    onClickCancelBtn() {
      console.log("BoardPage.vue methods onClickCancelBtn() called");
      this.onEdit = false;
    },
    onClickDoneBtn() {
      console.log("BoardPage.vue methods onClickDoneBtn() called");
      this.onEdit = false;
    },
    onClickBoardCreateBtn() {
      console.log("BoardPage.vue methods onClickBoardCreateBtn clicked");
    },
    onClickBoardItem(event) {
      console.log("BoardPage.vue methods onClickBoardItem event: ", event);
      this.currBoardItemId = event.item.id;
      this.currBoardItemTitle = event.item.title;
      this.currBoardItemContent = event.item.content;
      this.currBoardItemWriter = event.item.writer;
      this.currBoardItemCreatedAt = event.item.createdAt;
      this.currBoardItemUpdatedAt = event.item.updatedAt;
      this.showOverlay = true;
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
