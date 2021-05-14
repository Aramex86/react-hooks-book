import {getWeek} from "../../Utils/utils";

export default function reducer (state:any, action:any) {
  switch (action.type) {
    case "NEXT_WEEK":
      return getWeek(state.date, 7);
    case "PREV_WEEK":
      return getWeek(state.date, -7);
    case "TODAY":
      return getWeek(new Date());
    case "SET_DATE":
      return getWeek(new Date(action.payload));
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}