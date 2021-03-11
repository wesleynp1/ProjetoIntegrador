import React,{Component} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';

const permissaoCamera = {
    title: 'Permissão para acessar a câmera!',
    message: 'Nós precisamos da sua permissão para usar a câmera',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancelar',
  };

class PaginaCamera extends Component
{
  render()
  {
    return(
      <View style={{flex: 1,backgroundColor: 'green'}}>
        <View style={{flex: 5, backgroundColor: 'red'}}>
            <RNCamera
                  ref={ref => {this.camera = ref;}}
                  style={{flex:1,alignItems: 'center',}}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.on}
                  androidCameraPermissionOptions={permissaoCamera}/>
        </View>

        <View style={{flex: 1,flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.TirarFoto.bind(this)} style={{flex: 1,backgroundColor:'red',margin: 8}}>
              <Text>Tirar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.props.navegacao.navigate("Fotos Salvas")}} style={{flex: 1,backgroundColor:'blue',margin: 8}}>
              <Text>Ver fotos salvas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  TirarFoto = async () =>{
            const opcoes = {quality: 1}
            const dados = await this.camera.takePictureAsync(opcoes).then(dados =>{
                CameraRoll.save(dados.uri);
                ToastAndroid.show('Salvo em: '+dados.uri, ToastAndroid.LONG,ToastAndroid.CENTER);
            })
  }
}

export default PaginaCamera;