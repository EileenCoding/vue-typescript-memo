import DataHelper from './DataHelper';
import ItemData from '../model/ItemData';
import Category from '../model/CategoryEnum';
class ActionHelper {
  dataHelper: DataHelper = new DataHelper('memoData', 'id');
  memoList!: Array<ItemData>;
  constructor() {
    this.memoList = this.readData();
  }
  readData(): Array<ItemData> {
    //1.读取本地的Object 数组 -dataHelper
    let arrObj = this.dataHelper.readData();
    //2.将Object 数组 转换成 ItemData 数组
    let arrItem = arrObj.map((ele: any) => {
      let item: ItemData = new ItemData();
      item.id = ele.id;
      item.categoryId = ele.categoryId;
      item.title = ele.title;
      item.content = ele.content;
      item.createTime = ele.createTime;
      return item;
    });
    //3.返回 ItemData 数组
    return arrItem;
  }

  add(item: ItemData): number {
    //保存到本地，返回生成的ID
    item.id = this.dataHelper.addData(item);
    //将笔记添加到笔记数组中
    this.memoList.push(item);
    //将笔记数组重新保存到本地
    this.dataHelper.saveData(this.memoList);
    //返回新笔记的id
    return item.id;
  }

  edit(item: ItemData): void {
    let editItem: ItemData | undefined = this.memoList.find((ele: any) => {
      return ele.id == item.id;
    });
    if (editItem) {
      editItem.categoryId = item.categoryId;
      editItem.title = item.title;
      editItem.content = item.content;
      //将更新后的数组重新保存到localstorage
      this.dataHelper.saveData(this.memoList);
    }
  }

  delete(id: number): void {
    let index: number = this.memoList.findIndex((ele: any) => {
      return ele.id == id;
    });
    if (index > -1) {
      this.memoList.splice(index, 1);
      this.dataHelper.saveData(this.memoList);
    }
  }

  getCategoryName(categoryId: Category): string {
    const arrNames = ['工作', '生活', '学习'];
    return arrNames[categoryId];
  }
}
export default ActionHelper;
