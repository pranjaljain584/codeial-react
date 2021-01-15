import { APIUrls } from "../helper/urls";
import { FETCH_FRIENDS_SUCCESS } from "./actionTypes";

export function fetchUserFriends() {
    return (dispatch) => {
        const url = APIUrls.userFriends() ;
    }
}

export function fetchFriendsSuccess(friends){
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends,
    }
}