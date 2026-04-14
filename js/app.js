const app = new Vue({
  el: '#app',
  data: {
    menuItems: [
      {
        id: 101,
        name: 'Pizza',
        description: 'A flattened, baked bread dough base topped with savory tomato sauce and melted cheese.',
        price: 13.99,
        amount: 1,
        image: 'https://suebeehomemaker.com/wp-content/uploads/2024/09/supreme-pizza-recipe-6-1024x1536.jpg',
        availableOptions: ['cauliflower dough', 'thin crust', 'standard'],
        selectedOptions: ['cauliflower dough'],
        optionPrice: 2.0,
      },
      {
        id: 102,
        name: 'Nachos',
        description: 'Tortilla chips topped with melted cheese, savory toppings, and jalapeños.',
        price: 15.99,
        amount: 1,
        image: 'https://bigdeliciouslife.com/wp-content/uploads/2023/03/veggie-nachos-9-1152x1536.jpg',
        availableOptions: ['chicken', 'chili', 'beef'],
        selectedOptions: ['chicken'],
        optionPrice: 3.0,
      },
      {
        id: 103,
        name: 'Wraps',
        description: 'Portable sandwich made by rolling fillings such as meats, cheeses, and veggies.',
        price: 11.99,
        amount: 1,
        image: 'https://www.cookingclassy.com/wp-content/uploads/2016/07/chicken-caesar-wrap-3-730x1095.jpg',
        availableOptions: ['caesar', 'buffalo'],
        selectedOptions: ['buffalo'],
        optionPrice: 2.0,
      },
    ],
    couponCode: '',
    appliedCoupon: null,
    couponMessage: '',
    shippingMethod: 'standard',
    shippingRates: {
      standard: 5.0,
      express: 10.0,
      overnight: 20.0,
    },
  },
  computed: {
    itemsCount() {
      return this.menuItems.reduce((count, item) => count + item.amount, 0);
    },
    subtotal() {
      return this.menuItems.reduce((sum, item) => {
        const optionTotal = (item.selectedOptions || []).length * item.optionPrice;
        return sum + (item.price + optionTotal) * item.amount;
      }, 0);
    },
    shippingCost() {
      return this.shippingRates[this.shippingMethod] || 0;
    },
    discount() {
      return this.appliedCoupon === 'FLOWER23' ? this.subtotal * 0.10 : 0;
    },
    totalPrice() {
      return this.subtotal - this.discount + this.shippingCost;
    },
    subtotalFormatted() {
      return `$${this.subtotal.toFixed(2)}`;
    },
    totalFormatted() {
      return `$${this.totalPrice.toFixed(2)}`;
    },
  },
  methods: {
    itemTotal(item) {
      const optionTotal = (item.selectedOptions || []).length * item.optionPrice;
      return (item.price + optionTotal) * item.amount;
    },
    applyCoupon() {
      const code = this.couponCode.trim().toUpperCase();
      if (code === 'FLOWER23') {
        this.appliedCoupon = code;
        this.couponMessage = 'Coupon applied! 10% off';
      } else {
        this.appliedCoupon = null;
        this.couponMessage = 'Invalid coupon code';
      }
    },
  },
});