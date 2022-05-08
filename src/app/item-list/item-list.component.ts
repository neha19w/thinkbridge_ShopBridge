import { Component, OnInit } from "@angular/core";
import { ItemService } from "../item.service";
import { Items } from "../Items";
import { Observable, Subject } from "rxjs";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"],
})
export class ItemListComponent implements OnInit {
  constructor(private itemservice: ItemService) {}

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  items_array: Observable<Items[]>;
  items: Items = new Items();
  deleteMessage = false;
  itemlist: any;
  isupdated = false;

  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [
        [6, 16, 20, -1],
        [6, 16, 20, "All"],
      ],
      processing: true,
    };
    this.itemservice.getItemList().subscribe((data) => {
      this.items_array = data;
      this.dtTrigger.next();
    });
  }

  deleteItem(id: number) {
    this.itemservice.deleteItem(id).subscribe(
      (data) => {
        console.log(data);
        this.deleteMessage = true;
        this.itemservice.getItemList().subscribe((data) => {
          this.items_array = data;
        });
      },
      (error) => console.log(error)
    );
  }

  updateItem(id: number) {
    this.itemservice.getItem(id).subscribe(
      (data) => {
        this.itemlist = data;
      },
      (error) => console.log(error)
    );
  }

  itemupdateform = new FormGroup({
    item_id: new FormControl(),
    item_name: new FormControl(),
    item_price: new FormControl(),
    item_details: new FormControl(),
  });

  updateStu(updstu) {
    this.items = new Items();
    this.items.item_id = this.ItemId.value;
    this.items.item_name = this.ItemName.value;
    this.items.item_price = this.ItemPrice.value;
    this.items.item_details = this.ItemDetails.value;

    console.log(this.ItemName.value);

    this.itemservice.updateItem(this.items.item_id, this.items).subscribe(
      (data) => {
        this.isupdated = true;
        this.itemservice.getItemList().subscribe((data) => {
          this.items_array = data;
        });
      },
      (error) => console.log(error)
    );
  }

  get ItemName() {
    return this.itemupdateform.get("item_name");
  }

  get ItemPrice() {
    return this.itemupdateform.get("item_price");
  }

  get ItemDetails() {
    return this.itemupdateform.get("item_details");
  }

  get ItemId() {
    return this.itemupdateform.get("item_id");
  }

  changeisUpdate() {
    this.isupdated = false;
  }
}
