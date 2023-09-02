import { Subject } from "rxjs";
import { ResponseCommand } from "../../../core/types/response";

const responseBus = new Subject<ResponseCommand>();

export default responseBus;
