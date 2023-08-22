import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import React from 'react';
import {Button, Modal as DefaultModal} from 'react-native';
import {ModalProps} from './modal';
import MyModal from './modalStyle';

const Modal = ({
  setOpen,
  showFooter = true,
  children,
  onSave,
  ...props
}: ModalProps) => {
  return (
    <MyModal.Container>
      <DefaultModal transparent animationType="slide">
        <MyModal.Wrapper>
          <MyModal.Content>
            {props.title && (
              <MyModal.Header>
                <TextContent>{props.title}</TextContent>
              </MyModal.Header>
            )}
            <MyModal.Body>{children}</MyModal.Body>
            {showFooter && (
              <MyModal.Footer>
                <Button
                  color={COLORS.DANGER}
                  title="Close"
                  onPress={() => setOpen(false)}
                />
                <Button
                  color={COLORS.SUCCESS}
                  title="Save"
                  onPress={() => (onSave ? onSave() : null)}
                />
              </MyModal.Footer>
            )}
          </MyModal.Content>
        </MyModal.Wrapper>
      </DefaultModal>
    </MyModal.Container>
  );
};

export default Modal;
