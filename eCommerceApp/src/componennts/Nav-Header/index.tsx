import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import React from 'react';
import {ArrowBackIcon} from '../../componennts/Icons';
import {NavHeaderProps} from './navBar';
import {IconWrapper, NavHeaderContainer, TitleWrapper} from './navHeaderStyle';

const NavHeader = (props: NavHeaderProps) => {
  return (
    <NavHeaderContainer>
      <IconWrapper
        onPress={() => {
          props.handleClick ? props.handleClick() : null;
        }}>
        {ArrowBackIcon}
      </IconWrapper>
      <TitleWrapper>
        <TextContent color={COLORS.WHITE} fontSize="18px">
          {props.title ?? ''}
        </TextContent>
      </TitleWrapper>
    </NavHeaderContainer>
  );
};

export default NavHeader;
