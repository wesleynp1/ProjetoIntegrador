class ProdutoContent
{
  constructor(bancoDeDados)
  {
      this.produtos =   [];
      
      this.BD = bancoDeDados;
      this.BuscarProdutosNoBancoDeDados();
  }

  ProdutoPeloId(id)
  {
     var produtoSelecionado =  this.produtos.find(p => p.id==id);

     if(produtoSelecionado==undefined)produtoSelecionado={id: null, nome: null, preco: null};

      console.log('Produto Selecionado: '+produtoSelecionado.nome);
      
      return produtoSelecionado;
  }

  BuscarProdutosNoBancoDeDados()
  {
    return new Promise((resolve) => {
      this.BD.listaDeProdutos().then((ProdutosBD)=>{
      this.produtos = ProdutosBD;
      console.log('FIM DA EXECUÇÃO DE BUSCAR PRODUTOS')
      this.imprimirProdutos();
      resolve(ProdutosBD);
    }).catch((erro)=>{
        console.log('Deu ruim: '+erro);
      })});
  }

  imprimirProdutos()
  {
    for(let i=0;i<this.produtos.length;i++)
    {
      console.log(this.produtos[i].nome);
    }
  }

  apagarProdutoPeloID(id)
  {
    this.BD.apagarProdutoPeloID(id);
  }

  adicionarProduto(produto)
  {
    this.BD.addProduto({nome: produto.nome, preco: produto.preco}).then((result)=>{
      console.log('ProdutoContent: PRODUTO ADICIONADO!!');
    }).then(()=>{}).catch((erro)=>{});
  }

  apagarTodosProdutos()
  {
    this.BD.apagarTodosProdutos();
  }
}



export default ProdutoContent;