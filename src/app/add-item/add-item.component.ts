import { Component, OnInit } from "@angular/core";
import { ItemService } from "../item.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Items } from "../Items";
@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.css"],
})
export class AddItemComponent implements OnInit {
  constructor(private itemservice: ItemService) {}

  item: Items = new Items();
  submitted = false;

  ngOnInit() {
    this.submitted = false;
  }

  itemsaveform = new FormGroup({
    item_name: new FormControl(),
    item_price: new FormControl(),
    item_details: new FormControl(),
  });

  saveItem(saveItem) {
    this.item = new Items();
    this.item.item_name = this.ItemName.value;
    this.item.item_price = this.ItemPrice.value;
    this.item.item_details = this.ItemDetails.value;
    this.submitted = true;
    console.log(this.item);

    this.save();
  }

  save() {
    console.log(this.item);
    this.itemservice.createItem(this.item).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.item = new Items();
    this.submitted = true;
  }

  get ItemName() {
    return this.itemsaveform.controls["item_name"].value;
  }

  get ItemPrice() {
    return this.itemsaveform.controls["item_price"].value;
  }

  get ItemDetails() {
    return this.itemsaveform.controls["item_details"].value;
  }

  addItemForm() {
    this.submitted = false;
    this.itemsaveform.reset();
  }
}
