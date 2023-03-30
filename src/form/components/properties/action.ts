import Modal from "../../../modal";
import { FormElementContructor } from "../_lib";
export default function Action<Base extends FormElementContructor>(base: Base) {
    return class extends base {
        action(o: any) {
            Modal.push(o);
        }
    }
}