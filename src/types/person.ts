export interface PersonInfo {
  id: number;
  image: string;
  phoneNumber: string;
  relationship: string;
  job: string;
  status: string;
  canCuocCongDan: string;
  address: string;
  dateOfBirth: string;
  firstName: string;
  gender: string;
  idSHK?: string;
  lastName: string;
  specialNotes?: string;
}

export enum PersonStatus {
  LIVE = 'Đang cư trú',
  TEMPORARY_LIVE = 'Tạm trú',
  TEMPORARY_ABSENT = 'Tạm vắng',
  DIE = 'Đã qua đời',
}

export const personStatus: PersonStatus[] = [
  PersonStatus.TEMPORARY_ABSENT,
  PersonStatus.TEMPORARY_LIVE,
  PersonStatus.DIE,
  PersonStatus.LIVE,
];
