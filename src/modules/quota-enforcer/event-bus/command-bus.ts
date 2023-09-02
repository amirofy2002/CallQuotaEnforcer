import { Subject } from "rxjs";
import { Command } from "../../../core/types/command";

const commandBus = new Subject<Command>();

export default commandBus;
