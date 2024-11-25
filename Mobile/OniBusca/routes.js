import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Dados from './screens/Dados';
import Cadastro from './screens/Cadastro';
const Stack = createNativeStackNavigator();

const Routes = () => {
    if (1==1) {
        return <Login></Login>
    } else {
        return <Cadastro></Cadastro>
    }
};

export default Routes;