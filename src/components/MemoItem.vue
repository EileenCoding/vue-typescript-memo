<template>
  <div class="memo-container">
    <div class="memo">
      <div class="mark"></div>
      <div class="memo-heading">
        <h5 class="title">{{memo.title}}</h5>
        <ul class="tools">
          <li class="edit" @click="showEdit"></li>
          <li class="delete" @click="doDelete"></li>
        </ul>
      </div>
      <h6 class="memo-info">
        <span class="timeStamp">{{memo.createTime}}</span>
        <span class="category">分类: {{$store.state.aHelper.getCategoryName(memo.categoryId) }}</span>
      </h6>
      <div class="content">
        <div v-html="memo.content" class="text"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ItemData from '../model/ItemData'
@Component
export default class MemoItem extends Vue {
  // 声明属性
  @Prop() memo!: ItemData

  doDelete(): void {
    if (!window.confirm(`确认要删除${this.memo.title}的笔记吗？`)) return
    this.$store.state.aHelper.delete(this.memo.id)
  }
  showEdit(): void {
    //1.创建数据的副本
    let newMemo: Object = JSON.parse(JSON.stringify(this.memo))
    //2. 把副本数据传递给state
    this.$store.commit('showEditMemo', newMemo)
  }
}
</script>