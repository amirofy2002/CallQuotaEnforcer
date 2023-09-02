import { Subject } from "rxjs";
import { ResponseCommand } from "../../../core/types/Response";

const responseBus = new Subject<ResponseCommand>();

export default responseBus;
