export class Validator {
    validate(data, ruleSet) {
        for (const field in ruleSet) {
            let rules = ruleSet[field];
            for (const rule of rules) {
                if (rule === "number") {
                    if (typeof data[field] !== rule) {
                        return false;
                    }
                } else if (rule === "string") {
                    if (typeof data[field] !== rule) {
                        return false;
                    }
                } else if (rule === "required") {
                    if (!data.hasOwnProperty(field)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}