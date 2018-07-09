import React from 'react';
import { StyleSheet, Text, View,
   Button,
   TouchableWithoutFeedback,
   Image,
   FlatList,
   ScrollView,
   Dimensions
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

class HomeScreen extends React.Component {
  static navigationOptions=({navigation})=>{
    const params = navigation.state.params || {};

    return {
      headerRight:(
        <Button onPress = {() => navigation.navigate('MyModal')}
        title = 'Info' />
      ),
      title: 'Home',
    };
    
    
  };

  render(){
    return(
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={ styles.itemSeparator }>

            </View>
          )}
          data={[
            {key: 'Muffin in a Mug'},
            {key: 'Simple Tuna Salad'},
            {key: 'Omelette in a Mug'},
            {key: 'Ramen in a Mug'},
            {key: 'French Toast in a Mug'},
            {key: 'Brownie in a Mug'},
            {key: 'Mac n Cheese in a Mug'},
            {key: 'Pizza in a Mug'},
          ]}
          renderItem = {({item}) => <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate(
            'Recipe', {recipeName: item.key,}
          )}>
            <View>
              <Text style={styles.item}>{item.key}</Text>
              
            </View>
          </TouchableWithoutFeedback>}
        />
        <View style={{ bottom:0, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text >The College Guide To Mug Meals</Text>
        </View>
      </View>
    );
  }
}

class RecipeScreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return{
      title: navigation.getParam('recipeName', 'Recipe'),
    };
  };

  render(){
    const {navigation} = this.props
    const recipe = navigation.getParam('recipeName', 'default')
    const data = require('./db.json')
    const screenHeight = Dimensions.get('window').height
    const images = {
      "Muffin in a Mug": require('./img/mug-cake.jpg'),
      "Simple Tuna Salad": require('./img/tuna.jpg'),
      "Omelette in a Mug": require('./img/omelet.jpg'),
      "Ramen in a Mug": require('./img/ramen.jpg'),
      "French Toast in a Mug": require('./img/frenchtoast.jpg'),
      "Brownie in a Mug": require('./img/brownie.jpg'),
      "Mac n Cheese in a Mug": require('./img/macncheese.jpg'),
      "Pizza in a Mug": require('./img/pizza.jpg'),
    }
 
    return(
      <ScrollView  style={{height: screenHeight}} contentContainerStyle={{
        flexGrow: 1,
      }}>
        <View style={styles.recipeImage}>
          <Image style={styles.image} resizeMode="stretch" source={ images[recipe] }/>
        </View>
        <View style={{ flexDirection: 'column', flex: 1, }}>
          <View style={styles.scrolItem}>
            { data[recipe].Ingredients.map((item, key) =>(
              <View key={ key } style={{flexDirection: 'row'}}>
                <Text>{"\u2022 "}</Text>
                <Text style={{flex:1, paddingLeft:5}}>{ item }</Text>
              </View>
            )) }
          </View>
          <View style={ styles.itemSeparator }></View>
          <View style={styles.scrolItem}>
            { data[recipe].Steps.map((item, key) =>(
              <View key={ key } style={{flexDirection: 'row'}}>
                <Text>{"\u2022 "}</Text>
                <Text style={{flex:1, paddingLeft:5}}>{ item + "\n" }</Text>
              </View>
            )) }
          </View>
        </View>
      </ScrollView>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Info</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

let sH = Dimensions.get('window').height

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Recipe: RecipeScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: '#a459a1',
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    MyModal: ModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ced0ce",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  recipeImage: {
    flex: 1,
    height: sH/3,
  },
  scrolItem: {
    backgroundColor: '#fff',
    padding: 10,
  },
});
