import { Member } from "./member";
import { Comic } from "./comic";

export interface Basket {
    ID?: number;

    MemberID? : number;
    Member?: Member

    ComicID? : number;
    Comic?: Comic

    Total? : number;
}