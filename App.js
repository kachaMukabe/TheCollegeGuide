import React from 'react';
import { StyleSheet, Text, View,
   Button,
   TouchableWithoutFeedback,
   Image,
   FlatList 
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
    return(
      <View></View>
    );
  }
}

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
});
