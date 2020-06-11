import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FirstScreen from './src/FirstScreen';
import SecondScreen from './src/SecondScreen'; 
import CustomComponent from './src/CustomComponent'; 
import UsersScreen from './src/UsersScreen'; 
import CobaScreen from './src/Coba'; 
import ProductsScreen from './src/ProductsScreen'; 
import ProfileScreen from './src/ProfileScreen'; 
import SearchScreen from './src/SearchScreen'; 
import ItemDetailScreen from './src/secondscreen/ItemRoute/ItemDetailScreen';
import {Provider} from 'react-redux'; 
import store from './redux/stores'; 
import { MenuProvider } from 'react-native-popup-menu';
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
      <NavigationContainer headerMode="none">
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
          <Stack.Screen name="CustomComponent" component={CustomComponent} />
          <Stack.Screen name="UsersScreen" component={UsersScreen} />
          <Stack.Screen name="CobaScreen" component={CobaScreen} />
          <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
};

export default App;
