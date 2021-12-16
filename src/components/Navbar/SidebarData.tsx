import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineMoneyCollect,
  AiOutlineUser,
} from 'react-icons/ai';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { SidebarItem } from '../../models/SidebarItem';

export const SidebarData: SidebarItem[] = [
  {
    title: 'Quản lý hộ gia đình',
    path: '/family',
    icon: <AiOutlineHome />,
    // iconClosed: <AiFillCaretDown />,
    // iconOpened: <AiFillCaretUp />,
    // subnav: [
    //   {
    //     title: 'Users',
    //     path: '/overview/users',
    //     icon: <AiOutlineUser />,
    //   },
    //   {
    //     title: 'Revenue',
    //     path: '/overview/revenue',
    //     icon: <AiOutlineMoneyCollect />,
    //   },
    // ],
  },
  {
    title: 'Quản lý quỹ',
    path: '/funding',
    icon: <RiMoneyDollarBoxFill />,
  },
  {
    title: 'Quản lý nhân khẩu',
    path: '/people',
    icon: <AiOutlineUser />,
  },
];
