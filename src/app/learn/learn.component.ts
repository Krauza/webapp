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
  public card: Card = null;

  constructor(private cardService: CardService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boxId = params['id'];
      this.getNextCard();
    });
  }

  private getNextCard() {
    this.cardService.getNextCard(this.boxId).subscribe((card) => {
      this.card = card;
      console.log(this.card);
    });
  }
}
