import { Schema, type, MapSchema } from '@colyseus/schema';
import { Player } from './PlayerState';

export class MyRoomState extends Schema {
  constructor(words: any) {
    super();
    this.text = words;
  }

  @type('string')
  room_status: string = 'waiting';

  @type(['string'])
  text: string[] = [];

  @type({ map: Player })
  players = new MapSchema<Player>();
}
