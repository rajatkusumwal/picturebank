export class Items {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    keyword: string;
    itemurl: string;

    constructor(options: any) {
        this.id = options.id;
        this.name = options.name;
        this.price = options.price;
        this.imageUrl = options.imageUrl;
        this.keyword = options.keyword;
        this.itemurl = options.itemurl;
    }
}
