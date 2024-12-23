import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dishes: any[] = [];
  createProductForm!: FormGroup;
  updateForm!: FormGroup;

  showCreateProductModal = false;
  showModifyProductModal = false;
  newProduct = { name: '', category: 'plats', price: 0 };
  currentProduct: any = null;

  constructor(private formBuilder: FormBuilder, private dishService: DishService) {}

  ngOnInit(): void {
    this.loadDishes();
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  openCreateProductModal() {
    this.showCreateProductModal = true;
  }

  closeCreateProductModal() {
    this.showCreateProductModal = false;
    this.newProduct = { name: '', category: 'plats', price: 0 };
  }

  createProduct(): void {
    if (this.createProductForm.invalid) {
      return;
    }

    this.dishService.createDish(this.createProductForm.value).subscribe(
      response => {
        console.log('Dish created successfully', response);
        this.closeCreateProductModal();
        this.loadDishes(); // Reload the dishes list after creating a new dish
      },
      error => {
        console.error('Error creating dish', error);
      }
    );
  }

  openModifyProductModal(product: any) {
    this.currentProduct = { ...product };
    this.updateForm.patchValue(this.currentProduct); // Populate the form with current product data
    this.showModifyProductModal = true;
  }

  closeModifyProductModal() {
    this.showModifyProductModal = false;
    this.currentProduct = null;
  }

  onUpdateDish(): void {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedDish = this.updateForm.value;

    this.dishService.updateDish(this.currentProduct._id, updatedDish).subscribe(
      data => {
        console.log('Dish updated successfully', data);
        this.loadDishes(); // Reload the list of dishes after update
        this.closeModifyProductModal(); // Close the modal after update
      },
      error => {
        console.error('Failed to update dish:', error);
      }
    );
  }

  onDeleteDish(id: string): void {
    this.dishService.deleteDish(id).subscribe(
      () => {
        console.log('Dish deleted successfully');
        this.loadDishes(); // Reload the list of dishes after deletion
      },
      (error) => {
        console.error('Failed to delete dish:', error);
      }
    );
  }

  loadDishes(): void {
    this.dishService.getAllDishes().subscribe(
      data => {
        this.dishes = data;
        console.log('Dishes loaded successfully:', this.dishes);
      },
      error => {
        console.error('Failed to load dishes:', error);
      }
    );
  }
}
