import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-celebrations',
  templateUrl: './celebrations.component.html',
  styleUrls: ['./celebrations.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CelebrationsComponent  implements OnInit {
  @Input() selectedTask: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("Open celebrations modal.")

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel', 'celebrations');
  }

  confirm() {
    return this.modalCtrl.dismiss("hi", 'confirm');
  }

}
