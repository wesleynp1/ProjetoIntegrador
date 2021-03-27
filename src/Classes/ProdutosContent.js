import {ToastAndroid} from 'react-native';

class ProdutoContent
{
  constructor(bancoDeDados)
  {
      this.produtos =   [];
      this.App = null
      this.BD = bancoDeDados;
      this.BuscarProdutosNoREST();
  }

  ProdutoPeloId(id)
  {
     var produtoSelecionado =  this.produtos.find(p => p.id==id);

     if(produtoSelecionado==undefined)produtoSelecionado={id: null, nome: null, imagem:null, preco: null};
      
      return produtoSelecionado;
  }

  BuscarProdutosNoBancoDeDados()
  {
    return new Promise((resolve) => {
      this.BD.listaDeProdutos().then((ProdutosBD)=>{
      this.produtos = ProdutosBD;
      if(this.App!=null)this.App.atualizarPaginas();
      resolve(ProdutosBD);
    }).catch((erro)=>{
        console.log('Deu ruim: '+erro);
      })});
  }

  apagarProdutoPeloID(id)
  {
    this.BD.apagarProdutoPeloID(id);
  }

  adicionarProduto(produto)
  {
    this.BD.addProduto({nome: produto.nome, imagem: produto.imagem, preco: produto.preco}).then((result)=>{
    }).then(()=>{}).catch((erro)=>{});
  }

  apagarTodosProdutos()
  {
    this.BD.apagarTodosProdutos();
  }

  //REST
  BuscarProdutosNoREST()
  {
      fetch("http://192.168.0.109:5000/Produtos")
      .then(response => response.json())
      .then((dadosJson) => {
        var ProdutosREST = [];

        for (let i in dadosJson) {
          var novoProduto = {id: dadosJson[i].id, nome: dadosJson[i].nome, imagem: dadosJson[i].imagem, preco: dadosJson[i].preco};
          ProdutosREST.push(novoProduto);
        }
        this.produtos = ProdutosREST
      })

      .catch((erro)=>{console.log('Deu ruim no REST: '+erro);})

  }

  adicionarProdutoREST(produto)
  {

    console.log(">>>>>>>>>>>>>>>>>adicionarProdutoREST: "+produto.nome)

    let parametros = {
      method:'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: produto.nome, 
        imagem: produto.imagem, 
        preco: parseFloat(produto.preco)
      })
  }

  console.log(">>>>>>>>>>>>>>>>>adicionarProdutoREST: "+parametros.body);

    fetch("http://192.168.0.109:5000/Produtos", parametros)
        .then(response => response.json())
        .then((dadosJson) => {
            ToastAndroid.show("Produto #" + dadosJson.nome + " cadastrado", ToastAndroid.SHORT);
        })
        .catch(error => console.log("Falha ao gravar dados no REST: " + error));
  }
}



export default ProdutoContent;