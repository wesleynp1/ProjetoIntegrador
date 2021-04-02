import {ToastAndroid} from 'react-native';

/* eslint-disable prettier/prettier */
class VendasContent
{
  constructor(bancoDeDados,produtoContent)
  {
    this.vendas = [];
    this.BD = bancoDeDados;
    this.PC = produtoContent;
    this.App = null;

    this.iniciarLoadingDasPaginas;
    this.finalizarLoadingDasPaginas;
  }

  BuscarVendasNoBancoDeDados()
  {
        return new Promise((resolve)=>{this.BD.listaDeVendas().then((VendasComIdProd)=>{

        let arrayDeVendas = [];

        for (let i = 0; i < VendasComIdProd.length; i++)
        {

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
        this.BuscarVendasNoBancoDeDados();
    }).then(()=>{}).catch((erro)=>{});
  }

  apagarVendaPorId(id){
        this.BD.apagarVendaPorId(id).then((result)=>{
        this.BuscarVendasNoBancoDeDados();
    });
  }

    //REST
    BuscarVendasNoREST()
    {
      this.iniciarLoadingDasPaginas()
        fetch("http://192.168.0.109:5000/Vendas")
        .then(response => response.json())
        .then((dadosJson) => {
          var VendasREST = [];
  
          for (let i in dadosJson) {
              
              var VendaResgatada = {
              id: dadosJson[i].id,
              data: dadosJson[i].data,
              produto: this.PC.ProdutoPeloId(dadosJson[i].idProduto), 
              quantidade: dadosJson[i].quantidade
              };

            VendasREST.push(VendaResgatada);
          }
          this.vendas = VendasREST
          this.finalizarLoadingDasPaginas();
        })
  
        .catch((erro)=>{console.log('Deu ruim no REST: '+erro);})
  
    }
  
    adicionarVendaREST(NovaVenda)
    {
      this.iniciarLoadingDasPaginas();
  
      let parametros = {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: NovaVenda.data,
          quantidade: parseFloat(NovaVenda.quantidade),
          idProduto: NovaVenda.produto.id
          })
    }
  
      fetch("http://192.168.0.109:5000/Vendas", parametros)
          .then(response => response.json())
          .then((dadosJson) => {
              this.BuscarVendasNoREST();
              this.finalizarLoadingDasPaginas();
              ToastAndroid.show("Venda #" + dadosJson.id + " cadastrado", ToastAndroid.SHORT);
          })
          .catch(error => console.log("Falha ao gravar dados no REST: " + error));
    }

    removerVendaREST(id)
    {
      this.iniciarLoadingDasPaginas();
  
      let parametros = {
        method:'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
  
      fetch("http://192.168.0.109:5000/Vendas?id="+id, parametros)
          .then(response => response.json())
          .then((dadosJson) => {
              this.BuscarVendasNoREST();
              this.finalizarLoadingDasPaginas();
              ToastAndroid.show("Venda #" + dadosJson.id + " removida", ToastAndroid.SHORT);
          })
          .catch(error => console.log("Falha ao remover dados no REST: " + error));
    }
}

export default VendasContent;