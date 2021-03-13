import React,{Component} from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';

import PaginaInicial from './src/Paginas/PaginaInicial';
import RegistrarProduto from './src/Paginas/RegistrarProduto';
import RegistrarVendas from './src/Paginas/RegistrarVendas';
import PaginaCamera from './src/Paginas/PaginaCamera';
import PaginaGaleria from './src/Paginas/PaginaGaleria';

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
    PC.App = this;
    this.paginaEstatistica = null;
    this.paginaRegistrarVendas = null;
  }

  render()
  {
    return(
      <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Página Inicial">          
              {()=>{return <PaginaInicial ref={PagEstatistica=>{this.paginaEstatistica = PagEstatistica}}  vendasControle={VC}/>}}
            </Tab.Screen>

            <Tab.Screen name={'Registrar Produto'}>
            {()=>{return this.renderStackProdutos()}}
            </Tab.Screen>
            <Tab.Screen name={'Registrar Venda'}>
            {()=>{return <RegistrarVendas ref={PagRegistrarVendas=>{this.paginaRegistrarVendas = PagRegistrarVendas}} vendasControle={VC} produtosControle={PC}/>}}
            </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  renderStackProdutos()
  {
    return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='PaginaProdutos'>
        {({route,navigation})=>{return(<RegistrarProduto rota={route} navegacao={navigation} produtosControle={PC}/>);}}
      </Stack.Screen>

      <Stack.Screen options={{headerShown:true}} name='Foto do Produto'>
        {({navigation})=>{return <PaginaCamera navegacao={navigation}/>;}}
      </Stack.Screen>

      <Stack.Screen options={{headerShown:true}} name='Fotos Salvas'>
        {({navigation})=>{return <PaginaGaleria navegacao={navigation}/>;}}
      </Stack.Screen>
    </Stack.Navigator>
    );
  }
  
  atualizarPaginas()
  {
    
    console.log("Atualizar pagina VENDAS"+this.paginaRegistrarVendas)
    console.log("Atualizar pagina ESTATISTICA"+this.paginaEstatistica)
    this.paginaEstatistica.atualizar();
    this.paginaRegistrarVendas.atualizar();
  }
}

export default App;