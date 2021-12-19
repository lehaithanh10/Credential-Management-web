import { PersonInfo } from './person';

export interface FamilyInfo {
  id: string;
  address: string;
  soTVien: number;
  contact: string;
  owner: string;
  members: PersonInfo[];
}
