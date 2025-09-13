export interface Avatar {
  id: string;
  name: string;
  appearance: {
    gender: string;
    age: string;
    hair: string;
    clothing: string;
  };
  personalityTraits: string[];
  createdAt: Date;
}