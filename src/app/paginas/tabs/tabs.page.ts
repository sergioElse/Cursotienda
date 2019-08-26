import { Component} from '@angular/core';
import { HomePage } from '../home/home.page';
import { ProductoPage } from '../producto/producto.page';
import { OrdenesPage } from '../ordenes/ordenes.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = ProductoPage;
  tab3 = OrdenesPage;

}
