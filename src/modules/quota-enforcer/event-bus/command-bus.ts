import { Subject } from "rxjs";
import { Command } from "../../../core/types/Command";

const commandBus = new Subject<Command>();

export default commandBus;
