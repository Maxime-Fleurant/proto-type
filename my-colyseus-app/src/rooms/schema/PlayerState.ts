import { Schema, type } from '@colyseus/schema';

export class Player extends Schema {
  constructor(playerData: any) {
    super();
    this.dbId = playerData.client_id;
    this.name = playerData.name;
    this.current_word = playerData.current_word;
  }

  @type('string')
  playerSeat: string = '';

  @type('string')
  dbId = '';

  @type('string')
  name = '';

  @type('number')
  score: number = 0;

  @type('number')
  badType: number = 0;

  @type('string')
  current_word: string = '';
}
