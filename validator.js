export class Validator {

    validate(data, ruleSet) {
        for (const field in ruleSet) {
            let rules = ruleSet[field];
            if (!rules.includes("required") && data[field] === undefined) {
                continue;
            }

            for (const rule of rules) {
                if (!this.chooseRuleAndCheck(rule, data, field)) {
                    return false;
                }
            }
        }
        return true;
    }

    chooseRuleAndCheck(rule, data, field) {
        switch (rule) {
            case "string":
            case "number":
                return this.checkValueType(data[field], rule);
            case "required":
                return data.hasOwnProperty(field);
        }
    }

    checkValueType(value, type) {
        return typeof value === type;
    }
}