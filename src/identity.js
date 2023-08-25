export default class Identity {
    constructor() {
      this.playerId = this.uuidv4();
      this.nickname = "";
    }
  
    makeNickname(nickname) {
      this.nickname = nickname;
    }

    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
