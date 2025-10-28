import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, ButtonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  items = [{ label: 'Overview', routerLink: '/overview', icon: 'pi pi-table' }];
}
