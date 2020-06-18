export class Info {
  constructor(
    public did: string,
    public SevenEleven: SevenEleven,
    public vc: string[]) { }
}

export class SevenEleven {
  constructor(
    public name: string,
    public email: string,
    public persolId: number,
    public reservedTime: string,
    public reservedShop: string,
  ) { }
}