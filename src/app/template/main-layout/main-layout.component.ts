import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  standalone: false,

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Otsuka Youngstar - Home');
  }
}
