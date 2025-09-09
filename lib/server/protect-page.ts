import type { GetServerSidePropsContext } from 'next';

import { parseCookies } from 'nookies';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import type { User } from '@/types/user';

import { userApi } from '../api/user';

const roleAccessMap: Record<string, (path: string) => boolean> = {
  SUB: path => path.startsWith('/sub-admin'),
  SUPER: path => path.startsWith('/super-admin'),
};

const roleRedirectMap: Record<string, string> = {
  SUB: '/sub-admin',
  SUPER: '/super-admin',
};

const redirectTo = (destination: string) => ({
  redirect: {
    destination,
    permanent: false,
  },
});

export const protectPage = async (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context);
  const rawCookie = cookies[STORAGE_KEYS.AUTH_COOKIE];

  if (!rawCookie || rawCookie === 'undefined') {
    console.error('Auth cookie missing');
    return redirectTo('/auth');
  }

  let parsed: { token?: string };
  try {
    parsed = JSON.parse(rawCookie);
  } catch (err) {
    console.error('Invalid cookie format:', err);
    return redirectTo('/auth');
  }

  const { token } = parsed;

  if (!token || token === 'undefined') {
    console.error('No access token found');
    return redirectTo('/auth');
  }

  try {
    const user: User = await userApi.getCurrentUserByToken(token);

    console.log('User Data: ', user);
    const userRole: string | null = user.role || null;

    if (!userRole) {
      console.log('No user role found, redirecting to unauthorized page');
      return redirectTo('/unauthorized');
    }

    if (!['SUB', 'SUPER'].includes(userRole)) {
      console.log(
        `Invalid user role: ${userRole}, redirecting to unauthorized page`
      );
      return redirectTo('/unauthorized');
    }

    const hasAccess = roleAccessMap[userRole]?.(context.resolvedUrl) || false;

    if (!hasAccess) {
      console.log(
        `User with role ${userRole} tried to access ${context.resolvedUrl}`
      );

      const userDashboard = roleRedirectMap[userRole];
      return redirectTo(userDashboard);
    }

    return {
      props: {
        user,
      },
    };
  } catch (error: any) {
    console.error('Error during user verification:', error.message);

    if (error?.response?.status === 401 || error?.message === 'Token expired') {
      return redirectTo('/auth');
    }

    return redirectTo('/404');
  }
};

export const protectSubAdminPage = async (
  context: GetServerSidePropsContext
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (userRole !== 'SUB') {
      console.log(`SUB admin page accessed by ${userRole}, redirecting`);
      return redirectTo(roleRedirectMap[userRole] || '/unauthorized');
    }
  }

  return result;
};

export const protectSuperAdminPage = async (
  context: GetServerSidePropsContext
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (userRole !== 'SUPER') {
      console.log(`SUPER admin page accessed by ${userRole}, redirecting`);
      return redirectTo(roleRedirectMap[userRole] || '/unauthorized');
    }
  }

  return result;
};

export const protectAnyAdminPage = async (
  context: GetServerSidePropsContext
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (!['SUB', 'SUPER'].includes(userRole)) {
      console.log(`Admin page accessed by non-admin ${userRole}, redirecting`);
      return redirectTo('/unauthorized');
    }
  }

  return result;
};

export const protectPageWithRoles = async (
  context: GetServerSidePropsContext,
  allowedRoles: string[],
  customRedirect?: string
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (!allowedRoles.includes(userRole)) {
      console.log(
        `Page requires roles ${allowedRoles}, but user has ${userRole}`
      );
      const redirectPath =
        customRedirect || roleRedirectMap[userRole] || '/unauthorized';
      return redirectTo(redirectPath);
    }
  }

  return result;
};
