import {doc, setDoc, getFirestore} from "firebase/firestore";
import firebase_app from "@/firebase/config";
const db = getFirestore(firebase_app)

export default async function addData(collection, id, data){

    // @ts-ignore
    data = {
        "exercises": {
            "02.10.2023-08.10.2023": {
                "MO": {
                    "arm-set": {
                        "Barbell Bench Press": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        "Barbell Bench ": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        " Bench Press": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        "Barbell Bench s": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        "s Bench Press": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        "Barbell Press": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        "Barbell Bench g": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        },
                        "Barbell g Press": {
                            "image": "",
                            "moves": "0",
                            "description": "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar. Lower the bar to your mid chest Raise the bar until you've locked your elbows.",
                            "time": "10",
                            "stars": "2",
                            "break": "30",
                        }
                    },
                    "leg-set": {
                        "jumping jack": {
                            "image": "",
                            "moves": "30",
                            "description": "Bruh, leg set and so, idk",
                            "time": "20",
                            "stars": "3",
                            "break": "20",
                        }
                    }
                },
                "TU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "WE": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TH": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "FR": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SA": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                }
            },
            "09.10.2023-15.10.2023": {
                "MO": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "WE": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TH": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "FR": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SA": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                }
            },
            "16.10.2023-22.10.2023": {
                "MO": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "WE": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TH": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "FR": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SA": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                }
            },
            "23.10.2023-29.10.2023": {
                "MO": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "WE": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "TH": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "FR": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SA": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                },
                "SU": {
                    "placeholder": {
                        "placeholder": {
                            "image": "",
                            "moves": "0",
                            "description": " ",
                            "time": "0",
                            "stars": "0",
                            "break": "0",

                        }
                    }
                }
            }
        }
    }

    let docRef = doc(db, collection, id);
    await setDoc(docRef, data);



}