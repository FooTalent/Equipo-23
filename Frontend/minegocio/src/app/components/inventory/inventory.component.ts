import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";
import { AuthService } from "../../services/auth.service";
import { Product } from "../../interfaces/product.model";

@Component({
	selector: "app-inventory",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, CommonModule],
	templateUrl: "./inventory.component.html",
	styleUrls: ["./inventory.component.css"]
})
export class InventoryComponent implements OnInit {
	productForm: FormGroup;
	products: Product[] = [];
	vendorId: string | null = null;
	selectedFile: File | null = null; // Archivo de imagen seleccionado

	constructor(private productService: ProductService, private authService: AuthService, private fb: FormBuilder) {
		this.productForm = this.fb.group({
			title: ["", Validators.required],
			description: ["", Validators.required],
			code: ["", Validators.required],
			price: [0, Validators.required],
			stock: [0, Validators.required],
			category: ["", Validators.required],
			thumbnails: [null],
			status: [true]
		});
	}

	ngOnInit(): void {
		this.vendorId = this.authService.getVendorId(); // Obtener el vendorId del AuthService
		if (this.vendorId) {
			this.loadProducts();
		}
	}
	onFileChange(event: any) {
		const file = event.target.files[0]; // Obtiene el archivo del input
		if (file) {
			this.selectedFile = file; // Guarda el archivo seleccionado
			this.productForm.patchValue({
				image: file // Actualiza el formulario con el archivo
			});
		}
	}

	loadProducts() {
		if (this.vendorId) {
			this.productService.getProducts(this.vendorId).subscribe((products) => {
				this.products = products;
			});
		}
	}

	addProduct() {
		if (this.productForm.valid && this.vendorId) {
			const product: Product = {
				...this.productForm.value,
				vendorId: this.vendorId
			};
			this.productService.addProduct(product).subscribe(() => {
				this.loadProducts();
			});
		}
	}

	updateProduct(productId: string) {
		if (this.productForm.valid && this.vendorId) {
			const updatedProduct: Product = {
				...this.productForm.value,
				vendorId: this.vendorId
			};
			this.productService.updateProduct(productId, updatedProduct).subscribe(() => {
				this.loadProducts();
			});
		}
	}

	deleteProduct(productId: string) {
		this.productService.deleteProduct(productId).subscribe(() => {
			this.loadProducts();
		});
	}
}
