import { set_grams, toggle_product, total_grams, type OrderLine } from './order';

// Estado compartido del pedido: lo usan la despensa (chips) y el armador de pedidos.

class OrderState {
	lines = $state<OrderLine[]>([]);
	total = $derived(total_grams(this.lines));

	has(product: string): boolean {
		return this.lines.some((line) => line.product === product);
	}

	toggle(product: string) {
		this.lines = toggle_product(this.lines, product);
	}

	set_grams(product: string, grams: number) {
		this.lines = set_grams(this.lines, product, grams);
	}

	clear() {
		this.lines = [];
	}
}

export const order = new OrderState();
