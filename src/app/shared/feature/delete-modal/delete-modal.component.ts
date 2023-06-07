import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DeleteModalComponent  implements OnInit {
  @Input() selectedTask: any;
  constructor(private modalCtrl: ModalController) {}


  ngOnInit() {
    console.log("Open delete modal", this.selectedTask)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel', 'delete');
  }

  confirm() {
    return this.modalCtrl.dismiss("hi", 'confirm');
  }

}
