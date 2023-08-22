import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import React from 'react';
import MyButton from '../../../componennts/Buttons';
import {ConfirmProps} from './confirm';
import ConfirmBox from './confirmBoxStyle';

const Confirm = ({onNo, onYes, header, body, footer}: ConfirmProps) => {
  return (
    <ConfirmBox.Container>
      {header && (
        <ConfirmBox.Header>
          {typeof header === 'string' ? (
            <TextContent>{header}</TextContent>
          ) : (
            <>{header}</>
          )}
        </ConfirmBox.Header>
      )}
      {body && (
        <ConfirmBox.Body>
          {typeof body === 'string' ? (
            <TextContent>{body}</TextContent>
          ) : (
            <>{body}</>
          )}
        </ConfirmBox.Body>
      )}
      <ConfirmBox.Footer>
        {footer ? (
          <>
            {typeof footer === 'string' ? (
              <TextContent>{footer}</TextContent>
            ) : (
              <>{footer}</>
            )}
          </>
        ) : (
          <ConfirmBox.Content>
            <MyButton
              title="Yes"
              handleClick={onYes}
              backgroundColor={COLORS.SUCCESS}
              width="60px"
            />
            <MyButton
              title="No"
              handleClick={onNo}
              backgroundColor={COLORS.DANGER}
              width="60px"
            />
          </ConfirmBox.Content>
        )}
      </ConfirmBox.Footer>
    </ConfirmBox.Container>
  );
};

export default Confirm;
