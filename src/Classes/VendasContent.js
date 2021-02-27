/* eslint-disable prettier/prettier */
class VendasContent
{
  constructor(bancoDeDados,produtoContent)
  {
    this.vendas = [];
    this.BD = bancoDeDados;
    this.PC = produtoContent;
    this.App = null;

    this.BuscarVendasNoBancoDeDados();
  }

  BuscarVendasNoBancoDeDados()
  {
        return new Promise((resolve)=>{this.BD.listaDeVendas().then((VendasComIdProd)=>{
        console.log('TAMANHO DO ARRAY RETORNANDO AS VENDAS: '+ VendasComIdProd.length)

        let arrayDeVendas = [];

        for (let i = 0; i < VendasComIdProd.length; i++)
        {
            console.log('ID da venda: '+VendasComIdProd[i].id)

            arrayDeVendas.push({
                    id: VendasComIdProd[i].id,
                    data: VendasComIdProd[i].data,
                    produto: this.PC.ProdutoPeloId(VendasComIdProd[i].idProd), 
                    quantidade: VendasComIdProd[i].quantidade
                    });
        }
        this.vendas = arrayDeVendas; 

        if(this.App!=null)this.App.atualizarPaginas();
        
        resolve(this.vendas);
    })})
  }

  addVenda(novaVenda)
  {
        this.BD.addVenda({data: novaVenda.data, produto: novaVenda.produto, quantidade: novaVenda.quantidade}).then((result)=>{
        console.log('NOVA VENDA ADICIONADA COM SUCESSO!!!');
        this.BuscarVendasNoBancoDeDados();
    }).then(()=>{}).catch((erro)=>{});
  }

  apagarVendaPorId(id){
        this.BD.apagarVendaPorId(id).then((result)=>{
        console.log('VENDA APAGADA COM SUCESSO! + '+ result);
        this.BuscarVendasNoBancoDeDados();
    });
  }
}

export default VendasContent;