import React,{Component} from 'react';
import {View, ScrollView, Text, TextInput, Button, TouchableOpacity,Image} from 'react-native';
import TextoPadrão from '../Estilos/TextoPadrao';

class RegistrarProduto extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {produtos: this.props.produtosControle.produtos}

    this.NovoProduto = {nome: null,preco: null,imagem: null}

    this.renderProdutos = this.renderProdutos.bind(this);
    this.registrarProduto = this.registrarProduto.bind(this);
    this.apagarTodosProdutos = this.apagarTodosProdutos.bind(this);
  }

  render()
  {
    let imagem = require('../Imagens/AdicionarFotoProduto.png')

     if(this.props.rota.params!=undefined)
     {
      imagem = {uri:this.props.rota.params.imagem}
      this.NovoProduto.imagem = this.props.rota.params.imagem;
     }
  
    return(
      <ScrollView>
        <View style={{backgroundColor: 'red'}}>
          <Text style={TextoPadrão.TituloDaPagina}>Registrar Produtos</Text>

          <View style={{alignItems:'center'}}>            
            <TouchableOpacity onPress={()=>{this.props.navegacao.navigate('Foto do Produto')}} style={{width:96,height:96,backgroundColor:'grey',margin: 4,alignItems:'center'}}>
              <Image style={{width: 96,height: 96, margin: 5,padding:5}} source={imagem}/>
            </TouchableOpacity>

            <View style={{alignItems:'stretch'}}>
              <Text style={TextoPadrão.TituloCampoDigitacao}>Nome do produto</Text>
              <TextInput style={TextoPadrão.Digitado} placeholderTextColor="white" onChangeText={(t)=>this.NovoProduto.nome=t} placeholder={'Digite o nome do produto aqui'}/>
              
              <Text style={TextoPadrão.TituloCampoDigitacao}>Preço</Text>
              <TextInput style={TextoPadrão.Digitado} placeholderTextColor="white" onChangeText={(t)=>this.NovoProduto.preco=t} placeholder={'Digite o preço do produto aqui(só números)'} keyboardType="numeric"/>
              <Button title='Registrar produto' onPress={this.registrarProduto}/>
            </View>

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
      {
        let imagem = require('../Imagens/SemFotoProduto.png')

        if(arrayProdutos[i].imagem!=null)
        {
          imagem = {uri:arrayProdutos[i].imagem};
        }

        CompProdutos.push
        (
          <View key={i} style={{backgroundColor: 'white', margin:5, padding:5,width:"98%",height:100, flexDirection:'row'}}>

            <Image style={{width:80,height:80}} key={i} source={imagem}/>
            
            <View style={{flex:1,margin:4}}>
              <Text style={TextoPadrão.CorpoDoTexto}>ID: {arrayProdutos[i].id}</Text>
              <Text style={TextoPadrão.CorpoDoTexto}>Produto: {arrayProdutos[i].nome}</Text>
              <Text style={TextoPadrão.CorpoDoTexto}>Preço: {arrayProdutos[i].preco}</Text>
            </View>

            <TouchableOpacity style={{backgroundColor:'gray',width:80,height:80,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.apagarProdutoPeloID(arrayProdutos[i].id)}}>
              <Text style={{fontSize:20}}>X</Text>  
            </TouchableOpacity>

          </View>
        );
      }

      return CompProdutos;
  }

  registrarProduto()
  {
    console.log(">>>>>>>>this.NovoProduto.imagem:"+this.NovoProduto.imagem);
    this.props.produtosControle.adicionarProdutoREST(this.NovoProduto);
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