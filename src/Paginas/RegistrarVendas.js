import React,{Component} from 'react';
import {ScrollView, View, Text, TextInput, Button} from 'react-native';
import TextoPadrão from '../Estilos/TextoPadrao';
import {Picker}  from '@react-native-picker/picker';

class RegistrarVendas extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {produtoSelecionado: null};
    this.novaVenda = {data: null,produto: null, quantidade: 0};
    this.renderVendas = this.renderVendas.bind(this);
    this.renderProdutoSelecionado  =this.renderProdutoSelecionado.bind(this);
    this.atualizar = this.atualizar.bind(this);
  }

  render()
  {


    return(
      <ScrollView style={{flex: 1,backgroundColor: 'blue'}}>
        <Text style={TextoPadrão.TituloDaPagina}>Registrar Vendas</Text>

        <Text style={TextoPadrão.TituloCampoDigitacao}>Data</Text>
        <TextInput style={TextoPadrão.Digitado} onChangeText={(t)=>this.novaVenda.data=t} placeholderTextColor="white" placeholder={'Digite a data da venda formato DD-MM-AAAA'}/>

        <Text style={TextoPadrão.TituloCampoDigitacao}>Produto</Text>        
        <Picker style={TextoPadrão.Digitado}
        onValueChange={(pId)=>{this.novaVenda.produto=this.props.produtosControle.ProdutoPeloId(pId)}}>
        <Picker.Item  label={'Selecione o produto'} value={null}/>
          {this.listaDeProdutosPicker()}
        </Picker>
        
        <Text style={TextoPadrão.NomeProduto}>{this.state.produtoSelecionado}</Text>

        <Text style={TextoPadrão.TituloCampoDigitacao}>Unidades</Text>
        <TextInput style={TextoPadrão.Digitado} onChangeText={(t)=>this.novaVenda.quantidade=t} placeholderTextColor="white" placeholder={'Digite Quantas unidades vendeu'} keyboardType="numeric"/>
        
        <Button title='Registrar nova venda' onPress={()=>{this.props.vendasControle.addVenda(this.novaVenda);this.atualizarListaDeVendas();}}/>

        {this.renderVendas()}
      </ScrollView>
    );
  }

  listaDeProdutosPicker()
  {
    let listaDePickerItems=[];

    this.props.produtosControle.produtos.map(p => {listaDePickerItems.push(<Picker.Item label={p.nome} key={p.id} value={p.id}/>)})

    return listaDePickerItems;
  }

  renderProdutoSelecionado(t)
  {
    this.novaVenda.produto=this.props.produtosControle.ProdutoPeloId(t);
    this.setState({produtoSelecionado: this.novaVenda.produto.nome});
  }

  renderVendas()
  {
      var arrayVendas = this.props.vendasControle.vendas;
      var CompVendas = [];

      for(let i=0;i<arrayVendas.length;i++)
      {
      let quantidade = arrayVendas[i].quantidade;
      let preco = arrayVendas[i].produto.preco;

      CompVendas.push
      (
      <View key={i} style={{backgroundColor: 'white',margin: 4}}>
          <Text>Venda do dia {arrayVendas[i].data}</Text>
          <Text>Produto: {arrayVendas[i].produto.nome}</Text>
          <Text>Preço por unidade: {preco}</Text>
          <Text>Quantidade: {quantidade}</Text>
          <Text>Total da venda: {preco*quantidade}</Text>
          <Button title='excluir' onPress={()=>{this.props.vendasControle.apagarVendaPorId(arrayVendas[i].id);this.atualizarListaDeVendas()}}/>
      </View>
      );
      }

      return CompVendas;
  }

  atualizar()
  {
    this.forceUpdate();
  }

  atualizarListaDeVendas()
  {
    this.props.vendasControle.BuscarVendasNoBancoDeDados().then((vendas)=>{
      this.forceUpdate();
    })
  }
}

export default RegistrarVendas;