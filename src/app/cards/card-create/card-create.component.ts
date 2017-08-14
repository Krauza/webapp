import { Component, OnInit } from '@angular/core';
import { Card } from "../../models/card";
import { CardService } from "../../shared/card.service";
import { Params, ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss']
})

export class CardCreateComponent implements OnInit {
  private boxId: string;

  constructor(private cardService: CardService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boxId = params['id'];
    });
  }

  handleSave(card: Card) {
    this.cardService.createBox(this.boxId, card.obverse, card.reverse).subscribe(() => {
      this.router.navigate(['/boxes']);
    });
  }
}
