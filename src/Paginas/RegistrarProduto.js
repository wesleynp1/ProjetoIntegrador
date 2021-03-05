import React,{Component} from 'react';
import {View, ScrollView, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import TextoPadrão from '../Estilos/TextoPadrao';

class RegistrarProduto extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {produtos: this.props.produtosControle.produtos}

    this.NovoProduto = {nome: null,preco: null}

    this.renderProdutos = this.renderProdutos.bind(this);
    this.registrarProduto = this.registrarProduto.bind(this);
    this.apagarTodosProdutos = this.apagarTodosProdutos.bind(this);
  }

  render()
  {
    return(
      <ScrollView>
        <View style={{backgroundColor: 'red'}}>
          <Text style={TextoPadrão.TituloDaPagina}>Registrar Produtos</Text>

          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{this.props.navegacao.navigate('Foto do Produto')}} style={{width:96,height:96,backgroundColor:'grey',alignItems:'center'}}>
              <Text style={{textAlign:'center',fontSize:12}}>Clique aqui para adicionar uma foto ao produto</Text>
            </TouchableOpacity>
            <TextInput style={TextoPadrão.Digitado} placeholderTextColor="white" onChangeText={(t)=>this.NovoProduto.nome=t} placeholder={'Digite o nome do produto aqui'}/>
            <TextInput style={TextoPadrão.Digitado} placeholderTextColor="white" onChangeText={(t)=>this.NovoProduto.preco=t} placeholder={'Digite o preço do produto aqui(apenas números)'} keyboardType="numeric"/>
            <Button title='Registrar produto' onPress={this.registrarProduto}/>

            <Text style={TextoPadrão.SubTitulo1}>Número total de produtos: {this.state.produtos.length}</Text>
            <View>
                {this.renderProdutos()}
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
  
  renderProdutos()
  {
      var arrayProdutos = this.state.produtos;
      var CompProdutos = [];

      for(let i=0;i<arrayProdutos.length;i++)
      CompProdutos.push
      (
      <View key={i} style={{backgroundColor: 'white',margin: 4, padding: 8}}>
          <Text style={TextoPadrão.CorpoDoTexto}>ID: {arrayProdutos[i].id}</Text>
          <Text style={TextoPadrão.CorpoDoTexto}>Nome do produto: {arrayProdutos[i].nome}</Text>
          <Text style={TextoPadrão.CorpoDoTexto}>Preço: {arrayProdutos[i].preco}</Text>
          <Button title='excluir' onPress={()=>{this.apagarProdutoPeloID(arrayProdutos[i].id)}}/>
      </View>
      );

      return CompProdutos;
  }

  registrarProduto()
  {
    this.props.produtosControle.adicionarProduto(this.NovoProduto);
    this.atualizaListaDeProdutos();
  }

  apagarProdutoPeloID(id)
  {
    this.props.produtosControle.apagarProdutoPeloID(id);
    this.atualizaListaDeProdutos();
  }
  
  apagarTodosProdutos()
  {
    this.props.produtosControle.apagarTodosProdutos();
    this.atualizaListaDeProdutos();
  }  
  
  atualizaListaDeProdutos()
  {
    this.props.produtosControle.BuscarProdutosNoBancoDeDados().then((ProdutosBD)=>{
      console.log('RegistrarProduto: FIM DA EXECUÇÃO DE adicionarProduto');
      this.NovoProduto = {nome: null,preco: null}
      this.setState({produtos: ProdutosBD});
    });
  }

  
}

export default RegistrarProduto;