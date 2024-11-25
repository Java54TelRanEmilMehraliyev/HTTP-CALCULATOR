import { operations } from "../config/operations.mjs";
import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();

export default class CalculatorService {
    
     
          /**
     * 
     * @param {EventEmitter} emitter 
     * @param {Map} operations 
     */
    constructor(emitter, operations) {
        this.registerOperations(emitter, operations);
    }

    /**
     * 
     * @param {EventEmitter} emitter 
     * @param {Map} operations 
     */
    registerOperations(emitter, operations) {
        for (const [operation, func] of operations) {
            emitter.addListener(operation, (operands, response) => {
                const result = func(operands[0], operands[1]);
                response.end(view.getHtml(result, false));
            });
        }
    }
}