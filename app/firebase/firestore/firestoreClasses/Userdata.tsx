export default class UserData {
    personaldata: {
        birthday: string;
        firstName: string;
        height: number;
        gender: string;
        lastName: string;
        weight: number;
    };

    settingsdata: {
        heightUnit: string;
        language: string;
        weightUnit: string;
    };

    weeks: {
        placeholder: { [day: string]: string };
    };

    streak: {
        counter: number;
    };

    constructor() {
        this.personaldata = {
            birthday: "",
            firstName: "",
            height: 0,
            gender: "",
            lastName: "",
            weight: 0
        };

        this.settingsdata = {
            heightUnit: "",
            language: "",
            weightUnit: ""
        };

        this.weeks = {
            placeholder: { "MO": "", "TU": "", "WE": "", "TH": "", "FR": "", "SA": "", "SU": "" }
        };

        this.streak = {
            counter: 0
        };
    }
}
