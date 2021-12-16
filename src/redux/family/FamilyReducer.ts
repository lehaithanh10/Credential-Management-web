import { FamilyInfo } from '../../types/family';
import { FamilyAction, FamilyGeneralAction } from './FamilyAction';

export interface FamilyReduxState {
  currentFamily: FamilyInfo;
}

export const INITIAL_FAMILY_STATE: FamilyReduxState = {
  currentFamily: {
    id: '1',
    address: '39 Dich Vong Cau Giay',
    numberPeople: 4,
    contact: '0981497748',
    nameOwner: 'Le Hai Thanh',
  },
};

const FamilyReducer = (
  state = INITIAL_FAMILY_STATE,
  action: FamilyGeneralAction<any>,
): FamilyReduxState => {
  switch (action.type) {
    case FamilyAction.EDIT_CURRENT_FAMILY: {
      return {
        ...state,
        currentFamily: action.payload,
      };
    }
    default:
      return state;
  }
};

export default FamilyReducer;
