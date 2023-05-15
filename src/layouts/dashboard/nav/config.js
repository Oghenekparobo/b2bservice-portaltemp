import SvgColor from '../../../components/svg-color';

const user = localStorage.getItem('user');

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: user === 'merchant' ? 'sub-merchant' : user === 'super-admin' ? 'merchants' : 'default-merchant',
    path:
      user === 'merchant'
        ? '/dashboard/sub-merchant'
        : user === 'super-admin'
        ? '/dashboard/merchants'
        : '/dashboard/default-merchant',
    icon: icon('ic_user'),
  },
  {
    title: user === 'merchant' ? 'create sub-merchant' : user === 'super-admin' ? 'Create Merchant' : 'Default Create',
    path:
      user === 'merchant'
        ? '/dashboard/'
        : user === 'super-admin'
        ? '/dashboard/onboard'
        : '/dashboard/default-onboard',
    icon: icon('ic_user'),
  },
  {
    title: user && 'logout',
    path: '/logout',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
