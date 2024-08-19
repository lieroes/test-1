// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: string;
				email: string | null;
				phone: string | null;
				registrationStage: number;
				role: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
