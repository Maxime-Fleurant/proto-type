import { css, Global } from '@emotion/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { useFetchUser } from '../../lib/user';
import { grid, headerStyle } from './layoutstyle';
import tw from '@tailwindcssinjs/macro';

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
      <div css={grid}>
        <div css={headerStyle}>
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
