import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "MeuNegocio.db";
const database_version = "1.0";
const database_displayname = "Banco de Dados de Vendas e Produtos";
const database_size = 200000;

export default class Database{
  //PRODUTOS
    IniciaBD()
    {
        let bd;
        return new Promise((resolve)=>{SQLite.echoTest().then(()=>{
            SQLite.openDatabase(database_name,database_version,database_displayname,database_size).then(BD =>{
                    bd= BD;

                    bd.executeSql('SELECT 1 FROM Produtos LIMIT 1').catch((error)=>{
                        bd.transaction((tx)=>{
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Produtos(IdProduto INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Nome VARCHAR(200), Imagem VARCHAR(200), Preco DECIMAL(10,2))');
                        }).then(()=>{
                            console.log('Tabela Produtos criada com sucesso!!!');
                        }).catch((erro)=>{console.log('FALHOU EM CRIAR A TABELA PRODUTOS: '+erro);})});

                      bd.executeSql('SELECT 1 FROM Vendas LIMIT 1').catch((error)=>{
                      bd.transaction((tx)=>{
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Vendas(IdVendas INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dataVenda date, Quantidade INTEGER, IdProd int, FOREIGN KEY(IdProd) REFERENCES Produtos(IdProduto))');
                      }).then(()=>{
                        console.log('Tabela Vendas criada com sucesso!!!');
                      }).catch((erro)=>{
                        console.log('Erro ao criar a tabela Vendas: '+ erro);
                      });
                    });
                    resolve(bd);
                })
            })
        });
    }

    fechaBD(bd) {
        if (bd) {
          bd.close()
            .then(status => {
            })
            .catch(error => {
              console.log('Erro ao fechar o banco de dados: '+error);
            });
        } else {
        }
      };

    listaDeProdutos() {
    return new Promise((resolve) => {
      const Produtos = [];

      this.IniciaBD().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Produtos', []).then(([tx,results]) => {
            var len = results.rows.length;
            
            for (let i = 0; i < len; i++) {
              var novoProduto = {id: results.rows.item(i).IdProduto, nome: results.rows.item(i).Nome, imagem: results.rows.item(i).Imagem, preco: results.rows.item(i).Preco};
              Produtos.push(novoProduto);
            }
            resolve(Produtos);
          });
        }).then((result) => {
          this.fechaBD(db);
        }).catch((err) => {
          console.log('ERRROOOOOO '+err);;
        });
      }).catch((err) => {
        console.log('ERRROOOOOO '+err);;
      });
    });  
  }

    addProduto(Produto) {
        return new Promise((resolve) => {
        this.IniciaBD().then((db) => {
            db.transaction((tx) => {
            tx.executeSql('INSERT INTO Produtos(Nome,Imagem,Preco) VALUES (?,?,?)', [Produto.nome, Produto.imagem, Produto.preco]).then(([tx, results]) => {
              resolve(results);
            })}).then(() => {
            this.fechaBD(db);
            }).catch((err) => {
            console.log('database: Erro ao adicionar o Produto: '+err);
            });
        }).catch((err) => {
            console.log('database: Erro ao iniciar o Banco de Dados: '+err);
        });
        });  
    }

    apagarTodosProdutos(){
      return new Promise((resolve) => {
        this.IniciaBD().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM Produtos').then(([tx, results]) => {
              resolve(results);
            });
          }).then((result) => {
            console.log('Todos os Produtos foram apagadas! ' +result);
            this.fechaBD(db);
          }).catch((err) => {
            console.log('Erro ao apagar produto: '+err);
          });
        }).catch((err) => {
          console.log('Erro ao iniciar o Banco de Dados: '+err);
        });
      });

    }

    apagarProdutoPeloID(id){
      return new Promise((resolve)=>{
        this.IniciaBD().then((bd)=>{
          bd.transaction((tx)=>{
            tx.executeSql('DELETE FROM Produtos WHERE IdProduto='+id).then(([tx, results])=>{resolve(results)});
          }).then((result)=>{console.log('Produto apagado com sucesso');this.fechaBD(bd);})
        })
      });
    }

    //VENDAS

    dropTabelaVendas()
    {
      return new Promise((resolve)=>{
        this.IniciaBD().then((bd)=>{
          bd.transaction((tx)=>{
            tx.executeSql('DROP TABLE Vendas');
          }).then((result)=>{console.log('Resultado da exclusão da tabela Vendas '+result)});
        })
      });
    }

  addVenda(novaVenda){
    return new Promise((resolve)=>{
      this.IniciaBD().then((db)=>{
        db.transaction((tx)=>{
          tx.executeSql('INSERT INTO Vendas(Quantidade,dataVenda,IdProd) VALUES (?, ?, ?)',[novaVenda.quantidade, novaVenda.data, novaVenda.produto.id]);
        }).then(()=>{
          console.log('AddVenda: EXECUTADO COM SUCESSO');
        })
      });
    });
  }

  listaDeVendas() {
    return new Promise((resolve) => {
      const Vendas = [];

      this.IniciaBD().then((db) => {
        db.transaction((tx) => {
          console.log('INICIANDO LISTA DE VENDAS')
          tx.executeSql('SELECT * FROM Vendas', []).then(([tx,results]) => {
            var len = results.rows.length;
            
            for (let i = 0; i < len; i++) {
              var NovaVenda = { id: results.rows.item(i).IdVendas, 
                                data: results.rows.item(i).dataVenda,
                                idProd: results.rows.item(i).IdProd,
                                quantidade: results.rows.item(i).Quantidade};

              Vendas.push(NovaVenda);
            }
            resolve(Vendas);
          });
        }).then((result) => {
          this.fechaBD(db);
        }).catch((err) => {
          console.log('ERRROOOOOO '+err);
        });
      }).catch((err) => {
        console.log('ERRROOOOOO '+err);;
      });
    });  
  }

  apagarVendaPorId(id){
    return new Promise((resolve)=>{
      this.IniciaBD().then((bd)=>{
        bd.transaction((tx)=>{
          tx.executeSql('DELETE FROM Vendas WHERE IdVendas='+id).then(([tx, results])=>{resolve(results)});
        }).then((result)=>{console.log('Venda apagada com sucesso');this.fechaBD(bd);})
      })
    });
  }
}