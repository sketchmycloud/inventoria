import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../models/inventory';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('f') InventoryForm: NgForm;

  inventories: Inventory[] = [];
  isEditable: boolean;
  isLoading: boolean;
  isListLoading: boolean;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {

    this.isEditable = false;
    this.isListLoading = true;

    this.inventoryService.getInventories()
    .subscribe(
      (data) => {
        this.inventories = data["data"] as Inventory[];
        this.isListLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdated() {

    this.isLoading = true;

    let model: Inventory = new Inventory();
    model.id = this.InventoryForm.value.iid as number;
    model.name = this.InventoryForm.value.iname as string;
    model.totalInStock = this.InventoryForm.value.istock as number;
    model.isInStock = (this.InventoryForm.value.iavailable === "" ? false : this.InventoryForm.value.iavailable) as boolean;

    this.inventoryService.updateInventory(model)
    .subscribe(
      (data) => {
        
        this.inventoryService.getInventories()
        .subscribe(
          (data) => {
            this.inventories = data["data"] as Inventory[];
            this.InventoryForm.reset();
            this.isEditable = false;
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
          }
        );

      },
      (error) => {
        console.log(error);
      }
    )

  }

  onDelete(id: number) {

    this.isListLoading = true;
    
    this.inventoryService.deleteInventory(id)
    .subscribe(
      (data) => {
        
        this.inventoryService.getInventories()
        .subscribe(
          (data) => {
            this.inventories = data["data"] as Inventory[];
            this.InventoryForm.reset();
            this.isEditable = false;
            this.isListLoading = false;
          },
          (error) => {
            console.log(error);
          }
        );

      },
      (error) => {
        console.log(error);
      }
    )

  }

  onUpdate(inventory: Inventory) {

    this.isEditable = true;
    this.InventoryForm.setValue({
      iid: inventory.id,
      iname: inventory.name,
      istock: inventory.totalInStock,
      iavailable: inventory.isInStock

    });
    
  }

  onCreate() {

    this.isLoading = true;
    
    let inventory: Inventory = new Inventory();
    inventory.id = this.InventoryForm.value.iid as number;
    inventory.name = this.InventoryForm.value.iname as string;
    inventory.totalInStock = this.InventoryForm.value.istock as number;
    inventory.isInStock = (this.InventoryForm.value.iavailable === "" ? false : this.InventoryForm.value.iavailable) as boolean;

    this.inventoryService.createInventory(inventory)
    .subscribe(
      (data) => {
        this.inventories.push(inventory);
        this.InventoryForm.reset();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    )

  }

}
