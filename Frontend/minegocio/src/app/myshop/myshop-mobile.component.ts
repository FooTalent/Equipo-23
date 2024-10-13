import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-myshop-mobile',
  templateUrl: './myshop-mobile.component.html',
  imports: [CommonModule]
})
export class MyShopMobileComponent {
  @Input() products!: any[]; // Asegúrate de especificar el tipo correcto
  @Input() isLoading!: boolean;
  @Input() loadingSpinner!: boolean;
  @Input() totalPages!: number; // Usar la aserción de asignación definitiva
  @Input() currentPage!: number;
  @Input() searchQuery!: string;
  @Input() goToPreviousPage!: () => void;
  @Input() goToNextPage!: () => void;
  @Input() changeProductStatus!: (id:string) => void;
  @Input() goToProduct!: (id: string) => void;
  @Input() searchProducts!: () => void;
  @Input() goToPage!: (page: number) => void;
  // Aquí puedes agregar la lógica del componente si es necesario
}
