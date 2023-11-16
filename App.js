import Screen from './components/Screen';
import TabNavigator from './navigators/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import useFirebase from './hook/useFirebase';
import { AuthNavigator } from './navigators/Navigator';

export default function App() {
  const { user,isConnected } = useFirebase();
  return (
    <Screen>
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Screen>
  )
}