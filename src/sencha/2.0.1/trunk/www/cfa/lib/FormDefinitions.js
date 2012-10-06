/* 
  FormDefinitions.js
  Form definitions for data-driven form creation and processing,
  used with FormEngine.js
  
*/

var FD_Forms = {};

FD_Forms ['Case Form'] =
	{
	    formName: "Case Form",
		formDesc : "Enter Case Information",
		childForms: ['Assistance Request Form', 'Border Response Form', 'System', 'Storage', 'Media', 'Mobile', 'Photo/Attachment'],
		displayProperty: "CaseTitle",
		formFields: [
			/* name, type, textType, label, default value, required, data source, help text */
			{name: "fs", type: "fieldset", title: "Case Information", instructions: "Case Information"},
                {name: "fs", type: "fieldset", title: "General", instructions: "General Case Information"},
                    {name: "CaseTitle", type: "textfield", textType: "allcap", label: "Case Title", value: "", required: true, source: "CaseTitle", helpText: "Help"},
                    {name: "CreationDate", type: "textfield", showDatePicker: true, label: "Case Creation Date", value: new Date(), required: false, source: "CaseCreationDate", helpText: "Help"},
                    {name: "ICENo", type: "textfield", textType: "allcap", label: "ICE Case No.", value: "", required: false, source: "ICENo", helpText: "Help"},
                    {name: "CaseAgent", type: "textfield", textType: "pascalcase", label: "Case Agent", value: "", required: false, source: "CaseAgent", helpText: "Help"},
                    {name: "AgentPhone", type: "textfield", label: "Agent Phone No.", placeHolder: "(###) ###-####", required: false, source: "AgentPhone", helpText: "Help"},
                    {name: "AgentEmail", type: "emailfield", label: "Agent Email", placeHolder: "username@domain.com", required: false, source: "AgentEmail", helpText: "Help"},
                    {name: "CFAName", type: "textfield", textType: "pascalcase", label: "CFA Name", value: "", required: false, source: "CFAName", helpText: "Help"},
                    {name: "FPFNo", type: "textfield", textType: "allcap", label: "FP&F No.", value: "", required: false, source: "FPFNo", helpText: "Help"},
                    {name: "NonICENo", type: "textfield", textType: "allcap", label: "Non-ICE Case No.", value: "", required: false, source: "NonICENO", helpText: "Help"},
                    {name: "ExamFor", type: "textfield", textType: "pascalcase", label: "Exam Conducted For", value: "", required: false, source: "ExamFor", helpText: "Help"},
                    {name: "InvestType", type: "selectfield", label: "Type of Investigation", value: [ {value: 'Strategic', name: 'Strategic Investigation'}, {value: 'Smuggling', name: 'Smuggling Investigation'}, {value: 'Child', name: 'Child Pornography'}], required: true, source: "InvestType", helpText: "Help"},
                    {name: "Action", type: "selectfield", label: "Enforcement Action", value: [ {value: 'SW', name: 'Search Warrant'}, {value: 'BR', name: 'Border Response'}, {value: 'AR', name: 'Assistance Request'}], required: true, source: "InvestType", helpText: "Help"},
                    {name: "GeneralNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
                {name: "fs", type: "fieldset", title: "Onsite", instructions: "Onsite Case Information"},
                    {name: "CaseAddress", type: "textfield", label: "Case Location/Address", value: "", required: false, source: "CaseAddress", helpText: "Help"},
                    {name: "Scope", type: "textfield", textType: "pascalcase", label: "Scope of Search", value: "", required: false, source: "Scope", helpText: "Help"},
                    {name: "WifiDetect", type: "textfield", label: "Wifi Networks Detected", value: "", required: false, source: "WifiDetect", helpText: "Help"},
                    {name: "WifiEncrypt", type: "textfield", label: "Wifi Network Encryption", value: "", required: false, source: "WifiEncrypt", helpText: "Help"},
                    {name: "Keywords", type: "textfield", label: "Search Tag List", value: "", required: false, source: "Keywords", helpText: "Help"},
                    {name: "OnsiteNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
                {name: "fs", type: "fieldset", title: "Completion", instructions: "Completion Case Information"},
                    {name: "FERCompleted", type: "checkboxfield", label: "FER Completed", value: "", checked: true, required: false, source: "FERCompleted", helpText: "Help"},
                    {name: "SubmCFA", type: "textfield", label: "Submitting CFA", value: "", required: false, source: "SubmCFA", helpText: "Help"},
                    {name: "SubmDate", type: "datepickerfield", label: "Submitted Date", value: "", required: false, source: "SubmDate", helpText: "Help"},
                    {name: "CompletionNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
                {name: "efs", type: "endfieldset"},
            {name: "efs", type: "endfieldset"}
        ]
	};
	
FD_Forms ['System Form'] =
	
	{
		formName : "System",
		
		formDesc : "Enter info for a new system",
        
		childForms: ['Storage', 'Media', 'Mobile', 'Photo/Attachment'],
		displayProperty: 'DevName',
		formFields: [
			/* name, type, label, default value, required, data source, help text*/
			{name: "fs", type: "fieldset", title: "System Information", instructions: "System Information"},
			    {name: "fs", type: "fieldset", title: "General", instructions: "General System Information"},
                	
			   		{name: "DevName", type: "textfield", textType: "allcap", label: "System Name", value: "", required: true, source: "DevName", helpText: "Help"},
			   		{name: "ExamStart", type: "datepickerfield", label: "Date Exam Started", value: "", required: false, source: "ExamStart", helpText: "Help"},
			   		{name: "ExamEnd", type: "datepickerfield", label: "Date Exam Completed", value: "", required: false, source: "ExamEnd", helpText: "Help"},
			   		{name: "ImageMade", type: "hiddenfield", label: "Was Image Made", value: "N/A", required: false, source: "ImageMade", helpText: "Help"},
			   		{name: "ImageMadeDate", type: "hiddenfield", label: "Date Image Was Made", value: "N/A", required: false, source: "ImageMadeDate", helpText: "Help"},
			   		{name: "ImageType", type: "hiddenfield", label: "Image Type", value: "N/A", required: false, source: "ImageType", helpText: "Help"},
			   		{name: "ImageReleased", type: "hiddenfield", label: "Was Image Released", value: "N/A", required: false, source: "ImageReleased", helpText: "Help"},
			   		{name: "ImageReleasedTo", type: "hiddenfield", label: "Image Released to", value: "N/A", required: false, source: "ImageReleasedTo", helpText: "Help"},
			   		{name: "GeneralNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
			    {name: "efs", type: "endfieldset"},
			    {name: "fs", type: "fieldset", title: "System", instructions: "System Information"},
			        {name: "DevManufacturer", type: "textfield", label: "System Manufacturer", value: "", required: false, source: "DevManufacturer", helpText: "Help"},

			        {name: "DevMake", type: "textfield", label: "System Make", value: "", required: false, source: "DevMake", helpText: "Help"},
			        {name: "DevModel", type: "textfield", label: "System Model", value: "", required: false, source: "DevModel", helpText: "Help"},
			        {name: "DevSN", type: "textfield", label: "System SN#", value: "", required: false, source: "DevSN", helpText: "Help"},
			        {name: "DevType", type: "textfield", label: "System Type", value: "", required: false, source: "DevType", helpText: "Help"},
			        {name: "SystOS", type: "selectfield", label: "System OS", value: [ {value:'WinXP', name:'Windows XP'}, {value:'Win7', name:'Windows 7'}, {value:'Win8', name:'Windows 8'}, {value:'WinVista', name:'Windows Vista'}, {value:'OSX', name:'Mac OS X'}, {value:'Linux', name:'Linux'}, {value:'Solaris', name:'Solaris'}, {value:'Other', name:'Other (please add note)'}], required: false, source: "SystOS", helpText: "Help"},
			        {name: "SystBootOrder", type: "textfield", label: "System Boot Order", value: "", required: false, source: "SystBootOrder", helpText: "Help"},
			        {name: "SystemNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
				{name: "efs", type: "endfieldset"},
				{name: "fs", type: "fieldset", title: "Onsite", instructions: "System Onsite Information"},
				    {name: "SystLocation", type: "textfield", label: "System Location", value: "", required: false, source: "SystLocation", helpText: "Help"},
				    {name: "BootedOnsite", type: "checkboxfield", label: "Booted/Examined On-site", value: "", required: false, source: "BootedOnsite", helpText: "Help"},
				    {name: "SystOwner", type: "textfield", label: "System Owner/Users", value: "", required: false, source: "SystOwner", helpText: "Help"},
				    {name: "SystDateAcc", type: "selectfield", label: "System Date & Time Accurate?", value: [ {value:'Y', name:'Yes'}, {value:'N', name:'No'}], required: false, source: "SystDateAcc", helpText: "Help"},
				    {name: "SystDate", type: "textfield", label: "Actual Date & Time", value: "", required: false, source: "SystDate", helpText: "Help"},
				    {name: "SystUp", type: "checkboxfield", label: "System Running", value: "", required: false, source: "SystUp", helpText: "Help"},
				    {name: "ShutMethod", type: "selectfield", label: "Shutdown Method", value: [ {value:'Hard', name:'Hard'}, {value:'Soft', name:'Soft'}], required: false, source: "ShutMethod", helpText: "Help"},
				    {name: "Programs", type: "textfield", showPopup: true, label: "Active/Open Programs", value: "", required: false, source: "Programs", helpText: "Help"},
				    {name: "SystNetwork", type: "textfield", label: "System Network", value: "", required: false, source: "SystNetworked", helpText: "Help"},
				    {name: "SystPhoto", type: "checkboxfield", label: "System Photographed", value: "", required: false, source: "SystPhoto", helpText: "Help"},
				    {name: "ConnectedHW", type: "textfield", label: "Other Connected Hardware", value: "", required: false, source: "ConnecteHW", helpText: "Help"},
				    {name: "SystDamage", type: "textfield", label: "System Prior Damage", value: "", required: false, source: "SystDamage", helpText: "Help"},
				    {name: "OpenOnsite", type: "checkboxfield", label: "Case Opened On-site", value: "", required: false, source: "OpenOnsite", helpText: "Help"},
				    {name: "Passwords", type: "textfield", showPopup: true, label: "Possible Passwords", value: "", required: false, source: "Passwords", helpText: "Help"},
				    {name: "AntiVirusE", type: "checkboxfield", label: "Anti-Virus Enabled", value: "", required: false, source: "AntiVirusE", helpText: "Help"},
				    {name: "AntiVirusType", type: "textfield", label: "Anti-Virus Type", value: "", required: false, source: "Anti-Virus Type", helpText: "Help"},
				    {name: "Nearby", type: "textfield", showPopup: true, label: "Software/Manuals/Media Near System", value: "", required: false, source: "Nearby", helpText: "Help"},
				    {name: "ConnectedPeripherals", type: "textfield", label: "Connected Peripherals", value: "", required: false, source: "ConnectePeripherals", helpText: "Help"},
				    {name: "InternetType", type: "textfield", label: "Internet Access Type", value: "", required: false, source: "InternetType", helpText: "Help"},
				    {name: "InternetMethod", type: "textfield", label: "Internet Access Method", value: "", required: false, source: "InternetMethod", helpText: "Help"},
				    {name: "OnsiteNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
				{name: "efs", type: "endfieldset"},
				{name: "fs", type: "fieldset", title: "Seizure", instructions: "System Seizure Information"},
				    {name: "DevDetained", type: "checkboxfield", label: "System Detained", value: "", required: false, source: "DevDetained", helpText: "Help"},
				    {name: "DevSeized", type: "checkboxfield", label: "System Seized", value: "", required: false, source: "DevSeized", helpText: "Help"},
				    {name: "DevDetainedAddress", type: "textfield", label: "Seizure Address", value: "", required: false, source: "DevDetainedAddress", helpText: "Help"},
				    {name: "DevSeizedDate", type: "datepickerfield", label: "Seizure Date", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevSeizedTime", type: "textfield", label: "Seizure Time", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevTurnedDate", type: "datepickerfield", label: "Date Turned Over", value: "", required: false, source: "DevTurned Date", helpText: "Help"},
				    {name: "DevTurnedTo", type: "textfield", label: "System Turned Over to", value: "", required: false, source: "DevTurnedTo", helpText: "Help"},
				    {name: "FPFNo2", type: "textfield", label: "FP&F No. if Different", value: "", required: false, source: "FPFNo2", helpText: "FP&F No."},
				    {name: "CustodyFlag", type: "checkboxfield", label: "System Is In My Custody", value: "", required: false, source: "CustodyFlag", helpText: "Help"},
				    {name: "SeizureNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
				{name: "efs", type: "endfieldset"},
			{name: "efs", type: "endfieldset"}
        
		]
	
	};



FD_Forms ['Storage Form'] =
	
	{
		
		formName : "Storage",
		
		formDesc : "Enter info for a new storage device",
        
		childForms: ['Photo/Attachment'],
        
		displayProperty: 'DevName',
        
		formFields: [
			
		/* name, type, label, default value, required, data source, help text*/
		
	{name: "fs", type: "fieldset", title: "System Information", instructions: "System Information"},
		        {name: "fs", type: "fieldset", title: "General", instructions: "General System Information"},
		           	{name: "DevName", type: "textfield", textType: "allcap", label: "Storage Name", value: "", required: true, source: "DevName", helpText: "Help"},
			   		{name: "ExamStart", type: "datepickerfield", label: "Date Exam Started", value: "", required: false, source: "ExamStart", helpText: "Help"},
			   		{name: "ExamEnd", type: "datepickerfield", label: "Date Exam Completed", value: "", required: false, source: "ExamEnd", helpText: "Help"},
			   		{name: "ImageMade", type: "checkboxfield", label: "Was Image Made", value: "", required: false, source: "ImageMade", helpText: "Help"},
			   		{name: "ImageMadeDate", type: "datepickerfield", label: "Date Image Was Made", value: "", required: false, source: "ImageMadeDate", helpText: "Help"},
			   		{name: "ImageType", type: "textfield", label: "Image Type", value: "", required: false, source: "ImageType", helpText: "Help"},
			   		{name: "ImageReleased", type: "checkboxfield", label: "Was Image Released", value: "", required: false, source: "ImageReleased", helpText: "Help"},
			   		{name: "ImageReleasedTo", type: "textfield", label: "Image Released to", value: "", required: false, source: "ImageReleasedTo", helpText: "Help"},
			   		{name: "SystemInformationNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		        {name: "efs", type: "endfieldset"},
		        {name: "fs", type: "fieldset", title: "Storage", instructions: "Storage Information"},
		            {name: "DevManufacturer", type: "textfield", label: "Storage Device Manufacturer", value: "", required: false, source: "DevManufacturer", helpText: "Help"},
		            {name: "DevMake", type: "textfield", label: "Storage Device Make", value: "", required: false, source: "DevMake", helpText: "Help"},
		            {name: "DevModel", type: "textfield", label: "Storage Device Model", value: "", required: false, source: "DevModel", helpText: "Help"},
		            {name: "DevSN", type: "textfield", label: "Storage Device SN#", value: "", required: false, source: "DevSN", helpText: "Help"},
		            {name: "DevType", type: "textfield", label: "Storage Device Type", value: "", required: false, source: "DevType", helpText: "Help"},
		            {name: "DevCapacity", type: "numberfield", label: "Storage Device Capacity", value: "", required: false, source: "DevCapacity", helpText: "Help"},
		            {name: "DevCapacityMeas", type: "selectfield", label: "Storage Capacity Measurement", value: [ {value:'MB', name:'Megabytes'}, {value:'GB', name:'Gigabytes'}, {value:'TB', name:'Terabytes'}], required: false, source: "DevCapacityMeas", helpText: "Help"},
		            {name: "WriteBlockType", type: "textfield", label: "Type of Write Block Used", value: "", required: false, source: "WriteBlockType", helpText: "Help"},
		            {name: "WriteBlockValidated", type: "checkboxfield", label: "Write Blocking Validated", value: "", required: false, source: "WriteBlockValidated", helpText: "Help"},
		            {name: "WriteBlockCFA", type: "textfield", label: "Write Block Validating CFA", value: "", required: false, source: "WriteBlockCFA", helpText: "Help"},
		            {name: "Seal", type: "textfield", label: "Seal or Other ID No.", value: "", required: false, source: "Seal", helpText: "Help"},
		            {name: "EncrptionUsed", type: "textfield", label: "Encryption Used", value: "", required: false, source: "EncryptionUsed", helpText: "Help"},
		            {name: "EncryptionType", type: "textfield", label: "Encryption Type", value: "", required: false, source: "EncryptionType", helpText: "Help"},
		            {name: "JumperSettings", type: "textfield", label: "HD Jumper Settings", value: "", required: false, source: "JumperSettings", helpText: "Help"},
		            {name: "StorageNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		        {name: "efs", type: "endfieldset"},
		        {name: "fs", type: "fieldset", title: "Seizure", instructions: "Storage Seizure Information"},
		            {name: "DevDetained", type: "checkboxfield", label: "Storage Device Detained", value: "", required: false, source: "DevDetained", helpText: "Help"},
				    {name: "DevSeized", type: "checkboxfield", label: "Storage Device Seized", value: "", required: false, source: "DevSeized", helpText: "Help"},
				    {name: "DevDetainedAddress", type: "textfield", label: "Seizure Address", value: "", required: false, source: "DevDetainedAddress", helpText: "Help"},
				    {name: "DevSeizedDate", type: "datepickerfield", label: "Seizure Date", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevSeizedTime", type: "textfield", label: "Seizure Time", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevTurnedDate", type: "datepickerfield", label: "Date Turned Over", value: "", required: false, source: "DevTurned Date", helpText: "Help"},
				    {name: "DevTurnedTo", type: "textfield", label: "Storage Device Turned Over to", value: "", required: false, source: "DevTurnedTo", helpText: "Help"},
				    {name: "FPFNo2", type: "textfield", label: "FP&F No. if Different", value: "", required: false, source: "FPFNo2", helpText: "FP&F No."},
				    {name: "CustodyFlag", type: "checkboxfield", label: "Storage Device Is In My Custody", value: "", required: false, source: "CustodyFlag", helpText: "Help"},
				    {name: "SeizureNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		        {name: "efs", type: "endfieldset"},
            
		    {name: "efs", type: "endfieldset"}
		]
	
	};



FD_Forms ['Media Form'] =
	
	{
		
		formName : "Media",
		formDesc : "Enter info for a new Media",
		childForms: ['Photo/Attachment'],
		displayProperty: 'DevName',
		formFields: [
			
		/* name, type, label, default value, required, data source, help text*/
			{name: "fs", type: "fieldset", title: "Media Information", instructions: "Media Information"},
			
   {name: "fs", type: "fieldset", title: "General", instructions: "General Media Information"},
			
       {name: "DevName", type: "textfield", textType: "allcap", label: "Media Name", value: "", required: true, source: "DevName", helpText: "Help"},
			   		{name: "ExamStart", type: "datepickerfield", label: "Date Exam Started", value: "", required: false, source: "ExamStart", helpText: "Help"},
			   		{name: "ExamEnd", type: "datepickerfield", label: "Date Exam Completed", value: "", required: false, source: "ExamEnd", helpText: "Help"},
			   		{name: "ImageMade", type: "checkboxfield", label: "Was Image Made", value: "", required: false, source: "ImageMade", helpText: "Help"},
			   		{name: "ImageMadeDate", type: "datepickerfield", label: "Date Image Was Made", value: "", required: false, source: "ImageMadeDate", helpText: "Help"},
			   		{name: "ImageType", type: "textfield", label: "Image Type", value: "", required: false, source: "ImageType", helpText: "Help"},
			   		{name: "ImageReleased", type: "checkboxfield", label: "Was Image Released", value: "", required: false, source: "ImageReleased", helpText: "Help"},
			   		{name: "ImageReleasedTo", type: "textfield", label: "Image Released to", value: "", required: false, source: "ImageReleasedTo", helpText: "Help"},
			   		{name: "GeneralNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
			    {name: "efs", type: "endfieldset"},
			    {name: "fs", type: "fieldset", title: "Media", instructions: "Media Information"},
			    
   {name: "DevManufacturer", type: "hiddenfield", label: "Media Manufacturer", value: "N/A", required: false, source: "DevManufacturer", helpText: "Help"},
			    
   {name: "DevMake", type: "hiddenfield", label: "Media Make", value: "N/A", required: false, source: "DevMake", helpText: "Help"},
			    
   {name: "DevModel", type: "hiddenfield", label: "Media Model", value: "N/A", required: false, source: "DevModel", helpText: "Help"},

			        {name: "DevSN", type: "hiddenfield", label: "Media SN#", value: "N/A", required: false, source: "DevSN", helpText: "Help"},
			        {name: "DevType", type: "selectfield", label: "Media Type", value: [ {value:'CD', name:'CD'}, {value:'DVD', name:'DVD'}, {value:'FD', name:'Floppy Disks'}, {value:'Tape', name:'Tape'}], required: false, source: "DevType", helpText: "Help"},
			        {name: "MediaQty", type: "numberfield", label: "Media Quantity", value: "", required: false, source: "MediaQty", helpText: "Help"},
			        {name: "DevCapacity", type: "numberfield", label: "Media Capacity", value: "", required: false, source: "DevCapacity", helpText: "Help"},
			        {name: "DevCapacityMeas", type: "selectfield", label: "Media Capacity Measurement", value: [ {value:'MB', name:'Megabytes'}, {value:'GB', name:'Gigabytes'}, {value:'TB', name:'Terabytes'}], required: false, source: "DevCapacityMeas", helpText: "Help"},
			        {name: "EncrptionUsed", type: "textfield", label: "Encryption Used", value: "", required: false, source: "EncryptionUsed", helpText: "Help"},
			        {name: "EncryptionType", type: "textfield", label: "Encryption Type", value: "", required: false, source: "EncryptionType", helpText: "Help"},
			        {name: "MediaNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
			    {name: "efs", type: "endfieldset"},
			    {name: "fs", type: "fieldset", title: "Seizure", instructions: "Media Seizure Information"},
			    
   {name: "DevDetained", type: "checkboxfield", label: "Media Detained", value: "", required: false, source: "DevDetained", helpText: "Help"},
				    {name: "DevSeized", type: "checkboxfield", label: "Media Seized", value: "", required: false, source: "DevSeized", helpText: "Help"},
				    {name: "DevDetainedAddress", type: "textfield", label: "Seizure Address", value: "", required: false, source: "DevDetainedAddress", helpText: "Help"},
				    {name: "DevSeizedDate", type: "datepickerfield", label: "Seizure Date", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevSeizedTime", type: "textfield", label: "Seizure Time", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevTurnedDate", type: "datepickerfield", label: "Date Turned Over", value: "", required: false, source: "DevTurned Date", helpText: "Help"},
				    {name: "DevTurnedTo", type: "textfield", label: "Media Turned Over to", value: "", required: false, source: "DevTurnedTo", helpText: "Help"},
				    {name: "FPFNo2", type: "textfield", label: "FP&F No. if Different", value: "", required: false, source: "FPFNo2", helpText: "FP&F No."},
				    {name: "CustodyFlag", type: "checkboxfield", label: "Media Is In My Custody", value: "", required: false, source: "CustodyFlag", helpText: "Help"},
				    {name: "SeizureNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
			    {name: "efs", type: "endfieldset"},

           {name: "efs", type: "endfieldset"}

       ]
	};



FD_Forms ['Mobile Form'] =
	
	{
		
		formName : "Mobile",
		formDesc : "Enter info for a Mobile",
		childForms: ['Photo/Attachment'],
		displayProperty: 'DevName',
		formFields: [
			
		/* name, type, label, default value, required, data source, help text*/
		
	{name: "fs", type: "fieldset", title: "Mobile Information", instructions: "Mobile Information"},
		
   	{name: "fs", type: "fieldset", title: "General", instructions: "General Mobile Information"},
		
          	{name: "DevName", type: "textfield", textType: "allcap", label: "Mobile Name", value: "", required: true, source: "DevName", helpText: "Help"},
			   		{name: "ExamStart", type: "datepickerfield", label: "Date Exam Started", value: "", required: false, source: "ExamStart", helpText: "Help"},
			   		{name: "ExamEnd", type: "datepickerfield", label: "Date Exam Completed", value: "", required: false, source: "ExamEnd", helpText: "Help"},
			   		{name: "ImageMade", type: "checkboxfield", label: "Was Image Made", value: "", required: false, source: "ImageMade", helpText: "Help"},
			   		{name: "ImageMadeDate", type: "datepickerfield", label: "Date Image Was Made", value: "", required: false, source: "ImageMadeDate", helpText: "Help"},
			   		{name: "ImageType", type: "textfield", label: "Image Type", value: "", required: false, source: "ImageType", helpText: "Help"},
			   		{name: "ImageReleased", type: "checkboxfield", label: "Was Image Released", value: "", required: false, source: "ImageReleased", helpText: "Help"},
			   		{name: "ImageReleasedTo", type: "textfield", label: "Image Released to", value: "", required: false, source: "ImageReleasedTo", helpText: "Help"},
			   		{name: "GeneralNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		        {name: "efs", type: "endfieldset"},
		        {name: "fs", type: "fieldset", title: "Mobile", instructions: "Mobile Information"},

		            {name: "DevManufacturer", type: "hiddenfield", label: "Mobile Manufacturer", value: "N/A", required: false, source: "DevManufacturer", helpText: "Help"},
		            {name: "DevMake", type: "textfield", label: "Mobile Make", value: "", required: false, source: "DevMake", helpText: "Help"},
		            {name: "DevModel", type: "textfield", label: "Mobile Model", value: "", required: false, source: "DevModel", helpText: "Help"},
		            {name: "DevSN", type: "textfield", label: "Mobile SN#", value: "", required: false, source: "DevSN", helpText: "Help"},
		            {name: "DevType", type: "hiddenfield", label: "System Type", value: "N/A", required: false, source: "DevType", helpText: "Help"},
		            {name: "Carrier", type: "selectfield", label: "Carrier", value: [ {value:'ATT', name:'AT&T'}, {value:'Verizon', name:'Verizon'}, {value:'Sprint', name:'Sprint'}, {value:'Virgin', name:'Virgin'}, {value:'T-Mobile', name:'T-Mobile'}, {value:'Other', name:'Other (please add note)'}], required: false, source: "Carrier", helpText: "Help"},
		            {name: "Protocol", type: "selectfield", label: "Transmission Protocol", value: [ {value:'CDMA', name:'CDMA'}, {value:'GSM', name:'GSM'}], required: false, source: "Protocol", helpText: "Help"},
		            {name: "MobileOS", type: "selectfield", label: "Operating System", value: [ {value:'iOS', name:'iOS'}, {value:'Android', name:'Android'}, {value:'Windows', name:'Windows'}, {value:'Blackberry', name:'Blackberry'}, {value:'Symbian', name:'Symbian'}], required: false, source: "SystOS", helpText: "Help"},
		            {name: "MCMake", type: "textfield", label: "Memory Card Make", value: "", required: false, source: "MCMake", helpText: "Help"},
		            {name: "MCModel", type: "textfield", label: "Memory Card Model", value: "", required: false, source: "MCModel", helpText: "Help"},
		            {name: "MCCapacity", type: "numberfield", label: "Memory Card Capacity", value: "", required: false, source: "MCCapacity", helpText: "Help"},
		            {name: "MCCapacityMeas", type: "selectfield", label: "Memory Card Capacity Measurement", value: [ {value:'MB', name:'Megabytes'}, {value:'GB', name:'Gigabytes'}, {value:'TB', name:'Terabytes'}], required: false, source: "MCCapacityMeas", helpText: "Help"},
		            {name: "AnalysisSW", type: "textfield", label: "Mobile Analysis Software", value: "", required: false, source: "AnalysisSW", helpText: "Help"},
		            {name: "AnalysisSWLogical", type: "textfield", label: "Mobile Analysis Software Logical", value: "", required: false, source: "AnalysisSWLogical", helpText: "Help"},
		            {name: "AnalysisSWPhysical", type: "textfield", label: "Mobile Analysis Software Physical", value: "", required: false, source: "AnalysisSWPhysical", helpText: "Help"},
		            {name: "AnalysisSWFile", type: "textfield", label: "Mobile Analysis Software Filesystem", value: "", required: false, source: "AnalysisSWFile", helpText: "Help"},
		            {name: "MobileNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		        {name: "efs", type: "endfieldset"},
		        {name: "fs", type: "fieldset", title: "Seizure", instructions: "System Seizure Information"},
		            {name: "DevDetained", type: "checkboxfield", label: "Mobile Device Detained", value: "", required: false, source: "DevDetained", helpText: "Help"},
				    {name: "DevSeized", type: "checkboxfield", label: "Mobile Device Seized", value: "", required: false, source: "DevSeized", helpText: "Help"},
				    {name: "DevDetainedAddress", type: "textfield", label: "Seizure Address", value: "", required: false, source: "DevDetainedAddress", helpText: "Help"},
				    {name: "DevSeizedDate", type: "datepickerfield", label: "Seizure Date", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevSeizedTime", type: "textfield", label: "Seizure Time", value: "", required: false, source: "DevSeizedDate", helpText: "Help"},
				    {name: "DevTurnedDate", type: "datepickerfield", label: "Date Turned Over", value: "", required: false, source: "DevTurned Date", helpText: "Help"},
				    {name: "DevTurnedTo", type: "textfield", label: "Mobile Device Turned Over to", value: "", required: false, source: "DevTurnedTo", helpText: "Help"},
				    {name: "FPFNo2", type: "textfield", label: "FP&F No. if Different", value: "", required: false, source: "FPFNo2", helpText: "FP&F No."},
				    {name: "CustodyFlag", type: "checkboxfield", label: "Mobile Device Is In My Custody", value: "", required: false, source: "CustodyFlag", helpText: "Help"},
				    {name: "SeizureNotes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		        {name: "efs", type: "endfieldset"},
		    {name: "efs", type: "endfieldset"}
		]
	
	};
    


FD_Forms ['Photo'] =

	{
		
		formName : "Photo/Attachment",
		
		formDesc : "Attach photo to object",
       
		attachment: 'photo',
        
		displayProperty: 'AlbumName',
		
		formFields: [
			
		 /* name, type, label, default value, required, data source, help text */
		 {name: "AlbumName", type: "textfield", label: "Album Name", value: "", required: true, source: "AlbumName", helpText: "Help"},
		 {name: "Notes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"},
		 {name: "PhotoId", type: "hiddenfield", label: "Photo ID", value: "", required: false, source: "PhotoId", helpText: "Help"}
        ]
	
    };



FD_Forms ['AR Form'] =
	{
		formName : "Assistance Request Form",
		formDesc: "Use to request support from another office",
        childForms: ['Photo/Attachment'],
		displayProperty: 'ProsecutorName',
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "OAgency", type: "textfield", label: "Originating Agency", value: "", required: false, source: "OAgency", helpText: "Help"},
			{name: "RequestDate", type: "datepickerfield", label: "Request Date", value: new Date(), required: false, source: "RequestDate", helpText: "Help"},
            {name: "SearchAuthority", type: "textfield", label: "Search Authority", value: "", required: false, source: "SearchAuthority", helpText: "Help"},
            {name: "EnforcementDate", type: "datepickerfield", label: "Enforcement Date", value: new Date(), required: false, source: "EnforcementDate", helpText: "Help"},
            {name: "ProsecutorName", type: "textfield", label: "Prosecutor Name", value: "", required: false, source: "ProsecutorName", helpText: "Help"},
            {name: "ProsecutorAgency", type: "textfield", label: "Prosecutor Agency", value: "", required: false, source: "ProsecutorAgency", helpText: "Help"},
            {name: "ProsecutorPhone", type: "textfield", label: "Prosecutor Phone No.", value: "", required: false, source: "ProsecutorPhone", helpText: "Help"},
            {name: "ProsecutorEmail", type: "emailfield", label: "Prosecutor Email", value: "", required: false, source: "ProsecutorEmail", helpText: "Help"},
            {name: "InvestType", type: "textfield", label: "Investigation Type", value: "", required: false, source: "InvestType", helpText: "Help"},
            {name: "SensitiveInfo", type: "checkboxfield", label: "Sensitive Information", value: "", required: false, source: "SensitiveInfo", helpText: "Help"},
            {name: "SpecialConsiderations", type: "textareafield", showPopup: true, label: "Special Timing Considerations", value: "", required: false, source: "SpecialConsiderations", helpText: "Help"},
            {name: "SpecialSupport", type: "textareafield", showPopup: true, label: "Special Support Request", value: "", required: false, source: "SpecialSupport", helpText: "Help"},
            {name: "Keywords", type: "textfield", label: "Keyword List", value: "", required: false, source: "Keyword", helpText: "Help"},
            {name: "Notes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"}
		]
	};	
	
FD_Forms ['BR Form'] =
	{
		formName : "Border Response Form",
		formDesc : "Log a Border Response with this form",
        childForms: ['Photo/Attachment'],
        displayProperty: 'SubjectName',
		formFields: [
			/* name, type, label, default value, required, data source, help text */
			{name: "SubjectName", type: "textfield", label: "Subject Name", value: "", required: false, source: "SubjectName", helpText: "Help"},
            {name: "ConveyanceInfo", type: "textfield", label: "Conveyance Info", value: "", required: false, source: "ConveyanceInfo", helpText: "Help"},
            {name: "SearchType", type: "textfield", label: "Type of Search", value: "", required: false, source: "SearchType", helpText: "Help"},
            {name: "PoE", type: "textfield", label: "Port of Entry", value: "", required: false, source: "PoE", helpText: "Help"},
            {name: "SearchStart", type: "textfield", label: "Search Initiated Date/Time", value: "", required: false, source: "SearchStart", helpText: "Help"},
            {name: "SearchEnd", type: "textfield", label: "Search Completed Date/Time", value: "", required: false, source: "SearchEnd", helpText: "Help"},
            {name: "Notes", type: "textareafield", showPopup: true, label: "Notes", value: "", required: false, source: "Notes", helpText: "Help"}
        ]
	};
