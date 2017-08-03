import { TimeEntryStatus } from './../constants/Index'

let SampleData = [
    {
        date: '24/07/2017',
        activities: [
            {
                "Id": 1501130446120,
                "Activity":"Project",
                "Type": "Westcon",
                "Duration": "30 mins",
                "Description": "Project Westcon sync - meeting!!!!!!!!!!!!",
                "Status": "Pending",
                "Collaborators": ['Gaurav','Mahima']
            },
            {
                "Id": 1501130258519,
                "Activity":"Non-Project",
                "Type": "Knowledge Meet",
                "Duration": "2 hrs",
                "Description": "Knowledge meet!!!!!!!!!!!!",
                "Status": "Pending",
                "Collaborators": ['Gaurav','Rubi']
            },
            {
                "Id": 1501130206864,
                "Activity":"Project",
                "Type": "Daily Time Analysis",
                "Duration": "1 hr",
                "Description": "Project DTA sync - meeting!!!!!!!!!!!!",
                "Status": "Pending",
                "Collaborators": ['Gaurav']
            }],
        status: TimeEntryStatus.Committed
    },
    {
        date: '23/07/2017',
        activities: [
            {
                "Id": 1501130093066,
                "Activity":"Project",
                "Type": "Westcon",
                "Duration": "30 mins",
                "Description": "Project Westcon sync - meeting!!!!!!!!!!!!",
                "Status": "Pending",
                "Collaborators": ['Priyanka','Kanishka']
            },
            {
                "Id": 1501129983489,
                "Activity":"Non-Project",
                "Type": "Knowledge Meet",
                "Duration": "2 hrs",
                "Description": "Knowledge meet!!!!!!!!!!!!",
                "Status": "Pending",
                "Collaborators": ['Gaurav','Rubi']
            }
        ],
        status: TimeEntryStatus.Committed
    }
];

let TimeEnteries = [
    {
        date: '24/07/2017',
        day: 'Tue',
        activities: [
            {
                "Activity":"Project",
                "Type": "Westcon",
                "Duration": "30 mins",
                "Description": "Project Westcon sync - meeting!!!!!!!!!!!!",
                "Status": "Pending"
            },
            {
                "Activity":"Non-Project",
                "Type": "Knowledge Meet",
                "Duration": "2 hrs",
                "Description": "Knowledge meet!!!!!!!!!!!!",
                "Status": "Pending"
            },
            {
                "Activity":"Project",
                "Type": "Daily Time Analysis",
                "Duration": "1 hr",
                "Description": "Project DTA sync - meeting!!!!!!!!!!!!",
                "Status": "Pending"
            }]
    },
    {
        date: '23/07/2017',
        day: 'Mon',
        activities: [
            {
                "Activity":"Project",
                "Type": "Westcon",
                "Duration": "30 mins",
                "Description": "Project Westcon sync - meeting!!!!!!!!!!!!",
                "Status": "Pending"
            },
            {
                "Activity":"Non-Project",
                "Type": "Knowledge Meet",
                "Duration": "2 hrs",
                "Description": "Knowledge meet!!!!!!!!!!!!",
                "Status": "Pending"
            }
        ]
    }
];


export default SampleData;

