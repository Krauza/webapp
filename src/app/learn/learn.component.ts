import { Component, OnInit } from '@angular/core';
import { CardService } from "../shared/card.service";
import { Card } from "../models/card";
import { Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})

export class LearnComponent implements OnInit {
  private boxId: string;
  private card: Card = null;
  private displayCardText: string;
  private firstSide: boolean = true;

  constructor(private cardService: CardService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boxId = params['id'];
      this.getNextCard();
    });
  }

  private getNextCard() {
    this.card = null;
    this.cardService.getNextCard(this.boxId).subscribe((card) => {
      this.card = card;
      this.displayCardText = card.obverse;
      this.firstSide = true;
    });
  }

  private answer(knew) {
    this.firstSide = false;
    this.displayCardText = this.card.reverse;
    this.cardService.addAnswer(this.boxId, this.card.id, knew).subscribe((answer) => {
      console.log(answer);
    });
  }
}
