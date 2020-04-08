import React, {Component} from 'react'
import { Platform, StyleSheet, Text, View, Alert } from 'react-native'
import params from './src/params'
//import Field from './src/components/Field'
import MineField from './src/components/MineField'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines
} from './src/functions'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeuuuuuu!', 'Que burrroooo kkkk!')
    }

    if (won) {
      Alert.alert('Parabénsss', "Você Venceu!")
    }

    this.setState({ board, lost, won })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!</Text>
        <Text style={styles.instructions}>
          Tamanho da Grade: &nbsp;
          {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenField} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
    //fontSize: 20,
    //textAlign: 'center'
  }
})
