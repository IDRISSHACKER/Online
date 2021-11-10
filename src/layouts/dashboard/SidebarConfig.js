import { Icon } from '@iconify/react';
import pieChartOutline from '@iconify/icons-eva/pie-chart-outline';
import peopleOutline from '@iconify/icons-eva/people-outline';
import shoppingBagOutline from '@iconify/icons-eva/shopping-bag-outline';
import fileTextOutline from '@iconify/icons-eva/file-text-outline';
import lockFill from '@iconify/icons-eva/lock-outline';
import personAddOutline from '@iconify/icons-eva/person-add-outline';
import alertTriangleOutline from '@iconify/icons-eva/alert-triangle-outline';
import layoutOutline from "@iconify/icons-eva/layout-outline"
import uploadOutline from "@iconify/icons-eva/upload-outline"


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'tableau de bord',
    path: '/admin/dashboard',
    icon: getIcon(pieChartOutline)
  },
  {
    title: 'produits',
    path: '/admin/post-list',
    icon: getIcon(shoppingBagOutline)
  },
  {
    title: 'Categories',
    path: '/admin/create-category',
    icon: getIcon(fileTextOutline)
  },
  {
    title: 'Caroussel',
    path: '/admin/build-slide',
    icon: getIcon(layoutOutline)
  },
  {
    title: 'utilisateurs',
    path: '/admin/users',
    icon: getIcon(peopleOutline)
  },
];

  /*{
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }*/
export default sidebarConfig;