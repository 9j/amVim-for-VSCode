import {Command} from '../Modes/Mode';
import {RecursiveMap} from '../Mapper';
import {SpecialKeyCommon} from './Common';

export class SpecialKeyN implements SpecialKeyCommon {

    indicator = '{N}';

    private conflictRegExp = /^[1-9]|\{motion\}|\{char\}$/;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        if (keyToMap === this.indicator) {
            Object.getOwnPropertyNames(node).forEach(key => {
                this.conflictRegExp.test(key) && delete node[key];
            });
        }

        if (this.conflictRegExp.test(keyToMap)) {
            delete node[this.indicator];
        }
    }

    match(inputs: string[]): [number, {}] {
        if (! /[1-9]/.test(inputs[0])) {
            return null;
        }

        let n = [inputs[0]];

        inputs.slice(1).every(input => {
            if (/[0-9]/.test(input)) {
                n.push(input);
                return true;
            }
            return false;
        });

        return [n.length, {n: parseInt(n.join(''), 10)}];
    }

}
