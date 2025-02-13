import React, { useState, useCallback } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Text } from 'react-native-paper';

// Example Screens
const FirstScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Welcome to the <Text style={styles.screenText}>Home</Text> of possibilities</Text>
  </View>
);

const SecondScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Discover your <Text style={styles.screenText}>Profile</Text> and achievements</Text>
  </View>
);

const ThirdScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Adjust your <Text style={styles.screenText}>Settings</Text> for a better experience</Text>
  </View>
);

const renderScene = SceneMap({
  home: FirstScreen,
  profile: SecondScreen,
  settings: ThirdScreen,
});

const GestureTopTabNavigator = () => {
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
      activeColor='#fff'
      inactiveColor='#aaa'
      // contentContainerStyle={{ backgroundColor: 'yellow' }}
      // labelStyle={styles.tabLabel} // Adjusts text size
      indicatorStyle={styles.indicator} // Adjust indicator styling
      pressColor='transparent' // Removes ripple effect
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
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  text: {
    fontSize: 28,
    // textAlign: 'center'
    // color: '#333',
  },
  screenText: {
    color: '#333',
    fontSize: 62,
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
  tabBar: { 
     backgroundColor: '#333',
     height: 100,
     alignItems: 'center',
     justifyContent: 'center',
  },
  // tabLabel: {
  //   fontSize: 18,
  //   textTransform: 'capitalize',
  // },
  indicator: {
    backgroundColor: '#fff',
    height: 3,
    width: '15%',
    marginLeft: '10%',
  },
})

export default GestureTopTabNavigator;
