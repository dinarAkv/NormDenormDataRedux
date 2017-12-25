import React from 'react';
import { normalize, schema, denormalize } from 'normalizr';

import _ from 'underscore';


const originalData = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "date": [
    {
      "id": "140",
      "dateStart": "10.10.2017",
      "dateEnd": "10.12.2017",
    },
    {
      "id": "142",
      "dateStart": "10.10.2018",
      "dateEnd": "10.12.2018",
    }
  ],
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}



const personOriginal = {
  "id": "12",
  "name": "Ivan",
  "task": {
    "id": "105",
    "car": [
      {
        "id": "345",
        "mark": 'mercedes'
      },
      {
        "id": "346",
        "mark": 'pego'
      }
    ],
  }

}




class App extends React.Component {

  constructor(props){
    super(props);

    this.myFunc = this.myFunc.bind(this);
  }


  myFunc(obj){

    console.log('target', obj);

    // this.articleNorm();

    this.personNormDenorm();
  }



  personNormDenorm = () => {
    // ========================== Normalization =========================

    const car = new schema.Entity('cars');

    const task = new schema.Entity('tasks', {
      car: [ car ]
    });

    const person = new schema.Entity('persons', {
      task: task,
    });

    const normalizedPerson = normalize(personOriginal, person);

    console.log('normalizedPerson', normalizedPerson);

    // ========================== Denormalization =========================



    const idArr = Object.keys(normalizedPerson.entities.persons);

    const entities = normalizedPerson.entities.persons[idArr[0]];

    const denormalizedPerson = denormalize(normalizedPerson.result, person, normalizedPerson.entities);

    console.log('denormalizedPerson', denormalizedPerson);
  }




  articleNorm = () => {

    //Define a users schema
    const user = new schema.Entity('users');

    const title = new schema.Entity('titles');

    const dateShema = new schema.Entity('dates');
    const dateList = [ dateShema ];

    // Define your comments schema
    const comment = new schema.Entity('comments', {
      commenter: user
    });

    // Define your article
    const article = new schema.Entity('articles', {
      author: user,
      date: dateList,
      comments: [ comment ]
    });

    const normalizedData = normalize(originalData, article);

    console.log('normalizedData', normalizedData);
  }

   render() {
      return (

			<div>
            Hello World!!!
            <button onClick={this.myFunc} >Button</button>
			</div>

      );
   }
}

export default App;
