import React,{Component} from 'react';
import {ScrollView,Text, View, Image, PermissionsAndroid, TouchableOpacity,StyleSheet} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';

class PaginaGaleria extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {fotos: []};

        if(this.permissaoConcedida())
        {
        CameraRoll.getPhotos({
                first: 10,
                assetType: 'Photos'
            }).then(r => {
                this.setState({fotos: r.edges})
            });
        }
    }

    permissaoConcedida = async()=>{
        console.log('Vai pedir permissão...');
        
        PermissaoResultadoLeitura = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        
        console.log('Pediu permissão o resultado foi:'+ PermissaoResultadoLeitura);

        return((PermissaoResultadoLeitura));
    }

    render()
    {
        return(
        <ScrollView>
            <Text style={estilos.titulo}>Imagens Salvas</Text>
                <View style={estilos.FotosContainer}>
                    {this.state.fotos.map((f,i)=>{
                        return(
                            <TouchableOpacity key={i} onPress={()=>{this.props.navegacao.navigate("PaginaProdutos",{imagem: f.node.image.uri})}}>
                                <Image key={i} style={estilos.Imagem} source={{uri: f.node.image.uri}}/>
                            </TouchableOpacity>
                        )})}
                </View>
        </ScrollView>
        )
    }
}

const estilos = StyleSheet.create({
    titulo:{fontSize:18,textAlign:'center'},
    FotosContainer:{flexDirection: 'row',flexWrap:'wrap',justifyContent: 'center'},
    Imagem:{width: 96,height: 96, margin: 5,padding:5}
})


export default PaginaGaleria;