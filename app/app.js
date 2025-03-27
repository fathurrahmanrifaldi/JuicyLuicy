// Products
document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
      items: [
        { id: 1, name: 'Matcha Depan', img: 'produk1.jpg', price: 30000 },
        { id: 2, name: 'Tango Gogogo', img: 'produk2.jpg', price: 25000 },
      ],
    }));

// Keranjang
Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    addItem(newItem) {
        const cartItem = this.items.find(item => item.id === newItem.id);
        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.items.push({ ...newItem, quantity: 1 });
        }
        this.quantity++;
        this.total += newItem.price;
    },
    removeItem(index) {
        const item = this.items[index];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.items.splice(index, 1);
        }
        this.quantity--;
        this.total -= item.price;
      }
    });

// Konversi ke Rupiah Keranjang
Alpine.data('cart', () => ({
    rupiah(value) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
      }
    }));
  });

// Konversi ke Rupiah Products
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};