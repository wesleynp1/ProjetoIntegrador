import React,{Component} from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';

import PaginaInicial from './src/Paginas/PaginaInicial';
import PaginaProdutos from './src/Paginas/PaginaProduto';
import PaginaVendas from './src/Paginas/PaginaVendas';
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

    this.state={loading:true}

    PC.iniciarLoadingDasPaginas = ()=>{this.setState({loading: true})};
    PC.FinalizarLoadingDasPaginas = ()=>{this.setState({loading: false})};

    VC.iniciarLoadingDasPaginas = ()=>{this.setState({loading: true})};
    VC.finalizarLoadingDasPaginas = ()=>{this.setState({loading: false})};
  }

  componentDidMount()
  {
    PC.BuscarProdutosNoREST(()=>{VC.BuscarVendasNoREST()});//BuscarVendas será executado após BuscarProdutos
  }

  render()
  {    
  return(
      <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Página Inicial">          
              {()=>{return <PaginaInicial loading = {this.state.loading}
                                          IniciarLoading={()=>{this.setState({loading:true})}}
                                          FinalizarLoading={()=>{this.setState({loading:false})}}
                                          vendasControle={VC}/>}}
            </Tab.Screen>

            <Tab.Screen name={'Registrar Produto'}>
              {()=>{return this.renderStackProdutos()}}
            </Tab.Screen>

            <Tab.Screen name={'Registrar Venda'}>
              {()=>{return <PaginaVendas  loading = {this.state.loading}
                                          IniciarLoading={()=>{this.setState({loading:true})}}
                                          FinalizarLoading={()=>{this.setState({loading:false})}}
                                          vendasControle={VC} 
                                          produtosControle={PC}/>}}
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
        {({route,navigation})=>{return(<PaginaProdutos  IniciarLoading={()=>{this.setState({loading:true})}}
                                                        FinalizarLoading={()=>{this.setState({loading:false})}}
                                                        loading = {this.state.loading}
                                                        rota={route} navegacao={navigation} 
                                                        produtosControle={PC}/>);}}
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
}

export default App;