import {countries} from 'common/datas';
import React, {useRef, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {DownArrow, UpArrow} from '../../../componennts/Icons';
import Styles from './selectStyle';

const Select = ({options = countries}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [data, setData] = useState(countries);
  const [selected, setSelected] = useState('Select Country');
  const searchRef = useRef();

  const handleSelect = (value: string) => {
    setSelected(value);
    setClicked(prev => !prev);
    handleSearch('');
    searchRef.current.clear();
  };

  const handleSearch = (keyword: string) => {
    if (keyword !== '') {
      const tempData = options.filter(
        item => item.country.toLowerCase().indexOf(keyword) > -1,
      );
      setData(tempData);
    } else {
      setData(countries);
    }
  };
  return (
    <Styles.Container>
      <Styles.Wrapper>
        <Styles.Selector
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
                <Styles.Option
                  key={index}
                  onPress={() => handleSelect(item.country)}>
                  <Text>{item.country}</Text>
                </Styles.Option>
              )}
            />
          </Styles.OptionWrapper>
        ) : null}
      </Styles.Wrapper>
    </Styles.Container>
  );
};

export default Select;
