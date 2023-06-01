import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CircularProgressComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
