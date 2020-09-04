// DataHelper  负责localstorage 操作
// dataKey 一条记录的key
// primaryKey    value中数据的主键
export default class DataHelper {
  dataKey: string;
  primaryKey: string;
  constructor(dataKey: string, primaryKey: string) {
    this.dataKey = dataKey;
    this.primaryKey = primaryKey;
  }
  readData(): any {
    let strData: string | null = localStorage.getItem(this.dataKey);
    let arrData: any = [];
    if (strData != null) {
      arrData = JSON.parse(strData);
    }
    return arrData;
  }

  saveData(arrData: Array<Object>): void {
    let str: string = JSON.stringify(arrData);
    localStorage.setItem(this.dataKey, str);
  }

  //添加数据完成后，返回新生成的id
  addData(newDataObj: any): number {
    let dataArray: any = this.readData();
    if (dataArray == null) {
      dataArray = [];
    }
    let newId =
      dataArray.length > 0
        ? dataArray[dataArray.length - 1][this.primaryKey] + 1
        : 1;
    newDataObj[this.primaryKey] = newId;
    dataArray.push(newDataObj);
    this.saveData(dataArray);
    return newId;
  }

  removeDataById(id: string | number): boolean {
    let arr = this.readData();
    let index = arr.findIndex((ele: any) => {
      return ele[this.primaryKey] == id;
    });
    if (index > -1) {
      arr.splice(index, 1);
      this.saveData(arr);
      return true;
    }
    return false;
  }
}
