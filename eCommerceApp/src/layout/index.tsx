import React, {ReactNode} from 'react';
import {LayoutContainer, LayoutContent} from './layout.styles';
import Header from 'layout/header';
import Footer from 'layout/footer';

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <LayoutContent>{children}</LayoutContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
