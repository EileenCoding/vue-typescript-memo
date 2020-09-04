import Vue from 'vue';
import Vuex from 'vuex';
import ActionHelper from './ActionHelper';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isShow: false,
    filterCateId: -1,
    transMemo: null,
    aHelper: new ActionHelper()
  },
  mutations: {
    showEditor(state: any) {
      state.isShow = !state.isShow;
    },
    showEditMemo(state: any, newMemo: any) {
      state.transMemo = newMemo;
      state.isShow = true;
    },
    filterMemo(state: any, cid: number): any {
      state.filterCateId = cid;
    }
  }
});
