import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, StyleSheet, Animated, Text, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
// import { Text } from 'react-native-paper';

// Example Screens with Dynamic Background Colors
const FirstScreen = ({ backgroundColor }) => (
  <View style={[styles.screen, { backgroundColor }]}> 
    <AntDesign name="home" size={100} color="white" />
    <Text style={styles.screenText}>Home is where the heart is.</Text>
  </View>
);

const SecondScreen = ({ backgroundColor }) => (
  <View style={[styles.screen, { backgroundColor }]}> 
    <AntDesign name="addusergroup" size={100} color="white" />
    <Text style={styles.screenText}>You are amazing just the way you are.</Text>
  </View>
);

const ThirdScreen = ({ backgroundColor }) => (
  <View style={[styles.screen, { backgroundColor }]}>
    <AntDesign name="setting" size={100} color="white" /> 
    <Text style={styles.screenText}>Settings make everything perfect.</Text>
  </View>
);

const GestureBottomIconTabNavigator = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home-outline' },
    { key: 'profile', title: 'Profile', icon: 'account-outline' },
    { key: 'settings', title: 'Settings', icon: 'cog-outline' }, 
  ]);

  const backgroundColor = new Animated.Value(index);

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [index]);

  const backgroundColors = ['#FF5733', '#33B5FF', '#28A745'];
  const renderScene = ({ route }) => {
    const color = backgroundColors[index];
    switch (route.key) {
      case 'home':
        return <FirstScreen backgroundColor={color} />;
      case 'profile':
        return <SecondScreen backgroundColor={color} />;
      case 'settings':
        return <ThirdScreen backgroundColor={color} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.label, focused && styles.labelActive]}>
          {route.title}
        </Text>
      )}
      renderIcon={({ route, focused }) => {
        console.log('Route:', route);
        return <MaterialCommunityIcons 
        name={route.icon} 
        size={24} 
        color={focused ? 'yellow' : 'white'} 
      />;
      }}
      
      indicatorStyle={styles.indicator}
      // renderIndicator={() => null}
      activeColor={backgroundColors[index]}
      pressColor='transparent'
    />
  );

  return (
    <Animated.View style={{ flex: 1, backgroundColor: backgroundColors[index] }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  screenText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 14,
  },
  labelActive: {
    fontWeight: 'bold',
    color: 'yellow',
  },
  indicator: {
    width: 30, // ✅ Make it smaller (Adjustable)
    height: 4, // ✅ Adjust thickness
    backgroundColor: "yellow", // ✅ Customize color
    borderRadius: 2, // ✅ Rounded edges
    marginLeft: '13%', // ✅ Align it properly
    // marginRight: 'auto', // ✅ Align it properly
    // left: 0,
    // right: 0,
  },
});

export default GestureBottomIconTabNavigator;
