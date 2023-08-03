import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  CheckBoxContainer,
  CheckBoxLabel,
  CheckBoxTick,
  CheckBoxWrapper,
} from './checkboxStyle';
import {CheckBoxProps} from './checkbox';

const MyCheckbox = (props: CheckBoxProps) => {
  const [boxChecked, setBoxChecked] = useState(props.checked ?? false);

  const handleCheckboxToggle = () => {
    setBoxChecked(!boxChecked);
    if (props.setIsChecked) {
      props.setIsChecked(!boxChecked);
    }
  };

  return (
    <CheckBoxContainer>
      <TouchableOpacity onPress={handleCheckboxToggle}>
        <CheckBoxWrapper {...props}>
          {boxChecked && <CheckBoxTick {...props}>✓</CheckBoxTick>}
        </CheckBoxWrapper>
      </TouchableOpacity>
      <CheckBoxLabel {...props}>{props.text ?? ''}</CheckBoxLabel>
    </CheckBoxContainer>
  );
};

export default MyCheckbox;
