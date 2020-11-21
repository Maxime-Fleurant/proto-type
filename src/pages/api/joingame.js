import { request, gql } from 'graphql-request';
import _ from 'lodash';

const text =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit Curabitur suscipit purus lectus ac mattis neque rhoncus eget Etiam dictum iaculis orci ac consequat Ut nec luctus enim Donec at ante id odio porttitor condimentum sit amet id odio Vestibulum lacinia orci nec aliquam auctor ante erat imperdiet felis sit amet';

const handler = async (req, res) => {
  const queryUser = gql`
    {
      user(where: { game_status: { _eq: "search" } }) {
        id
      }
    }
  `;

  const mutateInsertGame = gql`
    mutation($gameArray: [game_insert_input!]!, $userArray: [Int!]!) {
      insert_game(objects: $gameArray) {
        returning {
          id
        }
      }
      update_user(where: { id: { _in: $userArray } }, _set: { game_status: "playing" }) {
        returning {
          id
        }
      }
    }
  `;

  const { user } = await request('http://localhost:8080/v1/graphql', queryUser);
  const userIdArray = user.map((userobj) => userobj.id);
  const chunckUser = _.chunk(userIdArray, 2).filter((block) => block.length === 2);
  const userTargetArray = _.flatten(chunckUser);

  const newGameData = chunckUser.map((chunk) => {
    const newGame = {
      text,
      game_users: {
        data: [{ user_id: chunk[0] }, { user_id: chunk[1] }],
      },
    };

    return newGame;
  });

  await request('http://localhost:8080/v1/graphql', mutateInsertGame, {
    gameArray: newGameData,
    userArray: userTargetArray,
  });

  return res.send('ok');
};

module.exports = handler;
