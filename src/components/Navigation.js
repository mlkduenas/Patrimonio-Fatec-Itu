import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import Lista from '../screens/Lista'
import Scanner from '../screens/Scanner'
import addPatrimonio from '../screens/addPatrimonio'
import editPatrimonio from '../screens/editPatrimonio'
import themes from '../themes'

const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options ={{ presentation: 'modal', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }}
                initialParams={{ email: "teste@teste.com" }} />
            <Stack.Screen 
                name="Signup" 
                component={Signup} 
                options ={{ presentation: 'modal', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }} />
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ title: 'SCANdinavia', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro}}} />
            <Stack.Screen 
                name="Scanner" 
                component={Scanner} 
                options ={{ presentation: 'modal', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }} />
            <Stack.Screen 
                name="addPatrimonio" 
                component={addPatrimonio} 
                options ={{ presentation: 'modal', title: '', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }}
                initialParams={{ data: "" }} />
            <Stack.Screen 
                name="editPatrimonio" 
                component={editPatrimonio} 
                options ={{ presentation: 'modal', title: '', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }} />
            <Stack.Screen 
                name="Lista" 
                component={Lista} 
                options ={{ presentation: 'modal', title: '', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }} />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}