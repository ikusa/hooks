import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

type Recipe = {
  title: string;
};
type State = {
  recipes: Array<Recipe>;
  searchQuery: string;
};
export default class App extends Component<{}, State> {
  state: State = {
    recipes: [],
    searchQuery: '',
  };
  async componentDidMount() {
    let res = await fetch('http://www.recipepuppy.com/api/');
    let data = await res.json();
    let recipes: Array<Recipe> = data.results;
    this.setState({ recipes });
  }

  async componentDidUpdate(_: {}, prevState: State) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log('i do fetch');
      let res = await fetch(
        `http://www.recipepuppy.com/api/?q=${this.state.searchQuery}`,
      );
      let data = await res.json();
      let recipes: Array<Recipe> = data.results;
      this.setState({
        recipes,
      });
    }
  }

  onChangeText = (text: string) => {
    this.setState({ searchQuery: text });
  };
  render() {
    console.log('render');
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: 300,
            padding: 5,
          }}
          onChangeText={(text) => this.onChangeText(text)}
          value={this.state.searchQuery}
        />

        {this.state.recipes.map((recipe) => {
          return <Item title={recipe.title} key={recipe.title}></Item>;
        })}
      </View>
    );
  }
}

function Item({ title }: Recipe) {
  return <Text style={{ fontSize: 20 }}>- {title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
