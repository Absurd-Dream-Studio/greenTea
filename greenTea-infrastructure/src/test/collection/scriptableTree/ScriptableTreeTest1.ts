import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { DFSIterator } from "@Src/collection/scriptableTree/iterator/DFSIterator.js";
import { TopDownIterator } from "@Src/collection/scriptableTree/iterator/TopDownIterator.js";
import Div, { DivClass } from "./testTag/Div.js";

export default function () {
  let tree = Tree().getNode()

  console.log('DFS iterator')
  new DFSIterator<DivClass>(tree)
    .Iterate(item => {
      console.log(item.data.text)
      return true
    })
  console.log('-'.repeat(30))

  console.log('Top down iterator')
  new TopDownIterator<DivClass>(tree)
  .Iterate(item =>{
      console.log(item.data.text)
    return true
  })
  console.log('-'.repeat(30))
}

function Tree():IScriptableTreeNodeFactory<any>{
  let result = 
  Div(
    {text:'root'},
    [
      Div(
        {text:'a'},
        [
          Div(
            {text:'a-1'},
            [
              Div({text:'a-1-1'})
            ]
          ),
          Div(
            {text:'a-2'}
          )
        ]
      ),
      Div(
        {text:'b'},
        [
          Div(
            {text:'b-1'}
          )
        ]
      ),
      Div({text:'c'})
    ]
  );
  return result
}