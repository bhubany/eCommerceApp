import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import React from 'react';
import {Button, Modal as DefaultModal} from 'react-native';
import {ModalProps} from './modal';
import MyModal from './modalStyle';

const Modal = ({setOpen, children, ...props}: ModalProps) => {
  return (
    <MyModal.Container>
      <DefaultModal transparent>
        <MyModal.Wrapper>
          <MyModal.Content>
            <MyModal.Header>
              {props.title && <TextContent>{props.title}</TextContent>}
            </MyModal.Header>
            <MyModal.Body>{children}</MyModal.Body>
            <MyModal.Footer>
              <Button
                color={COLORS.DANGER}
                title="Close"
                onPress={() => setOpen(false)}
              />
              <Button
                color={COLORS.SUCCESS}
                title="Save"
                onPress={props?.onPress}
              />
            </MyModal.Footer>
          </MyModal.Content>
        </MyModal.Wrapper>
      </DefaultModal>
    </MyModal.Container>
  );
};

export default Modal;
