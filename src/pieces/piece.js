export default class Piece {
    constructor(player, iconPath) {
        this.player = player;
        this.style = {backgroundImage: "url(" + iconPath + ")"};
        //{backgroundImage: "url('"+iconPath+"')"};
    }
}