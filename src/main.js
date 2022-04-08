import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import CounterBlock from './components/counterBlock';
import CustomButton from './components/customButton';
import Card from './components/card';

const Main = () => {
  const [cardData, setCardData] = useState([]);
  const [allMatched, setAllMatched] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  useEffect(() => {
    if (allMatched) {
      generateRandomArray();
      setAllMatched(false);
      setTurns(0);
      setMatches(0);
    }
  }, [allMatched, generateRandomArray]);

  useEffect(() => {
    const openCards = cardData.filter(item => item.isOpen && !item.isMatched);
    const areAllMatched =
      cardData.filter(item => item.isMatched).length === cardData.length;
    if (areAllMatched) {
      setAllMatched(true);
    }
    if (openCards.length % 2 == 0 && openCards.length > 0) {
      if (openCards?.[0]?.char != openCards?.[1]?.char) {
        resetCards();
      } else {
        setShownCards(openCards);
      }
    }
  }, [cardData, resetCards, setShownCards]);

  const resetCards = useCallback(() => {
    const changedArr = cardData.map(card => {
      card.isOpen = false;
      return card;
    });
    setTimeout(() => {
      setCardData(changedArr);
      setTurns(turns + 1);
    }, 2000);
  }, [cardData, turns]);

  const setShownCards = useCallback(
    openCards => {
      const changedArr = cardData.map((card, index) => {
        openCards.map(openCard => {
          if (openCard.id === index) {
            card.isMatched = true;
            card.isOpen = false;
          }
        });
        return card;
      });
      setTimeout(() => {
        setMatches(matches + 1);
        setTurns(turns + 1);
        setCardData(changedArr);
      }, 2000);
    },
    [cardData, matches, turns],
  );

  const generateRandomArray = useCallback(() => {
    let arr = [];
    for (let i = 0; i < 16; i++) {
      let obj = {id: i, isOpen: false, isMatched: false};
      let isAvailable = false;
      while (!isAvailable) {
        var random = generateRandomAlphabet();
        var filteredArr = arr.filter(item => item?.char === random);
        if (filteredArr.length < 2) {
          obj.char = random;
          arr.push(obj);
          isAvailable = true;
        }
      }
    }
    setCardData(arr);
  }, [generateRandomAlphabet]);

  const generateRandomAlphabet = useCallback(() => {
    const number = 'ABCDEFGH';
    return number[Math.floor(Math.random() * number.length)];
  }, []);

  const cardPressed = useCallback(
    item => {
      const changedArr = cardData.map(card => {
        if (card.id === item.id) {
          card.isOpen = !card.isOpen;
        }
        return card;
      });
      setTurns(turns + 1);
      setCardData(changedArr);
    },
    [cardData, turns],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatlistStyles}
        contentContainerStyle={styles.flatlistContentStyles}
        data={cardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Card
              item={item}
              cardPressed={() => cardPressed(item)}
              matchedText={'Matched !!'}
            />
          );
        }}
      />
      <View style={styles.optionsContainer}>
        <CounterBlock text={'Turns: '} count={turns} />
        <CustomButton onPress={() => setAllMatched(true)} text={'Restart'} />
        <CounterBlock text={'Score: '} count={matches} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'green',
  },
  flatlistStyles: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
  },
  flatlistContentStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    height: '100%',
  },
  optionsContainer: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Main;
