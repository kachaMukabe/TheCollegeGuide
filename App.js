import React from 'react';
import { StyleSheet, Text, View,
   Button,
   TouchableWithoutFeedback,
   Image,
   FlatList,
   ScrollView,
   Dimensions,
   Row 
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

class HomeScreen extends React.Component {
  static navigationOptions={
    title: 'Home',
    headerRight:(
      <Button onPress = {() => alert('This is a message')}
      title = 'Info' />
    ),
  };

  render(){
    return(
      <View style={styles.container}>
        <FlatList 
          data={[
            {key: 'Recipe 1'},
            {key: 'Recipe 2'},
            {key: 'Recipe 3'},
            {key: 'Recipe 4'},
            {key: 'Recipe 5'},
            {key: 'Recipe 6'},
            {key: 'Recipe 7'},
            {key: 'Recipe 8'},
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
    const ingredients = []
    const screenHeight = Dimensions.get('window').height
    
    for(x in data.Recipe1.Steps){
      ingredients.push(
        <Text>{ data.Recipe1.Steps[x] }</Text>
      )
    }
    return(
      <ScrollView  style={{height: screenHeight}} contentContainerStyle={{
        flexGrow: 1,
      }}>
        <View style={styles.recipeImage}>
          <Image style={styles.image} resizeMode="stretch" source={require('./img/mug-cake.jpg')}/>
        </View>
        <View style={{ flexDirection: 'column', flex: 1, }}>
          <View style={styles.scrolItem}>
            { data.Recipe1.Ingredients.map((item, key) =>(
              <Text key={ key }>{ item }</Text>
            )) }
          </View>
          <View style={styles.scrolItem}>
            { data.Recipe1.Steps.map((item, key) =>(
              <Text key={ key }>{ item }</Text>
            )) }
          </View>
        </View>
      </ScrollView>
    );
  }
}

let sH = Dimensions.get('window').height

const RootStack = createStackNavigator(
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
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  recipeImage: {
    flex: 1,
    justifyContent: 'space-between',
    height: sH/3,
  },
  scrolItem: {
    justifyContent: 'space-between',
  },
  // recipeIngredients: {
  //   flex: 1,
  // },
  // recipeSteps: {
  //   flex: 1,
  // },
});
