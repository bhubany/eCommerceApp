import {COLORS} from 'common/enums';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import Config from 'react-native-config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CarouselProps} from './carousel';
import {
  CarouselContainer,
  CarouselWrapper,
  CircleContainer,
  CircleWrapper,
  ImageWrapper,
} from './carouselStyle';

const CircleIcon = ({color = '#1976d2', size = 16}) => (
  <MaterialIcons name="circle" color={color} size={size} />
);

const Carousel = (props: CarouselProps) => {
  const {imageList, interval = 3000} = props;
  const [target, setTarget] = useState<number>(1);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const prevTargetRef = useRef<number>(target);

  const handleClick = (index: number) => {
    setTarget(index);
    setElapsedTime(0);
    setManualMode(true);
  };

  useEffect(() => {
    const autoInterval = setInterval(() => {
      if (!manualMode) {
        setElapsedTime(prevElapsedTime => prevElapsedTime + interval);
      }
    }, interval);

    intervalRef.current = autoInterval;

    return () => {
      clearInterval(autoInterval);
    };
  }, [interval, manualMode]);

  useEffect(() => {
    if (prevTargetRef.current !== target) {
      setElapsedTime(0);
      prevTargetRef.current = target;
    }

    if (elapsedTime >= interval) {
      setManualMode(false);
      setTarget(currentTarget =>
        currentTarget < imageList.length ? currentTarget + 1 : 1,
      );
    }
  }, [elapsedTime, interval, imageList.length, target]);

  useEffect(() => {
    if (manualMode) {
      const manualInterval = setInterval(() => {
        setManualMode(false);
        setTarget(currentTarget =>
          currentTarget < imageList.length ? currentTarget + 1 : 1,
        );
      }, interval - elapsedTime);

      return () => {
        clearInterval(manualInterval);
      };
    }
  }, [elapsedTime, interval, imageList.length, manualMode]);

  return (
    <CarouselContainer {...props}>
      <CarouselWrapper>
        {imageList &&
          imageList.map(image => {
            return (
              <ImageWrapper
                key={image.id}
                style={{display: image.id === target ? 'flex' : 'none'}}>
                <Image
                  source={{
                    uri: `${Config.BACKEND_ENDPOINT}${image.url}`,
                  }}
                  alt="Banners"
                  height={150}
                />
              </ImageWrapper>
            );
          })}
        <CircleContainer>
          {imageList &&
            imageList.map(image => {
              return (
                <CircleWrapper
                  key={image.id + imageList.length}
                  onPress={() => {
                    handleClick(image.id);
                  }}>
                  <CircleIcon
                    color={image.id === target ? COLORS.WHITE : COLORS.GREY}
                  />
                </CircleWrapper>
              );
            })}
        </CircleContainer>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default Carousel;
