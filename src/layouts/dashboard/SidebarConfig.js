import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = {
  admin: [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'faculty',
      path: '/dashboard/user',
      icon: getIcon(peopleFill)
    },
    {
      title: 'socities',
      path: '/dashboard/products',
      icon: getIcon(shoppingBagFill)
    }
    // {
    //   title: 'Upcomming Events',
    //   path: '/dashboard/blog',
    //   icon: getIcon(fileTextFill)
    // }
  ],
  teacher: [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'requests',
      path: '/dashboard/user',
      icon: getIcon(peopleFill)
    },
    {
      title: 'Team',
      path: '/dashboard/products',
      icon: getIcon(shoppingBagFill)
    }
    // {
    //   title: 'blog',
    //   path: '/dashboard/blog',
    //   icon: getIcon(fileTextFill)
    // }
  ],
  president: [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'requests',
      path: '/dashboard/user',
      icon: getIcon(peopleFill)
    },
    {
      title: 'team',
      path: '/dashboard/products',
      icon: getIcon(shoppingBagFill)
    },
    {
      title: 'induction results',
      path: '/dashboard/blog',
      icon: getIcon(fileTextFill)
    }
  ],
  head: [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'team',
      path: '/dashboard/user',
      icon: getIcon(peopleFill)
    },
    // {
    //   title: 'product',
    //   path: '/dashboard/products',
    //   icon: getIcon(shoppingBagFill)
    // },
    {
      title: 'induction results',
      path: '/dashboard/blog',
      icon: getIcon(fileTextFill)
    }
  ]
};

export default sidebarConfig;
