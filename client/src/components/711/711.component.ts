import { Component } from '@angular/core';
import { UportService, PERSOLID_DISCLOSURE_REQUEST } from 'src/uport';
import { Router } from '@angular/router';

@Component({
  templateUrl: './711.component.html',
})
export class P711Component {
  timeSlots = [
    "月曜日 10:00-16:00",
    "火曜日 18:00-20:00",
    "金曜日 13:00-17:00"
  ];

  shops = [
    "三軒茶屋玉川通り",
    "世田谷キャロットタワー前",
    "世田谷三軒茶屋２丁目",
    "三軒茶屋病院前"
  ];

  reservedTime = "";
  reservedShop = "";

  constructor(private uport: UportService, private router: Router) { }

  clicked = false;
  submit() {
    if (!this.reservedTime) {
      alert("アルバイト時間帯を選んでください");
      return;
    }

    if (!this.reservedShop) {
      alert("店舗を選んでください");
      return;
    }

    this.clicked = true;
    const state = this.uport.state;
    if (!state.name || !state.email || !state["Persol ID"]) {
      this.router.navigate(["/register"]);
    }

    this.uport.sendVerification("SevenEleven", 60 * 60 * 24 * 7, {
      time: new Date().toISOString(),
      name: state.name,
      email: state.email,
      persolId: state["Persol ID"].id,
      reservedTime: this.reservedTime,
      reservedShop: this.reservedShop,
    });
  }

  get title() {
    if (!this.reservedTime || !this.reservedShop) return "";
    return `${this.reservedTime} @ ${this.reservedShop}店`;
  }
}
