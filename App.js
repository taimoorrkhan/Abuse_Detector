import Screen from './components/Screen';
import TabNavigator from './navigators/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App(){
  return (
    <Screen>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Screen>
  )
}