import {COLORS} from 'common/enums';
import {TextContent} from 'common/styles';
import {FieldHookConfig, useField, useFormikContext} from 'formik';
import React, {FC, useRef, useState} from 'react';
import {FlatList, Text, TextInput} from 'react-native';
import {DownArrow, UpArrow} from '../../../componennts/Icons';
import {Option, SelectProps} from './select';
import Styles from './selectStyle';

const Select: FC<FieldHookConfig<string> & SelectProps> = ({
  options,
  label,
  onChange,
  disabled = false,
  required,
  ...props
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [data, setData] = useState(options);
  const [selected, setSelected] = useState<string>(options[0].label);
  const searchRef = useRef<TextInput | null>(null);
  const [field, meta] = useField({...props});
  const {setFieldValue} = useFormikContext();

  const handleSelect = (value: Option) => {
    setSelected(value.label);
    setClicked(prev => !prev);
    handleSearch('');
    searchRef?.current?.clear();
    if (onChange) {
      onChange(value.value);
    } else {
      setFieldValue(field.name, value.value);
    }
  };

  const handleSearch = (keyword: string) => {
    if (keyword !== '') {
      const tempData = options.filter(
        item => item.label.toLowerCase().indexOf(keyword) > -1,
      );
      setData(tempData);
    } else {
      setData(options);
    }
  };
  return (
    <Styles.Container>
      <Styles.Wrapper>
        {label ? (
          <Styles.Label>
            <TextContent>{label}</TextContent>
            {required ? (
              <TextContent color={COLORS.DANGER}>*</TextContent>
            ) : null}
          </Styles.Label>
        ) : null}
        <Styles.Selector
          disabled={disabled}
          activeOpacity={1}
          onPress={() => setClicked(prev => !prev)}>
          <Text>{selected}</Text>
          {clicked ? UpArrow : DownArrow}
        </Styles.Selector>
        {clicked ? (
          <Styles.OptionWrapper>
            <Styles.SearchBox
              ref={searchRef}
              onChangeText={txt => handleSearch(txt)}
              placeholder="Search"
            />
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <Styles.Option key={index} onPress={() => handleSelect(item)}>
                  <Text>{item.label}</Text>
                </Styles.Option>
              )}
            />
          </Styles.OptionWrapper>
        ) : null}
        <Styles.Error>
          {meta.error && (
            <TextContent color={COLORS.DANGER}>{meta.error}</TextContent>
          )}
        </Styles.Error>
      </Styles.Wrapper>
    </Styles.Container>
  );
};

export default Select;
