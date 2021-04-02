import React,{Component} from 'react';
import {View, Text, Button} from 'react-native';
import TextoPadrão from '../Estilos/TextoPadrao';

class PaginaInicial extends Component
{
  constructor(props)
  {
    super(props);    
  }

  render()
  {
    console.log('Numero de vendas no prop: '+this.props.vendasControle.vendas.length);
    console.log("loading: "+this.props.loading);

    
    let mediaDePreco = this.totalQuantidade()!=0 ? (this.totalVendido()/this.totalQuantidade()).toFixed(2) : 0
    
      if(this.props.loading==true)
      {
        return(
          <View style={{flex: 1,backgroundColor: 'green'}}>
            <Text style={TextoPadrão.TituloDaPagina}>Carregando...</Text>
          </View>
        );
      }
      else
      {
        return(
        <View style={{flex: 1,backgroundColor: 'green'}}>
          <Text style={TextoPadrão.TituloDaPagina}>Pagina inicial</Text>
          <Text style={TextoPadrão.SubTitulo1}>Estatisticas</Text>
          
          <View style={{borderWidth: 2, borderColor: 'white'}}>   
            <Text style={TextoPadrão.Estatistica}>Total Vendido:</Text>
            <Text style={TextoPadrão.Estatistica}>R$ {(this.totalVendido()).toFixed(2)}</Text>
          </View>

          <View style={{borderWidth: 2, borderColor: 'white'}}>   
            <Text style={TextoPadrão.Estatistica}>Quantidade de itens vendidos:</Text>
            <Text style={TextoPadrão.Estatistica}>{this.totalQuantidade()} unidades</Text>
          </View>

          <View style={{borderWidth: 2, borderColor: 'white'}}>   
            <Text style={TextoPadrão.Estatistica}>Média de preço por unidade vendida</Text>
            <Text style={TextoPadrão.Estatistica}>R$ {mediaDePreco} por unidades</Text>
          </View>
      </View>);
      }
  }

  totalVendido()
  {
    var total = 0;
    this.props.vendasControle.vendas.map(v => total = total+(v.produto.preco*v.quantidade));
    
    return total;
  }

  totalQuantidade()
  {
    var total = 0;
    this.props.vendasControle.vendas.map(v => total = total+(v.quantidade));
    
    return total;
  }
}

export default PaginaInicial;