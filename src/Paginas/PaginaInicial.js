import React,{Component} from 'react';
import {View, Text} from 'react-native';
import TextoPadrão from '../Estilos/TextoPadrao';

class PaginaInicial extends Component
{
  constructor(props)
  {
    super(props);
    this.atualizar = this.atualizar.bind(this);
  }

  render()
  {
    return(
      <View style={{flex: 1,backgroundColor: 'green'}}>
        <Text style={TextoPadrão.TituloDaPagina}>Pagina inicial</Text>
        <Text style={TextoPadrão.SubTitulo1}>Estatisticas</Text>
        
        <View style={{borderWidth: 2, borderColor: 'white'}}>   
          <Text style={TextoPadrão.Estatistica}>Total Vendido:</Text>
          <Text style={TextoPadrão.Estatistica}>R$ {this.totalVendido()}</Text>
        </View>

        <View style={{borderWidth: 2, borderColor: 'white'}}>   
          <Text style={TextoPadrão.Estatistica}>Quantidade de itens vendidos:</Text>
          <Text style={TextoPadrão.Estatistica}>{this.totalQuantidade()} unidades</Text>
        </View>

        <View style={{borderWidth: 2, borderColor: 'white'}}>   
          <Text style={TextoPadrão.Estatistica}>Média de preço por unidade vendida</Text>
          <Text style={TextoPadrão.Estatistica}>R$ {this.totalVendido()/this.totalQuantidade()} por unidades</Text>
        </View>
      </View>
    );
  }

  atualizar()
  {
    this.forceUpdate();
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