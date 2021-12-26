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
      title: 'all events',
      path: '/dashboard/all-events',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'socities',
      path: '/dashboard/socities',
      icon: getIcon(shoppingBagFill)
    }
    // {
    //   title: 'Manage Access',
    //   path: '/dashboard/manage-access',
    //   icon: getIcon(fileTextFill)
    // }
  ],
  teacher: [
    {
      title: 'events',
      path: '/dashboard/events',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'inductions',
      path: '/dashboard/induction',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'event request',
      path: '/dashboard/event-request',
      icon: getIcon(shoppingBagFill)
    },

    {
      title: 'Team',
      path: '/dashboard/team',
      icon: getIcon(peopleFill)
    },
    {
      title: 'induction request',
      path: '/dashboard/induction-request',
      icon: getIcon(shoppingBagFill)
    }
    // {
    //   title: 'Manage Access',
    //   path: '/dashboard/manage-access',
    //   icon: getIcon(fileTextFill)
    // }
    // {
    //   title: 'blog',
    //   path: '/dashboard/blog',
    //   icon: getIcon(fileTextFill)
    // }
  ],
  president: [
    {
      title: 'events',
      path: '/dashboard/events',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'induction',
      path: '/dashboard/induction',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'team',
      path: '/dashboard/team',
      icon: getIcon(shoppingBagFill)
    }
    // {
    //   title: 'Manage Access',
    //   path: '/dashboard/manage-access',
    //   icon: getIcon(fileTextFill)
    // }
  ],
  head: [
    {
      title: 'events',
      path: '/dashboard/events',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'induction',
      path: '/dashboard/induction',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'team',
      path: '/dashboard/team',
      icon: getIcon(peopleFill)
    }
    // {
    //   title: 'Manage Access',
    //   path: '/dashboard/manage-access',
    //   icon: getIcon(fileTextFill)
    // }
  ],
  unauthorized: []
};

export default sidebarConfig;
