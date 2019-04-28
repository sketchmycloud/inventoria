import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../models/inventory';
import { Urlconfig } from '../urlconfig';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  urlConfig: Urlconfig = new Urlconfig();

  constructor(private httpClient: HttpClient) { }

  getInventories() {

    return this.httpClient.get(this.urlConfig.getInventoriesURL);

  }

  createInventory(inventory: Inventory) {

    return this.httpClient.post(this.urlConfig.createInventoryURL, inventory);
    
  }

  updateInventory(inventory: Inventory) {

    return this.httpClient.post(this.urlConfig.updateInventoryURL, inventory);
    
  }

  deleteInventory(id: number) {

    return this.httpClient.post(this.urlConfig.deleteInventoryURL,
                                { id: id }
                                );
    
  }

}
