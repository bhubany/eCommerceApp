import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import {FieldHookConfig, useField, useFormikContext} from 'formik';
import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Option, RadioProps} from './radio';
import Styles from './styles';

const Radio: FC<FieldHookConfig<string> & RadioProps> = ({
  options,
  label,
  onChange,
  disabled = false,
  required,
  value,
  ...props
}) => {
  const [selected, setSelected] = useState<any>(value);
  const [field, meta] = useField({...props});
  const {setFieldValue} = useFormikContext();

  const handleSelect = (optn: Option) => {
    setSelected(optn.value);
    if (onChange) {
      onChange(optn.value);
    } else {
      setFieldValue(field.name, optn.value);
    }
  };

  return (
    <Styles.Container>
      {label ? (
        <Styles.Label>
          <TextContent>{label}</TextContent>
          {required ? <TextContent color={COLORS.DANGER}>*</TextContent> : null}
        </Styles.Label>
      ) : null}
      <Styles.OptionWrapper>
        {options?.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            disabled={disabled}
            style={{opacity: disabled ? 0.5 : 1}}
            onPress={() => handleSelect(item)}>
            <Styles.Selector>
              <Styles.Select>
                {selected === item.value ? <Styles.Selected /> : null}
              </Styles.Select>
              <TextContent>{item.label}</TextContent>
            </Styles.Selector>
          </TouchableOpacity>
        ))}
        <Styles.Error>
          {meta.error && (
            <TextContent color={COLORS.DANGER}>{meta.error}</TextContent>
          )}
        </Styles.Error>
      </Styles.OptionWrapper>
    </Styles.Container>
  );
};

export default Radio;
