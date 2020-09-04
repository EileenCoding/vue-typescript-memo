import Category from './CategoryEnum';

export default class ItemData {
  id!: number;
  categoryId!: Category;
  title!: string;
  content!: string;
  createTime!: string;
  constructor(
    id: number = -1,
    categoryId: Category = -1,
    title: string = '',
    content: string = ''
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.content = content;
    this.createTime = this.formatDate(Date.now());
  }
  formatDate(timeSpan: number): string {
    let date = new Date(timeSpan);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date
      .getDate()
      .toString()
      .padStart(2, '0');
    let hour =
      date.getHours() < 10
        ? date
            .getHours()
            .toString()
            .padStart(2, '0')
        : date.getHours();
    let minute = date.getMinutes();
    let str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    return str;
  }
}
