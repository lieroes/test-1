import { networkFee, serviceFee } from '$lib/constant';
import { writable } from 'svelte/store';

const defaultAmount = '0.0';
const newAmountRounding = 7;

const store = writable({
	exchangeRate: null,
	from: {
		amount: defaultAmount,
		update: (newAmount: string) => {
			const floatAmount = parseFloat(newAmount);

			store.update((store) => {
				if (!store.exchangeRate) return store;
				if (isNaN(floatAmount)) {
					store.from.amount = '';
					store.to.amount = defaultAmount;
					return store;
				}

				store.from.amount = newAmount;
				store.to.amount = (floatAmount * store.exchangeRate).toFixed(newAmountRounding);

				return store;
			});
		}
	},
	to: {
		amount: defaultAmount,
		update: (newAmount: string) => {
			const floatAmount = parseFloat(newAmount);

			store.update((store) => {
				if (!store.exchangeRate) return store;
				if (isNaN(floatAmount)) {
					store.from.amount = defaultAmount;
					store.to.amount = '';
					return store;
				}

				store.to.amount = newAmount;
				store.from.amount = (floatAmount / store.exchangeRate).toFixed(newAmountRounding);

				return store;
			});
		}
	},
	serviceFee: '0',
	resetAmount: () => {
		store.update((store) => {
			store.from.amount = defaultAmount;
			store.to.amount = defaultAmount;

			return store;
		});
	}
});

export default store;
