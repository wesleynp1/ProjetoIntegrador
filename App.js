import React,{Component} from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PaginaInicial from './src/Paginas/PaginaInicial';
import RegistrarProduto from './src/Paginas/RegistrarProduto';
import RegistrarVendas from './src/Paginas/RegistrarVendas';

import Database from './Database';

import ProdutosContent from './src/Classes/ProdutosContent';
import VendasContent from './src/Classes/VendasContent';

const Tab = createBottomTabNavigator();

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
    let pagProdutos = ()=>{return(<RegistrarProduto produtosControle={PC}/>);}
    let pagVendas = ()=>{return(<RegistrarVendas vendasControle={VC} produtosControle={PC}/>);}
    let pagInicial = ()=>{return(<PaginaInicial ref={componente => this.paginaEstatistica=componente} vendasControle={VC} produtosControle={PC}/>);}

    return(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={'Página Inicial'} component={pagInicial}/>
          <Tab.Screen name={'Registrar Produto'} component={pagProdutos}/>
          <Tab.Screen name={'Registrar Venda'} component={pagVendas}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  atualizarPaginas()
  {
    this.paginaEstatistica.atualizar();
  }
}

export default App;