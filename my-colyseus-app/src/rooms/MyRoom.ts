import { Room, Client } from 'colyseus';
import { MyRoomState } from './schema/MyRoomState';
import { Player } from './schema/PlayerState';

const words = require('an-array-of-english-words');

export class MyRoom extends Room {
  onCreate(options: any) {
    this.maxClients = 5;

    this.setState(new MyRoomState(words.slice(0, 50)));

    this.onMessage('input', (client, message) => {
      const player = this.state.players.get(client.id);

      if (player.current_word[0] === message) {
        player.current_word = player.current_word.substr(1);

        if (!player.current_word) {
          player.score += 1;
          player.current_word = this.state.text[player.score];
        }
      }
    });
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.id, new Player({ ...options, current_word: this.state.text[0] }));

    if (this.state.players.size === 5) {
      this.state.room_status = 'full';
      this.lock();
    }
  }

  onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.id);
  }

  // onDispose() {}
}