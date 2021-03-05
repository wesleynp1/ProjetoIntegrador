import React,{Component} from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';

import PaginaInicial from './src/Paginas/PaginaInicial';
import RegistrarProduto from './src/Paginas/RegistrarProduto';
import RegistrarVendas from './src/Paginas/RegistrarVendas';

import Database from './Database';

import ProdutosContent from './src/Classes/ProdutosContent';
import VendasContent from './src/Classes/VendasContent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const db = new Database();
const PC = new ProdutosContent(db);
const VC = new VendasContent(db,PC);


class App extends Component
{
  constructor(props)
  {
    super(props);

    VC.App = this;
    this.paginaEstatistica = null;    
  }

  render()
  {
    let pagVendas = ()=>{return(<RegistrarVendas vendasControle={VC} produtosControle={PC}/>);}

    return(
      <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Página Inicial">
              
              {()=>{return <PaginaInicial ref={PagEstatistica=>{this.paginaEstatistica = PagEstatistica}}  vendasControle={VC}/>}}
            </Tab.Screen>

            <Tab.Screen name={'Registrar Produto'}>
            {()=>{return this.renderStackProdutos()}}
            </Tab.Screen>
            <Tab.Screen name={'Registrar Venda'} component={pagVendas}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  renderStackProdutos()
  {
    return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='PaginaProdutos'>
      {({navigation})=>{return(<RegistrarProduto navegacao={navigation} produtosControle={PC}/>);}}
      </Stack.Screen>

      <Stack.Screen options={{headerShown:true}} name='Foto do Produto'>
        {()=>{return <View><Text>TESTE REALIZADO COM SUCESSO</Text></View>;}}
      </Stack.Screen>
    </Stack.Navigator>
    );
  }
  
  atualizarPaginas()
  {
    this.paginaEstatistica.atualizar();
  }
}

export default App;