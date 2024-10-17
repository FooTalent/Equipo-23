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
  isDisabled?: boolean;
}

interface ProductInfo {
  type: string;
  status: string;
  name: string;
  budget: string;
  categories: string;
  description: any;
  price: any;
  quantity: number;
  image?: string; // Agregado para almacenar la imagen del producto
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
    status: '',
    description: '',
    name: '',
    price: 0,
    budget: '',
    categories: '',
    quantity: 1,
  };
  allProducts: ProductInfo[] = [];
  isComplete = false;
  productCount: number = 1;
  inputDisabled: boolean = true;
  glowSendButton: boolean = false;
  isPriceInput: boolean = false;
  loadImage: boolean = false;
  fileInput: any 

  @Input() hidePopUp!: () => void;
  @Input() showBot!: boolean;

  showBackground: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.startNewChat();
  }

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  questions = [
    {
      text: '¡Hola! Vamos a cargar tus productos en el inventario. ¿Cómo querés realizar el proceso?',
      options: ['Carga Manual'],
      isAnswered: false,
    },
    {
      text: '¿Va a estar a la venta inmediatamente?',
      options: ['Si', 'No'],
      isAnswered: false,
    },
    {
      text: 'Bien. Empecemos por lo básico. ¿Cuantas unidades de este nuevo producto vas a agregar?',
      countRequired: true,
      glowSendButton: true,
    },
    {
      text: '¿En cuál de tus categorías vas a colocar el producto?',
      options: ['Ropa', 'Alimentos', 'Electronica', 'Juegos', 'Vehiculos'],
    },
    {
      text: 'Indicá un nombre para el producto',
      disableInput: false,
      glowSendButton: true,
    },
    {
      text: 'Añadi una descripción de tu producto',
      disableInput: false,
      glowSendButton: true,
    },
    {
      text: '¿Cuál es el precio por unidad de este producto?',
      disableInput: false,
      glowSendButton: true,
      priceInput: true,
    },
    {
      text: 'Por favor, carga una imagen del producto',
      disableInput: false,
      loadImage: true,
      glowSendButton: true,
    },
    { text: '¿Confirmas la siguiente información?', isConfirmation: true },
    { text: '¿Deseas agregar otro producto?', isAddAnother: true },
  ];

  isOptionDisabled: boolean = false;
  optionsDisabled: boolean[] = [];

  userResponse: string = '';

  startNewChat() {
    this.messages = [];
    this.currentStep = 0;
    this.resetProductInfo();
    this.isOptionDisabled = false;
    this.optionsDisabled = Array(this.questions.length).fill(false);
    this.nextQuestion();
  }

  nextQuestion() {
    this.isOptionDisabled = false;

    if (this.currentStep < this.questions.length) {
      const question = this.questions[this.currentStep];

      if (question.disableInput == false || question.loadImage) {
        this.inputDisabled = false;
      } else {
        this.inputDisabled = true;
      }

      if (question.priceInput == true) {
        this.isPriceInput = false;
      } else {
        this.isPriceInput = true;
      }

      if (question.loadImage) {
        {
          this.loadImage = true;
        }
      } else {
        this.loadImage = false;
      }

      if (question.glowSendButton) {
        {
          this.glowSendButton = true;
        }
      } else {
        this.glowSendButton = false;
      }

      this.messages.forEach((message, index) => {
        message.isDisabled = index !== this.messages.length - 1;
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
          isDisabled: false,
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
    if (this.questions[this.currentStep].countRequired == true) {
      this.messages.push({
        text: this.productInfo.quantity.toString(),
        isUser: true,
      });
    }
    if (this.currentStep < this.questions.length) {
      const currentQuestion = this.questions[this.currentStep];

      if (this.userResponse.trim()) {
        if (currentQuestion.text.includes('nombre')) {
          this.productInfo.name = this.userResponse;
        } else if (currentQuestion.text.includes('descripción')) {
          this.productInfo.description = this.userResponse;
        } else if (currentQuestion.text.includes('precio')) {
          this.productInfo.price = parseFloat(this.userResponse);
        } else if (currentQuestion.text.includes('imagen')) {
          this.productInfo.image = this.userResponse; // Almacena la imagen
        }
      } else {
        this.scrollToBottom();
        this.currentStep++;
        this.nextQuestion();
        return;
      }

      this.messages.push({ text: this.userResponse, isUser: true });
      this.currentStep++;
      this.userResponse = '';
      this.scrollToBottom();
      this.nextQuestion();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }, 10);
  }

  selectOption(option: string) {
    this.messages.push({ text: option, isUser: true });
    this.questions[this.currentStep].isAnswered = true;

    switch (this.currentStep) {
      case 0:
        this.productInfo.type = option;
        break;
      case 1:
        this.productInfo.status = option;
        break;
      case 2:
        this.productInfo.quantity = parseInt(option, 10);
        break;
      case 3:
        this.productInfo.categories = option;
        break;
      case 4:
        this.productInfo.name = option;
        break;
      case 5:
        this.productInfo.description = option;
        break;
      case 6:
        this.productInfo.price = option;
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
    Hemos llegado al final.<br> Controlá que los datos registrados son correctos.<br><br>

     <strong>Nombre</strong>:${this.productInfo.name}<br>
     <strong>Descripcion:</strong> ${this.productInfo.description}<br>
     <strong>Cantidad:</strong> ${this.productInfo.quantity}<br>
     <strong>Categoria:</strong> ${this.productInfo.categories}<br>
     <strong>Precio por unidad:</strong> ${this.productInfo.price}<br>
     <strong>¿Esta a la venta:</strong> ${this.productInfo.status}<br>
     <br>
  ¿Es correcto?
    `;
    this.messages.push({
      text: confirmationText,
      isUser: false,
      isConfirmation: true,
    });
  }

  confirmInfo(confirmed: boolean) {
    if (confirmed) {
      this.messages.push({ text: 'Si, es correcto', isUser: true });
      this.scrollToBottom();
      this.isComplete = true;
      this.allProducts.push({ ...this.productInfo });
      this.sendToBackend(); // Llama al método sendToBackend aquí
      this.resetProductInfo()
      setTimeout(() => {
        this.isComplete = false;
        this.hidePopUp();
        this.showBot = false;
        this.showBackground = false;
        this.startNewChat();
      }, 2000);
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
      status: '',
      budget: '',
      categories: '',
      quantity: 1,
      name: '',
      description: '',
      price: 0,
    };
    this.userResponse = ''
    this.productCount = 1;
  }

  sendToBackend() {
    console.log('enviado al backend', this.productInfo);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userResponse = e.target?.result as string; // Almacena la imagen como base64 en userResponse
    };
    this.advance()
      reader.readAsDataURL(file);
    }
  }
}
