import { css, Global } from '@emotion/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { useFetchUser } from '../../lib/user';

import tw from '@tailwindcssinjs/macro';

import { Canvas, useFrame } from 'react-three-fiber';

const Layout: FunctionComponent = ({ children }) => {
  const { user, loading } = useFetchUser();

  const logButton = user ? <a href="/api/logout">Logout</a> : <a href="/api/login">Login</a>;
  const accountButton = user && <Link href="/account">{user.nickname}</Link>;

  return (
    <>
      <Global
        styles={css`
          body {
            ${tw('bg-gray-100')}
          }
        `}
      />
      <div>
        <div>
          <Link href="/">Type Sim</Link>
          {/* <div>
            {accountButton} {logButton}
          </div> */}
        </div>

        {children}
      </div>
    </>
  );
};

export default Layout;
