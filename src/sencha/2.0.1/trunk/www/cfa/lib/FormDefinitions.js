/* 
  FormDefinitions.js
  Form definitions for data-driven form creation and processing,
  used with FormEngine.js
  
*/

var FD_Forms = [];

FD_Forms ['Case Form'] =
	{
	    formName: "Case Form",
		formDesc : "Case Main Data Form",
		objTitle: "CaseTitle",
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "fs", type: "fieldset", title: "Case Information", instructions: "Case Information"},
                {name: "fs", type: "fieldset", title: "General", instructions: "General Case Information"},
                    {name: "CreationDate", type: "textfield", label: "Case Creation Date", value: "", required: false, source: "CaseCreationDate", helpText: "Date the Case was created"},
                    {name: "ICENo", type: "textfield", label: "ICE Case No.", value: "", required: false, source: "ICENo", helpText: "Enter Case Number obtained from TECS"},
                    {name: "CaseTitle", type: "textfield", label: "Case Title", value: "", required: true, source: "CaseTitle", helpText: "Name your case"},
                    {name: "CaseAgent", type: "textfield", label: "Case Agent", value: "", required: false, source: "CaseAgent", helpText: "Case Agent's name"},
                    {name: "AgentPhone", type: "textfield", label: "Agent Phone No.", value: "(###) ###-####", required: false, source: "AgentPhone", helpText: "Case Agent's phone number"},
                    {name: "AgentEmail", type: "emailfield", label: "Agent Email", value: "", required: false, source: "AgentEmail", helpText: "Case Agent's email address"},
                    {name: "CFAName", type: "textfield", label: "CFA Name", value: "", required: false, source: "CFAName", helpText: "CF Agent's name"},
                    {name: "FPFNo", type: "textfield", label: "FP&F No.", value: "", required: false, source: "FPFNo", helpText: "FP&F No."},
                    {name: "NonICENo", type: "textfield", label: "Non-ICE Case No.", value: "", required: false, source: "NonICENO", helpText: "Non-ICE Case No."},
                    {name: "ExamFor", type: "textfield", label: "Exam Conducted For", value: "", required: false, source: "ExamFor", helpText: "Who was the examination conducted for"},
                    {name: "InvestType", type: "selectfield", label: "Type of Investigation", value: [ {value: 'SW', name: 'Search Warrant'}, {value: 'BR', name: 'Border Response'}, {value: 'AR', name: 'Assistance Request'}], required: true, source: "InvestType", helpText: "Which type of investigation is this for"},
                    {name: "Notes", type: "textareafield", label: "Notes", value: "", required: false, source: "Notes", helpText: "Notes about the case"},
                {name: "efs", type: "endfieldset"},
                {name: "fs", type: "fieldset", title: "Onsite", instructions: "Onsite Case Information"},
                    {name: "CaseAddress", type: "textfield", label: "Case Location/Address", value: "", required: false, source: "CaseAddress", helpText: "Help"},
                    {name: "Scope", type: "textfield", label: "Scope of Search", value: "", required: false, source: "Scope", helpText: "Help"},
                    {name: "WifiDetect", type: "textfield", label: "Wifi Networks Detected", value: "", required: false, source: "WifiDetect", helpText: "Help"},
                    {name: "WifiEncrypt", type: "textfield", label: "Wifi Network Encryption", value: "", required: false, source: "WifiEncrypt", helpText: "Help"},
                    {name: "Keywords", type: "textfield", label: "Keyword List", value: "", required: false, source: "Keywords", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
                {name: "fs", type: "fieldset", title: "Completion", instructions: "Completion Case Information"},
                    {name: "FERCompleted", type: "checkboxfield", label: "FER Completed", value: "", checked: true, required: false, source: "FERCompleted", helpText: "Help"},
                    {name: "SubmOffice", type: "textfield", label: "Submitting Office", value: "", required: false, source: "SubmOffice", helpText: "Help"},
                    {name: "SubmDate", type: "textfield", label: "Submission Date", value: "", required: false, source: "SubmDate", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
            {name: "efs", type: "endfieldset"},
        ]
	};
	
FD_Forms ['AR Form'] =
	{
		formName : "AR Form",
		formDesc: "Assistance Request Form",
        objTitle: 'OAgency',
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "OAgency", type: "textfield", label: "Originating Agency", value: "", required: false, source: "OAgency", helpText: "Help"},
			{name: "RequestDate", type: "textfield", label: "Request Date", value: "", required: false, source: "RequestDate", helpText: "Help"},
            {name: "SearchAuthority", type: "textfield", label: "Search Authority", value: "", required: false, source: "SearchAuthority", helpText: "Help"},
            {name: "EnforcementDate", type: "textfield", label: "Enforcement Date", value: "", required: false, source: "EnforcementDate", helpText: "Help"},
            {name: "ProsecutorName", type: "textfield", label: "Prosecutor Name", value: "", required: false, source: "ProsecutorName", helpText: "Help"},
            {name: "ProsecutorAgency", type: "textfield", label: "Prosecutor Agency", value: "", required: false, source: "ProsecutorAgency", helpText: "Help"},
            {name: "ProsecutorPhone", type: "textfield", label: "Prosecutor Phone No.", value: "", required: false, source: "ProsecutorPhone", helpText: "Help"},
            {name: "ProsecutorEmail", type: "emailfield", label: "Prosecutor Email", value: "", required: false, source: "ProsecutorEmail", helpText: "Help"},
            {name: "InvestType", type: "textfield", label: "Investigation Type", value: "", required: false, source: "InvestType", helpText: "Help"},
            {name: "SensitiveInfo", type: "checkboxfield", label: "Sensitive Information", value: "", required: false, source: "SensitiveInfo", helpText: "Help"},
            {name: "SpecialConsiderations", type: "textareafield", label: "Special Timing Considerations", value: "", required: false, source: "SpecialConsiderations", helpText: "Help"},
            {name: "SpecialSupport", type: "textareafield", label: "Special Suport Request", value: "", required: false, source: "SpecialSupport", helpText: "Help"},
            {name: "Keywords", type: "textfield", label: "Keyword List", value: "", required: false, source: "Keyword", helpText: "Help"},
		]
	};	
	
FD_Forms ['BR Form'] =
	{
		formName : "BR Form",
		formDesc : "Border Response Form",
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "SubjectName", type: "textfield", label: "Subject Name", value: "", required: false, source: "SubjectName", helpText: "Help"},
            {name: "ConveyanceInfo", type: "textfield", label: "Conveyance Info", value: "", required: false, source: "ConveyanceInfo", helpText: "Help"},
            {name: "SearchType", type: "textfield", label: "Type of Search", value: "", required: false, source: "SearchType", helpText: "Help"},
            {name: "PoE", type: "selectfield", label: "Port of Entry", value: [ {value:'IAD', name:'Dulles Airport'}, {value:'DCA', name:'Reagan Airport'}, {value:'BWI', name:'Baltimore Airport'}], required: false, source: "PoE", helpText: "Help"},
            {name: "SearchStart", type: "textfield", label: "Search Initiated Date/Time", value: "", required: false, source: "SearchStart", helpText: "Help"},
            {name: "SearchEnd", type: "textfield", label: "Search Completed Date/Time", value: "", required: false, source: "SearchEnd", helpText: "Help"},
        ]
	};

FD_Forms ['System Form'] =
	{
		formName : "System Form",
		formDesc : "System Form",
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "fs", type: "fieldset", title: "System Information", instructions: "System Information"},
                {name: "fs", type: "fieldset", title: "General", instructions: "General System Information"},
                    {name: "ExamStart", type: "textfield", label: "Date Exam Started", value: "", required: false, source: "ExamStart", helpText: "Help"},
                    {name: "ExamEnd", type: "textfield", label: "Date Exam Completed", value: "", required: false, source: "ExamEnd", helpText: "Help"},
                    {name: "Notes", type: "textareafield", label: "Notes", value: "", required: false, source: "Notes", helpText: "Notes about the system"},
                {name: "efs", type: "endfieldset"},
                {name: "fs", type: "fieldset", title: "System", instructions: "System Information"},
                    {name: "SystManufacturer", type: "textfield", label: "Syste Manufacturer", value: "", required: false, source: "SystManufacturer", helpText: "Help"},
                    {name: "SystType", type: "textfield", label: "System Type", value: "", required: false, source: "SystType", helpText: "Help"},
                    {name: "SystModel", type: "textfield", label: "System Model", value: "", required: false, source: "SystModel", helpText: "Help"},
                    {name: "SystName", type: "textfield", label: "System Name", value: "", required: false, source: "SystName", helpText: "Help"},
                    {name: "SystSN", type: "textfield", label: "System SN#", value: "", required: false, source: "SystSN", helpText: "Help"},
                    {name: "SystOS", type: "selectfield", label: "System OS", value: [ {value:'Win', name:'Windows XP/NT/7/8'}, {value:'OSX', name:'Mac OS X'}], required: false, source: "SystOS", helpText: "Help"},
                    {name: "SystBootOrder", type: "textfield", label: "System Boot Order", value: "", required: false, source: "SystBootOrder", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
                {name: "fs", type: "fieldset", title: "Onsite", instructions: "System Onsite Information"},
                {name: "SystLocation", type: "textfield", label: "System Location", value: "", required: false, source: "SystLocation", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
            {name: "efs", type: "endfieldset"},
        ]
	};

FD_Forms ['Test Form'] =
	{
		formName : "Test Form",
		formDesc : "Test Form",
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "name", type: "textfield", label: "Label", value: "", required: false, source: "Source", helpText: "Help"},
        ]
	};
