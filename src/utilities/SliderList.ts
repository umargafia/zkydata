class SlideItem {
  key: number;
  title: string;
  description: string;
  image: any;

  constructor(key: number, title: string, description: string, image: any) {
    this.key = key;
    this.title = title;
    this.description = description;
    this.image = image;
  }
}

const SlideList: SlideItem[] = [
  new SlideItem(
    1,
    'Welcome',
    'pay all your bills in one app. We offer you the most affordable internet service',
    require('../../assets/one.png')
  ),
  new SlideItem(
    2,
    'Airtime & Data',
    'instant airtime top-up to call family, friends and business partners ensuring you never run out of airtime or data.',
    require('../../assets/two.png')
  ),
  new SlideItem(
    3,
    'Bill Payment',
    'Range of Dstv, Gotv, Startimes bouquets for your entertainments. Payments for your post-paid and prepaid meter with ease.',
    require('../../assets/three.png')
  ),
];

export default SlideList;
