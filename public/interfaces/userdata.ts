export interface UserData {
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
        [date: string]: {
            MO: string;
            TU: string;
            WE: string;
            TH: string;
            FR: string;
            SA: string;
            SU: string;
        };
    };
    streak: {
        counter: number;
    };
}
