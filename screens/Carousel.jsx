import React, { useRef } from 'react';
import { View, FlatList, ImageBackground, Dimensions, StyleSheet, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  React.useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % images.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: currentIndex.current * width * 0.8, animated: true });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={styles.carouselContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item }}
            style={styles.image}
            imageStyle={{ borderRadius: 18, resizeMode: 'contain', backgroundColor: '#fff' }}
          />
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, i) => {
          const inputRange = [width * 0.8 * (i - 1), width * 0.8 * i, width * 0.8 * (i + 1)];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: 150,
    marginHorizontal: width * 0.01,
    borderRadius: 18,
    overflow: 'hidden',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#222',
    marginHorizontal: 4,
  },
});

export default Carousel;
