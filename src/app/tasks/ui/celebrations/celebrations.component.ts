import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-celebrations',
  templateUrl: './celebrations.component.html',
  styleUrls: ['./celebrations.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CelebrationsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
