import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoadingService } from '../../data-access/loading.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class LoaderComponent  implements OnInit {
  // @Input() loadingState: boolean = this.
  modalState: Subject<boolean> = this.loadingService.modalOpen
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {}

}
