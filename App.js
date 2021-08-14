import React, {useState, Component} from 'react';
import { Text,TextInput, SafeAreaView, StatusBar, FlatList, View, TouchableOpacity, Button } from 'react-native';
import TodoInput from "./src/TodoInput";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {WebView} from 'react-native-webview';
import { getNews } from './src/news';
import Article from './src/Article';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize: 36, fontWeight: 'bold', paddingBottom: 50}}>Flex Shopper</Text>
        <View style={{  
        margin: 50,  
        flexDirection: 'row',  
        justifyContent: 'space-between'  
        }}>  
          <Button
            title= "         TODO          "
            onPress={() => navigation.navigate('Todo')}
          />
          <Text>           </Text>
          <Button
            title= "  Online Shop  "
            onPress={() => navigation.navigate('Online')}
          />
        </View>
        <View style={{  
        margin: 50,  
        flexDirection: 'row',  
        justifyContent: 'space-between'  
        }}>  
          <Button
            title= "Shopping List"
            onPress={() => navigation.navigate('ShopList')}
          />
          <Text>           </Text>
          <Button
            title= "         NEWS         "
            onPress={() => navigation.navigate('News')}
          />
        </View>
    </View>
  );
}

const ShopScreen = () => {
    const [todoItems, setTodoItems] = useState(["Cabbage", "Carrot"]);

    function addTodoItem(_text) {
        setTodoItems([...todoItems, _text]);
    }

    function deleteTodoItem(_index){
        let tempArr = [...todoItems];
        tempArr.splice(_index, 1);
        setTodoItems(tempArr)
    }

    return (
        <>            
            <SafeAreaView style={{padding: 16, justifyContent: 'space-between', flex: 1}}>
                <Text style={{fontSize: 36, fontWeight: 'bold'}}>Shopping List</Text>
                <FlatList
                    data={todoItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity
                                style={{paddingVertical: 8}}
                                onPress={() => {
                                    deleteTodoItem(index);
                                }}>
                                <Text style={{fontSize: 18}}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <TodoInput onPress={addTodoItem} />
            </SafeAreaView>
        </>
    );
};

const Website = () => {
  return (
    <WebView
    style={{flex:1}}
    source={{uri: 'https://www.amazon.in/'}}
    />
  );
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:['Task1','Task2'],
      text:''
    }
  }

  addTodoItem= () => {
    let tempData=this.state.data;
    tempData.push(this.state.text);
    this.setState({data:tempData});
  }

  deleteTodoItem(_index){
    let tempArr = this.state.data;
    tempArr.splice(_index, 1);
    this.setState({data:tempArr});
}

  render() {
    this.addTodoItem
    return (
        <>            
            <SafeAreaView style={{padding: 16, justifyContent: 'space-between', flex: 1}}>
                <Text style={{fontSize: 36, fontWeight: 'bold'}}>Todo</Text>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity
                                style={{paddingVertical: 8}}
                                  onPress={() => {
                                    this.deleteTodoItem(index);
                                }}>
                                <Text style={{fontSize: 18, }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TextInput
                  style={{ flex: 1, borderColor: '#212121', borderWidth: 1, borderRadius: 8 }}
                  placeholder="New item"
                  maxLength={20}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  />
                  
                  <TouchableOpacity
                  style={{marginLeft: 8, padding: 8, backgroundColor: '#212121', justifyContent: 'center', alignItems: 'center', borderRadius: 8}}
                  onPress={this.addTodoItem}
                  >
                  <Text style={{color: '#fafafa'}}>Add</Text>
              </TouchableOpacity>
              
              </View>
              <Text>{this.state.value}</Text>
                </SafeAreaView>
        </>
    );
  }
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: []};
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  render() {
    return (
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}     
      />
    );
  }
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShopList" component={ShopScreen} />
        <Stack.Screen name="Online" component={Website} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="News" component={News} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;