import Actions from '../constants/reduxConstants';




const socketMiddleware = store => next => action => {

  let result = next(action)

  switch (action.type) {
    case Actions.CONNECT:
      return action.message;
    case Actions.DISCONNECT:
      return action.message;
    case Actions.SEND_MESSAGE:
      return action.message;
    case Actions.GET_MESSAGE:
      return action.message;
    default:
      return result;
  }

}

export default socketMiddleware