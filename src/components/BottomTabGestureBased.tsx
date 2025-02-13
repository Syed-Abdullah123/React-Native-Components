import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Text } from 'react-native-paper';

// Example Screens
const FirstScreen = () => (
  <View style={styles.screen}>
    <Text>Home Screen</Text>
  </View>
);

const SecondScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

const ThirdScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);

const renderScene = SceneMap({
  home: FirstScreen,
  profile: SecondScreen,
  settings: ThirdScreen,
});

const GestureBottomTabNavigator = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'profile', title: 'Profile' },
    { key: 'settings', title: 'Settings' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      labelStyle={styles.label}
    // hiding the indicator
    renderIndicator={() => null}
    // indicatorStyle={styles.indicator}
    activeColor='#ff6600'
    inactiveColor='#bbb'
    pressColor='transparent'
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={true} // Enables gesture-based tab switching
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#6200ee',
    position: 'absolute',
    bottom: 10,
    // left: 0,
    // right: 0,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
  },
  label: {
    color: 'white',
  },
  indicator: {
    backgroundColor: 'red',
  },
});

export default GestureBottomTabNavigator;
