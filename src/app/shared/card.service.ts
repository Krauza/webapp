import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import gql from 'graphql-tag';
import { Card } from "../models/card";
import {Box} from "../models/box";

interface CardResponse {
  nextCard: Card
}

interface BoxResponse {
  addAnswer: Box
}

@Injectable()
export class CardService {

  constructor(private apollo: Apollo) { }

  createBox(boxId: string, obverse: string, reverse: string): Observable<any> {
    const createCardQuery = gql`
      mutation createCard($boxId: String!, $obverse: String!, $reverse: String!) {
        createCard(box_id: $boxId, obverse: $obverse, reverse: $reverse) {
          card {
            id
          }
          errors {
            errorType
            key
            message
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: createCardQuery,
      variables: {
        boxId: boxId,
        obverse: obverse,
        reverse: reverse
      }
    });
  }

  getNextCard(boxId: string): Observable<Card> {
    const getNextCardQuery = gql`
      query getNextCard($boxId: String!) {
        nextCard(box_id: $boxId) {
          id
          obverse
          reverse
        }
      }
    `;

    return this.apollo.watchQuery<CardResponse>({
      query: getNextCardQuery,
      variables: {
        boxId: boxId
      }
    }).map(({data}) => data.nextCard)
  }

  addAnswer(boxId: string, cardId: string, answer: boolean): Observable<Box> {
    const addAnswer = gql`
      mutation addAnswer($answer: Boolean!, $boxId: String!, $cardId: String!) {
        addAnswer(answer: $answer, box_id: $boxId, card_id: $cardId) {
          box {
            id
            name
          }
        }
      }
    `;

    console.log(boxId, cardId, answer);
    return this.apollo.mutate<BoxResponse>({
      mutation: addAnswer,
      variables: {
        boxId: boxId,
        cardId: cardId,
        answer: answer
      }
    }).map(({data}) => data.addAnswer);
  }
}
