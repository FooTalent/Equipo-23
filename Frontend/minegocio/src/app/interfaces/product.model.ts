export interface Product {
	id?: string;
	title: string;
	description: string;
	code: string;
	price: number;
	stock: number;
	category: string;
	thumbnails?: { name: string; reference: string }[];
	status: boolean;
	vendorId: string;
}
