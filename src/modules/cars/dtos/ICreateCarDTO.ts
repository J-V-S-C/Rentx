interface ICreateCarDTO {
  name: string;
  description: string;
  daily_number: number;
  fine_amount: number;
  license_plate: string;
  brand: string;
  category_id: string;
}

export type { ICreateCarDTO };
