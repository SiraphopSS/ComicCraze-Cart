import { Member } from "./member";
import { Comic } from "./comic";

export interface Basket {
    ID?: number;
    MemberID? : Member;
    ComicID? : Comic;
    Total? : number;
}