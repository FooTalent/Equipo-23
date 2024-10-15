import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  isUser: boolean;
  options?: string[];
  countRequired?: boolean;
  isConfirmation?: boolean;
  isAddAnother?: boolean;
  isDisabled?: boolean; // Nueva propiedad
}

interface ProductInfo {
  type: string;
  market: string;
  budget: string;
  timeline: string;
  quantity: number;
}
@Component({
  selector: 'app-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-bot.component.html',
  styleUrls: ['./product-bot.component.css'],
})
export class ProductBotComponent implements OnInit {
  messages: ChatMessage[] = [];
  currentStep = 0;
  productInfo: ProductInfo = {
    type: '',
    market: '',
    budget: '',
    timeline: '',
    quantity: 1,
  };
  allProducts: ProductInfo[] = [];
  isComplete = false;
  productCount: number = 1;

  @Input() hidePopUp!: () => void;
  @Input() showBot!: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.startNewChat();
  }

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  questions = [
    {
      text: '¡Hola! Vamos a cargar tus productos en el inventario. ¿Cómo querés realizar el proceso?',
      options: ['Carga Manual'],
      isAnswered: false, // Nueva propiedad
    },
    {
      text: '¿Va a estar a la venta inmediatamente?',
      options: ['Si', 'No'],
      isAnswered: false, // Nueva propiedad
    },
    {
      text: 'Bien. Empecemos por lo básico. ¿Cuantas unidades de este nuevo producto vas a agregar?',
      countRequired: true,
    },
    {
      text: '¿En cuál de tus categorías vas a colocar el producto?',
      options: ['Ropa', 'Alimentos', 'Electronica', 'Juegos', 'Vehiculos'],
    },
    {
      text: 'Indicá un nombre para el producto',
      options: ['1-3 meses', '3-6 meses', '6-12 meses'],
    },
    {
      text: 'Añadi una descripción de tu producto',
      options: ['1-3 meses', '3-6 meses', '6-12 meses'],
    },
    {
      text: '¿Cuál es el precio por unidad de este producto?',
      countRequired: true,
    },
    { text: '¿Confirmas la siguiente información?', isConfirmation: true },
    { text: '¿Deseas agregar otro producto?', isAddAnother: true },
  ];

  isOptionDisabled: boolean = false;
  optionsDisabled: boolean[] = []; // Nuevo array para rastrear el estado de los botones

  startNewChat() {
    this.messages = [];
    this.currentStep = 0;
    this.resetProductInfo();
    this.isOptionDisabled = false; // Reiniciar el estado
    this.optionsDisabled = Array(this.questions.length).fill(false); // Inicializar el estado de los botones
    this.nextQuestion();
  }

  nextQuestion() {
    this.isOptionDisabled = false; // Restablecer el estado aquí
    if (this.currentStep < this.questions.length) {
        const question = this.questions[this.currentStep];
        this.messages.forEach((message, index) => {
            message.isDisabled = index !== this.messages.length - 1; // Deshabilitar si no es el último mensaje
        });

        if (question.isConfirmation) {
            this.showConfirmation();
        } else if (question.isAddAnother) {
            this.askAddAnother();
        } else {
            this.messages.push({
                text: question.text,
                isUser: false,
                options: question.options,
                countRequired: question.countRequired,
                isConfirmation: question.isConfirmation,
                isAddAnother: question.isAddAnother,
                isDisabled: false, // Habilitar el nuevo mensaje
            });
        }
    } else {
        this.isComplete = true;
        this.messages.push({
            text: '¡Gracias por tu información!',
            isUser: false,
        });
    }
  }

  advance() {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.isOptionDisabled = true; // Deshabilitar opciones
      this.nextQuestion();
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }, 0);
  }

  selectOption(option: string) {
    this.messages.push({ text: option, isUser: true });
    
    // Marcar la pregunta actual como respondida
    this.questions[this.currentStep].isAnswered = true;

    switch (this.currentStep) {
      case 0:
        this.productInfo.type = option;
        break;
      case 1:
        this.productInfo.market = option;
        break;
      case 2:
        this.productInfo.budget = option;
        break;
      case 3:
        this.productInfo.timeline = option;
        break;
    }

    this.advance();
  }

  incrementCount() {
    this.productCount++;
    this.validateCount();
  }

  decrementCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }
    this.validateCount();
  }

  validateCount() {
    this.productCount = Math.max(1, Math.round(this.productCount));
    this.productInfo.quantity = this.productCount;
  }

  showConfirmation() {
    const confirmationText = `
      <strong>Tipo de producto:</strong> ${this.productInfo.type}<br>
      <strong>Mercado:</strong> ${this.productInfo.market}<br>
      <strong>Presupuesto:</strong> ${this.productInfo.budget}<br>
      <strong>Tiempo de lanzamiento:</strong> ${this.productInfo.timeline}<br>
      <strong>Cantidad:</strong> ${this.productInfo.quantity}
    `;
    this.messages.push({
      text: confirmationText,
      isUser: false,
      isConfirmation: true,
    });
  }

  confirmInfo(confirmed: boolean) {
    if (confirmed) {
      this.messages.push({ text: 'Información confirmada', isUser: true });
      this.allProducts.push({ ...this.productInfo });
      this.advance();
    } else {
      this.messages.push({
        text: 'Volviendo al inicio para editar',
        isUser: true,
      });
      this.startNewChat();
    }
  }

  askAddAnother() {
    this.messages.push({
      text: '¿Deseas agregar otro producto?',
      isUser: false,
      isAddAnother: true,
    });
  }

  addAnotherProduct(add: boolean) {
    if (add) {
      this.messages.push({ text: 'Agregando otro producto', isUser: true });
      this.startNewChat();
    } else {
      this.messages.push({ text: 'Finalizando el proceso', isUser: true });
      this.isComplete = true;
      this.messages.push({
        text: '¡Gracias por tu información! Hemos registrado todos tus productos.',
        isUser: false,
      });
    }
  }

  resetProductInfo() {
    this.productInfo = {
      type: '',
      market: '',
      budget: '',
      timeline: '',
      quantity: 1,
    };
    this.productCount = 1;
  }

  sendToBackend() {
    console.log('enviado al backend');
  }
}
